import gql from 'fake-tag';

export const GetMapQuery = gql`
  query GetMap {
    Map {
      id
      author_id
      name
      data
    }
  }
`;
