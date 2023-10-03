import {
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  Link,
  MetaTilePlaybook,
  Text,
  VStack,
} from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { HeadComponent } from 'components/Seo';
import { QuestStatus_Enum } from 'graphql/autogen/types';
import { getQuests } from 'graphql/getQuests';
import { InferGetStaticPropsType } from 'next';
import React from 'react';
import {
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

const PathsAndPlaybooksPage: React.FC<Props> = () => (
  <PageContainer>
    <HeadComponent
      title="Paths & Playbooks"
      description="MetaGame is a Massive Online Coordination Game! Guilds participating in MetaGame…"
      url="https://metagame.wtf/guilds"
    />
    <VStack spacing={7}>
      <Heading
        as="h1"
        fontFamily="body"
        fontWeight="600"
        fontSize={{ base: '4xl', sm: '6xl' }}
        textAlign="left"
        w={{ base: '95%', xl: ' full' }}
      >
        Paths &amp; Playbooks
      </Heading>

      {Object.entries(QuestChainsCategoriesDetails).map((category, i) => {
        const { name: categoryName, title: categoryTitle } = category[1];
        const categoryItems = Object.entries(
          QuestChainPathsAndPlaybooksDetails,
        ).filter(([name, { category: cat }]) => cat === categoryName);
        const showGrid = categoryItems.length > 0;
        return (
          <VStack key={category[1].name} spacing={8} w="full" alignItems="left">
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
            <Grid
              templateColumns={[
                '1fr',
                '1fr',
                showGrid ? '1fr 1fr 1fr' : '1fr',
                showGrid ? '1fr 1fr 1fr 1fr' : '1fr',
              ]}
              gap={{ base: 8, lg: 6, xl: 8 }}
              pb={16}
            >
              {categoryItems.length > 0 ? (
                categoryItems.map(
                  ([
                    name,
                    {
                      title,
                      image,
                      difficulty,
                      time,
                      category: cat,
                      seedsEarned,
                    },
                  ]) => {
                    if (cat !== categoryName) return null;
                    return (
                      <Card
                        key={title}
                        {...{
                          title,
                          difficulty,
                          time,
                          link: `/learn/playbooks/${name}`,
                          image,
                          color: '#AB7C94',
                          category,
                          seedsEarned,
                        }}
                      />
                    );
                  },
                )
              ) : (
                <Box w="full" textAlign="left">
                  <Text as="p" fontSize="xl">
                    No quests found for this category. Why not create one and
                    get it added!
                  </Text>
                </Box>
              )}
            </Grid>
          </VStack>
        );
      })}
    </VStack>
  </PageContainer>
);

type CardProps = {
  title: string;
  link: string;
  image: string;
  seedsEarned?: number;
};

const Card: React.FC<CardProps> = ({ title, link, image, seedsEarned }) => (
  <Link role="group" _hover={{ textDecoration: 'none' }} href={link}>
    <MetaTilePlaybook
      height="full"
      width="full"
      image={image}
      isPath
      maxW="21rem"
    >
      <Flex alignItems="center" justifyContent="center" h="full">
        <Text
          p={0}
          fontSize={{ base: '2xl', sm: '3xl' }}
          fontWeight="900"
          align="center"
        >
          {title}
        </Text>
      </Flex>
      {/* TODO: Where does this data come from? */}
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
      </Flex>
    </MetaTilePlaybook>
  </Link>
);

export default PathsAndPlaybooksPage;
