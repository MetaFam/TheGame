import {
  ArrowUpIcon,
  AspectRatio,
  Box,
  Button,
  Container,
  Heading,
  Image,
  Link,
  ListItem,
  LoadingState,
  Stack,
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
          url="https://my.metagame.wtf/raids"
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
            flexDir="row"
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
            such, they represent a chance for you to earn reputation, money
            &amp; stake in MetaGame.
          </Text>
        </Container>

        <Container maxW="7xl" w="100%">
          <AspectRatio mb={4} ratio={{ base: 3 / 4, md: 9 / 6 }}>
            <Box
              as="iframe"
              title="MetaGame Raids on Miro"
              src="https://miro.com/app/live-embed/uXjVOmrCvsw=/?moveToViewport=-27371,-18004,13656,9967&embedId=580966028043"
              allowFullScreen
            />
          </AspectRatio>
        </Container>

        <Container maxW="7xl" w="100%">
          <Heading
            as="h1"
            color="#a6b7f3"
            fontSize="4xl"
            fontWeight={600}
            fontFamily="mono"
            mb={[4, 4, 4, 8]}
          >
            Main Raids
          </Heading>

          <Stack
            direction={{ base: 'column', lg: 'row' }}
            maxW={{ base: '100%', lg: '5xl' }}
            spacing={{ base: 8, lg: 24 }}
            w="100%"
          >
            <Box w={{ base: '100%', lg: '50%' }} maxW="2xl">
              <Text
                as="h2"
                color="#a6b7f3"
                fontSize="2xl"
                fontWeight={400}
                fontFamily="mono"
              >
                MyMeta Profiles
              </Text>
              <Text mb={2}>
                MyMeta Profiles are decentralized profiles built on Ceramic.
                Think LinkedIn profiles for DAOists.{' '}
                <Link
                  className="gradient"
                  href="https://wiki.metagame.wtf/docs/what-we-do/mymeta"
                  title="Read more about MyMeta Profiles"
                  isExternal
                >
                  Read more here
                </Link>
                .
              </Text>

              <Text
                as="h2"
                color="#a6b7f3"
                fontSize="2xl"
                fontWeight={400}
                fontFamily="mono"
              >
                MetaOS
              </Text>
              <Text mb={2}>
                MetaOS is an open-source platform for building &amp; running
                composable communities.{' '}
                <Link
                  className="gradient"
                  href="https://wiki.metagame.wtf/docs/what-we-do/metaos"
                  title="Read more about MetaOS"
                  isExternal
                >
                  Read more here
                </Link>
                .
              </Text>
              {/* Quests &amp; QuestChains needs a description and link
              <Text 
                as="h2"
                color="#a6b7f3"
                fontSize="2xl"
                fontWeight={400}
                fontFamily="mono"
              >
                Quests &amp; QuestChains
              </Text>
              <Text mb={2}>
                Text text{' '}
                <Link
                  className="gradient"
                  href="https://metagame.wtf"
                  title="title"
                  isExternal
                >
                  Link text
                </Link>
              </Text> */}

              <Text
                as="h2"
                color="#a6b7f3"
                fontSize="2xl"
                fontWeight={400}
                fontFamily="mono"
              >
                The Onboarding Game
              </Text>
              <Text mb={2}>
                The Onboarding Game is a branching dialogue exploration game
                used for helping people understand Web3 &amp; join the space.
              </Text>

              <Text
                as="h2"
                color="#a6b7f3"
                fontSize="2xl"
                fontWeight={400}
                fontFamily="mono"
              >
                Buildin’ Bridges &amp; Integrations
              </Text>
              <Text mb={2}>
                Highlighting &amp;{' '}
                <Link
                  className="gradient"
                  href="https://meta-game.notion.site/Bridgebuilding-Questline-b98fc335c33f49f7ae86d2524d7d8e8c"
                  title="Read the Bridgebuilding Questline"
                  isExternal
                >
                  onboarding DAOs
                </Link>{' '}
                that want to become a part of MetaGame, integrating{' '}
                <Link
                  className="gradient"
                  href="https://metagame.wtf/quest/6524b99a-df7e-4c10-838d-c441a8417e77"
                  title="Custom Integration Quest description"
                  isExternal
                >
                  more blocks into MyMeta
                </Link>{' '}
                &amp;{' '}
                <Link
                  className="gradient"
                  href="https://metagame.wtf/quest/99047a66-533a-43a0-abc2-c9a9de85de46"
                  title="Dashboard Quest description"
                  isExternal
                >
                  dashboard
                </Link>
                , etc.
              </Text>

              <Text
                as="h2"
                color="#a6b7f3"
                fontSize="2xl"
                fontWeight={400}
                fontFamily="mono"
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
                &amp; share news about MetaGame &amp; MetaAlliance.
              </Text>

              <Text
                as="h2"
                color="#a6b7f3"
                fontSize="2xl"
                fontWeight={400}
                fontFamily="mono"
              >
                MetaRadio
              </Text>
              <Text mb={2}>
                MetaRadio is metaGame’s podcast network, comprised of 4
                different podcasts.{' '}
                <Link
                  className="gradient"
                  href="https://anchor.fm/MetaGame/"
                  title="Visit anchor.fm/MetaGame"
                  isExternal
                >
                  Listen to it here
                </Link>
                .
              </Text>

              <Text
                as="h2"
                color="#a6b7f3"
                fontSize="2xl"
                fontWeight={400}
                fontFamily="mono"
              >
                Great Houses &amp; Playbooks
              </Text>
              <Text mb={2}>
                Great Houses are about curating resources about different fields
                of interests &amp; playbooks are how-to guides.
              </Text>
            </Box>

            <Box w={{ base: '100%', lg: '50%' }} maxW="2xl">
              <Heading
                as="h1"
                color="#a6b7f3"
                fontSize="4xl"
                fontWeight={600}
                fontFamily="mono"
                mb={[4, 4, 4, 8]}
              >
                Phase I
              </Heading>

              <Text
                as="h2"
                color="#a6b7f3"
                fontSize="2xl"
                fontWeight={400}
                fontFamily="mono"
              >
                Memes
              </Text>
              <UnorderedList mb={2}>
                <ListItem>An Onboarding Machine</ListItem>
                <ListItem>A Decentralized Factory</ListItem>
              </UnorderedList>

              <Text
                as="h2"
                color="#a6b7f3"
                fontSize="2xl"
                fontWeight={400}
                fontFamily="mono"
              >
                Goals
              </Text>
              <UnorderedList mb={2}>
                <ListItem>
                  Create a hub for people interested in decentralized
                  organizations &amp; applications.
                </ListItem>
                <ListItem>
                  Build the flow for onboarding people to Web3 and/or MetaGame
                </ListItem>
                <ListItem>
                  Establish a place where anyone interested in building things
                  or providing services in the DAO ecosystem can find their
                  place.
                </ListItem>
              </UnorderedList>

              <Text
                as="h2"
                color="#a6b7f3"
                fontSize="2xl"
                fontWeight={400}
                fontFamily="mono"
                mt={8}
              >
                Want to help? Need help?
              </Text>
              <Text mb={2}>
                Check who are the people conntected to the raid &amp; contact
                them on Discord or ask in{' '}
                <Link
                  className="gradient"
                  href="https://discord.com/channels/629411177947987986/713513935789097102"
                  title="Go to the ⁉-ask-anything channel in MetaGame Discord"
                  isExternal
                >
                  ⁉-ask-anything
                </Link>
              </Text>

              <Link
                as="h2"
                color="#a6b7f3"
                fontSize="4xl"
                fontWeight={400}
                fontFamily="mono"
                href="https://meta-game.notion.site/Season-VII-1e7c8aef9dbd4d10a8ef91f21366bb27"
                title="See the Season VII Roadmap"
                mt={8}
                isExternal
              >
                Full Season VII Roadmap
              </Link>
            </Box>
          </Stack>
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
    </PageContainer>
  );
};

export default RaidsPage;
