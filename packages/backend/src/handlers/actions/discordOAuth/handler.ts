/* eslint-disable no-console */
import { exchangeCodeForAccessToken, GuildDiscordMetadata, OAuth2CodeExchangeResponse } from '@metafam/discord-bot';
import { Constants } from '@metafam/utils';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { CONFIG } from '../../../config';
import { GuildStatus_Enum, GuildType_Enum } from '../../../lib/autogen/hasura-sdk';
import { client } from '../../../lib/hasuraClient';

export const handleOAuthCallback = async (
  req: Request,
  res: Response,
): Promise<void> => {

  // when auth request is denied, this still gets called with `error=access_denied` and `error_description` and `state` parameters
  if (req.query.error || !req.query.code) {
    return res.redirect(`${CONFIG.frontendUrl}/${Constants.WEB_PATH_JOIN_GUILD}?error=${req.query.error}`);
  }
  // when confirmed, `code` parameter is sent.
  const response = await exchangeCodeForAccessToken(req.query.code as string);
  if (response.statusCode !== 200 || response.oauthResponse == null) {
    console.error(`${response.statusCode}: ${response.error}`);
    return redirectOnError(res);
  }

  const { guild: discordGuild } = response.oauthResponse;
  if (discordGuild == null) {
    console.error('Guild not available on oauth response. Exiting..');
    return redirectOnError(res);
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
      return res.redirect(`${CONFIG.frontendUrl}/guild/${existingGuild.guildname}`);
    }
    
    // otherwise, update the existing guild with the provided info from discord
    await client.UpdateGuildDiscordMetadata({ 
      guildId: existingGuild.id, 
      discordMetadata: parseDiscordMetadata(response.oauthResponse),
    });

    // then redirect to /join/guild/setup?id=<id>
    return redirectToSetupPage(res, existingGuild.id);
  }

  // Guild doesn't already exist: persist guild info fetched in this request 
  const discordMetadata = parseDiscordMetadata(response.oauthResponse);

  // include roles from response. fetch any additional data that might be useful
  discordMetadata.allRoleIds = discordGuild.roles.map(role => role.id);

  const newGuildPayload = {
    type: GuildType_Enum.Project,
    name: discordGuild.name,
    // guildname: discordGuild.name.toLowerCase().replace(/[^a-z0-9]/g, ''),
    guildname: uuidv4(),
    discord_id: discordGuild.id, 
    status: GuildStatus_Enum.Pending,
    discord_metadata: discordMetadata,
  };

  const createGuildResponse = await client.CreateGuild({ objects: newGuildPayload });
  if (createGuildResponse.insert_guild != null && createGuildResponse.insert_guild.returning.length > 0 ) {
    const newGuild = createGuildResponse.insert_guild?.returning[0];
    return redirectToSetupPage(res, newGuild.guildname);
  }
  return redirectOnError(res);
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

const redirectOnError = (res: Response) => {
  res.redirect(`${CONFIG.frontendUrl}/${Constants.WEB_PATH_JOIN_GUILD}?error=oauth-unexpected-error`);
}

const redirectToSetupPage = (res: Response, guildId: string) => {
  res.redirect(`${CONFIG.frontendUrl}/join/guild/setup?id=${guildId}`);
}
