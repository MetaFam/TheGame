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
      shares
      moloch {
        id
        title
        version
        totalShares
      }
    }
    brightid_status {
      unique
      contextIds
    }
  }
`;

export const GuildFragment = gql`
  fragment GuildFragment on guild {
    id
    guildname
    description
    discord_metadata
    join_button_url
    logo
    moloch_address
    name
    type
    website_url
  }
`;

export const TokenBalancesFragment = gql`
  fragment TokenBalancesFragment on TokenBalances {
    address: id
    pSeedBalance
  }
`;
