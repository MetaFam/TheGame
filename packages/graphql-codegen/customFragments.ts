import gql from 'graphql-tag';

export const Player = gql`
fragment Player on Player {
  id
}
`;
