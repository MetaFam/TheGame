import gql from 'fake-tag';

export const PlayerFragment = gql`
  fragment PlayerFragment on Player {
    id
    username
    totalXp
    rank
    ethereum_address
    Accounts(where: { type: { _in: [TWITTER, GITHUB] } }) {
      identifier
      type
    }
    box_profile {
      description
      emoji
      ethereumAddress
      imageUrl
      job
      location
      name
    }
    daohausMemberships {
      id
      moloch {
        id
        title
        version
      }
    }
  }
`;
