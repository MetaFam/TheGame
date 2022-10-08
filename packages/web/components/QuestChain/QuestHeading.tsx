import { Box, Flex, Image, Stack, Text, VStack } from '@metafam/ds';
import { imageLink } from '@metafam/utils';
import { graphql } from '@quest-chains/sdk';
import { MarkdownViewer } from 'components/MarkdownViewer';
import { formatAddress } from 'utils/playerHelpers';
import { QuestChainType } from 'utils/questChains';

import { MintNFTTile } from './MintNFTTile';

type Progress = {
  total: number;
  inReviewCount: number;
  completeCount: number;
};

type Props = {
  path: QuestChainType;
  questChain: graphql.QuestChainInfoFragment;
  progress: Progress;
  canMint: boolean;
  refresh: () => void;
};

const ChainStat: React.FC<{ label: string; value: string | JSX.Element }> = ({
  label,
  value,
}) => (
  <Flex direction="column" justify="space-between">
    <Text color="whiteAlpha.600" fontSize="xs" textTransform="uppercase">
      {label}
    </Text>
    <Text>{value}</Text>
  </Flex>
);

const Heading: React.FC<Props> = ({
  path,
  questChain,
  progress,
  canMint,
  refresh,
}) => (
  <Flex minW="80%" flexDirection="column">
    {/* Quest Chain Title */}

    <Stack
      spacing={8}
      direction={{ base: 'column', md: 'row' }}
      w="100%"
      alignItems="center"
    >
      <VStack alignItems="start" spacing={8} w="100%" maxW="48rem">
        <Flex justifyContent="space-between" w="full">
          <Text
            fontSize="5xl"
            fontWeight="bold"
            lineHeight="3.5rem"
            fontFamily="heading"
            mb={3}
          >
            {questChain.name}
          </Text>
        </Flex>

        {/* Quest Chain Metadata */}
        <Flex justifyContent="space-between" gap={2} w="full">
          <ChainStat
            label="Total Players"
            value={questChain.numQuesters.toString()}
          />
          <ChainStat
            label="Players Finished"
            value={questChain.numCompletedQuesters.toString()}
          />
          <ChainStat
            label="Quests"
            value={questChain.quests.filter((q) => !q.paused).length.toString()}
          />
          <ChainStat
            label="Date Created"
            value={new Date(questChain.createdAt * 1000).toLocaleDateString(
              'en-US',
            )}
          />
          <ChainStat
            label="Created by"
            value={formatAddress(questChain.createdBy.id)}
          />
        </Flex>

        <Flex w="full" justifyContent="space-between" h={6} alignItems="center">
          <Flex
            flex={1}
            borderColor="whiteAlpha.200"
            border="1px solid"
            borderRadius={3}
          >
            <Box
              bg="main"
              w={`${
                (progress.total ? progress.completeCount / progress.total : 0) *
                100
              }%`}
            />
            <Box
              bgColor="pending"
              w={`${
                (progress.total ? progress.inReviewCount / progress.total : 0) *
                100
              }%`}
            />
            <Box bgColor="grey" h={2} />
          </Flex>
          <Text pl={4}>
            {`${Math.round(
              (progress.total ? progress.completeCount / progress.total : 0) *
                100,
            )}%`}
          </Text>
        </Flex>
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
    <Box w="100%" fontSize="lg">
      <MarkdownViewer>{questChain.description}</MarkdownViewer>
    </Box>

    <Flex>
      {canMint && (
        <Flex pt={6} w="100%">
          <MintNFTTile
            {...{
              questChain,
              path,
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
