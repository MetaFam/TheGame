import { Request, Response } from 'express';
import {hasuraQuery} from "../../../lib/hasuraHelpers";
import {getPlayerETHAddress} from "../../../lib/playerHelpers";
import Box from '3box';

const getPlayerQuery = `
query GetPlayer ($playerId: uuid!) {
  Player(
    where: { 
      id: { _eq: $playerId }
    }
  ) {
    id
    Accounts {
      identifier
      type
    }
  }
}
`;

const upsertAccount = `
mutation upsert_Account($objects: [Account_insert_input!]!) {
  insert_Account (
    objects: $objects,
    on_conflict: {
      constraint: Account_identifier_type_player_key,
      update_columns: [identifier]
    }
  ) {
    affected_rows
  }
}
`;

const handler = async (req: Request, res: Response) => {

  const { session_variables } = req.body;
  const role = session_variables['x-hasura-role'];
  const playerId = session_variables['x-hasura-user-id'];

  if(role !== 'player') {
    throw new Error('expected role player');
  }

  const data = await hasuraQuery(getPlayerQuery, {
    playerId,
  });

  const player = data.Player[0];
  if(!player) {
    throw new Error('unknown-player');
  }

  const ethAddress = getPlayerETHAddress(player);
  const boxProfile = await Box.getProfile(ethAddress);
  const verifiedProfile = await Box.getVerifiedAccounts(boxProfile);
  const result = await updateVerifiedProfiles(playerId, verifiedProfile);

  res.json(result);

};

async function updateVerifiedProfiles(playerId: string, verifiedProfiles: any): Promise<UpdateBoxProfileResponse> {
  const updatedProfiles: string[] = [];

  if(verifiedProfiles.github) {
    const result = await hasuraQuery(upsertAccount, {
      objects: [
        {
          player_id: playerId,
          type: 'GITHUB',
          identifier: verifiedProfiles.github.username,
          linkToProof: verifiedProfiles.github.proof,
        }
      ],
    });
    if(result.affected_rows === 0) {
      throw new Error('Error while upserting github profile');
    }
    updatedProfiles.push('github');
  }

  if(verifiedProfiles.twitter) {
    const result = await hasuraQuery(upsertAccount, {
      objects: [
        {
          player_id: playerId,
          type: 'TWITTER',
          identifier: verifiedProfiles.twitter.username,
          linkToProof: verifiedProfiles.twitter.proof,
        }
      ],
    });
    if(result.affected_rows === 0) {
      throw new Error('Error while upserting github profile');
    }
    updatedProfiles.push('twitter');
  }

  return {
    success: true,
    updatedProfiles,
  };
}

export default handler;
