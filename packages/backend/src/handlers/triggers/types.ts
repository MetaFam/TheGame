import { Guild, Maybe, Player, Scalars } from '../../lib/autogen/hasura-sdk.js';

export interface TriggerPayload<T> {
  event: {
    session_variables: { [x: string]: string };
    op: 'INSERT' | 'UPDATE' | 'DELETE' | 'MANUAL';
    data: {
      old: T | null;
      new: T | null;
    };
  };
  created_at: string;
  id: string;
  delivery_info: {
    max_retries: number;
    current_retry: number;
  };
  trigger: {
    name: string;
  };
  table: {
    schema: string;
    name: string;
  };
}

// Hasura passes the raw column names in the event data rather than using any
// customized column names for GraphQL. So we must translate them explicitly.
// This is defined explicitly (rather than through some generic type conversion process)
// so that we have compile-time checks if and when these columns / types change.
export type GuildRow = Omit<
  Guild,
  | 'joinButtonUrl'
  | 'websiteUrl'
  | 'discordId'
  | 'discordInviteUrl'
  | 'twitterUrl'
  | 'githubUrl'
  | 'membershipThroughDiscord'
> & {
  join_button_url: string;
  website_url: string;
  discord_id: string;
  discord_invite_url: string;
  twitter_url: string;
  github_url: string;
  membership_through_discord: boolean;
};

export function toGuild(guildRow: GuildRow): Guild {
  return {
    ...guildRow,
    joinButtonUrl: guildRow.join_button_url,
    websiteUrl: guildRow.website_url,
    discordId: guildRow.discord_id,
    discordInviteUrl: guildRow.discord_invite_url,
    twitterUrl: guildRow.twitter_url,
    githubUrl: guildRow.github_url,
    membershipThroughDiscord: guildRow.membership_through_discord,
  };
}

export type PlayerRow = Omit<
  Player,
  | 'ethereumAddress'
  | 'totalXp'
  | 'createdAt'
  | 'updatedAt'
  | 'discordId'
  | 'seasonXP'
  | 'profileLayout'
> & {
  ethereum_address: string;
  total_xp: number;
  created_at: Maybe<Scalars['timestamptz']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  discord_id: string;
  season_xp: string;
  profile_layout: string;
};

export function toPlayer(row: PlayerRow): Player {
  return {
    ...row,
    ethereumAddress: row.ethereum_address,
    totalXP: row.total_xp,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    discordId: row.discord_id,
    seasonXP: row.season_xp,
    profileLayout: row.profile_layout,
  };
}
