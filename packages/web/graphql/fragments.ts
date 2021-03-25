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
      name
      description
      mask
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

export const QuestFragment = gql`
  fragment QuestFragment on quest {
    id
    created_at
    cooldown
    description
    external_link
    guild_id
    status
    title
    repetition
    
    player {
      id
      ethereum_address
    }
    quest_skills {
      skill {
        id
        name
        category
      }
    }
  }
`;

export const QuestWithCompletionFragment = gql`
  fragment QuestWithCompletionFragment on quest {
    id
    created_at
    cooldown
    description
    external_link
    guild_id
    status
    title
    repetition

    player {
      id
      ethereum_address
    }
    quest_skills {
      skill {
        name
        category
      }
    }
    quest_completions {
      ...QuestCompletionFragment
      player {
        id
        ethereum_address
      }
    }
  }
`;

export const QuestCompletionFragment = gql`
  fragment QuestCompletionFragment on quest_completion {
    id
    completed_by_player_id
    status
    submission_link
    submission_text
    submitted_at
  }
`;

export const TokenBalancesFragment = gql`
  fragment TokenBalancesFragment on TokenBalances {
    address: id
    pSeedBalance
  }
`;
