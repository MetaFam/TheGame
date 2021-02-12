import { gql } from 'graphql-request/dist';

export const GetPlayer = gql`
  query GetPlayer($playerId: uuid!) {
    player_by_pk(id: $playerId) {
      id
      ethereum_address
    }
  }
`;

export const GetPlayerFromEth = gql`
  query GetPlayerFromETH($ethereum_address: String) {
    player(where: { ethereum_address: { _eq: $ethereum_address } }) {
      id
    }
  }
`;

export const GetQuestById = gql`
  query GetQuestById($quest_id: uuid!) {
    quest_by_pk(id: $quest_id) {
      id
      cooldown
      status
      repetition
    }
  }

`;

export const GetQuestCompletionById = gql`
  query GetQuestCompletionById($quest_id: uuid!, $player_id: uuid!) {
    quest_completion_by_pk(quest_id: $quest_id, completed_by_player_id: $player_id) {
      quest_id
      completed_by_player_id
    }
  }
`;

export const GetLastQuestCompletionForPlayer = gql`
   query GetLastQuestCompletionForPlayer($quest_id: uuid!, $player_id: uuid!) {
     quest_completion(
      limit: 1, 
      order_by: {submitted_at: desc}, 
      where: {
        quest_id: {_eq: $quest_id}, 
        completed_by_player_id: {_eq: $player_id}
      }
    ) {
      quest_id
      completed_by_player_id
      submitted_at
    }
  }
`;
