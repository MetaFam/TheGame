import {
  ArrowUpIcon,
  Box,
  Button,
  Flex,
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
import SeedsFlowChart from 'assets/seeds-flowchart.png';
import { PageContainer } from 'components/Container';
import { Card } from 'components/Seeds/Card';
import { cardsConfig } from 'components/Seeds/cardsConfig';
import { HeadComponent } from 'components/Seo';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';

const SeedsPage: React.FC = () => {
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
          title="MetaGame Seeds Page"
          description="seed description"
          url="https://my.metagame.wtf/seeds"
        />
        <Grid templateColumns={['auto', 'auto', 'auto', '1fr 1fr']} gap={6}>
          <Flex fontSize={18} flexDirection="column">
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
              Seeds
              <Text pl={4} alignSelf="center" fontSize="4xl">
                🌱
              </Text>
            </Heading>
            <Text mb={4}>Seeds are MetaGame's labor token.</Text>
            <Text mb={4}>
              People contribute towards creation of MetaGame, meanwhile
              generating XP & getting paid out in Seeds proportional to their
              gained XP
            </Text>
            <Flex direction="column" ml={4}>
              <UnorderedList spacing={2}>
                <ListItem>
                  All tokens are retroactive rewards for non-financial
                  contributions.
                </ListItem>
                <ListItem>
                  No tokens were minted for investment or speculation purposes.
                </ListItem>
                <ListItem>
                  There was never any liquidity mining program, yet there is
                  liquidity. 🙃
                </ListItem>
              </UnorderedList>
            </Flex>
          </Flex>
          <Image width="full" src={SeedsFlowChart} alignSelf="end" mt={4} />
        </Grid>

        <Grid
          templateColumns={['auto', 'auto', '1fr 1fr', '1fr 1fr 1fr']}
          gap={6}
        >
          {cardsConfig.map(({ title, description, Content }) => (
            <Card title={title} description={description} Content={Content} />
          ))}
        </Grid>
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

export default SeedsPage;
