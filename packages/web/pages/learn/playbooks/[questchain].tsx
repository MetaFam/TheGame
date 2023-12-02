import { Box, Flex, Image, Spinner, Text, VStack } from '@metafam/ds';
import { imageLink } from '@metafam/utils';
import { graphql } from '@quest-chains/sdk';
import { PageContainer } from 'components/Container';
import { MetaLink } from 'components/Link';
import { MarkdownViewer } from 'components/MarkdownViewer';
import { MintNFTTile } from 'components/QuestChain/MintNFTTile';
import { ChainStats } from 'components/QuestChain/QuestHeading';
import { UploadProofButton } from 'components/QuestChain/UploadProofButton';
import { HeadComponent } from 'components/Seo';
import { useWeb3 } from 'lib/hooks';
import {
  useLatestQuestChainData,
  useLatestQuestStatusesForUserAndChainData,
  useUserProgress,
  useUserStatus,
} from 'lib/hooks/questChains';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import React, { useCallback, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { errorHandler } from 'utils/errorHandler';
import {
  QuestChainPlaybooksDetails,
  QuestChainsPlaybooks,
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

  const [selected, setSelected] = useState('introduction');

  const bgColor = (questStatus: string) => {
    switch (questStatus) {
      case graphql.Status.Pass:
        return '#2DF8C7';
      case graphql.Status.Review:
        return '#EFFF8F';
      default:
        return 'rgba(0, 0, 0, 0.3);';
    }
  };

  if (!questChain) {
    return (
      <PageContainer>
        <Text> Quest Chain not found! </Text>
      </PageContainer>
    );
  }

  return (
    <PageContainer maxW="96rem" alignSelf="center">
      <HeadComponent
        title={`MetaGame ${inputQuestChain.name}`}
        description="MetaGame is a Massive Online Coordination Game! MetaGame has some epic quests going on!"
        url="https://metagame.wtf/learn/playbooks"
      />
      <VStack spacing={8} w="full" align="stretch">
        <Box w="100%">
          <MetaLink href="/learn/playbooks">
            <FaArrowLeft
              fontSize="0.875rem"
              style={{ display: 'inline-block', marginRight: '0.5rem' }}
            />
            Back to the Playbooks
          </MetaLink>
        </Box>
        <Text
          fontSize={{ base: '3xl', lg: '7xl' }}
          fontWeight="bold"
          lineHeight="3.5rem"
          fontFamily="exo2"
          mb={3}
          align="center"
        >
          {questChain.name}
        </Text>

        {fetching ? (
          <Spinner my={20} />
        ) : (
          <Flex w="full" gap={8} direction={{ base: 'column', md: 'row' }}>
            {/* content */}
            <Flex
              direction="column"
              background="rgba(255, 255, 255, 0.08)"
              height="fit-content"
              mixBlendMode="normal"
              backdropFilter="blur(44px)"
              p={3}
              minW={300}
              borderRadius={4}
            >
              <Text
                fontSize={24}
                fontWeight="bold"
                textTransform="uppercase"
                mb={3}
              >
                Content
              </Text>
              <Flex direction="column">
                <Flex
                  p={2}
                  borderRadius={4}
                  backgroundColor={
                    selected === 'introduction'
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'transparent'
                  }
                  cursor="pointer"
                  onClick={() => setSelected('introduction')}
                  gap={3}
                  alignItems="center"
                >
                  <Box
                    backgroundColor="#2DF8C7"
                    w={4}
                    h={4}
                    borderRadius="full"
                  />
                  Introduction
                </Flex>
                {questChain.quests
                  .filter((q) => !q.paused)
                  .map((quest) => (
                    <Flex
                      borderRadius={4}
                      backgroundColor={
                        selected === quest.id
                          ? 'rgba(255, 255, 255, 0.08)'
                          : 'transparent'
                      }
                      p={2}
                      onClick={() => setSelected(quest.id)}
                      cursor="pointer"
                      gap={3}
                      alignItems="center"
                    >
                      <Box
                        backgroundColor={bgColor(userStatus[selected]?.status)}
                        w={4}
                        h={4}
                        borderRadius="full"
                      />
                      {quest.name}
                    </Flex>
                  ))}
              </Flex>
            </Flex>

            {/* stats */}
            <Flex direction="column" w="full" gap={8} pb={8}>
              <ChainStats questChain={questChain} progress={progress} />
              <MarkdownViewer>
                {selected === 'introduction'
                  ? questChain.description
                  : questChain.quests.find((q) => q.id === selected)
                      ?.description}
              </MarkdownViewer>
              {selected !== 'introduction' && (
                <Flex justifyContent="center" w="full">
                  <UploadProofButton
                    questId={selected}
                    name={name}
                    questChain={questChain}
                    questStatus={userStatus[selected]?.status ?? null}
                    refresh={refresh}
                  />
                </Flex>
              )}
            </Flex>

            {/* reward */}
            <Flex
              direction="column"
              background="rgba(255, 255, 255, 0.08)"
              height="fit-content"
              mixBlendMode="normal"
              backdropFilter="blur(44px)"
              p={3}
              minW={300}
              borderRadius={4}
            >
              <Text
                fontSize={24}
                fontWeight="bold"
                textTransform="uppercase"
                mb={3}
              >
                Reward
              </Text>
              {canMint ? (
                <MintNFTTile
                  {...{
                    questChain,
                    name,
                    onSuccess: refresh,
                    completed: questChain.quests.filter((q) => !q.paused)
                      .length,
                  }}
                />
              ) : (
                <>
                  <Text>An achievement NFT</Text>
                  {questChain.token.imageUrl && (
                    <Image
                      src={imageLink(questChain.token.imageUrl)}
                      alt="Quest Chain NFT badge"
                      maxW={300}
                    />
                  )}
                </>
              )}
            </Flex>
          </Flex>
        )}
      </VStack>
    </PageContainer>
  );
};

export default QuestChainPathPage;

type QueryParams = { questchain: QuestChainType };

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => ({
  paths: Object.values(QuestChainsPlaybooks).map((questchain) => ({
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
    const info = QuestChainPlaybooksDetails[questchain];
    if (!info) {
      throw new Error(`Quest chain ${questchain} not found!`);
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
