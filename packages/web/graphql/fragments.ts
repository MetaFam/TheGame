export const PlayerProfileFragment = /* GraphQL */ `
  fragment PlayerProfileFragment on profile {
    availableHours
    backgroundImageURL
    bannerImageURL
    colorMask
    countryCode
    description
    emoji
    explorerTypeTitle
    location
    name
    profileImageURL
    pronouns
    timeZone
    username
    website
  }
`;

export const PlayerFragment = /* GraphQL */ `
  fragment PlayerFragment on player {
    id
    totalXP
    seasonXP
    rank
    ethereumAddress
    profileLayout
    ceramicProfileId

    profile {
      ...PlayerProfileFragment
    }

    skills {
      Skill {
        category
        id
        name
      }
    }

    roles(order_by: { rank: asc }) {
      role
      rank
      PlayerRole {
        label
      }
    }

    accounts(where: { type: { _in: [TWITTER, GITHUB, MEETWITHWALLET] } }) {
      identifier
      type
    }

    guilds {
      Guild {
        guildname
      }
    }

    # brightid_status {
    #   unique
    #   contextIds
    # }
  }
  ${PlayerProfileFragment}
`;

export const GuildFragment = /* GraphQL */ `
  fragment GuildFragment on guild {
    id
    guildname
    profileLayout
    description
    discordInviteUrl
    joinButtonUrl
    logo
    name
    type
    websiteUrl
    githubUrl
    twitterUrl
    showDiscordAnnouncements
    daos {
      contractAddress
      network
      label
      url
    }
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
    image

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
    image

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

export const PlayerDaoMembershipFragment = /* GraphQL */ `
  fragment PlayerDaoMembershipFragment on player {
    daohausMemberships {
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
  }
`;
