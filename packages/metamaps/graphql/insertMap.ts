import gql from 'fake-tag';

export const CreateMap = gql`
  mutation createMap($author: String!, $name: String!) {
    insert_Map_one(
      object: {
        author_address: $author,
        name: $name,
        data: ""
      }
    ) {
      id
    }
  }
`;