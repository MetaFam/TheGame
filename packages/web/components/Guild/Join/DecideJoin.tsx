import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Image,
  ListItem,
  MetaButton,
  Text,
  UnorderedList,
} from '@metafam/ds';
import { Constants, generateUUID } from '@metafam/utils';
import GuildsImg from 'assets/guilds-sun_800x800.png';
import { CONFIG } from 'config';
import { useUser } from 'lib/hooks';
import { get, set } from 'lib/store';
import { useEffect, useState } from 'react';

const guildApplicationLink = 'https://form.typeform.com/to/V5YNcdMQ';
const discordOAuthCallbackURL = `${CONFIG.publicURL}/${Constants.DISCORD_OAUTH_CALLBACK_PATH}`;

export const discordAuthStateGuidKey = 'metagame-add-guild';

export const DecideJoin: React.FC = () => {
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
        p={8}
      >
        <Flex
          direction={{ base: 'column', md: 'row' }}
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src={GuildsImg.src}
            alt="Three cloaked figures"
            mx="auto"
            maxW="10rem"
            mb={{ base: 8, md: 0 }}
          />

          <Box ml={{ base: 0, md: 8 }} flex="auto">
            <Text as="p" mb={6} textAlign="center">
              Ready to join the Decentralized Factory &amp; become one of the
              Founding Guilds of MetaGame? Apply now 👇
            </Text>

            <Center>
              <MetaButton
                as="a"
                bg="#E839B7"
                borderRadius={0}
                color="white"
                href={guildApplicationLink}
                mb={4}
                minW="10rem"
                px={6}
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
            </Center>
            <div>
              {stateGuid?.length && user ? (
                <>
                  <Text>
                    Clicking the link below will redirect to a Discord page
                    asking for your permission to collect certain relevant
                    information about your guild:
                    <UnorderedList pt={2}>
                      <ListItem fontSize="small">
                        Read messages / history. Optional, but this allows us to
                        display announcements from your Discord announcements
                        channel(s) on your MyMeta guild's page.
                      </ListItem>
                    </UnorderedList>
                  </Text>
                  <MetaButton
                    size="lg"
                    maxW="15rem"
                    mt={6}
                    as="a"
                    href={discordAuthURL}
                  >
                    Apply to Join
                  </MetaButton>
                </>
              ) : (
                <Flex fontStyle="italic" mt={4}>
                  Please log in or create a player profile by pressing the
                  "Connect" button to start the guild setup process.
                </Flex>
              )}
            </div>
          </Box>
        </Flex>
      </Container>
    </Container>
  );
};
