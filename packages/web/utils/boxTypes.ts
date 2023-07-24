import { Maybe, Values } from '@metafam/utils';
import { GuildFragment, Player } from 'graphql/autogen/types';
import { JSXElementConstructor, ReactElement, RefAttributes } from 'react';
import { Layouts } from 'react-grid-layout';
import { hashCode } from 'utils/stringHelpers';

export const BoxTypes = {
  // Player Profile Boxes
  PLAYER_HERO: 'player-hero',
  PLAYER_SKILLS: 'player-skills',
  PLAYER_NFT_GALLERY: 'nft-gallery',
  PLAYER_DAO_MEMBERSHIPS: 'dao-memberships',
  PLAYER_ACHIEVEMENTS: 'player-achievements', // WIP
  PLAYER_TYPE: 'player-type',
  PLAYER_COLOR_DISPOSITION: 'color-disposition',
  PLAYER_ROLES: 'player-roles',
  PLAYER_COMPLETED_QUESTS: 'completed-quests',
  PLAYER_METOKENS: 'meToken',
  DEWORK: 'dework',
  // Guild Profile Boxes
  GUILD_HERO: 'guild-hero',
  GUILD_SKILLS: 'guild-skills',
  GUILD_GALLERY: 'guild-gallery',
  GUILD_ANNOUNCEMENTS: 'guild-announcements',
  GUILD_PLAYERS: 'guild-players',
  GUILD_QUESTS: 'quild-quests',
  GUILD_STATS: 'guild-stats',
  GUILD_LINKS: 'guild-links',
  // Dashboard Boxes
  DASHBOARD_LASTEST_CONTENT: 'dashboard-latest-content',
  DASHBOARD_XP_INFO: 'dashboard-xp-info',
  DASHBOARD_SEEDS_INFO: 'dashboard-seeds-info',
  DASHBOARD_CALENDER: 'dashboard-calendar',
  DASHBOARD_LEADERBOARD: 'dashboard-leaderboard',
  DASHBOARD_COMPLETED_QUESTS: 'dashboard-completed-quests',
  DASHBOARD_CREATED_QUESTS: 'dashboard-created-quests',
  // Common Boxes
  ADD_NEW_BOX: 'add-new-box',
  EMBEDDED_URL: 'embedded-url',
  CUSTOM_TEXT: 'custom-text',
} as const;

export type BoxType = Values<typeof BoxTypes>;

export type BoxMetadata = {
  [record: string]: string;
};

export const createBoxKey = (
  type: BoxType,
  metadata: Record<string, string> = {},
) => `${type}-${hashCode(JSON.stringify(metadata))}`;

export const getBoxKey = (target: Maybe<HTMLElement>) =>
  (target?.offsetParent as HTMLElement)?.offsetParent?.id;

export const getBoxType = (boxKey: string): BoxType =>
  boxKey.split('-').slice(0, -1).join('-') as BoxType;

export type ChakraSize = 'sm' | 'md' | 'lg';

export type Coordinates = {
  x: number;
  y: number;
};

export type Positions = Partial<Record<BoxType, Coordinates>>;

export type LayoutItem = {
  key: string;
  type: BoxType;
  metadata?: BoxMetadata;
};

export type LayoutData = {
  layoutItems: Array<LayoutItem>;
  layouts: Layouts;
};

export type LayoutMetadata = {
  [key: string]: {
    type: BoxType;
    metadata: BoxMetadata;
  };
};

export const gridSX = {
  '.react-grid-placeholder': {
    bg: 'purple',
    boxShadow: '0 0 0 solid rgba(0, 0, 0, 0.8)',
    borderRadius: 'lg',
  },
};

export type DisplayComponent = {
  editing?: boolean;
  onRemoveBox?: (boxKey: string) => void;
  metadata?: BoxMetadata;
  type: BoxType;
  player?: Player;
  guild?: GuildFragment;
  ens?: string;
} & RefAttributes<HTMLDivElement>;

export type DisplayOutput = (
  props: DisplayComponent,
) => ReactElement<DisplayComponent, JSXElementConstructor<HTMLDivElement>>;
export type DisplayOutputOut = ReturnType<DisplayOutput>;
