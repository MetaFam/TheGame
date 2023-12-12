import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Spinner,
  Stack,
  Text,
  useBreakpointValue,
  VStack,
} from '@metafam/ds';
import { imageLink } from '@metafam/utils';
import { graphql } from '@quest-chains/sdk';
import Pin from 'assets/pin.svg';
import Seed from 'assets/seed.svg';
import Share from 'assets/share.svg';
import { PageContainer } from 'components/Container';
import { MetaLink } from 'components/Link';
import { MarkdownViewer } from 'components/MarkdownViewer';
import { MintNFTTile } from 'components/QuestChain/MintNFTTile';
import {
  ChainStats,
  PlayersFinished,
} from 'components/QuestChain/QuestHeading';
import { UploadProofButton } from 'components/QuestChain/UploadProofButton';
import { HeadComponent } from 'components/Seo';
import { useWeb3 } from 'lib/hooks';
import {
  useLatestQuestChainData,
  useLatestQuestStatusesForUserAndChainData,
  useUserProgress,
  useUserStatus,
} from 'lib/hooks/questChains';
import moment from 'moment';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import React, { useCallback, useRef, useState } from 'react';
import { BsArrowRight, BsCheck } from 'react-icons/bs';
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

  const isMobile = useBreakpointValue({ base: true, lg: false });
  const markdownViewerRef = useRef(null);

  const handleQuestClick = (questId: React.SetStateAction<string>) => {
    setSelected(questId);
    // Check if the markdownViewerRef is set and scroll it into view
    if (markdownViewerRef.current !== null) {
      (markdownViewerRef.current as any).scrollIntoView({ behavior: 'smooth' });
    }
  };

  const creator = questChain?.createdBy?.id;

  const [selected, setSelected] = useState('introduction');

  const bgColor = (questStatus: string) => {
    switch (questStatus) {
      case graphql.Status.Pass:
        return 'cyan';
      case graphql.Status.Review:
        return '#EFFF8F';
      default:
        return 'whiteAlpha.300';
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
      title={inputQuestChain.name ?? 'Untitled Quest Chain'}
        description="MetaGame is a Massive Online Coordination Game! MetaGame has some epic quests going on!"
        url="https://metagame.wtf/learn/playbooks"
      />
      <VStack spacing={8} w="full" align="stretch" px={6} pb={6}>
        <Stack>
          <Box w="100%">
            <MetaLink
              href={`https://app.questchains.xyz/profile/${creator}`}
              target="_blank"
            >
              {`${creator?.slice(0, 4)}...${creator?.slice(-2)}`}
            </MetaLink>
          </Box>
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            w="full"
            justifyContent="space-between"
            alignItems={{
              base: 'flex-start',
              lg: 'center',
            }}
          >
            <Text
              fontSize={{ base: '3xl', lg: '7xl' }}
              fontWeight="bold"
              lineHeight="3.5rem"
              fontFamily="exo2"
              mb={{
                base: 1,
                lg: 3,
              }}
            >
              {questChain.name}
            </Text>

            {isMobile && (
              <PlayersFinished
                numQuesters={questChain.numQuesters}
                numCompletedQuesters={questChain.numCompletedQuesters}
                updatedAt={questChain.updatedAt}
              />
            )}

            <Box w={{ base: 'full', lg: 338 }} mt={{ base: 5, lg: 0 }}>
              {isMobile ? (
                <HStack w="full">
                  <ChainStats progress={progress} isMobile={isMobile} />
                  <IconButton
                    variant="outline"
                    aria-label="Pin"
                    icon={<Image src={Pin.src} alt="Pin" w={5} h={5} />}
                    isRound
                    justifyContent="center"
                    ml={4}
                  />
                  <IconButton
                    variant="outline"
                    aria-label="Seed"
                    icon={<Image src={Seed.src} alt="Seed" w={5} h={5} />}
                    isRound
                    justifyContent="center"
                  />
                  <IconButton
                    variant="outline"
                    aria-label="Share"
                    icon={<Image src={Share.src} alt="Share" w={5} h={5} />}
                    isRound
                    justifyContent="center"
                  />
                </HStack>
              ) : (
                <HStack w="full">
                  <Button
                    variant="outline"
                    w="full"
                    leftIcon={
                      <Image src={Pin.src} alt="Pin" w={5} h={5} mr={2} />
                    }
                  >
                    Pin
                  </Button>
                  <Button
                    variant="outline"
                    w="full"
                    leftIcon={
                      <Image src={Seed.src} alt="Seed" w={5} h={5} mr={2} />
                    }
                  >
                    Boost
                  </Button>
                  <Button
                    variant="outline"
                    w="full"
                    leftIcon={
                      <Image src={Share.src} alt="Share" w={5} h={5} mr={2} />
                    }
                  >
                    Share
                  </Button>
                </HStack>
              )}
            </Box>
          </Flex>
          {!isMobile && (
            <PlayersFinished
              numQuesters={questChain.numQuesters}
              numCompletedQuesters={questChain.numCompletedQuesters}
              updatedAt={questChain.updatedAt}
            />
          )}
        </Stack>

        {fetching ? (
          <Spinner my={20} />
        ) : (
          <Flex w="full" gap={8} direction={{ base: 'column', md: 'row' }}>
            {/* content */}
            <Flex
              direction="column"
              height="fit-content"
              mixBlendMode="normal"
              minW={300}
              borderRadius={4}
            >
              <Flex
                borderTopRadius={4}
                backgroundColor={
                  selected === 'introduction'
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'transparent'
                }
                cursor="pointer"
                onClick={() => setSelected('introduction')}
                gap={3}
                px={5}
                py={4}
                alignItems="center"
                borderBottom="1px solid var(--white-alpha-300, rgba(255, 255, 255, 0.16))"
              >
                <Box
                  backgroundColor="cyan"
                  w={5}
                  h={5}
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <BsCheck color="black" />
                </Box>
                Introduction
              </Flex>
              {questChain.quests
                .filter((q) => !q.paused)
                .map((quest, index, arr) => (
                  <Flex
                    backgroundColor={
                      selected === quest.id
                        ? 'rgba(255, 255, 255, 0.08)'
                        : 'transparent'
                    }
                    px={5}
                    py={4}
                    onClick={() => handleQuestClick(quest.id)}
                    cursor="pointer"
                    gap={3}
                    alignItems="center"
                    borderBottom={
                      index !== arr.length - 1
                        ? '1px solid var(--white-alpha-300, rgba(255, 255, 255, 0.16))'
                        : 'none'
                    }
                    borderBottomRadius={index === arr.length - 1 ? 4 : 0}
                  >
                    <Box
                      backgroundColor={bgColor(userStatus[selected]?.status)}
                      w={5}
                      h={5}
                      minW={5}
                      borderRadius="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {userStatus[quest.id]?.status === graphql.Status.Pass ? (
                        <BsCheck color="black" />
                      ) : (
                        <Text fontSize="xs" fontWeight="bold">
                          {index + 2}
                        </Text>
                      )}
                    </Box>
                    <Text>{quest.name}</Text>
                  </Flex>
                ))}
            </Flex>

            {/* stats */}
            <Flex direction="column" w="full" gap={8} pb={8}>
              <MarkdownViewer ref={markdownViewerRef}>
                {selected === 'introduction'
                  ? questChain.description
                  : questChain.quests.find((q) => q.id === selected)
                      ?.description}
              </MarkdownViewer>
              {selected !== 'introduction' && (
                <UploadProofButton
                  questId={selected}
                  name={name}
                  questChain={questChain}
                  questStatus={userStatus[selected]?.status ?? null}
                  refresh={refresh}
                />
              )}

              {selected === 'introduction' && (
                <Box>
                  <Button
                    colorScheme="purple"
                    rightIcon={<BsArrowRight />}
                    onClick={() => {
                      setSelected(questChain.quests[0].id);
                    }}
                  >
                    Continue
                  </Button>
                </Box>
              )}
            </Flex>

            {/* reward */}
            <Stack w={338}>
              {!isMobile && <ChainStats progress={progress} />}

              <Flex
                direction="column"
                background="rgba(255, 255, 255, 0.08)"
                height="fit-content"
                mixBlendMode="normal"
                backdropFilter="blur(44px)"
                p={6}
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
            </Stack>
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
