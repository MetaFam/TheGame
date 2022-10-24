import {
  ArrowUpIcon,
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Image,
  ListItem,
  LoadingState,
  Text,
  UnorderedList,
  VStack,
} from '@metafam/ds';
import Octopus from 'assets/octopus.png';
import SEEDsFlowChart from 'assets/seed-diagram.svg';
import SeedsIcon from 'assets/seeds-icon-green-blue_352x352.png';
import { PageContainer } from 'components/Container';
import { Card } from 'components/Seeds/Card';
import { cardsConfig } from 'components/Seeds/cardsConfig';
import { HeadComponent } from 'components/Seo';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';

const SEEDsPage: React.FC = () => {
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
      <VStack maxW="6xl" w="100%" spacing={{ base: 4, md: 20 }}>
        <HeadComponent
          title="MetaGame Seeds Page"
          description="Seeds are MetaGame’s labor token. People contribute towards creation of MetaGame, meanwhile generating XP &amp; getting paid out in Seeds proportional to their gained XP. Find out more."
          url="https://metagame.wtf/seeds"
        />

        <Container w="100%" maxW="6xl">
          {/* Needs to be a <Heading> instead of <MetaHeading> or ref won't work for the scroll to top */}
          <Heading
            fontSize="6xl"
            fontWeight={600}
            color="white"
            fontFamily="body"
            mb={[4, 4, 4, 12]}
            display="flex"
            flexDir="row"
            justifyContent="center"
            ref={topRef}
          >
            Seeds
            <Text pl={4} alignSelf="center" fontSize="4xl">
              🌱
            </Text>
          </Heading>
        </Container>

        <Container as="section" w="100%" maxW="6xl">
          <Heading
            as="h2"
            color="white"
            fontFamily="mono"
            fontWeight={700}
            mb={[4, 4, 4, 12]}
          >
            What are Seeds?
          </Heading>

          <Container
            maxW="lg"
            centerContent
            backgroundColor="whiteAlpha.200"
            backdropFilter="blur(7px)"
            boxShadow="md"
            borderRadius="lg"
          >
            <VStack spacing={8} py={8} px={4}>
              <Image src={SeedsIcon.src} alt="Cloaked figure" mx="auto" />

              <Box>
                <Text as="h3" fontWeight={700} mb={4}>
                  Seeds are MetaGame’s labor token
                </Text>
                <Text mb={4}>
                  People contribute towards creation of MetaGame, meanwhile
                  generating XP &amp; getting paid out in Seeds proportional to
                  their gained XP.
                </Text>

                <UnorderedList>
                  <ListItem>
                    All tokens are retroactive rewards for non-financial
                    contributions.
                  </ListItem>
                  <ListItem>
                    No tokens were minted for investment or speculation
                    purposes.
                  </ListItem>
                  <ListItem>
                    There was never any liquidity mining program, yet there is
                    liquidity. 🙃
                  </ListItem>
                </UnorderedList>
              </Box>
            </VStack>
          </Container>
        </Container>

        <Container as="section" w="100%" maxW="6xl">
          <Heading
            as="h2"
            color="white"
            fontFamily="mono"
            fontWeight={700}
            mb={[4, 4, 4, 12]}
          >
            Watering Seeds
          </Heading>

          <Image
            alt="Flowchart: how Seeds help MetaGame grow"
            src={SEEDsFlowChart.src}
            mx="auto"
          />
        </Container>

        <Grid templateColumns={['auto', 'auto', '1fr 1fr']} gap={6}>
          {cardsConfig.map(({ title, description, Content }) => (
            <Card {...{ title, description, Content }} key={title} />
          ))}
        </Grid>

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

export default SEEDsPage;
