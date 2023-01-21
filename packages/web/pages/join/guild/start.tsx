import {
  Box,
  Flex,
  ListItem,
  MetaButton,
  MetaHeading,
  Text,
  UnorderedList,
} from '@metafam/ds';
import { Constants, generateUUID } from '@metafam/utils';
import { PageContainer } from 'components/Container';
import { CONFIG } from 'config';
import { useUser } from 'lib/hooks';
import { get, set } from 'lib/store';
import React, { useEffect, useState } from 'react';

const discordOAuthCallbackURL = `${CONFIG.publicURL}/${Constants.DISCORD_OAUTH_CALLBACK_PATH}`;

export const discordAuthStateGuidKey = 'metagame-add-guild';

const GuildSetupAuthCallback: React.FC = () => {
  const { user } = useUser();

  const [stateGuid, setStateGuid] = useState<string>();

  useEffect(() => {
    let guid = get(discordAuthStateGuidKey);
    if (guid == null) {
      guid = generateUUID();
      set(discordAuthStateGuidKey, guid);
    }
    setStateGuid(guid);
  }, [setStateGuid]);

  const discordAuthParams = new URLSearchParams({
    response_type: 'code',
    client_id: Constants.DISCORD_BOT_CLIENT_ID,
    // This will be passed-back and verified after the Discord auth redirect
    state: stateGuid as string,
    permissions: `${Constants.JOIN_GUILD_DISCORD_BOT_PERMISSIONS}`,
    redirect_uri: encodeURI(discordOAuthCallbackURL),
    scope: Constants.JOIN_GUILD_DISCORD_OAUTH_SCOPES,
  });

  const discordAuthURL = `${
    CONFIG.discordApiBaseUrl
  }/oauth2/authorize?${discordAuthParams.toString()}`;

  return (
    <PageContainer>
      <MetaHeading>Join as a Guild</MetaHeading>
      <Box maxW="xl" mt={8}>
        {stateGuid?.length && user ? (
          <>
            <Text>
              Clicking the link below will redirect to a Discord page asking for
              your permission to collect this information about your guild from
              your guild's Discord server:
              <UnorderedList pt={2}>
                <ListItem fontSize="small">
                  Read messages / history. <em>Optional</em>, but this allows us
                  to display announcements from your Discord announcements
                  channel(s) on your MyMeta guild's page.
                </ListItem>
              </UnorderedList>
            </Text>
            <Text fontStyle="italic" mt={3}>
              Wait, why Discord?
            </Text>
            <Text mt={2}>
              Well, turns out that (at this moment anyway) there is no
              standardized source of truth for determining who is a "member" of
              a guild. We built an integration with Discord because just about
              every guild has a Discord server. Most servers use roles to give
              certain community members additional privileges, which is often a
              good approximation for "membership". So, by linking your Discord
              server and telling us what roles determine what, we can determine
              which MyMeta users are members of your guild!
            </Text>
            <MetaButton
              size="lg"
              maxW="15rem"
              mt={6}
              as="a"
              href={discordAuthURL}
            >
              Join
            </MetaButton>
          </>
        ) : (
          <Flex fontStyle="italic" mt={4}>
            Please log in or create a player profile by pressing the "Connect"
            button to start the guild setup process.
          </Flex>
        )}
      </Box>
    </PageContainer>
  );
};

export default GuildSetupAuthCallback;
