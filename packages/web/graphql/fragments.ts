import gql from 'fake-tag';

export const PlayerFragment = gql`
  fragment PlayerFragment on player {
    id
    username
    total_xp
    rank
    ethereum_address
    availability_hours
    timezone
    ColorAspect {
      mask
      aspect
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
      shares
      moloch {
        id
        title
        version
        totalShares
      }
    }
  }
`;

export const GuildFragment = gql`
  fragment GuildFragment on guild {
    id
    guildname
    description
    discord_invite_url
    join_button_url
    logo
    moloch_address
    name
    type
    website_url
  }
`;
