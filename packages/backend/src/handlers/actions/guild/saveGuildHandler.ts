import { GuildDiscordMetadata } from '@metafam/discord-bot';
import { Request, Response } from 'express';

import {
  Dao_Set_Input,
  Guild_Set_Input,
  GuildDao,
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

  // we have to sync existing DAOs with the DAOs passed in here.
  // If this guild already exists, fetch its current DAOs.
  const currentGuildDaos: { [contractAddress: string]: GuildDao } = {};
  const { guild: currentGuild } = await client.GetGuild({ id: guildInfo.uuid });
  if (currentGuild?.length > 0) {
    currentGuild[0].daos.forEach((dao) => {
      currentGuildDaos[dao.contractAddress] = dao;
    });
  }

  const updatedData: Guild_Set_Input = {
    guildname: guildInfo.guildname,
    name: guildInfo.name,
    type: (guildInfo.type as unknown) as GuildType_Enum,
    description: guildInfo.description,
    discord_invite_url: guildInfo.discordInviteURL,
    join_button_url: guildInfo.joinURL,
    logo: guildInfo.logoURL,
    website_url: guildInfo.websiteURL,
    twitter_url: guildInfo.twitterURL,
    github_url: guildInfo.githubURL,
  };

  await client.UpdateGuild({
    guildId: guildInfo.uuid,
    object: updatedData,
  });

  // If there are current DAOs not in the list of incoming DAOs, we want to detach those current DAOs with this guild.
  // We can't just delete them because there may be existing players associated with these detached DAOs
  const updatedDaos = guildInfo.daos || [];
  Object.keys(currentGuildDaos).forEach(async (contractAddress) => {
    const daoMatch = updatedDaos.find(
      (newDao) => newDao?.contractAddress === contractAddress,
    );
    if (daoMatch == null) {
      const updatePayload = {
        ...currentGuildDaos[contractAddress],
        guild: null,
      };
      await client.UpdateDao({
        daoId: currentGuildDaos[contractAddress],
        object: updatePayload,
      });
    }
  });

  // 2. If there are incoming DAOs _not_ in the list of current DAOs, add and associate them with this guild

  // 3. If the incoming DAO is already associated with this guild, update its information
  // 4. Invalidate any DAO member caches as well?

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
