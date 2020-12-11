import gql from 'fake-tag';

export const UpdateMapName = gql`
  mutation updateMapName($id: uuid!, $name: String!) {
    update_Map_by_pk(
      pk_columns: { id: $id },
      _set: { name: $name }
    ) {
      id
    }
  }
`;

export const UpdateMapData = gql`
  mutation updateMapName($id: uuid!, $data: String!) {
    update_Map_by_pk(
      pk_columns: { id: $id },
      _set: { data: $data }
    ) {
      id
    }
  }
`;