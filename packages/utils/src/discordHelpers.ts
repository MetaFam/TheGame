
export const enum SupportedImageFormat {
  PNG = 'png',
  JPEG = 'jpg',
  GIF = 'gif',
}

// see https://discord.com/developers/docs/reference#image-formatting
export const guildIconUrl = (guildId: string, iconHash: string, type: SupportedImageFormat = SupportedImageFormat.PNG): string => {
  return `https://cdn.discordapp.com/icons/${guildId}/${iconHash}.${type}`;
};
