import {
  Box,
  Heading,
  HStack,
  LoadingState,
  MetaButton,
  Text,
  Tooltip,
} from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { QuestFilter } from 'components/Quest/QuestFilter';
import { QuestList } from 'components/Quest/QuestList';
import { getQuests } from 'graphql/getQuests';
import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

import { useGetpSeedBalanceQuery } from '../graphql/autogen/types';
import { getSsrClient } from '../graphql/client';
import { useUser } from '../lib/hooks';
import { useQuestFilter } from '../lib/hooks/quests';
import { isAllowedToCreateQuest } from '../utils/questHelpers';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const [ssrClient, ssrCache] = getSsrClient();
  // This populate the cache server-side
  await getQuests(undefined, ssrClient);

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
    revalidate: 1,
  };
};

const QuestsPage: React.FC<Props> = () => {
  const router = useRouter();
  const { user } = useUser();
  const {
    quests,
    aggregates,
    fetching,
    error,
    queryVariables,
    setQueryVariable,
  } = useQuestFilter();
  const [respSeedBalance] = useGetpSeedBalanceQuery({
    variables: {
      address: user?.ethereum_address || '',
    },
    pause: !user?.ethereum_address,
  });
  const pSeedBalance =
    user?.ethereum_address &&
    respSeedBalance.data?.getTokenBalances?.pSeedBalance;
  const canCreateQuest = useMemo(() => isAllowedToCreateQuest(pSeedBalance), [
    pSeedBalance,
  ]);

  return (
    <PageContainer>
      <Box w="100%" maxW="80rem">
        <HStack justify="space-between" w="100%">
          <Heading>Quest explorer</Heading>
          <Tooltip
            label={
              !canCreateQuest &&
              'You need to hold at least 100 pSEED to create a quest'
            }
          >
            <MetaButton
              fontFamily="mono"
              // disabled={!canCreateQuest} // if disabled, tooltip doesn't show...
              isLoading={respSeedBalance.fetching}
              onClick={() => canCreateQuest && router.push('/quest/create')}
            >
              New Quest
            </MetaButton>
          </Tooltip>
        </HStack>
        <Box mt={8} w="100%">
          <QuestFilter
            aggregates={aggregates}
            queryVariables={queryVariables}
            setQueryVariable={setQueryVariable}
            quests={quests || []}
          />
        </Box>
        <Box mt={8} w="100%">
          {fetching && <LoadingState />}
          {error && <Text>Error: {error.message}</Text>}
          {quests && !fetching && <QuestList quests={quests} />}
        </Box>
      </Box>
    </PageContainer>
  );
};

export default QuestsPage;
