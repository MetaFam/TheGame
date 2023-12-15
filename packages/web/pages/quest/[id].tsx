import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  LoadingState,
  MetaButton,
  Text,
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
  QuestStatus_Enum,
  useGetQuestWithCompletionsQuery,
} from 'graphql/autogen/types';
import { getSSRClient } from 'graphql/client';
import { getQuestWithCompletions } from 'graphql/getQuest';
import { getQuestIds } from 'graphql/getQuests';
import { useUser } from 'lib/hooks';
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { useRouter } from 'next/router';
import { SSRData } from 'next-urql';
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

  // 'Quest was archiveed' note
  // A note is shown if we're viewing a quest that has been archived
  const isQuestSetAsArchived = quest.status === QuestStatus_Enum.Archived;

  // Here's the content of the Quest was archived note, which is shown if isQuestSetAsArchived = true
  function showArchivedAlert() {
    return (
      <Alert
        mb={8}
        p={6}
        status="warning"
        variant="subtle"
        bgColor="whiteAlpha.100"
      >
        <AlertIcon boxSize="60px" mr={6} color="blue.50" />
        <Box>
          <AlertTitle fontSize="2xl" mb={3}>
            Heads up!
          </AlertTitle>
          <AlertDescription>
            <Text as="p" mb={2}>
              This quest was archived by its owner. You can view the quest
              details, and try out the quest if you feel like it.
            </Text>
            <Text as="p" mb={2}>
              You won’t be able to claim the quest or get any rewards.
            </Text>
          </AlertDescription>
        </Box>
      </Alert>
    );
  }

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
              <>
                {/* Show a message if the quest has been archived */}
                {isQuestSetAsArchived && showArchivedAlert()}
                <QuestDetailsDescription {...{ quest }} />
              </>
            </GridItem>
          </Grid>

          <Flex as="footer" w="100%" direction="column" mt={8} mb={8}>
            <HStack mb={4} justify="space-between" align="left">
              <Heading
                as="h2"
                fontFamily="body"
                fontWeight="600"
                fontSize={{ base: '4xl', md: '6xl' }}
                lineHeight={1.1}
              >
                Proposals
              </Heading>

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
): Promise<
  | {
      props: {
        quest_id?: string;
        urqlState: SSRData;
      };
      revalidate: 1;
    }
  | { notFound: boolean }
> => {
  const [ssrClient, ssrCache] = getSSRClient();

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
