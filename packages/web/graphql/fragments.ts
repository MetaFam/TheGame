export const PlayerFragment = /* GraphQL */ `
  fragment PlayerFragment on player {
    id @skip(if: $forLoginDisplay)
    totalXP @skip(if: $forLoginDisplay)
    seasonXP @skip(if: $forLoginDisplay)
    rank @skip(if: $forLoginDisplay)
    ethereumAddress
    profileLayout @skip(if: $forLoginDisplay)

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
      profileImageURL
      bannerImageURL
      backgroundImageURL
      location
      countryCode
      website
      pronouns
      availableHours
      timeZone
      colorMask
      explorerTypeTitle
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
        avatarURL
      }
    }

    brightid_status @skip(if: $forLoginDisplay) {
      unique
      contextIds
    }
  }
`;

export const GuildFragment = /* GraphQL */ `
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

export const QuestFragment = /* GraphQL */ `
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
    quest_roles {
      PlayerRole {
        basic
        role
        label
        description
      }
    }
  }
`;

export const QuestWithCompletionFragment = /* GraphQL */ `
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
    quest_roles {
      PlayerRole {
        basic
        role
        label
        description
      }
    }
    quest_completions(order_by: [{ submittedAt: desc }]) {
      ...QuestCompletionFragment
      player {
        id
        ethereumAddress
        profile {
          username
        }
      }
    }
  }
`;

export const QuestCompletionFragment = /* GraphQL */ `
  fragment QuestCompletionFragment on quest_completion {
    id
    completedByPlayerId
    status
    submissionLink
    submissionText
    submittedAt
    questId
    completed {
      title
    }
  }
`;

export const TokenBalancesFragment = /* GraphQL */ `
  fragment TokenBalancesFragment on TokenBalances {
    address: id
    pSeedBalance
  }
`;

export const PlayerSkillFragment = /* GraphQL */ `
  fragment PlayerSkillFragment on skill {
    id
    name
    category
  }
`;
