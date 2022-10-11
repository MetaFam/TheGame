import {
  Box,
  Flex,
  Heading,
  HStack,
  LoadingState,
  MetaButton,
  Wrap,
  WrapItem,
} from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { MetaLink } from 'components/Link';
import { PlayerTile } from 'components/Player/PlayerTile';
import { QuestCompletions } from 'components/Quest/QuestCompletions';
import { QuestDetails } from 'components/Quest/QuestDetails';
import { HeadComponent } from 'components/Seo';
import {
  Player,
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
import React, { useMemo } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { canCompleteQuest } from 'utils/questHelpers';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const QuestPage: React.FC<Props> = ({ quest_id }) => {
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

  return (
    <PageContainer>
      <HeadComponent
        title="MetaGame Quests"
        description={quest.title}
        url={`https://my.metagame.wtf/quest/${quest_id}`}
      />
      <Box w="100%" maxW="80rem">
        <Box mb={4} px={2}>
          <MetaLink href="/quests">
            <FaArrowLeft
              fontSize="0.875rem"
              style={{ display: 'inline-block', marginRight: '0.5rem' }}
            />
            Back to quest explorer
          </MetaLink>
        </Box>

        <Wrap w="100%" justify="center" spacing={8}>
          <WrapItem flexGrow={3} flexShrink={1} flexBasis={0}>
            <Flex
              w="100%"
              align={{ base: 'center', lg: 'start' }}
              direction="column"
            >
              <Heading as="h2" fontFamily="body" size="xl" mb={4} ml={2}>
                Quest: {quest.title}
              </Heading>
              <QuestDetails {...{ quest }} />
            </Flex>
          </WrapItem>
          <WrapItem
            flexGrow={1}
            flexShrink={1}
            flexBasis={{ base: '100%', lg: 0 }}
          >
            <Flex
              w="100%"
              align={{ base: 'center', lg: 'start' }}
              direction="column"
            >
              <Heading as="h3" fontFamily="body" size="xl" mb={4} ml={2}>
                Created by
              </Heading>
              <PlayerTile player={quest.player as Player} />
            </Flex>
          </WrapItem>
        </Wrap>
        <Flex w="100%" direction="column" mt={8} mb={8}>
          <HStack mb={4} justify="space-between">
            <Heading>Proposals</Heading>

            {canSubmit && (
              <MetaLink
                as={`/quest/${quest.id}/complete`}
                href="/quest/[id]/complete"
              >
                <MetaButton variant="outline" colorScheme="cyan">
                  Claim quest
                </MetaButton>
              </MetaLink>
            )}
            {!canSubmit && quest.repetition === QuestRepetition_Enum.Recurring && (
              <MetaButton variant="outline" colorScheme="cyan" isDisabled>
                (Cooldown)
              </MetaButton>
            )}
          </HStack>
          <QuestCompletions quest={quest} />
        </Flex>
      </Box>
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
