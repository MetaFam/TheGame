import gql from 'fake-tag';

import { GetGuildQuery, GetGuildQueryVariables } from './autogen/types';
import { client } from './client';
import { GuildFragment } from './fragments';

const guildQuery = gql`
  query GetGuild($guildname: String!) {
    guild(where: { guildname: { _eq: $guildname } }) {
      ...GuildFragment
    }
  }
  ${GuildFragment}
`;

export const getGuild = async (guildname: string | undefined) => {
  if (!guildname) return null;
  const { data } = await client
    .query<GetGuildQuery, GetGuildQueryVariables>(guildQuery, { guildname })
    .toPromise();

  return data?.guild[0];
};
