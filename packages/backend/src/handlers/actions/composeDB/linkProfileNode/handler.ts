import { ComposeClient } from '@composedb/client';
import { composeDBDefinition } from '@metafam/utils';
import { Request, Response } from 'express';

import { CONFIG } from '../../../../config.js';
import {
  LinkCeramicProfileNodeResponse,
  Mutation_RootLinkCeramicProfileNodeArgs,
} from '../../../../lib/autogen/hasura-sdk.js';
import { client } from '../../../../lib/hasuraClient.js';

export default async (req: Request, res: Response): Promise<void> => {
  const { input, session_variables: sessionVariables } = req.body;

  const role = sessionVariables['x-hasura-role'];
  const playerId = sessionVariables['x-hasura-user-id'];

  const { player_by_pk: player } = await client.GetPlayer({ playerId });
  const { ceramicProfileId, ethereumAddress } = player ?? {};

  try {
    if (role !== 'player') {
      throw new Error('Expected player role');
    }
    if (!ethereumAddress) {
      throw new Error(`Unknown Player: "${playerId}"`);
    }

    const { nodeId } = input as Mutation_RootLinkCeramicProfileNodeArgs;

    if (ceramicProfileId === nodeId) {
      res.json({
        verified: true,
      });
      return;
    }

    const composeDBClient = new ComposeClient({
      ceramic: CONFIG.ceramicURL,
      definition: composeDBDefinition,
    });
    const modelInstanceDoc = await composeDBClient.context.loadDoc(nodeId);

    if (!modelInstanceDoc) throw new Error(`Model instance not found: "${nodeId}".`);

    const { controller } = modelInstanceDoc.metadata;

    const controllerEthAddress = controller.replace(/.*:/g, '');

    // controller is something like did:pkh:eip155:1:0x4c81e51aa103490838fd9db1d859a5fcd8276324
    // make sure this is a mainnet address!
    if (
      controller.startsWith('did:pkh') &&
      controllerEthAddress.toLowerCase() === ethereumAddress.toLowerCase()
    ) {
      // We confirmed they indeed control this model, so persist it as theirs
      await client.UpdatePlayerById({
        playerId,
        input: { ceramicProfileId: nodeId },
      });
      res.json({
        verified: true,
      } as LinkCeramicProfileNodeResponse);
      return;
    }

    res.json({
      verified: false,
    } as LinkCeramicProfileNodeResponse);
  } catch (error) {
    console.error(
      'An unexpected error occurred while linking a ceramic documentID to a player:',
    );
    console.error(error);
    res.json({
      verified: false,
      error: (error as Error).message,
    } as LinkCeramicProfileNodeResponse);
  }
};
