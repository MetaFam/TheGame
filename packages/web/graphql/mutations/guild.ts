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

  mutation UpdateGuild($guildInfo: GuildInfo!) {
    saveGuildInformation(guildInformation: $guildInfo) {
      success
      error
    }
  }
`;
