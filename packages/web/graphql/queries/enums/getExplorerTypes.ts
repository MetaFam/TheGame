import { ExplorerType, GetExplorerTypesQuery } from 'graphql/autogen/types';
import { client } from 'graphql/client';

export const GetExplorerTypes = /* GraphQL */ `
  query GetExplorerTypes {
    ExplorerType {
      id
      title
      description
      imageURL
    }
  }
`;

export const getExplorerTypes = async () => {
  const { data, error } = await client
    .query<GetExplorerTypesQuery>(GetExplorerTypes, {})
    .toPromise();

  if (!data) {
    if (error) {
      throw error;
    }
    return [];
  }
  return data.ExplorerType as Array<ExplorerType>;
};
