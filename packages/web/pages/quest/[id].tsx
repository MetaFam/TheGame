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
import { MetaLink } from 'components/Link';
import { useGetQuestWithCompletionsQuery } from 'graphql/autogen/types';
import { getQuestWithCompletions } from 'graphql/getQuest';
import { getQuestIds } from 'graphql/getQuests';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

import { PageContainer } from '../../components/Container';
import { PlayerTile } from '../../components/Player/PlayerTile';
import { QuestCompletions } from '../../components/Quest/QuestCompletions';
import { QuestDetails } from '../../components/Quest/QuestDetails';
import { getSsrClient } from '../../graphql/client';
import { useUser } from '../../lib/hooks';
import { canCompleteQuest } from '../../utils/questHelpers';

type Props = {
  quest_id: string;
};

const QuestPage: React.FC<Props> = ({ quest_id }) => {
  const router = useRouter();
  const { user } = useUser();

  const [res] = useGetQuestWithCompletionsQuery({
    variables: {
      id: quest_id,
    },
  });
  const quest = res.data?.quest_by_pk;
  const canSubmit = useMemo<boolean>(() => canCompleteQuest(quest, user), [
    quest,
    user,
  ]);

  if (router.isFallback || !quest) {
    return (
      <PageContainer>
        <LoadingState />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Box w="100%" maxW="80rem">
        <Box mb={4} px={2}>
          <MetaButton
            as="a"
            variant="link"
            href="/quests"
            leftIcon={<FaArrowLeft />}
          >
            Back to quest explorer
          </MetaButton>
        </Box>

        <Wrap w="100%" justify="center" spacing={8}>
          <WrapItem
            flexGrow={3}
            flexShrink={1}
            flexBasis={0}
          >
            <Flex
              w="100%"
              align={{ base: 'center', lg: 'start' }}
              direction="column"
            >
              <Heading mb={4} ml={2}>
                Quest details
              </Heading>
              <QuestDetails quest={quest} />
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
              <Heading mb={4} ml={2}>
                Created by
              </Heading>
              <PlayerTile player={quest.player} />
            </Flex>
          </WrapItem>
        </Wrap>
        <Flex w="100%" direction="column" mt={8}>
          <HStack mb={4} justify="space-between">
            <Heading>Proposals</Heading>

            {canSubmit && (
              <MetaLink
                as={`/quest/${quest.id}/complete`}
                href="/quest/[id]/complete"
              >
                <MetaButton variant="outline" colorScheme="cyan">
                  Submit proposal
                </MetaButton>
              </MetaLink>
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
