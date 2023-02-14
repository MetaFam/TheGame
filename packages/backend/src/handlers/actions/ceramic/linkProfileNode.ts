import { ComposeClient } from '@composedb/client';
import { composeDBDefinition } from '@metafam/utils';
import { CONFIG } from 'config';
import { Request, Response } from 'express';
import {
  LinkCeramicProfileNodeResponse,
  Mutation_RootLinkCeramicProfileNodeArgs,
} from 'lib/autogen/hasura-sdk';
import { client } from 'lib/hasuraClient';

export default async (req: Request, res: Response): Promise<void> => {
  const { input, session_variables: sessionVariables } = req.body;

  const role = sessionVariables['x-hasura-role'];
  const playerId = sessionVariables['x-hasura-user-id'];

  const { player_by_pk: player } = await client.GetPlayer({ playerId });
  const { ethereumAddress } = player ?? {};

  try {
    if (role !== 'player') {
      throw new Error('Expected player role');
    }
    if (!ethereumAddress) {
      throw new Error(`Unknown Player: "${playerId}"`);
    }

    const { nodeId } = input as Mutation_RootLinkCeramicProfileNodeArgs;

    const composeDBClient = new ComposeClient({
      ceramic: CONFIG.ceramicURL,
      definition: composeDBDefinition,
    });
    const modelInstanceDoc = await composeDBClient.context.loadDoc(nodeId);
    console.log(
      'controller for ',
      nodeId,
      ' is ',
      modelInstanceDoc.metadata.controller,
    );

    // todo:
    // 1. hook up frontend to call this action
    // 2. determine the 'controller' from the console logs
    // 3. if the controller matches ETH address, update the player record accordingly
    // 3a. Will need to figure out how to go from ETH address to DID:PKH to verify

    const responseJSON = {
      verified: false,
    } as LinkCeramicProfileNodeResponse;
    res.json(responseJSON);
  } catch (error) {
    res.json({
      success: false,
      error: (error as Error).message,
    });
  }
};
