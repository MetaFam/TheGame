import {
  ArrowUpIcon,
  AspectRatio,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  List,
  ListItem,
  LoadingState,
  Spacer,
  Text,
  UnorderedList,
  VStack,
} from '@metafam/ds';
import Octopus from 'assets/octopus.png';
import { PageContainer } from 'components/Container';
import { HeadComponent } from 'components/Seo';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';

const RaidsPage: React.FC = () => {
  const router = useRouter();
  const topRef = useRef<HTMLDivElement>(null);

  function handleBackClick() {
    topRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }

  if (router.isFallback) {
    return <LoadingState />;
  }

  return (
    <PageContainer py={8} px={[6, 6, 20, 24]}>
      <VStack maxW="7xl" w="100%" spacing={{ base: 4, md: 8 }}>
        <HeadComponent
          title="MetaGame Raids Page"
          description="See which raids are currently ongoing, learn more about them &amp; get involved"
          url="https://metagame.wtf/raids"
        />

        <Container maxW="7xl" w="100%">
          <Heading
            as="h1"
            fontSize="6xl"
            fontWeight={600}
            color="white"
            fontFamily="mono"
            mb={[4, 4, 4, 12]}
            display="flex"
            ref={topRef}
          >
            State of Raids
            <Text pl={4} alignSelf="center" fontSize="4xl">
              🗺️
            </Text>
          </Heading>

          <Text
            mb={4}
            maxW={{ base: '100%', lg: '3xl' }}
            fontSize={{ base: 'lg', md: '2xl' }}
          >
            This is a map of all the current raids going on inside MetaGame. As
            such, they represent a chance for you to earn reputation, money &
            stake in MetaGame.
          </Text>
        </Container>

        <Container maxW="7xl" w="100%">
          <AspectRatio mb={4} ratio={{ base: 3 / 4, md: 9 / 6 }}>
            <Box
              as="iframe"
              title="MetaGame Raids on Miro"
              src="https://miro.com/app/live-embed/uXjVOmrCvsw=/?moveToViewport=-23399,-15417,32264,27285&embedId=17519047502"
              allowFullScreen
            />
          </AspectRatio>
        </Container>

        <Container maxW="7xl" w="100%">
          {/*
            The flex is used to make two columns/sections
            - Main Raids
            - Phase 1
            When the screen is narrower than the lg breakpoint, the columns are stacked up to make rows instead, with the Phase 1 column/section at the top            
          */}
          <Flex
            direction={{ base: 'column-reverse', lg: 'row' }}
            maxW={{ base: '100%', lg: '5xl' }}
            w="100%"
          >
            {/*
              Main Raids column
              Columns are 45% wide above the lg breakpoint Chakra Flex <Spacer/> is used to make a gap between the columns
            */}
            <Box w={{ base: '100%', lg: '45%' }} maxW="2xl">
              <Heading
                as="h1"
                color="white"
                fontSize="4xl"
                fontWeight={600}
                fontFamily="mono"
                mb={[4, 4, 4, 8]}
              >
                Main Raids
              </Heading>

              {/* 
                MetaOS section
              */}
              <Box mb={[4, 4, 4, 6]}>
                <Text
                  as="h2"
                  color="white"
                  fontSize="2xl"
                  fontWeight={700}
                  fontFamily="mono"
                  mb={2}
                  textTransform="uppercase"
                >
                  MetaOS
                </Text>
                <Text mb={2}>
                  <Link
                    className="gradient"
                    href="https://wiki.metagame.wtf/docs/what-we-do/metaos"
                    title="Read more about MetaOS"
                  >
                    MetaOS
                  </Link>{' '}
                  is an operating system for interoperable communities,
                  decentralized societies &amp; coordination games. A mosaic of
                  web3 building blocks put together into a coherent platform.
                </Text>

                <Text fontWeight={700}>Ways to help:</Text>

                <UnorderedList>
                  <ListItem>
                    Always need builders. Know someone good with TypeScript?
                    You? DM peth.
                  </ListItem>
                  <ListItem>
                    Want to integrate some critical piece of DAO tool stacks? A
                    bounties system or a social or data feed? Any other{' '}
                    <Link
                      className="gradient"
                      href="https://metagame.wtf/quest/99047a66-533a-43a0-abc2-c9a9de85de46"
                      title="Read the ‘Build a Dashboard Module’ quest"
                    >
                      custom block into the dashboard
                    </Link>
                    ?
                  </ListItem>
                </UnorderedList>
              </Box>

              {/*
                Bridgebuildin section
              */}
              <Box mb={[4, 4, 4, 6]}>
                <Text
                  as="h2"
                  color="white"
                  fontSize="2xl"
                  fontWeight={700}
                  fontFamily="mono"
                  mb={2}
                  textTransform="uppercase"
                >
                  Bridgebuildin’
                </Text>
                <Text mb={2}>
                  Making connections with other DAOs,{' '}
                  <Link
                    className="gradient"
                    href="https://metagame.wtf/join/guild"
                    title="How to join MetaGame as a Guild"
                  >
                    onboarding them into MetaGame
                  </Link>
                  , helping them &amp; integrating their tools into MetaOS or
                  services into MetaGame.
                </Text>

                <Text fontWeight={700}>Ways to help:</Text>

                <UnorderedList>
                  <ListItem>
                    Know any cool DAO that may want to join this cool network?
                    Suggest them in the{' '}
                    <Link
                      className="gradient"
                      href="https://discord.com/channels/629411177947987986/930160867562115193"
                      title="Visit the Bridgebuilders Guild channel in MetaGame Discord"
                      isExternal
                    >
                      #bridgebuilders-guild
                    </Link>{' '}
                    or maybe even{' '}
                    <Link
                      className="gradient"
                      href="https://questchains.xyz/chain/0x89/0xf7fbc471cbae68bf3833ff820c926ffe3c5bf0f7"
                      title="Complete the Bridgebuilder’s Path Quest on Quest Chains"
                      isExternal
                    >
                      build the bridge yourself
                    </Link>
                    .
                  </ListItem>
                  <ListItem>
                    Know any cool web3 building block or tool that could be{' '}
                    <Link
                      className="gradient"
                      href="https://metagame.wtf/quest/6524b99a-df7e-4c10-838d-c441a8417e77"
                      title="Read the ‘Custom Integration into MyMeta’ Quest"
                    >
                      integrated into MyMeta
                    </Link>
                    , MetaOS, the dashboard or the megamenu? Let us know.
                  </ListItem>
                  <ListItem>
                    Know any community that could benefit from using{' '}
                    <Link
                      className="gradient"
                      href="https://wiki.metagame.wtf/docs/what-we-do/metaos"
                      title="Read more about MetaOS"
                    >
                      MetaOS
                    </Link>
                    ? Shill MetaOS in other communities &amp; build bridges in
                    that way.
                  </ListItem>
                </UnorderedList>
              </Box>

              {/*
                Great Houses section
              */}
              <Box mb={[4, 4, 4, 6]}>
                <Text
                  as="h2"
                  color="white"
                  fontSize="2xl"
                  fontWeight={700}
                  fontFamily="mono"
                  mb={2}
                  textTransform="uppercase"
                >
                  Great Houses &amp; Playbooks
                </Text>
                <Text mb={2}>
                  These are curated resources for different fields of interests
                  &amp; how-to guides.
                </Text>

                <Text fontWeight={700}>Ways to help:</Text>

                <UnorderedList>
                  <ListItem>
                    <Link
                      className="gradient"
                      href="https://wiki.metagame.wtf/docs/great-houses/how-to-house"
                      title="Visit the Build a New House page in the MetaGame wiki"
                      isExternal
                    >
                      Great Houses
                    </Link>{' '}
                    are always open for more links. Its also always possible to
                    build your own house – in fact, House of Wellbeing is
                    half-written &amp; waiting for somebody to publish it. Other
                    ones could be House of Coordination.
                  </ListItem>
                  <ListItem>
                    Interested in writing a new playbook to help newcomers join
                    the web3 space or learn any useful new skill? You’re more
                    than welcome to write one.
                  </ListItem>
                  <ListItem>
                    <Text as="strong">
                      Who Playbooks need the most is, in fact, someone to
                      resurrect them &amp; become their new champion 👀. If
                      you’re new, this could make you one of the founders.
                    </Text>
                  </ListItem>
                </UnorderedList>
              </Box>

              {/*
                The Onboarding Game section
              */}
              <Box mb={[4, 4, 4, 6]}>
                <Text
                  as="h2"
                  color="white"
                  fontSize="2xl"
                  fontWeight={700}
                  fontFamily="mono"
                  mb={2}
                  textTransform="uppercase"
                >
                  The Onboarding Game
                </Text>
                <Text mb={2}>
                  <Link
                    className="gradient"
                    href="https://metagame.wtf/onboarding"
                    title="Go to MetaGame’s Onboarding Adventure"
                  >
                    The Onboarding Game
                  </Link>{' '}
                  is a text based choose-your-own-adventure game used for
                  helping people understand Web3 &amp; join the space &amp;/or
                  MetaGame.
                </Text>

                <Text fontWeight={700}>Ways to help:</Text>

                <UnorderedList>
                  <ListItem>
                    The Onboarding Game mainly needs people to use it, give more
                    feedback &amp; suggest more branches or endings
                  </ListItem>
                  <ListItem>
                    Interested in writing more branches yourself? Also more than
                    welcome. DM peth.
                  </ListItem>
                </UnorderedList>
              </Box>

              {/*
                Realizing MetaGame section
              */}
              <Box mb={[4, 4, 4, 6]}>
                <Text
                  as="h2"
                  color="white"
                  fontSize="2xl"
                  fontWeight={700}
                  fontFamily="mono"
                  mb={2}
                  textTransform="uppercase"
                >
                  Realizing MetaGame
                </Text>
                <Text mb={2}>
                  <Link
                    className="gradient"
                    href="https://metagame.substack.com/"
                    title="Visit metagame.substack.com"
                    isExternal
                  >
                    Realizing MetaGame
                  </Link>{' '}
                  is MetaGame’s first publication, a newsletter. Used to educate
                  &amp; share news about MetaGame &amp; the MetaAlliance.
                </Text>

                <Text fontWeight={700}>Ways to help:</Text>

                <UnorderedList>
                  <ListItem>
                    Biggest help would be finding or suggesting a sponsor tbh.
                    The newsletter has been growing decently &amp; is ready to
                    become self-sustainable.
                  </ListItem>
                  <ListItem>
                    Interested in writing or submitting one of your posts to the
                    newsletter? Please do!
                  </ListItem>
                  <ListItem>
                    Interested in recording short{' '}
                    <Link
                      className="gradient"
                      href="https://metagame.wtf/quest/0ef2d595-6aaf-4969-91c8-ce63712413ae"
                      title="See the ‘Record MetaNews’ Quest"
                      isExternal
                    >
                      5 minute clips of reading &amp; commentary on the
                      newsletter
                    </Link>
                    ? Would be dope, just sayin’.
                  </ListItem>
                </UnorderedList>
              </Box>

              {/*
                MetaRadio section
              */}
              <Box mb={[4, 4, 4, 6]}>
                <Text
                  as="h2"
                  color="white"
                  fontSize="2xl"
                  fontWeight={700}
                  fontFamily="mono"
                  mb={2}
                  textTransform="uppercase"
                >
                  MetaRadio
                </Text>
                <Text mb={2}>
                  <Link
                    className="gradient"
                    href="https://anchor.fm/MetaGame/"
                    title="Visit anchor.fm/MetaGame"
                    isExternal
                  >
                    MetaRadio
                  </Link>{' '}
                  is a podcasting network, comprised of 4 different podcasts.{' '}
                  <Link
                    className="gradient"
                    href="https://anchor.fm/MetaGame/"
                    title="Visit anchor.fm/MetaGame"
                    isExternal
                  >
                    Listen here
                  </Link>
                  .
                </Text>

                <Text fontWeight={700}>Ways to help:</Text>

                <UnorderedList>
                  <ListItem>
                    Now grown to a decent amount of listeners, the main way you
                    could help MetaRadio is by suggesting or finding an aligned
                    sponsor.
                  </ListItem>
                  <ListItem>
                    Other ways include suggesting or bringing new guests or even
                    recording your own podcast series if you’re so inclined.
                  </ListItem>
                </UnorderedList>
              </Box>

              {/*
                Join a raid? section
              */}
              <Box mb={[4, 4, 4, 6]}>
                <List>
                  <ListItem>
                    Note: Joining any of the above raids &amp; contributing
                    could make you one of the founders.
                  </ListItem>
                  <ListItem>
                    Lazy? You could just{' '}
                    <Link
                      className="gradient"
                      href="https://metagame.wtf/seeds"
                      title="Read about Seeds and how to water them"
                    >
                      water some Seeds
                    </Link>{' '}
                    &amp;{' '}
                    <Link
                      className="gradient"
                      href="https://metagame.wtf/join/patron"
                      title="Read about becoming a patron of MetaGame"
                    >
                      become one of the founding patrons
                    </Link>{' '}
                    🤷‍♂️
                  </ListItem>
                </List>
              </Box>
            </Box>

            <Spacer />

            {/*
              PHASE 1 column
              Columns are 45% wide above the lg breakpoint Chakra Flex <Spacer/> is used to make a gap between the columns
            */}
            <Box w={{ base: '100%', lg: '45%' }} maxW="2xl">
              <Box mb={[4, 4, 4, 6]}>
                <Heading
                  as="h1"
                  color="white"
                  fontSize="4xl"
                  fontWeight={700}
                  fontFamily="mono"
                  mb={[4, 4, 4, 8]}
                  textTransform="uppercase"
                >
                  Phase I
                </Heading>

                <Text
                  as="h2"
                  color="white"
                  fontSize="2xl"
                  fontWeight={700}
                  fontFamily="mono"
                  mb={2}
                >
                  Memes
                </Text>
                <UnorderedList mb={4}>
                  <ListItem>An Onboarding Machine</ListItem>
                  <ListItem>A Decentralized Factory</ListItem>
                </UnorderedList>

                <Text
                  as="h2"
                  color="white"
                  fontSize="2xl"
                  fontWeight={700}
                  fontFamily="mono"
                  mb={2}
                >
                  Goals
                </Text>
                <UnorderedList mb={4}>
                  <ListItem>
                    Create a hub for people interested in decentralized
                    organizations &amp; applications.
                  </ListItem>
                  <ListItem>
                    Build the flow for onboarding people to Web3 and MetaGame
                  </ListItem>
                  <ListItem>
                    Establish a place where anyone interested in building things
                    or providing services in the DAO ecosystem can find their
                    place.
                  </ListItem>
                </UnorderedList>

                <Text mb={4}>Want to help? Need help?</Text>
                <Text mb={4}>
                   Check who’s connected to the raid &amp; contact them on
                  Discord or ask about it in{' '}
                  <Link
                    className="gradient"
                    href="https://discord.com/channels/629411177947987986/629411178837442601 "
                    title="Go to the 🏟-metasquare channel in MetaGame Discord"
                    isExternal
                  >
                    🏟-metasquare
                  </Link>
                </Text>

                <Text mt={8} mb={{ base: 12, lg: 8 }}>
                  <Link
                    color="white"
                    fontSize="3xl"
                    fontWeight={600}
                    fontFamily="mono"
                    textDecoration="underline"
                    textTransform="uppercase"
                    href="https://meta-game.notion.site/Season-VIII-1e7c8aef9dbd4d10a8ef91f21366bb27"
                    title="See the Season VIII Roadmap"
                    isExternal
                  >
                    Full Season VIII Roadmap
                  </Link>
                </Text>
              </Box>
            </Box>
          </Flex>
        </Container>

        <Image src={Octopus.src} pt={8} />
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
    </PageContainer>
  );
};

export default RaidsPage;
