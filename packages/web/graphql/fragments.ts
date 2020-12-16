import gql from 'fake-tag';

export const PlayerFragment = gql`
  fragment PlayerFragment on Player {
    id
    username
    totalXp
    rank
    ethereum_address
    availability_hours
    EnneagramType {
      description
      name
    }
    playerType {
      description
      id
      imageUrl
      title
    }
    Player_Skills {
      Skill {
        category
        id
        name
      }
    }
    Accounts(where: { type: { _in: [TWITTER, GITHUB] } }) {
      identifier
      type
    }
    box_profile {
      description
      emoji
      ethereumAddress
      coverImageUrl
      imageUrl
      job
      location
      name
      collectiblesFavorites {
        tokenId
        address
      }
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
