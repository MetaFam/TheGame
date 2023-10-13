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
import { MetaLink } from 'components/Link';
import { HeadComponent } from 'components/Seo';
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
  props: {},
  revalidate: 1,
});

/**
 * This page merges Paths & Playbooks into one page.
 * @returns All of the paths, playbooks, and great houses categorised in a single page.
 */
const AcademyPage: React.FC<Props> = () => {
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
        title="MetaGame Academy"
        description="MetaGame is a Massive Online Coordination Game! The Academy is full of Paths and Playbooks to help you find your way and level up in MetaGame & life."
        url="https://metagame.wtf/paths-and-playbooks"
      />
      <VStack spacing={7} w={{ base: '100%', xl: 'unset' }} maxW="92rem">
        <VStack spacing={1} w="full" align="flex-start">
          <Heading
            as="h1"
            fontFamily="body"
            fontWeight="600"
            fontSize={{ base: '4xl', sm: '6xl' }}
            textAlign="left"
            w={{ base: 'full', xl: ' full' }}
          >
            The Academy
          </Heading>
          <Text fontSize={{ base: 'lg', lg: 'xl' }} w="full" maxW="3xl">
            This place contains paths, playbooks and all things educational,
            related to MetaGame and the wider web3 community.
          </Text>
        </VStack>

        {Object.entries(QuestChainsCategoriesDetails).map((category, i) => {
          const {
            name: categoryName,
            title: categoryTitle,
            description,
          } = category[1];
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
                {description ? (
                  <Text fontSize={{ base: 'md', lg: 'lg' }} maxW="3xl">
                    {description}
                  </Text>
                ) : null}
              </VStack>
              {categoryItems.length > 0 ? (
                <Box
                  w={{ base: '100%', lg: 'calc(100% + 10rem)' }}
                  transform={{ base: 'unset', lg: 'translateX(-5rem)' }}
                  p={{ base: 0, lg: '1rem' }}
                  px={{ base: 0, lg: '5rem' }}
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
                  <Text as="p" fontSize={{ base: 'base', lg: 'xl' }}>
                    No quests found for this category. <br />
                    Why not{' '}
                    <MetaLink href="https://discord.gg/jDwXsQ6J" isExternal>
                      join the Discord
                    </MetaLink>{' '}
                    and find out how to create one and get it added!
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
          textShadow={{ base: '0 0 0.5rem rgba(0,0,0,0.8)' }}
          align="center"
          noOfLines={4}
          width="full"
          as="p"
        >
          {title}
        </Text>
      </Flex>
    </MetaTilePathPlaybook>
  </Link>
);

export default AcademyPage;
