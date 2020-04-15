import { gql } from 'apollo-boost';

export const get_authState = gql`
query AuthState {
  authState @client
  authToken @client
  userId @client
}
`;
