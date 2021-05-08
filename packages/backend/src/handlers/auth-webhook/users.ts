import { client } from '../../lib/hasuraClient';

async function createPlayer(ethAddress: string) {
  const resProfile = await client.CreatePlayerFromETH({
    ethereum_address: ethAddress,
    username: ethAddress,
  });
  if (resProfile.insert_player?.affected_rows !== 1) {
    throw new Error('Error while creating player');
  }
  return resProfile.insert_player.returning[0];
}

export async function getOrCreatePlayer(ethereumAddress: string) {
  const ethAddress = ethereumAddress.toLowerCase();
  const res = await client.GetPlayerFromETH({
    ethereum_address: ethAddress,
  });

  let player = res.player[0];

  if (!player) {
    player = await createPlayer(ethAddress);
  }

  return player;
}
