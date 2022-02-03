import { hashCode } from 'utils/stringHelpers';

export enum BoxType {
  // Player Profile Boxes
  PLAYER_HERO = 'player-hero',
  PLAYER_SKILLS = 'player-skills',
  PLAYER_NFT_GALLERY = 'player-nft-gallery',
  PLAYER_DAO_MEMBERSHIPS = 'player-dao-memberships',
  PLAYER_ACHIEVEMENTS = 'player-achievements',
  PLAYER_TYPE = 'player-type',
  PLAYER_COLOR_DISPOSITION = 'player-color-disposition',
  PLAYER_ROLES = 'player-roles',
  PLAYER_COMPLETED_QUESTS = 'player-completed-quests',
  PLAYER_ADD_BOX = 'player-add-box',
  // Guild Profile Boxes
  GUILD_SKILLS = 'guild-skills',
  GUILD_GALLERY = 'guild-gallery',
  GUILD_ANNOUNCEMENTS = 'guild-announcements',
  GUILD_PLAYERS = 'guild-players',
  GUILD_QUESTS = 'quild-quests',
  GUILD_STATS = 'guild-stats',
  GUILD_LINKS = 'guild-links',
  // Common Profile Boxes
  EMBEDDED_URL = 'embedded-url',
}

export type BoxMetadata = {
  [record: string]: string;
};

export const getBoxKey = (
  boxType: BoxType,
  boxMetadata: { [record: string]: string },
): string => `${boxType}-${hashCode(JSON.stringify(boxMetadata))}`;

export const getBoxTypeFromKey = (boxKey: string): BoxType =>
  boxKey.split('-').slice(0, -1).join('-') as BoxType;
