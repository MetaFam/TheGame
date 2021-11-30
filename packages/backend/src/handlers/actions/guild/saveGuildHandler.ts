import { GuildDiscordMetadata } from '@metafam/discord-bot';
import { Request, Response } from 'express';

import {
  Guild_Set_Input,
  GuildInfo,
  GuildType_Enum,
} from '../../../lib/autogen/hasura-sdk';
import { client } from '../../../lib/hasuraClient';

export const saveGuildHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { input, session_variables: sessionVariables } = req.body;
  const playerId = sessionVariables['x-hasura-user-id'];

  try {
    const { guildInformation } = input;
    await saveGuild(playerId, guildInformation as GuildInfo);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      error: (error as Error).message,
    });
  }
};

const saveGuild = async (playerId: string, guildInfo: GuildInfo) => {
  const { guild_metadata: metadata } =
    (await client.GetGuildMetadataById({
      id: guildInfo.uuid,
    })) ?? {};
  if (metadata == null || metadata.length === 0) {
    throw new Error('No pending guild with that ID exists.');
  }
  const [
    { creator_id: creatorId, discord_metadata: discordMetadata },
  ] = metadata;

  if (creatorId !== playerId) {
    throw new Error(
      'Only the guild’s discord server owner can edit this guild.',
    );
  }

  const updatedData: Guild_Set_Input = {
    guildname: guildInfo.guildname,
    name: guildInfo.name,
    type: (guildInfo.type as unknown) as GuildType_Enum,
    description: guildInfo.description,
    discord_invite_url: guildInfo.discordInviteUrl,
    join_button_url: guildInfo.joinUrl,
    logo: guildInfo.logoUrl,
    website_url: guildInfo.websiteUrl,
    twitter_url: guildInfo.twitterUrl,
    github_url: guildInfo.githubUrl,
    moloch_address: guildInfo.daoAddress,
  };

  await client.UpdateGuild({
    guildId: guildInfo.uuid,
    object: updatedData,
  });

  const updatedMetadata: GuildDiscordMetadata = {
    ...discordMetadata,
    membershipRoleIds: guildInfo.discordMembershipRoles,
    administratorRoleIds: guildInfo.discordAdminRoles,
  };

  await client.UpdateGuildDiscordMetadata({
    guildId: guildInfo.uuid,
    discordMetadata: updatedMetadata,
  });
};
