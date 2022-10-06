import { Request, Response } from 'express';

import {
  Guild_Set_Input,
  GuildLayoutInfoInput,
} from '../../../lib/autogen/hasura-sdk';
import { client } from '../../../lib/hasuraClient';

export const saveGuildLayoutHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { input, session_variables: sessionVariables } = req.body;
  const playerId = sessionVariables['x-hasura-user-id'];

  try {
    const { guildLayoutInfo } = input;
    await saveGuildLayout(playerId, guildLayoutInfo as GuildLayoutInfoInput);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      error: (error as Error).message,
    });
  }
};

const saveGuildLayout = async (
  playerId: string,
  guildLayoutInfo: GuildLayoutInfoInput,
) => {
  const { guild_metadata: metadata } =
    (await client.GetGuildMetadataById({
      id: guildLayoutInfo.uuid,
    })) ?? {};

  if (metadata == null || metadata.length === 0) {
    throw new Error('No guild with that ID exists.');
  }
  const [{ creatorId }] = metadata;

  if (creatorId !== playerId) {
    throw new Error(
      'Only the guild’s discord server owner can edit this guild.',
    );
  }

  const updatedData: Guild_Set_Input = {
    profileLayout: guildLayoutInfo.profileLayout,
  };

  await client.UpdateGuild({
    guildId: guildLayoutInfo.uuid,
    object: updatedData,
  });
};
