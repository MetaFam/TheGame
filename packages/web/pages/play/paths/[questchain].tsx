import { Text } from '@metafam/ds';
import { graphql } from '@quest-chains/sdk';
import { PageContainer } from 'components/Container';
import QuestChainDisplay from 'components/QuestChain/QuestChainDisplay';
import { HeadComponent } from 'components/Seo';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import React from 'react';
import {
  QuestChainRolesDetails,
  QuestChainsRoles,
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
    <PageContainer>
      <HeadComponent
        title={`${inputQuestChain.name}` ?? 'Untitled Quest Chain'}
        description="MetaGame is a Massive Online Coordination Game! MetaGame has some epic quests going on!"
        url="https://my.metagame.wtf/quests/path-of-the-engaged"
      />
      <QuestChainDisplay inputQuestChain={inputQuestChain} name={name} />
    </PageContainer>
  );
};

export default QuestChainPathPage;

type QueryParams = { questchain: QuestChainType };

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => ({
  paths: Object.values(QuestChainsRoles).map((questchain) => ({
    params: { questchain },
  })),
  fallback: false,
});

export const getStaticProps = async (
  context: GetStaticPropsContext<QueryParams>,
) => {
  const questChainName = context.params?.questchain;
  if (questChainName) {
    let questChain: graphql.QuestChainInfoFragment | null = null;
    try {
      const info = QuestChainRolesDetails[questChainName];
      questChain = await getQuestChainInfo(info.chainId, info.address);
      if (questChain != null) {
        return {
          props: {
            questChain,
            name: questChainName,
          },
          revalidate: 1,
        };
      }
    } catch (error) {
      console.error('error', error);
    }
  }
  return {
    notFound: true,
  };
};
