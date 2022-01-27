import gql from 'fake-tag';
import { Client } from 'urql';

import {
  GetGuildsByTextSearchDocument,
  GetGuildsByTextSearchQuery,
  GetGuildsByTextSearchQueryVariables,
} from './autogen/types';
import { client as defaultClient } from './client';
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
gql`
  query getGuildsByTextSearch($text: String) {
    search_guilds(args: { search: $text }, limit: 3) {
      id
      guildname
      logo
    }
  }
`;

export const getGuildsByText = async (
  text: string,
  client: Client = defaultClient,
) => {
  const { data, error } = await client
    .query<GetGuildsByTextSearchQuery, GetGuildsByTextSearchQueryVariables>(
      GetGuildsByTextSearchDocument,
      {
        text,
      },
    )
    .toPromise();

  return {
    guilds: data?.search_guilds || [],
    error,
  };
};
