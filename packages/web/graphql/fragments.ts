import gql from 'fake-tag';

export const PlayerFragment = gql`
  fragment PlayerFragment on Player {
    id
    username
    totalXp
    rank
    ethereum_address
    box_profile {
      description
      emoji
      ethereumAddress
      imageUrl
      job
      location
      name
    }
  }
`;
