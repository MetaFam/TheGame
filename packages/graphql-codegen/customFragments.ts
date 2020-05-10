import gql from 'graphql-tag';

// Works

export const Player = gql`
  fragment Player on Player {
    id
    rank
    totalXp
    Accounts {
      identifier
      type
    }
  }
`;

export const Quest = gql`
  fragment Quest on Quest {
    name
  }
`;

export const Guild = gql`
  fragment Guild on Guild {
    name
  }
`;

// Doesn't work

/*

export const Account = gql`
  fragment Account on Account {
    identifier
  }
`;

export const Guild_Member = gql`
  fragment Guild_Member on Guild_Member {
    guild_id
    player_id
  }
`;

*/
