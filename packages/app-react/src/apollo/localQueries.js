import { gql } from 'apollo-boost';

export const GetAuthState = gql`
  query AuthState {
    authState @client
    authToken @client
    playerId @client
  }
`;
