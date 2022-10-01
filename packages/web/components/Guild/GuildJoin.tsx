import {
  ArrowUpIcon,
  Box,
  Button,
  // Center,
  Container,
  // Flex,
  Heading,
  Image,
  ListItem,
  LoadingState,
  // MetaButton,
  // MetaHeading,
  Text,
  UnorderedList,
  VStack,
} from '@metafam/ds';
import { Constants, generateUUID } from '@metafam/utils';
import Octopus from 'assets/octopus.png';
import { HeadComponent } from 'components/Seo';
// import { FlexContainer } from 'components/Container';
// import { MetaLink } from 'components/Link';
import { CONFIG } from 'config';
import { useUser } from 'lib/hooks';
import { get, set } from 'lib/store';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

export const discordAuthStateGuidKey = 'metagame-add-guild';

export const GuildJoin: React.FC = () => {
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

  // The back to top link at the bottom of the page
  const router = useRouter();
  const topRef = useRef<HTMLDivElement>(null);

  function handleBackClick() {
    topRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }

  if (router.isFallback) {
    return <LoadingState />;
  }

  /* 
    Some styles that are reused 
    .mg-section         The page sections
    .mg-section--title  The main title of each section
  */
  const css = {
    '.mg-section': {
      w: '100%',
      maxW: '6xl',
    },
  };

  return (
    <VStack maxW="6xl" w="100%" spacing={{ base: 16, md: 24 }} sx={css}>
      <HeadComponent
        title="Join MetaGame as a Guild"
        description="We are looking for projects that are either building pieces of the infrastructure for the society of the future, offering tools &amp; services to those that are, or just doing something cool."
        url="https://my.metagame.wtf/join/guild"
      />

      <Container w="100%" maxW="6xl">
        {/* Needs to be a <Heading> instead of <MetaHeading> or ref won't work for the scroll to top */}
        <Heading
          as="h1"
          color="white"
          fontFamily="mono"
          fontSize="6xl"
          fontWeight={700}
          mb={[4, 4, 4, 12]}
          textAlign="center"
          ref={topRef}
        >
          Join as a Guild!
        </Heading>
      </Container>

      {/* Section: What are Guilds */}
      <Container as="section" className="mg-section">
        <Heading
          as="h2"
          color="white"
          fontFamily="mono"
          fontWeight={700}
          mb={[4, 4, 4, 12]}
        >
          What are Guilds?
        </Heading>

        <Container bg="whiteAlpha.50" maxW="lg" centerContent>
          <VStack spacing={8} py={8} px={4}>
            <Box bg="tomato">picture</Box>
            <Box>
              <Text as="h3" fontWeight={700} mb={4}>
                Guilds make up the Decentralized Factory
              </Text>
              <Text mb={4}>
                Guilds are simply groups of players &amp; patrons doing
                something useful in our or one of the adjacent ecosystems.
              </Text>
              <Text>
                Guilds of MetaGame aka the MetaAlliance are a network of service
                &amp; project DAOs, making up The Decentralized Factory.
              </Text>
            </Box>
          </VStack>
        </Container>
      </Container>

      {/* Section: Decentralized Factory */}
      <Container as="section" className="mg-section">
        <Heading
          as="h2"
          color="white"
          fontFamily="mono"
          fontWeight={700}
          mb={[4, 4, 4, 12]}
        >
          A Decentralized Factory
        </Heading>

        <Container centerContent>
          <Text>(factory image here)</Text>
        </Container>
      </Container>

      {/* Section: Why Join */}
      <Container as="section" className="mg-section">
        <Heading
          as="h2"
          color="white"
          fontFamily="mono"
          fontWeight={700}
          mb={[4, 4, 4, 12]}
        >
          Why have your Guild join MetaGame?
        </Heading>

        <Container bg="whiteAlpha.50" maxW="2xl" p={8}>
          <Text>A few reasons</Text>
          <Text>Firstly</Text>
          <Text>You may also</Text>
          <UnorderedList>
            <ListItem>One</ListItem>
            <ListItem>Two</ListItem>
            <ListItem>Three</ListItem>
          </UnorderedList>
        </Container>
      </Container>

      {/* Section: Requirements */}
      <Container as="section" className="mg-section">
        <Heading
          as="h2"
          color="white"
          fontFamily="mono"
          fontWeight={700}
          mb={[4, 4, 4, 12]}
        >
          Requirements
        </Heading>

        <Container>
          <Text>Before trying to join</Text>
          <Text>Cards HStack</Text>
          <Text>Then think</Text>
          <Text>Flag type component with the smiley</Text>
          <Text>Finally</Text>
          <Text>Regular box with text</Text>
        </Container>
      </Container>

      {/* Section: Tiers and Perks */}
      <Container as="section" className="mg-section">
        <Heading
          as="h2"
          color="white"
          fontFamily="mono"
          fontWeight={700}
          mb={[4, 4, 4, 12]}
        >
          Tiers &amp; Perks
        </Heading>

        <Container>
          <Text>Cards HStack that goes from 3 wide to stacked</Text>
          <Text>Higher tiers ...</Text>
        </Container>
      </Container>

      {/* Section: Other Guilds */}
      <Container as="section" className="mg-section">
        <Heading
          as="h2"
          color="white"
          fontFamily="mono"
          fontWeight={700}
          mb={[4, 4, 4, 12]}
        >
          Other guilds include &hellip;
        </Heading>

        <Container>
          <Text>Guild component from the other page</Text>
          <Text>LOAD MORE or VIEW MORE button</Text>
        </Container>
      </Container>

      {/* Section: Decided to join */}
      <Container as="section" className="mg-section">
        <Heading
          as="h2"
          color="white"
          fontFamily="mono"
          fontWeight={700}
          mb={[4, 4, 4, 12]}
        >
          Decided to join?
        </Heading>

        <Container bg="whiteAlpha.50" maxW="2xl" p={8}>
          <Text>
            Flag type component that stacks, with the button and conditional
            text depending on if logged in or not
          </Text>
        </Container>
      </Container>

      <Image src={Octopus} pt={8} />
      <Box pb={4}>
        <Button
          leftIcon={<ArrowUpIcon />}
          variant="ghost"
          color="whiteAlpha.700"
          bgColor="whiteAlpha.50"
          _hover={{ bg: 'whiteAlpha.200' }}
          _active={{ bg: 'whiteAlpha.200' }}
          onClick={handleBackClick}
        >
          Back to top
        </Button>
      </Box>
    </VStack>
  );
};
