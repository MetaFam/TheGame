import {
  ArrowUpIcon,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Image,
  List,
  ListIcon,
  ListItem,
  LoadingState,
  MetaButton,
  // MetaHeading,
  // Stack,
  SimpleGrid,
  Text,
  UnorderedList,
  VStack,
} from '@metafam/ds';
import { Constants, generateUUID } from '@metafam/utils';
import DecentralizedFactoryImg from 'assets/decentralized-factory_1105x1098.png';
import GuildsImg from 'assets/guilds-sun_800x800.png';
// Images to use in the page
import GuildsSunlessImg from 'assets/guilds-sunless_384x449.png';
import CommonTierNFTImg from 'assets/nft-common-tier_600x600.jpg';
import EpicTierNFTImg from 'assets/nft-epic-tier_600x600.jpg';
import RareTierNFTImg from 'assets/nft-rare-tier_600x600.jpg';
import Octopus from 'assets/octopus.png'; // in the footer
import PatronsImg from 'assets/patrons-sun_800x820.png';
import PlayersImg from 'assets/players-sun_800x822.png';
import ThinkingEmojiImg from 'assets/thinking-emoji_400x400.png';
// import { FlexContainer } from 'components/Container';
import { MetaLink } from 'components/Link';
import { HeadComponent } from 'components/Seo';
import { CONFIG } from 'config';
import { useUser } from 'lib/hooks';
import { get, set } from 'lib/store';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';

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
    <VStack maxW="6xl" w="100%" spacing={{ base: 8, md: 20 }} sx={css}>
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

        <Container bg="whiteAlpha.50" borderRadius={8} maxW="lg" centerContent>
          <VStack spacing={8} py={8} px={4}>
            <Image src={GuildsSunlessImg} alt="Cloaked figure" mx="auto" />

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

        <Image
          src={DecentralizedFactoryImg}
          alt="Diagram of the decentralized factory concept"
          mx="auto"
        />
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
          Why have your guild join MetaGame?
        </Heading>

        <Container bg="whiteAlpha.50" borderRadius={8} maxW="3xl" p={8}>
          <Text mb={4}>A few reasons, actually!</Text>
          <Text mb={4}>
            <Text as="strong">Firstly</Text>, because you feel aligned with the
            vision &amp; want to be a part of this “new world” puzzle.
          </Text>
          <Text>You may also want to become a part of MetaGame if you:</Text>
          <UnorderedList>
            <ListItem>
              Want access to a network of pioneers, helpers, stress testers
              &amp; early adopters.
            </ListItem>
            <ListItem>
              Need access or connections to knowledge &amp; resources you need
              for your guild.
            </ListItem>
            <ListItem>
              Want a place to offer your service or tools to other DAOs or
              integrate it into MetaOS.
            </ListItem>
            <ListItem>
              Are interested in using MetaGame as a platform or deploying MetaOS
              on your own.
            </ListItem>
            <ListItem>
              Need a little help spreading the word &amp; getting your project
              out there.
            </ListItem>
            <ListItem>Want help onboarding people into your DAO.</ListItem>
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

        <VStack spacing={6}>
          <Center>
            <Text>
              Before trying to join as a guild, it is recommended you join as a
              player or a patron first&hellip;
            </Text>
          </Center>
          {/* 
            The cards (VStacks) are stacked until the lg breakpoint is reached
            Then they are displayed in a row             
          */}
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            alignItems="center"
            justifyContent="center"
          >
            <Box
              bg="whiteAlpha.50"
              borderRadius={8}
              maxW={{ base: 'md', lg: '21rem' }}
              p={8}
            >
              <VStack spacing={2}>
                <Image
                  src={PlayersImg}
                  alt="Cloaked player facing sun"
                  mx="auto"
                  maxH={{ md: '20rem', lg: '12rem' }}
                />
                <Text
                  color="white"
                  fontFamily="mono"
                  fontSize="lg"
                  fontWeight={200}
                >
                  Become a Player
                </Text>
                <Text color="#A5B9F6" fontWeight={200}>
                  Players are the ones <Text as="em">actively</Text>{' '}
                  contributing towards the realization of MetaGame.
                </Text>
                <Box>
                  <MetaButton
                    as="a"
                    bg="#E839B7"
                    borderRadius={0}
                    color="white"
                    href="https://wiki.metagame.wtf/docs/enter-metagame/join-metagame"
                    mt={2}
                    minW="10rem"
                    w="10rem"
                    _hover={{
                      bg: '#E839B7',
                      opacity: 0.6,
                    }}
                    _active={{
                      bg: '#E839B7',
                      opacity: 0.6,
                    }}
                  >
                    LFG!
                  </MetaButton>
                </Box>
              </VStack>
            </Box>

            <Box textAlign="center" p={9}>
              <Text color="white" fontFamily="mono" fontSize="lg">
                OR
              </Text>
            </Box>

            <Box
              bg="whiteAlpha.50"
              borderRadius={8}
              maxW={{ base: 'md', lg: '21rem' }}
              p={8}
            >
              <VStack spacing={2}>
                <Image
                  src={PatronsImg}
                  alt="Cloaked patron facing sun"
                  mx="auto"
                  maxH={{ md: '20rem', lg: '12rem' }}
                />
                <Text
                  color="white"
                  fontFamily="mono"
                  fontSize="lg"
                  fontWeight={200}
                >
                  Become a Patron
                </Text>
                <Text color="#A5B9F6" fontWeight={200}>
                  Patrons are the ones <Text as="em">passively</Text>{' '}
                  contributing towards the realization of MetaGame.
                </Text>
                <Box>
                  <MetaButton
                    as="a"
                    bg="#E839B7"
                    borderRadius={0}
                    color="white"
                    href="https://wiki.metagame.wtf/docs/enter-metagame/join-metagame"
                    mt={2}
                    minW="10rem"
                    w="10rem"
                    _hover={{
                      bg: '#E839B7',
                      opacity: 0.6,
                    }}
                    _active={{
                      bg: '#E839B7',
                      opacity: 0.6,
                    }}
                  >
                    LFG!
                  </MetaButton>
                </Box>
              </VStack>
            </Box>
          </Flex>

          <Center>
            <Text fontSize="lg">
              Then think: is your guild a good fit for MetaGame?
            </Text>
          </Center>

          {/*
            The two flex items are stacked until the md breakpoint, then go to columns
          */}
          <Container bg="whiteAlpha.50" borderRadius={8} maxW="3xl" p={8}>
            <Flex
              direction={{ base: 'column', md: 'row' }}
              alignItems="center"
              justifyContent="center"
            >
              <Image
                src={ThinkingEmojiImg}
                alt="🤔"
                mx="auto"
                maxW="10rem"
                mb={{ base: 8, md: 0 }}
              />

              <Box ml={{ base: 0, md: 8 }} flex="auto">
                <Text mb={4}>You need to tick at least 2 of these boxes!</Text>

                <List mb={4}>
                  <ListItem>
                    <ListIcon as={MdCheckBoxOutlineBlank} />
                    At least one of your members is a member of MetaGame
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdCheckBoxOutlineBlank} />
                    You’re doing something useful for the DAO ecosystem
                    <Box ml="1.5em">
                      👉 Building a DAO, a dApp, a protocol or a tool?
                      <br />
                      👉 Providing a service to other DAOs?
                    </Box>
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdCheckBoxOutlineBlank} />
                    You’re doing something good for the world
                    <Box ml="1.5em">
                      👉 Should be outside or vaguely related to crypto (Regens
                      FTW!)
                    </Box>
                  </ListItem>
                </List>
              </Box>
            </Flex>
          </Container>

          <Center>
            <Text fontSize="lg">Finally&hellip;</Text>
          </Center>

          <Container bg="whiteAlpha.50" borderRadius={8} maxW="3xl" p={8}>
            <Text mb={4}>
              After making sure you’re a good fit, there is essentially one
              requirement&hellip;
            </Text>
            <Text>
              You’ll need to signal your alignment with the MetaManifesto
            </Text>
            <UnorderedList mb={4}>
              <ListItem>
                By donating to a humanitarian or ecological initiative of your
                choosing.
              </ListItem>
              <ListItem>
                By buying a MetaManifesto NFT and/or some Seeds.
              </ListItem>
              <ListItem>
                Want a place to offer your service or tools to other DAOs or
                integrate it into MetaOS.
              </ListItem>
              <ListItem>
                Are interested in using MetaGame as a platform or deploying
                MetaOS on your own.
              </ListItem>
              <ListItem>
                Need a little help spreading the word &amp; getting your project
                out there.
              </ListItem>
              <ListItem>Want help onboarding people into your DAO.</ListItem>
            </UnorderedList>
            <Text>
              <Text as="em">Note:</Text> Long term, all guilds will be expected
              to periodically offset their carbon footprint &amp;/or donate to
              other good (non-crypto) causes.
            </Text>
          </Container>
        </VStack>
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

        {/*
          The three items in SimpleGrid are stacked cards until the md breakpoint, go to full-width rows at md, then to proper cards in 3 columns at lg
        */}

        <SimpleGrid
          columns={{ base: 1, md: 1, lg: 3 }}
          spacing={8}
          mb={6}
          width="100%"
        >
          <Box
            bg="whiteAlpha.50"
            borderRadius={8}
            maxWidth={{ base: 'md', md: '100%' }}
            mx="auto"
            width="100%"
          >
            <Flex direction={{ base: 'column', md: 'row', lg: 'column' }}>
              <Image
                alt="The MetaManifesto on a pedestal, illuminated by pink light"
                borderTopLeftRadius={8}
                borderTopRightRadius={{ base: 8, md: 0, lg: 8 }}
                borderBottomLeftRadius={{ base: 0, md: 8, lg: 0 }}
                src={CommonTierNFTImg}
                width={{ base: 'md', md: '16rem', lg: '100%' }}
              />
              <Box flex="auto">
                <Text
                  bg="#168c72"
                  borderTopRightRadius={{ base: 0, md: 8, lg: 0 }}
                  color="white"
                  fontFamily="mono"
                  fontSize="lg"
                  fontWeight={200}
                  textAlign="center"
                >
                  Common
                </Text>
                <UnorderedList mx={12} my={6}>
                  <ListItem>Your guild page in MetaGame</ListItem>
                  <ListItem>A guild2guild meetup</ListItem>
                  <ListItem>Collaboration opportunities</ListItem>
                  <ListItem>Discord bot (optional)</ListItem>
                </UnorderedList>
              </Box>
            </Flex>
          </Box>

          <Box
            bg="whiteAlpha.50"
            borderRadius={8}
            maxWidth={{ base: 'md', md: '100%' }}
            mx="auto"
            width="100%"
          >
            <Flex direction={{ base: 'column', md: 'row', lg: 'column' }}>
              <Image
                alt="The MetaManifesto on a glowing pedestal"
                borderTopLeftRadius={8}
                borderTopRightRadius={{ base: 8, md: 0, lg: 8 }}
                borderBottomLeftRadius={{ base: 0, md: 8, lg: 0 }}
                src={RareTierNFTImg}
                width={{ base: 'md', md: '16rem', lg: '100%' }}
              />
              <Box flex="auto">
                <Text
                  bg="#2a4c98"
                  borderTopRightRadius={{ base: 0, md: 8, lg: 0 }}
                  color="white"
                  fontFamily="mono"
                  fontSize="lg"
                  fontWeight={200}
                  textAlign="center"
                >
                  Rare
                </Text>
                <UnorderedList mx={12} my={6}>
                  <ListItem>A Twitter thread about you</ListItem>
                  <ListItem>Added to the follow list on Twitter</ListItem>
                  <ListItem>Your news in our newsletter</ListItem>
                  <ListItem>Your announcements inside MetaGame</ListItem>
                  <ListItem>Among the Founding Guilds of MetaGame</ListItem>
                </UnorderedList>
              </Box>
            </Flex>
          </Box>

          <Box
            bg="whiteAlpha.50"
            borderRadius={8}
            maxWidth={{ base: 'md', md: '100%' }}
            mx="auto"
            width="100%"
          >
            <Flex direction={{ base: 'column', md: 'row', lg: 'column' }}>
              <Image
                alt="The MetaManifesto on a pedestal that is glowing with a pink light"
                borderTopLeftRadius={8}
                borderTopRightRadius={{ base: 8, md: 0, lg: 8 }}
                borderBottomLeftRadius={{ base: 0, md: 8, lg: 0 }}
                src={EpicTierNFTImg}
                width={{ base: 'md', md: '16rem', lg: '100%' }}
              />
              <Box flex="auto">
                <Text
                  bg="#402594"
                  borderTopRightRadius={{ base: 0, md: 8, lg: 0 }}
                  color="white"
                  fontFamily="mono"
                  fontSize="lg"
                  fontWeight={200}
                  textAlign="center"
                >
                  Epic
                </Text>
                <UnorderedList mx={12} my={6}>
                  <ListItem>A member of MetaAlliance</ListItem>
                  <ListItem>Cryptovoxels placement</ListItem>
                  <ListItem>Special newsletter</ListItem>
                  <ListItem>Your promo in MetaGame shillpack</ListItem>
                  <ListItem>Branch in The Onboarding Game</ListItem>
                  <ListItem>Support for your instance of MetaOS</ListItem>
                </UnorderedList>
              </Box>
            </Flex>
          </Box>
        </SimpleGrid>

        <Container>
          <Box
            as="p"
            bg="whiteAlpha.50"
            borderRadius={8}
            maxW="md"
            mx="auto"
            p={2}
            textAlign="center"
          >
            Note: Higher tiers include previous tiers’ perks!
          </Box>
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

        {/*  
          Ref. packages/web/pages/community/guilds.tsx
          <GuildList {...{ guilds }} />
        */}

        <Text>To do</Text>
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

        {/*
          The two flex items are stacked until the md breakpoint, then go to columns
        */}
        <Container
          bg="whiteAlpha.50"
          borderRadius={8}
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
                  <Text as="p" mb={4}>
                    Ready to join the Decentralized Factory &amp; become one of
                    the Founding Guilds of MetaGame? Apply now 👇
                  </Text>

                  <MetaButton
                    as="a"
                    bg="#E839B7"
                    borderRadius={0}
                    color="white"
                    href={discordAuthURL}
                    my={8}
                    minW="10rem"
                    text-decoration="underline"
                    w="10rem"
                    _hover={{
                      bg: '#E839B7',
                      opacity: 0.6,
                    }}
                    _active={{
                      bg: '#E839B7',
                      opacity: 0.6,
                    }}
                  >
                    APPLY
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
