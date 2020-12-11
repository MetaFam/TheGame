import gql from 'fake-tag';

export const GetMapByAuthorQuery = gql`
  query GetMapByAuthor($author: String!) {
    Map(where: { author_address: { _eq: $author } }) {
      id
      author_address
      name
    }
  }
`;

export const GetMapQuery = gql`
  query GetMap($id: uuid!) {
    Map_by_pk(id: $id) {
      id
      author_address
      name
      data
    }
  }
`;