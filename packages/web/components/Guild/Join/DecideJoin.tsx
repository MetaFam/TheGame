import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  MetaButton,
  Text,
} from '@metafam/ds';
import { Constants, generateUUID } from '@metafam/utils';
import GuildsImg from 'assets/guilds-sun_800x800.png';
import { MetaLink } from 'components/Link';
/* 
    For Getting the logged in state 
*/
import { CONFIG } from 'config';
import { useUser } from 'lib/hooks';
import { get, set } from 'lib/store';
import React, { useEffect, useState } from 'react';

export const discordAuthStateGuidKey = 'metagame-add-guild';

export const DecideJoin: React.FC = () => {
  /* 
        Get the logged in state 
    */
  const { user } = useUser();
  const discordOAuthCallbackURL = `${CONFIG.publicURL}/${Constants.DISCORD_OAUTH_CALLBACK_PATH}`;

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
    <Container
      as="section"
      className="mg-guild-join-section" // CSS class defined in packages/web/pages/Guild/Join/index.tsx
    >
      <Heading
        as="h2"
        color="white"
        fontFamily="mono"
        fontWeight={700}
        mb={[4, 4, 4, 12]}
      >
        Decided to join?
      </Heading>

      {/*
        The two flex items are stacked until the md breakpoint, then go to columns
      */}
      <Container
        className="mg-guild-join-card-bg" // CSS class defined in packages/web/pages/Guild/Join/index.tsx
        maxW="2xl"
        py={8}
        px={12}
      >
        <Flex
          direction={{ base: 'column', md: 'row' }}
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src={GuildsImg}
            alt="Three cloaked figures"
            mx="auto"
            maxW="10rem"
            mb={{ base: 8, md: 0 }}
          />

          <Box ml={{ base: 0, md: 16 }} flex="auto">
            {/* 
                If they have connected their wallet, they get the sign up button
                If they have not connected their wallet, they get a prompt to sign up
              */}
            {stateGuid?.length && user ? (
              <>
                <Text as="p" mb={6}>
                  Ready to join the Decentralized Factory &amp; become one of
                  the Founding Guilds of MetaGame? Apply now 👇
                </Text>

                <MetaButton
                  as="a"
                  bg="#E839B7"
                  borderRadius={0}
                  color="white"
                  href={discordAuthURL}
                  mb={8}
                  minW="10rem"
                  px={6}
                  textDecoration="underline"
                  textTransform="uppercase"
                  _hover={{
                    backgroundColor: 'rgba(232, 57, 183, 0.6)',
                  }}
                  _active={{
                    backgroundColor: 'rgba(232, 57, 183, 0.6)',
                    transform: 'scale(0.8)',
                  }}
                >
                  Apply
                </MetaButton>
              </>
            ) : (
              <Text as="p" fontStyle="italic" mb={4}>
                Please log in or create a player profile by pressing the
                "Connect" button to start the guild application process.
              </Text>
            )}

            <Text mb={4}>
              To apply, your guild must have a{' '}
              <MetaLink isExternal href="https://discord.com/">
                Discord
              </MetaLink>{' '}
              server.
            </Text>
          </Box>
        </Flex>
      </Container>
    </Container>
  );
};
