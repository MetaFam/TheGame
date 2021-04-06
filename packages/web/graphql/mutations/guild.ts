import gql from 'fake-tag';

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
gql`
  mutation AuthenticateDiscordGuild($code: String!) {
    authenticateDiscordGuild(code: $code) {
      success
      guildname
      error
      exists
    }
  }
`;
