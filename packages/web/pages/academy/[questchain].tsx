import { Text } from '@metafam/ds';
import { graphql } from '@quest-chains/sdk';
import { PageContainer } from 'components/Container';
import QuestChainDisplay from 'components/QuestChain/QuestChainDisplay';
import { HeadComponent } from 'components/Seo';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import React from 'react';
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

const QuestChainPathPage: React.FC<Props> = ({
  questChain: inputQuestChain,
  name,
}) => {
  if (!inputQuestChain) {
    return (
      <PageContainer>
        <Text> Quest Chain not found! </Text>
      </PageContainer>
    );
  }

  return (
    <PageContainer maxW="96rem" alignSelf="center">
      <HeadComponent
        title={inputQuestChain.name ?? 'Untitled Quest Chain'}
        description="MetaGame is a Massive Online Coordination Game! MetaGame has some epic quests going on!"
        url="https://metagame.wtf/academy"
      />

      <QuestChainDisplay inputQuestChain={inputQuestChain} name={name} />
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
    const info = QuestChainPathsAndPlaybooksDetails[questchain];
    if (!info) {
      throw new Error(`Quest chain "${questchain}" not found.`);
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
