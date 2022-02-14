import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  LoadingState,
  Text,
  VStack,
} from '@metafam/ds';
import Seeds from 'assets/menuIcon/seeds.svg';
import SeedCardBg from 'assets/seed-card-bg.png';
import SeedsFlowChart from 'assets/seeds-flowchart.png';
import { PageContainer } from 'components/Container';
import { HeadComponent } from 'components/Seo';
import { useRouter } from 'next/router';
import React from 'react';

const SeedsPage: React.FC = () => {
  const router = useRouter();

  if (router.isFallback) {
    return <LoadingState />;
  }

  return (
    <PageContainer py={8} px={4}>
      <VStack w="100%" spacing={{ base: 4, md: 8 }}>
        <HeadComponent
          title="MetaGame Seeds Page"
          description="seed description"
          url="https://my.metagame.wtf/seeds"
        />
        <Heading
          size="3xl"
          fontWeight={600}
          color="white"
          fontFamily="mono"
          pb={4}
          display="flex"
          flexDir="row"
        >
          Seeds{' '}
          <Image height={10} width={10} src={Seeds} alignSelf="end" ml={2} />
        </Heading>

        <Flex fontSize={18} flexDirection="column">
          Seeds are MetaGame’s labor token. <br />
          <br />
          People contribute towards creation of MetaGame, meanwhile generating
          XP & getting paid out on their XP generated - in Seeds.
          <br />
          <br />
          Here’s how it works (in Phase I*):
          <Image width="full" src={SeedsFlowChart} alignSelf="end" mt={4} />
        </Flex>
        {cardsData.map(({ title, description }) => (
          <Card title={title} description={description} />
        ))}
      </VStack>
    </PageContainer>
  );
};

type CardProps = {
  title: string;
  description: string;
};

const Card: React.FC<CardProps> = ({ title, description }) => (
  <Flex
    direction="column"
    bgColor="#110035"
    borderRadius="lg"
    borderWidth="1px"
    borderColor="whiteAlpha.400"
    textColor="white"
    alignItems="center"
    textAlign="center"
    bgImage={SeedCardBg}
    placeContent="center"
    p={8}
    minH="3xs"
  >
    <Box borderTopRadius="lg">
      <Text fontSize="xl" fontWeight="bold" mt={1} mb={4}>
        {title.toUpperCase()}
      </Text>
      <Text mb={2}>{description}</Text>
      <Button
        variant="ghost"
        color="magenta"
        _hover={{ bg: '#FFFFFF11' }}
        _active={{ bg: '#FF000011' }}
      >
        Learn more
      </Button>
    </Box>
  </Flex>
);

const cardsData = [
  {
    title: 'Usefulness of Seeds',
    description:
      'Currently used to reward players who actively contribute to building MetaGame, in the future seeds will be so much more useful!',
  },
  {
    title: 'BUYING & SELLING Seeds',
    description: 'Trading Seeds is easy! Just follow these few simple steps.',
  },
  {
    title: 'BECOME A PATRON',
    description:
      "Love the idea of MetaGame & want to see it succeed, but don't have time or skill to actively contribute? We've got you covered.",
  },
  {
    title: 'PLANTING & WATERING SEEDS',
    description:
      'Being a good patron means regularly watering your Seeds, and planting new ones, every once in a while.',
  },
  {
    title: 'GET RANKED!',
    description:
      'Top 56 players are ranked in leagues. The higher you reach, the more fame, glory and perks await you!',
  },
  {
    title: 'JOIN THE SEED FUND',
    description:
      'Don’t feel like watering Seeds yourself? Worry not, you can still be a caring patron, and leave all the work to us.',
  },
  {
    title: 'FAQ',
    description: 'Here are the most frequent questions about Seeds — answered.',
  },
];

export default SeedsPage;
