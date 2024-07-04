import { MetaTheme } from '@metafam/ds';
import { ComposeDBField, ComposeDBProfile } from '@metafam/utils';
import {
  DiscordRole,
  Maybe,
  Me,
  Member,
  Moloch,
  Player,
  PlayerRank_Enum,
  Profile,
  SkillCategory_Enum,
} from 'graphql/autogen/types';

export type Patron = Player & {
  pSeedBalance: number;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
};

export type PersonalityOption = {
  mask: number;
  name: string;
  description?: Maybe<string>;
};

export type Membership = Pick<Member, 'id'> & {
  moloch: Pick<Moloch, 'id' | 'title' | 'version' | 'chain' | 'avatarURL'>;
};

export type MeType =
  | (Pick<Me, 'id' | 'ethereumAddress' | 'username'> & {
      player?: Maybe<Player>;
    })
  | null
  | undefined;

export const SkillColors = {
  [SkillCategory_Enum.Community]: MetaTheme.colors.green['700'],
  [SkillCategory_Enum.Design]: MetaTheme.colors.pink['700'],
  [SkillCategory_Enum.Dev]: MetaTheme.colors.cyan['700'],
  [SkillCategory_Enum.Engineering]: MetaTheme.colors.blue['700'],
  [SkillCategory_Enum.Technologies]: MetaTheme.colors.gray['600'],
  [SkillCategory_Enum.Strategy]: MetaTheme.colors.yellow['700'],
} as const;

export type GuildPlayer = {
  ethereumAddress: string;
  role?: Maybe<PlayerRank_Enum>;
  totalXP?: number;
  rank?: Maybe<PlayerRank_Enum>;
  profile?: Maybe<Pick<Profile, 'profileImageURL' | 'name' | 'username'>>;
};

export type GuildMetadata = {
  discordRoles: DiscordRole[];
  discordMetadata: {
    membershipRoleIds: string[];
    administratorRoleIds: string[];
  };
};

export type ContractError = Error & { reason?: string };
export type PlayerProfile = Omit<Profile, 'playerId' | 'player' | 'id'>;

export type ComposeDBProfileQueryResult = {
  node: ComposeDBProfile;
};

export type ComposeDBSelfProfileQueryResult<T> = {
  viewer: {
    profile: {
      [key in ComposeDBField]: T;
    };
  };
};

export type ComposeDBMutationInput = {
  id?: string;
  content: ComposeDBProfile;
};

export type ComposeDBMutationValues = {
  input: ComposeDBMutationInput;
};

export type ComposeDBCreateProfileResponseData = {
  document: {
    id: string;
  };
};
