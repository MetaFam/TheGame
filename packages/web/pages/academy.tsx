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
import { PageContainer } from 'components/Container';
import { MetaLink } from 'components/Link';
import { HeadComponent } from 'components/Seo';
import React, { useCallback } from 'react';
import {
  PathPlaybookType,
  QuestChainPathPlaybookPaths,
  QuestChainPathsAndPlaybooksDetails,
  QuestChainsCategoriesDetails,
} from 'utils/questChains';

/**
 * This page merges Paths & Playbooks into one page.
 * @returns All of the paths, playbooks, and great houses categorised in a single page.
 */
const AcademyPage: React.FC = () => {
  const carouselGap =
    useBreakpointValue({ base: 8, md: 8, xl: 24, '2xl': 32 }) || 32;
  const cardMinWidth =
    useBreakpointValue({
      base: '9.75rem',
      md: '12rem',
      xl: '16.475rem',
      '2xl': '21.5rem',
    }) || '21.5rem';
  const itemsOnScreen = useBreakpointValue({
    base: 2,
    md: 3,
    lg: 3,
    xl: 4,
    '2xl': 4,
  });

  const makeItemPath = useCallback((type: PathPlaybookType): string => {
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
  }, []);

  return (
    <PageContainer>
      <HeadComponent
        title="Academy"
        description="MetaGame is a Massive Online Coordination Game! The Academy is full of Paths and Playbooks to help you find your way and level up in MetaGame & life."
        url="https://metagame.wtf/paths-and-playbooks"
      />
      <VStack
        pb={{ base: 8, xl: 10, '2xl': 16 }}
        spacing={7}
        w={{ base: '100%', xl: 'unset' }}
        maxW={{ base: 'unset', xl: '6xl', '2xl': '92rem' }}
      >
        <VStack spacing={1} mb={{ base: 6, '2xl': 12 }} w="full" align="center">
          <Heading
            as="h1"
            fontFamily="body"
            fontWeight="600"
            fontSize={{ base: '4xl', '2xl': '6xl' }}
            textAlign="center"
            w={{ base: 'full', xl: ' full' }}
          >
            The Academy
          </Heading>
          <Text
            fontSize={{ base: 'md', '2xl': 'xl' }}
            w="full"
            maxW="4xl"
            textAlign="center"
          >
            A place of paths, playbooks, and all things educational related to
            MetaGame.
          </Text>
        </VStack>

        {Object.entries(QuestChainsCategoriesDetails).map((category, i) => {
          if (category[1].name === 'all') return null;
          const {
            name: categoryName,
            title: categoryTitle,
            description,
          } = category[1];
          const categoryItems = Object.entries(
            QuestChainPathsAndPlaybooksDetails,
          ).filter(
            ([, { category: cat }]) => cat === categoryName && cat !== 'all',
          );

          const allItem = Object.entries(
            QuestChainPathsAndPlaybooksDetails,
          ).filter(([, { category: cat }]) => cat === 'all');
          if (allItem.length > 0 && category) {
            categoryItems.push(allItem[0]);
          }

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
                  fontSize={{ base: '3xl', '2xl': '5xl' }}
                >
                  {categoryTitle}
                </Heading>
                {description ? (
                  <Text fontSize={{ base: 'md', '2xl': 'lg' }} maxW="3xl">
                    {description}
                  </Text>
                ) : null}
              </VStack>
              {categoryItems.length > 0 ? (
                <Box
                  position="relative"
                  w={{
                    base: 'calc(100% + 1.5rem)',
                    md: 'calc(100% + 1rem)',
                    xl: 'calc(100% + 4rem)',
                    '2xl': 'calc(100% + 10rem)',
                  }}
                  transform={{
                    base: 'translateX(-0.75rem)',
                    md: 'translateX(-0.5rem)',
                    xl: 'translateX(-2rem)',
                    '2xl': 'translateX(-5rem)',
                  }}
                  p={{ base: 0, md: '0.5rem', xl: '1rem' }}
                  px={{
                    base: '1.25rem',
                    md: '0.5rem',
                    xl: '2rem',
                    '2xl': '5rem',
                  }}
                  mx="auto"
                  overflowY="hidden"
                  overflowX="hidden"
                >
                  <Carousel
                    gap={carouselGap}
                    defaultCarousel={false}
                    itemsToShow={itemsOnScreen}
                    hidePositions
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
                            minWidth: cardMinWidth,
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
                    <MetaLink href="https://chat.metagame.wtf/" isExternal>
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
  minWidth: string | number;
};

const Card: React.FC<CardProps> = ({
  title,
  link,
  image,
  length,
  index,
  minWidth,
}) => (
  <Link
    role="group"
    _hover={{ textDecoration: 'none' }}
    href={link}
    w="100%"
    minW={minWidth}
    maxW={minWidth}
    p={0}
  >
    <MetaTilePathPlaybook image={image} index={index} length={length}>
      <Flex alignItems="center" justifyContent="center" h="full" w="full">
        <Text
          p={0}
          fontSize={{ base: 'xs', lg: 'xl', '2xl': '3xl' }}
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
