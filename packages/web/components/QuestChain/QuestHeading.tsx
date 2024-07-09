import {
  Box,
  ExternalLinkIcon,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
  Tooltip,
  VStack,
} from '@metafam/ds';
import { imageLink } from '@metafam/utils';
import { graphql } from '@quest-chains/sdk';
import { MarkdownViewer } from 'components/MarkdownViewer';
import moment from 'moment';
import { QuestChainType } from 'utils/questChains';

import { MetaLink } from '../Link';
import { MintNFTTile } from './MintNFTTile';

type Progress = {
  total: number;
  inReviewCount: number;
  completeCount: number;
};

type Props = {
  name: QuestChainType;
  questChain: graphql.QuestChainInfoFragment;
  progress: Progress;
  canMint: boolean;
  refresh: () => void;
};

export const QUEST_CHAINS_HOST = `https://www.app.questchains.xyz`;

export const ChainStat: React.FC<{
  label: string;
  value: string | JSX.Element;
}> = ({ label, value }) => (
  <Flex direction="column" justify="space-between">
    <Text color="whiteAlpha.600" fontSize="xs" textTransform="uppercase">
      {label}
    </Text>
    <Text>{value}</Text>
  </Flex>
);

export const ChainStats: React.FC<{
  progress: Progress;
  isMobile?: boolean;
}> = ({ progress, isMobile }) => (
  <Flex direction="column" gap={1} w="full">
    <Text>
      {`${Math.round(
        (progress.total ? progress.completeCount / progress.total : 0) * 100,
      )}% completed`}
    </Text>
    <Flex w="full" justifyContent="space-between" h={6} alignItems="center">
      <Tooltip
        label="The yellow bar represents quests that are currently being reviewed, while the blue bar indicates completed quests."
        hasArrow
      >
        <Flex
          flex={1}
          borderColor="whiteAlpha.200"
          border="1px solid"
          borderRadius={3}
        >
          <Box
            bg="cyan"
            w={`${
              (progress.total ? progress.completeCount / progress.total : 0) *
              100
            }%`}
          />
          <Box
            bgColor="#EFFF8F"
            w={`${
              (progress.total ? progress.inReviewCount / progress.total : 0) *
              100
            }%`}
          />
          <Box h={2} />
        </Flex>
      </Tooltip>
    </Flex>
    {!isMobile && (
      <HStack justifyContent="space-between" fontWeight={400} mb={3}>
        <Text color="cyan">{progress.completeCount} approved</Text>
        <Text>
          {`${progress.inReviewCount + progress.completeCount} / ${
            progress.total
          } submitted`}
        </Text>
      </HStack>
    )}
  </Flex>
);

export const PlayersFinished: React.FC<{
  numQuesters: number;
  numCompletedQuesters: number;
  updatedAt: number;
}> = ({ numQuesters, numCompletedQuesters, updatedAt }) => (
  <HStack>
    <Text fontSize="sm" fontWeight="normal">
      {numQuesters && numCompletedQuesters
        ? `${Math.round(
            (numCompletedQuesters / numQuesters) * 100,
          )}% of players have finished this`
        : 'No players have finished this yet'}
    </Text>

    <Text>•</Text>

    <Text fontSize="sm" fontWeight="normal">
      Last updated: {moment(new Date(updatedAt * 1000)).format('MMM D YYYY')}
    </Text>
  </HStack>
);

const Heading: React.FC<Props> = ({ name, questChain, canMint, refresh }) => (
  <Flex minW="80%" flexDirection="column">
    <Stack
      spacing={8}
      direction={{ base: 'column', md: 'row' }}
      w="100%"
      alignItems="center"
    >
      <VStack
        alignItems="start"
        spacing={{ base: 4, lg: 8 }}
        w="100%"
        maxW="48rem"
      >
        <MetaLink
          isExternal
          color="white"
          href={`${QUEST_CHAINS_HOST}/chain/${questChain.chainId}/${questChain.address}`}
        >
          <Tooltip label="View on Playbooks">
            <Flex w="full" gap={4} role="group" position="relative">
              <Text
                fontSize={{ base: '3xl', lg: '7xl' }}
                fontWeight="bold"
                lineHeight="3.5rem"
                fontFamily="exo2"
                mb={3}
              >
                {questChain.name}
              </Text>
              <ExternalLinkIcon
                position="absolute"
                top="0"
                right="0"
                transform="translateX(110%)"
                _groupHover={{ display: 'block' }}
                display="none"
              />
            </Flex>
          </Tooltip>
        </MetaLink>
      </VStack>

      {questChain.token.imageUrl && (
        <Image
          src={imageLink(questChain.token.imageUrl)}
          alt="Quest Chain NFT badge"
          maxW={300}
        />
      )}
    </Stack>

    {/* Quest Chain Description */}
    <Box w="100%" fontSize={{ base: 'normal', lg: 'lg' }}>
      <MarkdownViewer>{questChain.description}</MarkdownViewer>
    </Box>

    <Flex>
      {canMint && (
        <Flex pt={6} w="100%">
          <MintNFTTile
            {...{
              questChain,
              name,
              onSuccess: refresh,
              completed: questChain.quests.filter((q) => !q.paused).length,
            }}
          />
        </Flex>
      )}
    </Flex>
  </Flex>
);

export default Heading;
