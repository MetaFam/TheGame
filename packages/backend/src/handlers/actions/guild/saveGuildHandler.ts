import { GuildDiscordMetadata } from '@metafam/discord-bot';
import { Request, Response } from 'express';

import {
  Guild_Set_Input,
  GuildDaoInput,
  GuildInfoInput,
  GuildType_Enum,
} from '../../../lib/autogen/hasura-sdk';
import { client } from '../../../lib/hasuraClient';

type GuildDao = GuildDaoInput & { guildId: string };
type ExistingGuildDao = GuildDaoInput & { id: string };

export const saveGuildHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { input, session_variables: sessionVariables } = req.body;
  const playerId = sessionVariables['x-hasura-user-id'];

  try {
    const { guildInformation } = input;
    await saveGuild(playerId, guildInformation as GuildInfoInput);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      error: (error as Error).message,
    });
  }
};

const saveGuild = async (playerId: string, guildInfo: GuildInfoInput) => {
  const { guild_metadata: metadata } =
    (await client.GetGuildMetadataById({
      id: guildInfo.uuid,
    })) ?? {};
  if (metadata == null || metadata.length === 0) {
    throw new Error('No pending guild with that ID exists.');
  }
  const [{ creatorId, discordMetadata }] = metadata;

  if (creatorId !== playerId) {
    throw new Error(
      'Only the guild’s discord server owner can edit this guild.',
    );
  }

  // we have to sync existing DAOs with the DAOs passed in here.
  // If this guild already exists, fetch its current DAOs.
  const currentGuildDaos: { [contractAddress: string]: ExistingGuildDao } = {};
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
    discordInviteUrl: guildInfo.discordInviteUrl,
    joinButtonUrl: guildInfo.joinUrl,
    logo: guildInfo.logoUrl,
    websiteUrl: guildInfo.websiteUrl,
    twitterUrl: guildInfo.twitterUrl,
    githubUrl: guildInfo.githubUrl,
  };

  await client.UpdateGuild({
    guildId: guildInfo.uuid,
    object: updatedData,
  });

  let submittedDaos: GuildDao[] = [];
  if (guildInfo.daos) {
    submittedDaos = guildInfo.daos.map((guildDaoInput) => ({
      ...guildDaoInput,
      guildId: guildInfo.uuid,
    }));
  }

  // If there are current DAOs not in the list of incoming DAOs, we want to detach those current DAOs with this guild.
  // We can't just delete them because there may be existing players associated with these detached DAOs
  const addressesToDetach = Object.keys(currentGuildDaos).reduce(
    (accumulation: string[], contractAddress) => {
      const daoMatch = submittedDaos.find(
        (newDao) => newDao.contractAddress === contractAddress,
      );
      if (daoMatch == null) {
        accumulation.push(contractAddress);
      }
      return accumulation;
    },
    [],
  );
  if (addressesToDetach.length > 0) {
    await client.DetachDaosFromGuild({ contractAddresses: addressesToDetach });
  }

  // If there are incoming DAOs not in the list of current DAOs, add and associate them with this guild
  const newDaos: GuildDao[] = [];
  const updatedDaos: ExistingGuildDao[] = [];

  submittedDaos.forEach((dao) => {
    const exists = Object.keys(currentGuildDaos).includes(dao.contractAddress);
    if (exists) {
      updatedDaos.push({
        ...dao,
        id: currentGuildDaos[dao.contractAddress].id,
      });
    } else {
      newDaos.push(dao);
    }
  });

  await client.InsertDaos({ objects: newDaos });

  // For any incoming DAOs already associated with this guild, update their information
  await Promise.all(
    updatedDaos.map((dao) => client.UpdateDao({ daoId: dao.id, object: dao })),
  );

  // TODO Invalidate any DAO member caches as well?

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
