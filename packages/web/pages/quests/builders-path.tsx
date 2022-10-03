import { Flex, Spinner, Text } from '@metafam/ds';
import { graphql } from '@quest-chains/sdk';
import { PageContainer } from 'components/Container';
import { Chain } from 'components/Quest/QuestChain/Chain';
import Heading from 'components/Quest/QuestChain/QuestHeading';
import { UserStatusType } from 'components/Quest/UploadProofButton';
import { HeadComponent } from 'components/Seo';
import { useWeb3 } from 'lib/hooks';
import { useLatestQuestChainData } from 'lib/hooks/useLatestQuestChainData';
import { useLatestQuestStatusesForUserAndChainData } from 'lib/hooks/useLatestQuestStatusesForUserAndChainData';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { QUESTS } from 'utils/questChains';

const { getQuestChainInfo } = graphql;

type Props = {
  questChain: graphql.QuestChainInfoFragment;
};

const EngagedQuests: React.FC<Props> = ({ questChain: inputQuestChain }) => {
  const { address } = useWeb3();

  const [progress, setProgress] = useState({
    total: 0,
    inReviewCount: 0,
    completeCount: 0,
  });

  const {
    questChain,
    fetching: fetchingQuests,
    refresh: refreshQuests,
  } = useLatestQuestChainData(inputQuestChain);

  const {
    questStatuses,
    fetching: fetchingStatus,
    refresh: refreshStatus,
  } = useLatestQuestStatusesForUserAndChainData(
    QUESTS.ENGAGED.chainId,
    QUESTS.ENGAGED.address,
    address,
  );

  const fetching = fetchingStatus || fetchingQuests;

  const refresh = useCallback(() => {
    refreshStatus();
    refreshQuests();
  }, [refreshQuests, refreshStatus]);

  const userStatus: UserStatusType = useMemo(() => {
    const userStat: UserStatusType = {};
    questStatuses.forEach((item) => {
      userStat[item.quest.questId] = {
        status: item.status,
        submissions: item.submissions.map((sub) => ({
          description: sub.description,
          externalUrl: sub.externalUrl,
          timestamp: sub.timestamp,
        })),
        reviews: item.reviews.map((sub) => ({
          description: sub.description,
          externalUrl: sub.externalUrl,
          timestamp: sub.timestamp,
          accepted: sub.accepted,
          reviewer: sub.reviewer.id,
        })),
      };
    });
    return userStat;
  }, [questStatuses]);

  useEffect(() => {
    if (questChain) {
      if (questChain?.quests) {
        const inReviewCount = questChain.quests.filter(
          (quest) => userStatus[quest.questId]?.status === 'review',
        ).length;
        const completeCount = questChain.quests.filter(
          (quest) => userStatus[quest.questId]?.status === 'pass',
        ).length;

        setProgress({
          inReviewCount: inReviewCount || 0,
          completeCount: completeCount || 0,
          total: questChain.quests.length || 0,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questChain, userStatus]);

  const canMint = useMemo(
    () =>
      !!address &&
      questChain?.token &&
      !questChain.token.owners.find((o) => o.id === address.toLowerCase()) &&
      Object.values(userStatus).length === questChain.quests.length &&
      Object.values(userStatus).reduce(
        (t, v) => t && v.status === graphql.Status.Pass,
        true,
      ),
    [questChain, address, userStatus],
  );

  if (!questChain) {
    return (
      <PageContainer>
        <Text> Quest Chain not found! </Text>
      </PageContainer>
    );
  }

  return (
    <Flex
      justifyContent="space-between"
      direction={{ base: 'column', md: 'row' }}
      maxW="full"
      w="100%"
      h="100%"
      p={{ base: 3, sm: 8, lg: 12 }}
      align="center"
      pos="relative"
      overflow="auto"
      gap={160}
    >
      <HeadComponent
        title="MetaGame Quests"
        description="MetaGame is a Massive Online Coordination Game! MetaGame has some epic quests going on!"
        url="https://my.metagame.wtf/quests/path-of-the-engaged"
      />

      <Heading questChain={questChain} progress={progress} canMint={canMint} />

      <Flex w="full" h="full" flexDirection="column">
        <Text fontSize={40} fontFamily="heading">
          QUESTS
        </Text>
        {/* Quests */}
        {fetching ? (
          <Spinner />
        ) : (
          <Chain
            questChain={questChain}
            userStatus={userStatus}
            refresh={refresh}
          />
        )}
      </Flex>
    </Flex>
  );
};

export const getStaticProps = async () => {
  let questChain;
  try {
    questChain = await getQuestChainInfo(
      QUESTS.BUILDERS.chainId,
      QUESTS.BUILDERS.address,
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('error', error);
  }

  return {
    props: {
      questChain,
    },
    revalidate: 1,
  };
};

export default EngagedQuests;
