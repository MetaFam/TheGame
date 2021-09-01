import {
  exchangeCodeForAccessToken,
  GuildDiscordMetadata,
  OAuth2CodeExchangeResponse,
  PartialGuild,
} from '@metafam/discord-bot';
import { DiscordUtil } from '@metafam/utils';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import {
  DiscordGuildAuthResponse,
  Guild_Insert_Input,
  Guild_Metadata_Insert_Input,
  GuildPosition_Enum,
  GuildStatus_Enum,
  GuildType_Enum,
} from '../../../../lib/autogen/hasura-sdk';
import { client } from '../../../../lib/hasuraClient';

export const handleOAuthCallback = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { input, session_variables: sessionVariables } = req.body;

  try {
    // when confirmed, `code` parameter is sent.
    const response = await exchangeCodeForAccessToken(input.code as string);
    if (response.statusCode !== 200 || response.oauthResponse == null) {
      console.error(`${response.statusCode}: ${response.error}`);
      throw new Error();
    }

    const { guild: discordGuild } = response.oauthResponse;
    if (discordGuild == null) {
      console.error('Guild not available on oauth response. Exiting...');
      throw new Error();
    }

    // look up guild by guild Id
    const getGuildMetadataResponse = await client.GetGuildMetadataByDiscordId({
      discordId: discordGuild.id,
    });

    if (getGuildMetadataResponse.guild_metadata.length > 0) {
      const existingGuild = getGuildMetadataResponse.guild_metadata[0];

      // if a guild with the same server ID already exists, see if a discord refresh token is set.
      if (existingGuild.discord_metadata?.refreshToken != null) {
        // if so, it's already set up
        // might want to save the new refresh token if it's different...?

        const getGuildResponse = await client.GetGuild({
          id: existingGuild.guild_id,
        });

        const successResponse: DiscordGuildAuthResponse = {
          success: true,
          guildname: getGuildResponse.guild[0].guildname,
          exists: true,
        };
        res.json(successResponse);
      } else {
        // otherwise, update the existing guild with the provided info from discord
        await client.UpdateGuildDiscordMetadata({
          guildId: existingGuild.guild_id,
          discordMetadata: parseDiscordMetadata(response.oauthResponse),
        });

        const successResponse: DiscordGuildAuthResponse = {
          success: true,
          guildname: existingGuild.guild_id,
        };
        res.json(successResponse);
      }
    } else {
      // Guild doesn't already exist: persist guild info fetched in this request
      const discordMetadata = parseDiscordMetadata(response.oauthResponse);

      const playerId = sessionVariables['x-hasura-user-id'];

      let createGuildResponse: DiscordGuildAuthResponse = { success: false };
      try {
        createGuildResponse = await createNewGuild(
          discordGuild,
          discordMetadata,
          playerId,
        );
      } catch (creationError) {
        // if there was a guildname clash, try again with a uuid
        if ((creationError as Error).message.includes('Uniqueness violation')) {
          discordGuild.name = uuidv4();
          createGuildResponse = await createNewGuild(
            discordGuild,
            discordMetadata,
            playerId,
          );
          res.json(createGuildResponse);
        } else {
          throw creationError;
        }
      }
      res.json(createGuildResponse);
    }
  } catch (error) {
    console.error(error);
    const errorResponse: DiscordGuildAuthResponse = {
      success: false,
      error:
        (error as Error).message ||
        (error as string) ||
        'An unexpected error occurred',
    };
    res.json(errorResponse);
  }
};

const parseDiscordMetadata = (
  oauthResponse: OAuth2CodeExchangeResponse,
): GuildDiscordMetadata => {
  const discordMetadata: GuildDiscordMetadata = {
    refreshToken: oauthResponse.refresh_token,
  };
  if (oauthResponse.guild?.icon != null) {
    discordMetadata.logoHash = oauthResponse.guild?.icon; // see https://discord.com/developers/docs/reference#image-formatting
  }
  return discordMetadata;
};

const createNewGuild = async (
  discordGuild: PartialGuild,
  discordMetadata: GuildDiscordMetadata,
  creatorId: string,
): Promise<DiscordGuildAuthResponse> => {
  let newGuildPayload: Guild_Insert_Input = {
    type: GuildType_Enum.Project,
    name: discordGuild.name,
    guildname: discordGuild.name.toLowerCase().replace(/[^a-z0-9]/g, ''),
    discord_id: discordGuild.id,
    status: GuildStatus_Enum.Pending,
    position: GuildPosition_Enum.External,
    membership_through_discord: true,
  };

  if (discordMetadata.logoHash != null) {
    newGuildPayload = {
      ...newGuildPayload,
      logo: DiscordUtil.guildIconUrl(discordGuild.id, discordMetadata.logoHash),
    };
  }

  const createGuildResponse = await client.CreateGuild({
    object: newGuildPayload,
  });
  if (createGuildResponse.insert_guild_one != null) {
    const newGuild = createGuildResponse.insert_guild_one;

    const newGuildMetadataPayload: Guild_Metadata_Insert_Input = {
      creator_id: creatorId,
      discord_id: discordGuild.id,
      guild_id: newGuild.id,
      discord_metadata: discordMetadata,
    };
    const createGuildMetadataResponse = await client.CreateGuildMetadata({
      object: newGuildMetadataPayload,
    });
    if (createGuildMetadataResponse.insert_guild_metadata_one != null) {
      const successResponse: DiscordGuildAuthResponse = {
        success: true,
        guildname: newGuild.guildname,
      };
      return successResponse;
    }
  }
  throw new Error(`Failed to create guild "${newGuildPayload.guildname}"`);
};
