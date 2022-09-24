import {
  ArrowUpIcon,
  AspectRatio,
  Box,
  Button,
  Container,
  Heading,
  Image,
  Link,
  LoadingState,
  Text,
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
              src="https://miro.com/app/live-embed/uXjVOmrCvsw=/?moveToViewport=-28488,-18198,37431,29871&embedId=657796986982"
              allowFullScreen
            />
          </AspectRatio>
        </Container>

        <Container maxW="7xl" w="100%">
          <Text
            mb={4}
            maxW={{ base: '100%', lg: '3xl' }}
            fontSize={{ base: 'md', md: 'lg' }}
          >
            You can get the latest info on any of these raids &amp; how to get
            involved by reading the{' '}
            <Link
              className="gradient"
              href="https://metagame.substack.com/"
              title="Read MetaGame’s Substack newsletter"
              isExternal
            >
              newsletter
            </Link>
            ,{' '}
            <Link
              className="gradient"
              href="https://meta-game.notion.site/e0e83b7ea2a54d6294c5e167ba7b306a?v=81e5d4755ab44c3a93df3eaaee6fd369"
              title="Visit MetaGame’s Notion site"
              isExternal
            >
              checking Notion
            </Link>{' '}
            or getting in touch with players connected to it.
          </Text>
          <Text as="blockquote">
            <Text
              mb={4}
              maxW={{ base: '100%', lg: '3xl' }}
              fontSize={{ base: 'md', md: 'lg' }}
            >
              Note: If you can't see the Discord channel, it means you need to
              join first.{' '}
              <Link
                className="gradient"
                href="https://wiki.metagame.wtf/docs/enter-metagame/join-metagame"
                title="Learn how to join MetaGame"
                isExternal
              >
                Learn how here
              </Link>{' '}
              or request access on{' '}
              <Link
                className="gradient"
                href="https://discord.gg/metagame"
                title="Go to MetaGame’s Discord server"
                isExternal
              >
                Discord
              </Link>
              .
            </Text>
          </Text>
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
