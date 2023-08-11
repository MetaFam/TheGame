import { client } from './client';

const playerDeworkUsernameQuery = /* GraphQL */ `
  query GetPlayerDeworkUsername($playerId: uuid!) {
    player_account(where: { playerId: {_eq: $playerId}, type: {_eq: DEWORK}}) {
      identifier
    }
  }
`

export const getPlayerDeworkUsername = async (playerId: string): Promise<string> => {
  if (!playerId) return ''
  let info = await client.query<any>(playerDeworkUsernameQuery, { playerId })
  const username = info?.data?.player_account[0]?.identifier
  return username
}