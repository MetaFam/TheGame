import { client } from '../../lib/hasuraClient';

async function createPlayer(ethAddress: string) {
  const { insert_player: insert } = await client.CreatePlayerFromETH({
    ethereumAddress: ethAddress,
  });
  if (insert?.affected_rows !== 1) {
    throw new Error('Error while creating player');
  }
  return insert.returning[0];
}

export async function getOrCreatePlayer(ethereumAddress: string) {
  const ethAddress = ethereumAddress.toLowerCase();
  const res = await client.GetPlayerFromETH({
    ethereumAddress: ethAddress,
  });

  let player = res.player[0];

  if (!player) {
    player = await createPlayer(ethAddress);
  }

  return player;
}
