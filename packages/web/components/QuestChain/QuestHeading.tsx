import { Box, Flex, HStack, Image, Text, VStack } from '@metafam/ds';
import { graphql } from '@quest-chains/sdk';
import { MarkdownViewer } from 'components/MarkdownViewer';
import { formatAddress } from 'utils/playerHelpers';

type Progress = {
  total: number;
  inReviewCount: number;
  completeCount: number;
};

type Props = {
  questChain: graphql.QuestChainInfoFragment;
  progress: Progress;
  canMint: boolean;
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

const Heading: React.FC<Props> = ({ questChain, progress, canMint }) => (
  <Flex minW="80%" flexDirection="column">
    {/* Quest Chain Title */}

    <HStack spacing={8}>
      <VStack alignItems="start" spacing={8}>
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
          src={ipfsUriToHttp(questChain.token.imageUrl)}
          alt="Quest Chain NFT badge"
          maxW={300}
        />
      )}
    </HStack>

    {/* Quest Chain Description */}
    <Box w="100%" fontSize="lg">
      <MarkdownViewer>{questChain.description}</MarkdownViewer>
    </Box>

    <Flex>
      {/* Mint Tile */}
      {canMint && (
        <Flex pt={6} w="100%">
          NFT MINT TILE - TO BE IMPLEMENTED
          {/* <MintNFTTile
          {...{
            questChain,
            onSuccess: refresh,
            completed: questChain.quests.filter((q) => !q.paused)
              .length,
          }}
        /> */}
        </Flex>
      )}
    </Flex>
  </Flex>
);

const IPFS_URL_ADDON = `ipfs/`;
const IPNS_URL_ADDON = `ipns/`;
const URL_ADDON_LENGTH = 5;

const parseUri = (
  uri: string,
): { protocol: string; hash: string; name: string } => {
  let protocol = uri.split(':')[0].toLowerCase();
  let hash = uri.match(/^ipfs:(\/\/)?(.*)$/i)?.[2] ?? '';
  let name = uri.match(/^ipns:(\/\/)?(.*)$/i)?.[2] ?? '';

  if (uri.includes(IPFS_URL_ADDON)) {
    protocol = 'ipfs';
    const hashIndex = uri.indexOf(IPFS_URL_ADDON) + URL_ADDON_LENGTH;
    hash = uri.substring(hashIndex);
  } else if (uri.includes(IPNS_URL_ADDON)) {
    protocol = 'ipns';
    const hashIndex = uri.indexOf(IPNS_URL_ADDON) + URL_ADDON_LENGTH;
    name = uri.substring(hashIndex);
  } else if (uri.startsWith('Qm') && uri.length === 46) {
    protocol = 'ipfs';
    hash = uri;
  } else if (uri.includes('ipfs') && uri.includes('Qm')) {
    protocol = 'ipfs';
    const hashIndex = uri.indexOf('Qm');
    hash = uri.substring(hashIndex);
  }
  return { protocol, hash, name };
};

export const uriToHttpAsArray = (uri: string): string[] => {
  if (!uri) return [];
  if (uri.startsWith('data')) return [uri];
  const { protocol, hash, name } = parseUri(uri);

  switch (protocol) {
    case 'https':
      return [uri];
    case 'http':
      return [`https${uri.slice(4)}`, uri];
    case 'ipfs':
      if (hash.startsWith('ipfs')) {
        const newHash = hash.split('/')[1];
        return [
          `https://gateway.ipfs.io/ipfs/${newHash}/`,
          `https://gateway.pinata.cloud/ipfs/${newHash}/`,
          `https://ipfs.io/ipfs/${newHash}/`,
        ];
      }
      return [
        `https://gateway.ipfs.io/ipfs/${hash}/`,
        `https://gateway.pinata.cloud/ipfs/${hash}/`,
        `https://ipfs.io/ipfs/${hash}/`,
      ];
    case 'ipns':
      return [
        `https://gateway.ipfs.io/ipns/${name}/`,
        `https://gateway.pinata.cloud/ipns/${name}/`,
        `https://ipfs.io/ipns/${name}/`,
      ];
    default:
      return [];
  }
};

export const ipfsUriToHttp = (uri: string | null | undefined): string => {
  if (!uri) return '';
  const array = uriToHttpAsArray(uri);
  return array[0] ?? '';
};

export default Heading;
