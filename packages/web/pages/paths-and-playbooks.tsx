import {
  Box,
  Flex,
  Heading,
  Link,
  MetaTilePathPlaybook,
  Text,
  useBreakpointValue,
  VStack,
} from '@metafam/ds';
import { Carousel } from 'components/Carousel';
// import { Carousel } from 'components/Carousel';
import { PageContainer } from 'components/Container';
import { HeadComponent } from 'components/Seo';
import { QuestStatus_Enum } from 'graphql/autogen/types';
import { getQuests } from 'graphql/getQuests';
import { InferGetStaticPropsType } from 'next';
import React from 'react';
import {
  PathPlaybookType,
  QuestChainPathPlaybookPaths,
  QuestChainPathsAndPlaybooksDetails,
  QuestChainsCategoriesDetails,
} from 'utils/questChains';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => ({
  props: {
    quests: await getQuests({ status: QuestStatus_Enum.Open }),
    // playbooks: await getPlaybooks()
  },
  revalidate: 1,
});

const PathsAndPlaybooksPage: React.FC<Props> = () => {
  const carouselGap = useBreakpointValue({ base: 8, md: 6, lg: 32 }) || 32;
  const makeItemPath = (type: PathPlaybookType): string => {
    let urlPath: string;

    switch (type) {
      case 'path':
        urlPath = QuestChainPathPlaybookPaths.path;
        break;
      case 'playbook':
        urlPath = QuestChainPathPlaybookPaths.playbook;
        break;
      case 'greatHouse':
        urlPath = QuestChainPathPlaybookPaths.greatHouse;
        break;
      default:
        urlPath = '';
        break;
    }
    return urlPath;
  };

  return (
    <PageContainer>
      <HeadComponent
        title="Paths & Playbooks"
        description="MetaGame is a Massive Online Coordination Game! Guilds participating in MetaGame…"
        url="https://metagame.wtf/guilds"
      />
      <VStack spacing={7} w={{ base: '100%', xl: 'unset' }} maxW="92rem">
        <Heading
          as="h1"
          fontFamily="body"
          fontWeight="600"
          fontSize={{ base: '4xl', sm: '6xl' }}
          textAlign="left"
          w={{ base: 'full', xl: ' full' }}
        >
          Paths &amp; Playbooks
        </Heading>

        {Object.entries(QuestChainsCategoriesDetails).map((category, i) => {
          const { name: categoryName, title: categoryTitle } = category[1];
          const categoryItems = Object.entries(
            QuestChainPathsAndPlaybooksDetails,
          ).filter(([name, { category: cat }]) => cat === categoryName);

          return (
            <VStack
              key={category[1].name}
              spacing={{ base: 4, xl: 0 }}
              w="full"
              alignItems="left"
            >
              <VStack spacing={1} alignItems="left">
                <Heading
                  as="h2"
                  fontFamily="body"
                  fontWeight="600"
                  fontSize={{ base: '3xl', sm: '5xl' }}
                >
                  {categoryTitle}
                </Heading>
                {/* Description wasn't in the design but it is an option */}
                {/* {description ? (
                  <Text fontSize="xl" maxW="3xl">
                    {description}
                  </Text>
                ) : null} */}
              </VStack>
              {/* <Grid
                templateColumns={[
                  '1fr 1fr 1fr 1fr',
                  '1fr',
                  showGrid ? '1fr 1fr 1fr' : '1fr',
                  showGrid ? '1fr 1fr 1fr 1fr' : '1fr',
                ]}
                gap={{ base: 2, lg: 6, xl: 8 }}
                pb={{ base: 10, xl: 16 }}
              > */}
              {categoryItems.length > 0 ? (
                <Box
                  w="calc(100% + 10rem)"
                  transform="translateX(-5rem)"
                  p="1rem"
                  px="5rem"
                  mx="auto"
                  overflowY="hidden"
                  overflowX="hidden"
                >
                  <Carousel
                    gap={carouselGap}
                    shrinkItems
                    hidePositions
                    hideNav={false}
                  >
                    {categoryItems.map(
                      ([
                        name,
                        {
                          title,
                          image,
                          difficulty,
                          time,
                          category: cat,
                          seedsEarned,
                          type: pathType,
                        },
                      ]) => (
                        <Card
                          key={`${title}-card`}
                          {...{
                            title,
                            difficulty,
                            time,
                            link: `${makeItemPath(pathType)}${name}`,
                            image,
                            color: '#AB7C94',
                            category: cat,
                            seedsEarned,
                            length: categoryItems.length,
                            index: i,
                          }}
                        />
                      ),
                    )}
                  </Carousel>
                </Box>
              ) : (
                <Box w="full" textAlign="left">
                  <Text as="p" fontSize="xl">
                    No quests found for this category. Why not create one and
                    get it added!
                  </Text>
                </Box>
              )}
            </VStack>
          );
        })}
      </VStack>
    </PageContainer>
  );
};

type CardProps = {
  title: string;
  link: string;
  image: string;
  seedsEarned?: number;
  length: number;
  index: number;
};

const Card: React.FC<CardProps> = ({ title, link, image, length, index }) => (
  <Link role="group" _hover={{ textDecoration: 'none' }} href={link} w="full">
    <MetaTilePathPlaybook
      height="full"
      width="full"
      image={image}
      index={index}
      length={length}
      maxW={{ base: 24, xl: '20rem' }}
    >
      <Flex alignItems="center" justifyContent="center" h="full">
        <Text
          p={0}
          fontSize={{ base: 'xs', sm: '3xl' }}
          fontWeight={{ base: 900, xl: 900 }}
          align="center"
          noOfLines={4}
          width="full"
          as="p"
        >
          {title}
        </Text>
      </Flex>
      {/* This might get added in later
      <Flex
        position="absolute"
        inset={0}
        top="auto"
        width="full"
        py={4}
        flexFlow={'column'}
        alignItems={'center'}
      >
        <Text p={0} fontSize="2xl" fontWeight="400" align="center">
          {seedsEarned && seedsEarned > 0 ? seedsEarned : 0}
        </Text>
        <Text p={0} fontSize="xs" fontWeight="600" align="center">
          Seeds earned
        </Text>
      </Flex> */}
    </MetaTilePathPlaybook>
  </Link>
);

export default PathsAndPlaybooksPage;
