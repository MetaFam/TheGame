import { Box, Flex } from '@metafam/ds';
import { graphql } from '@quest-chains/sdk';

import { UploadProof } from './UploadProof';

type UploadProofButtonProps = {
  questChain: graphql.QuestChainInfoFragment;
  name: string;
  questId: string;
  questStatus: graphql.Status | null;
  refresh: () => void;
};

export const UploadProofButton: React.FC<UploadProofButtonProps> = ({
  questStatus,
  questId,
  name,
  questChain,
  refresh,
}) => (
  <Flex mt={5}>
    {!questStatus ||
    questStatus === graphql.Status.Init ||
    questStatus === graphql.Status.Fail ? (
      <UploadProof
        questId={questId}
        name={name}
        questChain={questChain}
        refresh={refresh}
      />
    ) : (
      <Box>
        <Box
          color={questStatus === graphql.Status.Review ? 'pending' : 'main'}
          border="1px solid"
          borderColor={
            questStatus === graphql.Status.Review ? 'pending' : 'main'
          }
          bgColor={
            questStatus === graphql.Status.Review ? '#EFFF8F20' : 'main.100'
          }
          px={4}
          borderRadius={6}
          fontSize="sm"
        >
          {questStatus === graphql.Status.Review
            ? 'Review Pending'
            : 'Accepted'}
        </Box>
      </Box>
    )}
  </Flex>
);
