export type PlayerMembershipGuildType = 'guild' | 'dao';

export interface PlayerMembershipMetadata {
  guildType: PlayerMembershipGuildType;
  guildId: string;
  position: number;
}
