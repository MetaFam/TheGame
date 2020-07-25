import { hasuraQuery } from '../../lib/hasuraHelpers';

const getPlayerQuery = `
query GetPlayerFromETH ($eth_address: String) {
  Account(
    where: { 
      identifier: { _eq: $eth_address },
      type: { _eq: "ETHEREUM" }
    }
  ) {
    Player {
      id
    }  
  }
}
`;

const createProfileMutation = `
mutation CreateAccountFromETH ($eth_address: String!, $username: String!) {
  insert_Account(
    objects: {
      type: "ETHEREUM", 
      identifier: $eth_address
      Player: {
        data: {
          username: $username
        }
      }
    }) {
      affected_rows
      returning {
        identifier
        Player {
          id
        }
      }
  }
}
`;
interface IPlayer {
  id: string;
}

export async function createPlayer(ethAddress: string): Promise<IPlayer> {
  const resProfile = await hasuraQuery(createProfileMutation, {
    eth_address: ethAddress,
    username: ethAddress,
  });
  if (resProfile.insert_Account.affected_rows !== 2) {
    throw new Error('error while creating profile');
  }
  return resProfile.insert_Account.returning[0].Player;
}

export async function getPlayer(ethAddress: string): Promise<IPlayer> {
  const res = await hasuraQuery(getPlayerQuery, {
    eth_address: ethAddress,
  });

  let player = res.Account[0]?.Player;

  if (!player) {
    player = await createPlayer(ethAddress);
  }

  return player;
}
