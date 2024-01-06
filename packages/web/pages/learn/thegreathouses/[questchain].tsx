import { Box, Spinner, Text, VStack } from '@metafam/ds';
import { graphql } from '@quest-chains/sdk';
import { PageContainer } from 'components/Container';
import { MetaLink } from 'components/Link';
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
import { FaArrowLeft } from 'react-icons/fa';
import { errorHandler } from 'utils/errorHandler';
import {
  QuestChainGreatHousesDetails,
  QuestChainsGreatHouses,
  QuestChainType,
} from 'utils/questChains';

const { getQuestChainInfo } = graphql;

type Props = {
  questChain: graphql.QuestChainInfoFragment;
  name: QuestChainType;
};

const QuestChainPathPage: React.FC<Props> = ({
  questChain: inputQuestChain,
  name,
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
        title={inputQuestChain.name ?? 'Unknown Great House'}
        description="MetaGame is a Massive Online Coordination Game! MetaGame has some epic quests going on!"
        url="https://metagame.wtf/learn/thegreathouses"
      />
      <VStack spacing={8} w="100%" maxW="96rem" align="stretch">
        <Box w="100%">
          <MetaLink href="/learn/thegreathouses">
            <FaArrowLeft
              fontSize="0.875rem"
              style={{ display: 'inline-block', marginRight: '0.5rem' }}
            />
            Back to the Great Houses
          </MetaLink>
        </Box>
        <Heading
          {...{
            questChain,
            progress,
            canMint,
            refresh,
            name,
          }}
        />
        <Text fontSize={{ base: 30, lg: 40 }} fontFamily="exo2" w="100%">
          Quests
        </Text>

        {fetching ? (
          <Spinner my={20} />
        ) : (
          <Chain
            {...{
              questChain,
              userStatus,
              refresh,
            }}
          />
        )}
      </VStack>
    </PageContainer>
  );
};

export default QuestChainPathPage;

type QueryParams = { questchain: QuestChainType };

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => ({
  paths: Object.values(QuestChainsGreatHouses).map((questchain) => ({
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
    const info = QuestChainGreatHousesDetails[questchain];
    questChain = await getQuestChainInfo(info.chainId, info.address);
  } catch (error) {
    errorHandler(error as Error);
  }

  return {
    props: {
      questChain,
      name: questchain,
    },
    revalidate: 1,
  };
};
