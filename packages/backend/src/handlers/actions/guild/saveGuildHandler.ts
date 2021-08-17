import { GuildDiscordMetadata } from '@metafam/discord-bot';
import { Request, Response } from 'express';

import {
  Guild_Set_Input,
  GuildInfo,
  GuildType_Enum,
  SaveGuildResponse,
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

    res.json({
      success: true,
    });
  } catch (error) {
    const errorResponse: SaveGuildResponse = {
      success: false,
      error: error.message,
    };
    console.error(error);
    res.json(errorResponse);
  }
};

const saveGuild = async (playerId: string, guildInfo: GuildInfo) => {
  const existingGuildMetadataResponse = await client.GetGuildMetadataById({
    id: guildInfo.uuid,
  });
  if (
    existingGuildMetadataResponse?.guild_metadata == null ||
    existingGuildMetadataResponse.guild_metadata.length !== 1
  ) {
    throw new Error('No pending guild with that ID exists');
  }
  const existingGuildMetadata = existingGuildMetadataResponse.guild_metadata[0];

  if (existingGuildMetadata.creator_id !== playerId) {
    throw new Error(
      "Only the guild's discord server owner can edit this guild",
    );
  }

  const updateGuildData: Guild_Set_Input = {
    guildname: guildInfo.guildname,
    name: guildInfo.name,
    type: (guildInfo.type as unknown) as GuildType_Enum,
    description: guildInfo.description,
    discord_invite_url: guildInfo.discordInviteUrl,
    join_button_url: guildInfo.joinUrl,
    logo: guildInfo.logoUrl,
    website_url: guildInfo.websiteUrl,
    moloch_address: guildInfo.daoAddress,
  };

  await client.UpdateGuild({
    guildId: guildInfo.uuid,
    object: updateGuildData,
  });

  const updateGuildMetadata: GuildDiscordMetadata = {
    ...existingGuildMetadata.discord_metadata,
    membershipRoleIds: guildInfo.discordMembershipRoles,
    administratorRoleIds: guildInfo.discordAdminRoles,
    membership_through_discord: true,
  };

  await client.UpdateGuildDiscordMetadata({
    guildId: guildInfo.uuid,
    discordMetadata: updateGuildMetadata,
  });
};
