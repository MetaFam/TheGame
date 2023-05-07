import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  LoadingState,
  MetaButton,
} from '@metafam/ds';
import { httpLink } from '@metafam/utils';
import { PageContainer } from 'components/Container';
import { MetaLink } from 'components/Link';
import { questArticleCss } from 'components/Quest/QuestArticleCss';
import { QuestCompletions } from 'components/Quest/QuestCompletions';
import { QuestDetailsDescription } from 'components/Quest/QuestDetailsDescription';
// import { QuestDetails } from 'components/Quest/QuestDetails'; // Useful code in here still
import { QuestDetailsHeader } from 'components/Quest/QuestDetailsHeader';
import { QuestDetailsImage } from 'components/Quest/QuestDetailsImage';
import { QuestDetailsRequirementsRewards } from 'components/Quest/QuestDetailsRequirementsRewards';
import { HeadComponent } from 'components/Seo';
import {
  QuestRepetition_Enum,
  useGetQuestWithCompletionsQuery,
} from 'graphql/autogen/types';
import { getSsrClient } from 'graphql/client';
import { getQuestWithCompletions } from 'graphql/getQuest';
import { getQuestIds } from 'graphql/getQuests';
import { useUser } from 'lib/hooks';
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { useRouter } from 'next/router';
import DefaultQuestImage from 'public/assets/QuestsDefaultImage_900x900.jpg';
import React, { useMemo } from 'react';
import { canCompleteQuest } from 'utils/questHelpers';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const QuestPage: React.FC<Props> = ({ quest_id }) => {
  const router = useRouter();
  const { user } = useUser();
  const [res] = useGetQuestWithCompletionsQuery({
    variables: {
      id: quest_id,
    },
  });
  const quest = res.data?.quest_by_pk;
  const canSubmit = useMemo<boolean>(
    () => canCompleteQuest(quest, user),
    [quest, user],
  );

  if (router.isFallback || !quest) {
    return (
      <PageContainer>
        <LoadingState />
      </PageContainer>
    );
  }

  // Quest image is used in QuestDetailsImage and the share image
  const questImage = httpLink(quest.image) ?? DefaultQuestImage.src;

  return (
    <PageContainer sx={questArticleCss}>
      <HeadComponent
        title="MetaGame Quests"
        description={quest.title}
        url={`https://metagame.wtf/quest/${quest_id}`}
        img={questImage}
      />

      <Flex flexDirection="column" as="article" width="full" maxW="7xl" mb={6}>
        <>
          <QuestDetailsHeader {...{ quest }} />

          <Grid
            templateColumns={{
              base: '100%',
              lg: '1fr 20rem',
              xl: '1fr 25rem',
            }}
            templateRows={{
              base: 'auto',
              lg: 'min-content 100%',
            }}
            gap={{
              base: '8',
              '2xl': '14',
            }}
            mb={8}
          >
            <GridItem>
              <QuestDetailsImage src={questImage} />
            </GridItem>
            <GridItem as="aside" rowSpan={[null, null, null, 2]}>
              {/**
               * The aside shows two boxes: Requirements (roles, skills), and Rewards (a note about how the rewards are not fixed)
               */}
              <QuestDetailsRequirementsRewards {...{ quest }} />
            </GridItem>
            <GridItem>
              <QuestDetailsDescription {...{ quest }} />
            </GridItem>
          </Grid>

          <Flex as="footer" w="100%" direction="column" mt={8} mb={8}>
            <HStack mb={4} justify="space-between" align="left">
              <Heading>Proposals</Heading>

              {canSubmit && (
                <MetaLink
                  as={`/quest/${quest.id}/complete`}
                  href="/quest/[id]/complete"
                >
                  <MetaButton variant="outline" colorScheme="cyan">
                    Claim Quest
                  </MetaButton>
                </MetaLink>
              )}
              {!canSubmit &&
                quest.repetition === QuestRepetition_Enum.Recurring && (
                  <MetaButton variant="outline" colorScheme="cyan" isDisabled>
                    (Cooldown)
                  </MetaButton>
                )}
            </HStack>
            <QuestCompletions quest={quest} />
          </Flex>

          {/* order -1 puts it at the top of the article but putting it down here would keep it out of search engine summaries idk */}
          <Box mb={6} order={-1}>
            <MetaLink href="/quests" fontSize="xl">
              ← Back to Quest Explorer
            </MetaLink>
          </Box>
        </>
      </Flex>
    </PageContainer>
  );
};

type QueryParams = { id: string };

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const questIds = await getQuestIds(50);

  return {
    paths: questIds.map((id) => ({
      params: { id },
    })),
    fallback: true,
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<QueryParams>,
) => {
  const [ssrClient, ssrCache] = getSsrClient();

  const id = context.params?.id;
  const quest = await getQuestWithCompletions(id, ssrClient);
  if (!quest) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      quest_id: id,
      urqlState: ssrCache.extractData(),
    },
    revalidate: 1,
  };
};

export default QuestPage;
