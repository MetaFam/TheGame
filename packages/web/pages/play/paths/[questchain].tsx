import { Spinner, Text, VStack } from '@metafam/ds';
import { graphql } from '@quest-chains/sdk';
import { PageContainer } from 'components/Container';
import { Chain } from 'components/QuestChain/Chain';
import Heading from 'components/QuestChain/QuestHeading';
import { HeadComponent } from 'components/Seo';
import { useWeb3 } from 'lib/hooks';
import {
  useLatestQuestChainData,
  useLatestQuestStatusesForUserAndChainData,
  useUserProgress,
  useUserStatus,
} from 'lib/hooks/questChains';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import React, { useCallback } from 'react';
import {
  QuestChainDetails,
  QuestChains,
  QuestChainType,
} from 'utils/questChains';

const { getQuestChainInfo } = graphql;

type Props = {
  questChain: graphql.QuestChainInfoFragment;
};

const QuestChainPathPage: React.FC<Props> = ({
  questChain: inputQuestChain,
}) => {
  const { address } = useWeb3();

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
    inputQuestChain.chainId,
    inputQuestChain.address,
    address,
  );

  const fetching = fetchingStatus || fetchingQuests;

  const refresh = useCallback(() => {
    refreshStatus();
    refreshQuests();
  }, [refreshQuests, refreshStatus]);

  const userStatus = useUserStatus(questStatuses);

  const { progress, canMint } = useUserProgress(
    address,
    questChain,
    userStatus,
  );

  if (!questChain) {
    return (
      <PageContainer>
        <Text> Quest Chain not found! </Text>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <HeadComponent
        title={`MetaGame ${inputQuestChain.name}`}
        description="MetaGame is a Massive Online Coordination Game! MetaGame has some epic quests going on!"
        url="https://my.metagame.wtf/quests/path-of-the-engaged"
      />
      <VStack spacing={20} w="100%" maxW="96rem" align="stretch">
        <Heading
          questChain={questChain}
          progress={progress}
          canMint={canMint}
        />
        <Text fontSize={40} fontFamily="heading" w="100%">
          Quests
        </Text>

        {fetching ? (
          <Spinner my={20} />
        ) : (
          <Chain
            questChain={questChain}
            userStatus={userStatus}
            refresh={refresh}
          />
        )}
      </VStack>
    </PageContainer>
  );
};

export default QuestChainPathPage;

type QueryParams = { questchain: QuestChainType };

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => ({
  paths: Object.values(QuestChains).map((questchain) => ({
    params: { questchain },
  })),
  fallback: false,
});

export const getStaticProps = async (
  context: GetStaticPropsContext<QueryParams>,
) => {
  const questchain = context.params?.questchain;
  if (!questchain) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  let questChain: graphql.QuestChainInfoFragment | null = null;
  try {
    const info = QuestChainDetails[questchain];
    questChain = await getQuestChainInfo(info.chainId, info.address);
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
