import { hasuraQuery } from '../../lib/hasuraHelpers';

const getPlayerQuery = `
query GetPlayerFromETH ($ethereum_address: String) {
  Player(
    where: { 
      ethereum_address: { _eq: $ethereum_address }
    }
  ) {
    id
  }
}
`;

const createProfileMutation = `
mutation CreateAccountFromETH ($ethereum_address: String!, $username: String!) {
  insert_Player(
    objects: {
      username: $username,
      ethereum_address: $ethereum_address
    }) {
      affected_rows
      returning {
        id
        username
        ethereum_address
      }
  }
}
`;
interface IPlayer {
  id: string;
  username: string;
  ethereum_address: string;
}

export async function createPlayer(ethAddress: string): Promise<IPlayer> {
  const resProfile = await hasuraQuery(createProfileMutation, {
    ethereum_address: ethAddress,
    username: ethAddress,
  });
  if (resProfile.insert_Player.affected_rows !== 1) {
    throw new Error('Error while creating player');
  }
  return resProfile.insert_Player.returning[0];
}

export async function getPlayer(ethAddress: string): Promise<IPlayer> {
  const res = await hasuraQuery(getPlayerQuery, {
    ethereum_address: ethAddress,
  });

  let player = res.Player[0];

  if (!player) {
    player = await createPlayer(ethAddress);
  }

  return player;
}
