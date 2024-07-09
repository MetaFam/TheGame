import {
  Box,
  Button,
  chakra,
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
import { imageLink, Maybe } from '@metafam/utils';
import { graphql } from '@quest-chains/sdk';
import Pin from 'assets/pin.svg';
import Seed from 'assets/seed.svg';
import Share from 'assets/share.svg';
import { MetaLink } from 'components/Link';
import { MarkdownViewer } from 'components/MarkdownViewer';
import { MintNFTTile } from 'components/QuestChain/MintNFTTile';
import {
  ChainStats,
  PlayersFinished,
} from 'components/QuestChain/QuestHeading';
import { UploadProofButton } from 'components/QuestChain/UploadProofButton';
import {
  useDeletePlayerQuestchainPinMutation,
  useInsertPlayerQuestchainPinMutation,
} from 'graphql/autogen/types';
import { getPlayerPinnedQuestchains } from 'graphql/queries/player';
import { useUser, useWeb3 } from 'lib/hooks';
import {
  useLatestQuestChainData,
  useLatestQuestStatusesForUserAndChainData,
  useUserProgress,
  useUserStatus,
} from 'lib/hooks/questChains';
import React, { lazy, useCallback, useEffect, useRef, useState } from 'react';
import { BsArrowRight, BsCheck } from 'react-icons/bs';
import { QuestChainType } from 'utils/questChains';

type Props = {
  questChain: graphql.QuestChainInfoFragment;
  name: QuestChainType;
};

const PageContainer = lazy(() => import('components/Container'));

const QuestChainDisplay: React.FC<Props> = ({
  questChain: inputQuestChain,
  name: questName,
}) => {
  const { address, viemClients } = useWeb3();
  const { user } = useUser();
  const [creatorName, setCreatorName] = useState<Maybe<string>>(null);
  const toast = useToast({ isClosable: true });
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
    if (markdownViewerRef.current !== null) {
      markdownViewerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePinPlayerQuestchain = async () => {
    try {
      if (!user) throw new Error('User is not defined.');
      if (!questChain) throw new Error('Quest Chain is not defined.');

      const pin = await insertPlayerQuestchainPin({
        playerId: user?.id,
        questchainId: `${questChain.address}-${questChain.name}`,
      });

      if (pin.error) {
        toast({
          title: 'Error Pinning Quest Chain',
          description: pin.error.message,
          status: 'error',
          duration: 9_000,
        });
      } else {
        setIsPinned(true);
        toast({
          title: 'Quest Chain Pinned',
          description: (
            <Text>
              You can now see this Quest Chain on your Dashboard.{' '}
              <chakra.a
                href={`https://discord.com/channels/629411177947987986/1045714403351339018`}
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: 'underline' }}
              >
                Join the conversation on Discord.
              </chakra.a>
            </Text>
          ),
          status: 'success',
          duration: 9_000,
        });
      }
    } catch (error) {
      console.error({ error });
    }
  };

  const handleUnpinPlayerQuestchain = async () => {
    try {
      if (!user) throw new Error('User is not defined.');
      if (!questChain) throw new Error('Quest Chain is not defined.');

      const pin = await deletePlayerQuestchainPin({
        playerId: user.id,
        questchainId: `${questChain.address}-${questChain.name}`,
      });

      if (pin.error) {
        toast({
          title: 'Error Unpinning Quest Chain',
          description: pin.error.message,
          status: 'error',
          duration: 9_000,
        });
      } else {
        setIsPinned(false);
        toast({
          title: 'Quest Chain Unpinned',
          description: 'The quest chain has been removed from your Dashboard.',
          status: 'success',
          duration: 9_000,
        });
      }
    } catch (error) {
      console.error({ error });
    }
  };

  const creatorAddress = questChain?.createdBy?.id as `0x${string}`;
  useEffect(() => {
    if (creatorAddress) {
      viemClients?.mainnet
        .getEnsName({ address: creatorAddress })
        .then((name) => setCreatorName(name));
    }
  }, [creatorAddress, viemClients?.mainnet]);

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
        <Text>Quest Chain not found!</Text>
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
          <Tooltip
            hasArrow
            placement="top"
            label={creatorName ?? creatorAddress}
          >
            <chakra.a
              href={`https://app.questchains.xyz/profile/${creatorAddress}`}
              target="_blank"
              rel="noreferrer"
              color="purple.200"
            >
              {`${creatorAddress?.slice(0, 5)}…${creatorAddress?.slice(-3)}`}
            </chakra.a>
          </Tooltip>
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
                <ChainStats {...{ progress, isMobile }} />
                <IconButton
                  variant="outline"
                  aria-label="Pin"
                  icon={<Image src={Pin.src} alt="Pin" w={5} h={5} />}
                  onClick={handlePinPlayerQuestchain}
                  isRound
                  backgroundColor={isPinned ? 'purple.500' : ''}
                  justifyContent="center"
                  ml={4}
                />
                <Tooltip label="Coming Soon">
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
                    navigator.clipboard.writeText(window.location.href);
                    toast({
                      title: 'Copied to Clipboard',
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
                <Tooltip label="Coming Soon">
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
                    navigator.clipboard.writeText(window.location.href);
                    toast({
                      title: 'Copied to Clipboard',
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
                name={questName}
                questStatus={userStatus[selected]?.status ?? null}
                {...{ questChain, refresh }}
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
                    name: questName,
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
                      alt="Quest Chain NFT Badge"
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
