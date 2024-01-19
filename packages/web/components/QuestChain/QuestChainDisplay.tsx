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
  Tooltip,
  useBreakpointValue,
  useToast,
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
import { useDeletePlayerQuestchainPinMutation,useInsertPlayerQuestchainPinMutation } from 'graphql/autogen/types';
import { getPlayerPinnedQuestchains } from 'graphql/queries/player';
import { useUser, useWeb3 } from 'lib/hooks';
import {
  useLatestQuestChainData,
  useLatestQuestStatusesForUserAndChainData,
  useUserProgress,
  useUserStatus,
} from 'lib/hooks/questChains';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BsArrowRight, BsCheck } from 'react-icons/bs';
import { QuestChainType } from 'utils/questChains';

type Props = {
  inputQuestChain: graphql.QuestChainInfoFragment;
  name: QuestChainType;
};

const QuestChainDisplay: React.FC<Props> = ({ inputQuestChain, name }) => {
  const { address } = useWeb3();
  const { user } = useUser();
  const toast = useToast();
  const [, insertPlayerQuestchainPin] = useInsertPlayerQuestchainPinMutation();
  const [, deletePlayerQuestchainPin] = useDeletePlayerQuestchainPinMutation();
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

  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const getIsPinned = async (playerId: string) => {
      const pinnedQCs = await getPlayerPinnedQuestchains(playerId);
      setIsPinned(
        Boolean(
          pinnedQCs?.pinned_questchains?.some(
            (qc) =>
              qc.questchain_id ===
              `${inputQuestChain.address}-${inputQuestChain.name}`,
          ),
        ),
      );
    };
    if (user?.id) getIsPinned(user.id);
  }, [user?.id, inputQuestChain.address, inputQuestChain.name]);

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
  const markdownViewerRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleQuestClick = (questId: React.SetStateAction<string>) => {
    setSelected(questId);
    // Check if the markdownViewerRef is set and scroll it into view
    if (markdownViewerRef.current !== null) {
      (markdownViewerRef.current as any).scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePinPlayerQuestchain = async () => {
    if (user && questChain) {
      try {
        const pin = await insertPlayerQuestchainPin({
          playerId: user?.id,
          questchainId: `${questChain.address}-${questChain.name}`,
        });

        if (pin.error) {
          toast({
            title: 'Error pinning quest chain!',
            description: pin.error.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        } else {
          setIsPinned(true);
          toast({
            title: 'Quest Chain pinned!',
            description: 'You can now see this quest chain on your profile.',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      console.error('Player or questChain not found!');
    }
  };

  const handleUnpinPlayerQuestchain = async () => {
    if (user && questChain) {
      try {
        const pin = await deletePlayerQuestchainPin({
          playerId: user?.id,
          questchainId: `${questChain.address}-${questChain.name}`,
        });

        if (pin.error) {
          toast({
            title: 'Error unpinning quest chain!',
            description: pin.error.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        } else {
          setIsPinned(false);
          toast({
            title: 'Quest Chain unpinned!',
            description: 'The quest chain has been removed from your profile.',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      console.error('Player or questChain not found!');
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
    <VStack spacing={8} w="full" align="stretch" px={6} pb={6} ref={topRef}>
      <Button
        position="fixed"
        top={24}
        right={4}
        display={{
          base: 'block',
          md: 'none',
        }}
        onClick={scrollToTop}
      >
        Top
      </Button>
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
                  onClick={() => handlePinPlayerQuestchain()}
                  isRound
                  backgroundColor={isPinned ? 'purple.500' : ''}
                  justifyContent="center"
                  ml={4}
                />
                <Tooltip label="Coming soon">
                  <IconButton
                    variant="outline"
                    aria-label="Seed"
                    icon={<Image src={Seed.src} alt="Seed" w={5} h={5} />}
                    isRound
                    justifyContent="center"
                    isDisabled
                  />
                </Tooltip>
                <IconButton
                  variant="outline"
                  aria-label="Share"
                  icon={<Image src={Share.src} alt="Share" w={5} h={5} />}
                  isRound
                  justifyContent="center"
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.href}`);
                    toast({
                      title: 'Copied to clipboard!',
                      description: 'Share this link with your friends!',
                      status: 'success',
                      duration: 4000,
                      isClosable: true,
                    });
                  }}
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
                  backgroundColor={isPinned ? 'purple.600' : ''}
                  onClick={
                    isPinned
                      ? handleUnpinPlayerQuestchain
                      : handlePinPlayerQuestchain
                  }
                >
                  {isPinned ? 'Unpin' : 'Pin'}
                </Button>
                <Tooltip label="Coming soon">
                  <Button
                    variant="outline"
                    w="full"
                    leftIcon={
                      <Image src={Seed.src} alt="Seed" w={5} h={5} mr={2} />
                    }
                    isDisabled
                  >
                    Boost
                  </Button>
                </Tooltip>
                <Button
                  variant="outline"
                  w="full"
                  leftIcon={
                    <Image src={Share.src} alt="Share" w={5} h={5} mr={2} />
                  }
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.href}`);
                    toast({
                      title: 'Copied to clipboard!',
                      description: 'Share this link with your friends!',
                      status: 'success',
                      duration: 4000,
                      isClosable: true,
                    });
                  }}
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
                  key={quest.id}
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
                    backgroundColor={bgColor(userStatus[index]?.status)}
                    w={5}
                    h={5}
                    minW={5}
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {userStatus[index]?.status === graphql.Status.Pass ? (
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
                : questChain.quests.find((q) => q.id === selected)?.description}
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
  );
};

export default QuestChainDisplay;
