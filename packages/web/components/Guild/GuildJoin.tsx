import {
  Flex,
  HStack,
  Image,
  List,
  ListIcon,
  ListItem,
  MetaButton,
  MetaHeading,
  Text,
  VStack,
} from '@metafam/ds';
import { Constants, generateUuid } from '@metafam/utils';
import { FlexContainer } from 'components/Container';
import { MetaLink } from 'components/Link';
import { CONFIG } from 'config';
import { get, set } from 'lib/store';
import React, { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

export const discordAuthStateGuidKey = 'metagame-add-guild';

export const GuildJoin: React.FC = () => {
  const discordOAuthCallbackURL = `${CONFIG.publicURL}/${Constants.DISCORD_OAUTH_CALLBACK_PATH}`;

  const [stateGuid, setStateGuid] = useState<string>();

  useEffect(() => {
    let guid = get(discordAuthStateGuidKey);
    if (guid == null) {
      guid = generateUuid();
      set(discordAuthStateGuidKey, guid);
    }
    setStateGuid(guid);
  }, [setStateGuid]);

  const discordAuthParams = new URLSearchParams({
    response_type: 'code',
    client_id: Constants.DISCORD_BOT_CLIENT_ID,
    // This will be passed-back and verified after the Discord auth redirect
    state: stateGuid as string,
    permissions: Constants.DISCORD_BOT_PERMISSIONS,
    redirect_uri: encodeURI(discordOAuthCallbackURL),
    scope: Constants.DISCORD_OAUTH_SCOPES,
  });

  const discordAuthURL = `${
    CONFIG.discordApiBaseUrl
  }/oauth2/authorize?${discordAuthParams.toString()}`;

  return (
    <FlexContainer flex="1" justify="start" mt={5}>
      <MetaHeading textAlign="center" mb={10}>
        Join MetaGame as Guild
      </MetaHeading>
      {/* TODO get design input, change content and make responsive */}
      <Flex
        direction="row"
        bg="whiteAlpha.200"
        style={{ backdropFilter: 'blur(7px)' }}
        rounded="lg"
        p="6"
        my="6"
        w="100%"
        align="stretch"
        justify="space-between"
      >
        <HStack h="100%" maxW="60rem" spacing="6" align="stretch">
          <Image src="/assets/guilds.png" alt="Guild" maxW="20rem" />
          <VStack spacing={8} align="stretch" pl="6">
            <Text fontSize="xl" color="blueLight">
              Are you part of a group of people building tools &amp; services
              for a decentralized future?
            </Text>
            <VStack spacing={2} align="stretch">
              <Text>Does your group need help</Text>
              <List>
                <ListItem fontStyle="italic" fontSize="sm">
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  finding tools, frameworks or funds?
                </ListItem>
                <ListItem fontStyle="italic" fontSize="sm">
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  getting value-aligned contributors &amp; adopters?
                </ListItem>
              </List>
            </VStack>
            <Text fontSize="sm">
              To apply, your guild must have a{' '}
              <MetaLink isExternal href="https://discord.com/">
                Discord
              </MetaLink>{' '}
              server. Clicking the link below will redirect to a Discord page
              asking for your permission to collect certain relevant information
              about your guild.
            </Text>
            {stateGuid?.length && (
              <MetaButton size="lg" maxW="15rem" as="a" href={discordAuthURL}>
                Apply to Join
              </MetaButton>
            )}
          </VStack>
        </HStack>
      </Flex>
    </FlexContainer>
  );
};
