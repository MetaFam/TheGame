import { Box, Center, Link, Text, VStack } from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { HeadComponent } from 'components/Seo';
import { QuestStatus_Enum } from 'graphql/autogen/types';
import { getQuests } from 'graphql/getQuests';
import { InferGetStaticPropsType } from 'next';
import React from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => ({
  props: {
    quests: await getQuests({status: QuestStatus_Enum.Open}),
    // playbooks: await getPlaybooks()
  },
  revalidate: 1,
});

const PathsAndPlaybooksPage: React.FC<Props> = ({ quests }) => {
  console.log({quests});

  return (
    <PageContainer>
      <HeadComponent
        title="Paths & Playbooks"
        description="MetaGame is a Massive Online Coordination Game! Guilds participating in MetaGame…"
        url="https://metagame.wtf/guilds"
      />

      {/* VStack is used to make a consistent gap between the Join CTA and the Guilds list */}
      <VStack maxW="7xl" w="100%" spacing={{ base: 6, md: 8 }} pb={8}>
        <Center
          fontSize={{ base: 'sm', md: 'md' }}
          fontWeight={{ base: '400', md: '700' }}
          marginTop={{ base: 3, sm: 0 }}
          w="100%"
          maxW="4xl"
        >
          <Text as="p" textAlign="center">
            Paths and playbooks.
          </Text>
        </Center>

        <Box>
          {/* {quests && quests.length > 0 && (

            quests.map((quest) => {
              return (
              <Box>{quest.title}</Box>
              )

          })
        )} */}
        </Box>
      </VStack>
    </PageContainer>
  );
}

export default PathsAndPlaybooksPage;
