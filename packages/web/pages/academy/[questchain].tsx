import { Text } from '@metafam/ds';
import { graphql } from '@quest-chains/sdk';
import QuestChainDisplay from 'components/QuestChain/QuestChainDisplay';
import { HeadComponent } from 'components/Seo';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import React, { lazy } from 'react';
import { errorHandler } from 'utils/errorHandler';
import {
  QuestChainPathsAndPlaybooksDetails,
  QuestChains,
  QuestChainType,
} from 'utils/questChains';

const { getQuestChainInfo } = graphql;

type Props = {
  questChain: graphql.QuestChainInfoFragment;
  name: QuestChainType;
};

const PageContainer = lazy(() => import('components/Container'));

const QuestChainPathPage: React.FC<Props> = ({ questChain, name }) => {
  if (!questChain) {
    return (
      <PageContainer>
        <Text>Quest Chain not found!</Text>
      </PageContainer>
    );
  }

  return (
    <PageContainer maxW="96rem" alignSelf="center">
      <HeadComponent
        title={questChain.name ?? 'Untitled Quest Chain'}
        description="MetaGame is a Massive Online Coordination Game! MetaGame has some epic quests going on!"
        url={`https://metagame.wtf/academy/${name}`}
      />

      <QuestChainDisplay {...{ questChain, name }} />
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

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<QueryParams>) => {
  const { questchain } = params ?? {};
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
    const info =
      QuestChainPathsAndPlaybooksDetails[
        questchain as keyof typeof QuestChainPathsAndPlaybooksDetails
      ];
    if (!info) {
      throw new Error(`Quest Chain, "${questchain}", not found.`);
    }
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
