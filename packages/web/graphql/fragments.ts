import gql from 'fake-tag';

export const PlayerFragment = gql`
  fragment PlayerFragment on player {
    id @skip(if: $forLoginDisplay)
    username
    totalXP @skip(if: $forLoginDisplay)
    seasonXP @skip(if: $forLoginDisplay)
    rank @skip(if: $forLoginDisplay)
    ethereumAddress
    pronouns @skip(if: $forLoginDisplay)

    profile_layout @skip(if: $forLoginDisplay)
    availableHours @skip(if: $forLoginDisplay)
    timeZone @skip(if: $forLoginDisplay)
    colorMask @skip(if: $forLoginDisplay)

    type @skip(if: $forLoginDisplay) {
      description
      id
      imageURL
      title
    }

    skills @skip(if: $forLoginDisplay) {
      Skill {
        category
        id
        name
      }
    }

    roles(order_by: { rank: asc }) @skip(if: $forLoginDisplay) {
      role
      rank
      PlayerRole {
        label
      }
    }

    accounts(where: { type: { _in: [TWITTER, GITHUB] } })
      @skip(if: $forLoginDisplay) {
      identifier
      type
    }

    profile {
      name
      username
      description
      emoji
      imageURL
      bannerImageURL
      backgroundImageURL
      location
      countryCode
    }

    daohausMemberships @skip(if: $forLoginDisplay) {
      id
      shares
      molochAddress
      moloch {
        id
        title
        version
        totalShares
        chain
      }
    }

    brightid_status @skip(if: $forLoginDisplay) {
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
    discord_invite_url
    join_button_url
    logo
    moloch_address
    name
    type
    position
    website_url
    github_url
    twitter_url
  }
`;

export const QuestFragment = gql`
  fragment QuestFragment on quest {
    id
    createdAt
    cooldown
    description
    externalLink
    guildId
    status
    title
    repetition

    guild {
      name
      logo
    }
    player {
      id
      ethereumAddress
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
    createdAt
    cooldown
    description
    externalLink
    guildId
    status
    title
    repetition

    guild {
      name
      logo
    }
    quest_skills {
      skill {
        id
        name
        category
      }
    }
    quest_completions(order_by: [{ submittedAt: desc }]) {
      ...QuestCompletionFragment
      player {
        id
        ethereumAddress
        username
      }
    }
  }
`;

export const QuestCompletionFragment = gql`
  fragment QuestCompletionFragment on quest_completion {
    id
    completedByPlayerId
    status
    submissionLink
    submissionText
    submittedAt
  }
`;

export const TokenBalancesFragment = gql`
  fragment TokenBalancesFragment on TokenBalances {
    address: id
    pSeedBalance
  }
`;

export const PlayerSkillFragment = gql`
  fragment PlayerSkillFragment on skill {
    id
    name
    category
  }
`;
