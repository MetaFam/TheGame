import { Maybe, Values } from '@metafam/utils';
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
  PLAYER_ADD_BOX: 'player-add-box',
  // Guild Profile Boxes
  GUILD_SKILLS: 'guild-skills',
  GUILD_GALLERY: 'guild-gallery',
  GUILD_ANNOUNCEMENTS: 'guild-announcements',
  GUILD_PLAYERS: 'guild-players',
  GUILD_QUESTS: 'quild-quests',
  GUILD_STATS: 'guild-stats',
  GUILD_LINKS: 'guild-links',
  // Common Profile Boxes
  EMBEDDED_URL: 'embedded-url',
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
