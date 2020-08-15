import { client } from '../../lib/hasuraClient';

async function createPlayer(ethAddress: string) {
  const resProfile = await client.CreatePlayerFromETH({
    ethereum_address: ethAddress,
    username: ethAddress,
  });
  if (resProfile.insert_Player?.affected_rows !== 1) {
    throw new Error('Error while creating player');
  }
  return resProfile.insert_Player.returning[0];
}

export async function getOrCreatePlayer(ethAddress: string) {
  const res = await client.GetPlayerFromETH({
    ethereum_address: ethAddress,
  });

  let player = res.Player[0];

  if (!player) {
    player = await createPlayer(ethAddress);
  }

  return player;
}
