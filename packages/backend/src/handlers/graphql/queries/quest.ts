export const QuestQueries = /* GraphQL */ `
  query GetQuestById($questId: uuid!) {
    quest_by_pk(id: $questId) {
      id
      cooldown
      status
      repetition
      createdByPlayerId
      title
    }
  }

  query GetQuestCompletions($questId: uuid!, $playerId: uuid!) {
    quest_completion(
      where: {
        questId: { _eq: $questId }
        completedByPlayerId: { _eq: $playerId }
      }
    ) {
      id
      questId
      completedByPlayerId
    }
  }

  query GetQuestCompletionById($quest_completion_id: uuid!) {
    quest_completion_by_pk(id: $quest_completion_id) {
      id
      questId
      completedByPlayerId
      status
    }
  }

  query GetLastQuestCompletionForPlayer($questId: uuid!, $playerId: uuid!) {
    quest_completion(
      limit: 1
      order_by: { submittedAt: desc }
      where: {
        questId: { _eq: $questId }
        completedByPlayerId: { _eq: $playerId }
      }
    ) {
      id
      questId
      completedByPlayerId
      submittedAt
    }
  }
`;
