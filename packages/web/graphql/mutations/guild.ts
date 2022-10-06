export {};

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
/* GraphQL */ `
  mutation AuthenticateDiscordGuild($code: String!) {
    authenticateDiscordGuild(code: $code) {
      success
      guildname
      error
      exists
    }
  }

  mutation UpdateGuild($guildInfo: GuildInfoInput!) {
    saveGuildInformation(guildInformation: $guildInfo) {
      success
      error
    }
  }

  mutation UpdateGuildLayout($guildLayoutInfo: GuildLayoutInfoInput!) {
    saveGuildLayout(guildLayoutInfo: $guildLayoutInfo) {
      success
      error
    }
  }
`;
