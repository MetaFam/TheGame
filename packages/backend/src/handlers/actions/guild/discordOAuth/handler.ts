/* eslint-disable no-console */
import { exchangeCodeForAccessToken, GuildDiscordMetadata, OAuth2CodeExchangeResponse, PartialGuild } from '@metafam/discord-bot';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { DiscordGuildAuthResponse, GuildStatus_Enum, GuildType_Enum } from '../../../../lib/autogen/hasura-sdk';
import { client } from '../../../../lib/hasuraClient';

export const handleOAuthCallback = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { input } = req.body;

  try {
    // when confirmed, `code` parameter is sent.
    const response = await exchangeCodeForAccessToken(input.code as string);
    if (response.statusCode !== 200 || response.oauthResponse == null) {
      console.error(`${response.statusCode}: ${response.error}`);
      throw new Error();
    }

    const { guild: discordGuild } = response.oauthResponse;
    if (discordGuild == null) {
      console.error('Guild not available on oauth response. Exiting..');
      throw new Error();
    }

    // look up guild by guild Id
    const getGuildResponse = await client.GetDiscordGuild({ discordId: discordGuild.id });

    if (getGuildResponse.guild.length > 0) {
      const existingGuild = getGuildResponse.guild[0];

      // if a guild with the same server ID already exists, see if a discord refresh token is set. 
      if (existingGuild.discord_metadata?.refreshToken != null) {
        // if so, it's already set up: redirect to the appropriate page on the frontend
        // might want to save the new refresh token if it's different...? 
        // (unfortunately this page doesn't yet exist..)
        const successResponse: DiscordGuildAuthResponse = {
          success: true,
          guildname: existingGuild.guildname,
          exists: true,
        }
        res.json(successResponse);
      } else {
        // otherwise, update the existing guild with the provided info from discord
        await client.UpdateGuildDiscordMetadata({ 
          guildId: existingGuild.id, 
          discordMetadata: parseDiscordMetadata(response.oauthResponse),
        });
  
        const successResponse: DiscordGuildAuthResponse = {
          success: true,
          guildname: existingGuild.id,
        }
        res.json(successResponse);
      }
    } else {
      // Guild doesn't already exist: persist guild info fetched in this request 
      const discordMetadata = parseDiscordMetadata(response.oauthResponse);

      // include roles from response. fetch any additional data that might be useful
      discordMetadata.allRoleIds = discordGuild.roles.map(role => role.id);
      
      let createGuildResponse: DiscordGuildAuthResponse = { success: false };
      try {
        createGuildResponse = await createNewGuild(discordGuild, discordMetadata);
      } catch (creationError) {
        // if there was a guildname clash, try again with a uuid
        if (creationError?.message.includes('Uniqueness violation')) {
          discordGuild.name = uuidv4();
          createGuildResponse = await createNewGuild(discordGuild, discordMetadata);
          res.json(createGuildResponse);
        }
      }
      res.json(createGuildResponse);
    }
  } catch (error) {
    console.error(error);
    const errorResponse: DiscordGuildAuthResponse = {
      success: false,
      error: error?.message || error || 'An unexpected error occurred',
    };
    res.json(errorResponse);
  }
};

const parseDiscordMetadata = (oauthResponse: OAuth2CodeExchangeResponse): GuildDiscordMetadata => {
  const discordMetadata: GuildDiscordMetadata = {
    refreshToken: oauthResponse.refresh_token,
  }
  if (oauthResponse.guild?.icon != null) {
    discordMetadata.logoHash = oauthResponse.guild?.icon; // see https://discord.com/developers/docs/reference#image-formatting 
  }
  return discordMetadata;
}

const createNewGuild = async (discordGuild: PartialGuild, discordMetadata: GuildDiscordMetadata): Promise<DiscordGuildAuthResponse> => {
  const newGuildPayload = {
    type: GuildType_Enum.Project,
    name: discordGuild.name,
    guildname: discordGuild.name.toLowerCase().replace(/[^a-z0-9]/g, ''),
    discord_id: discordGuild.id, 
    status: GuildStatus_Enum.Pending,
    discord_metadata: discordMetadata,
  };
  
  const createGuildResponse = await client.CreateGuild({ objects: newGuildPayload });
  if (createGuildResponse.insert_guild != null && createGuildResponse.insert_guild.returning.length > 0 ) {
    const newGuild = createGuildResponse.insert_guild?.returning[0];
    const successResponse: DiscordGuildAuthResponse = {
      success: true,
      guildname: newGuild.guildname,
    }
    return successResponse;
  }
  throw new Error();
}
