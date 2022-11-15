import { Box, Flex } from '@metafam/ds';
import { graphql } from '@quest-chains/sdk';
import React, { useMemo } from 'react';

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
}) => {
  const bgColor = useMemo(() => {
    switch (questStatus) {
      case graphql.Status.Pass:
        return '#2DF8C720';
      case graphql.Status.Review:
        return '#EFFF8F20';
      default:
        return 'whiteAlpha.200';
    }
  }, [questStatus]);

  const color = useMemo(() => {
    switch (questStatus) {
      case graphql.Status.Pass:
        return '#2DF8C7';
      case graphql.Status.Review:
        return '#EFFF8F';
      default:
        return 'white';
    }
  }, [questStatus]);

  return (
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
            color={color}
            border="1px solid"
            borderColor={color}
            bgColor={bgColor}
            px={4}
            borderRadius={6}
          >
            {questStatus === graphql.Status.Review
              ? 'Review Pending'
              : 'Accepted'}
          </Box>
        </Box>
      )}
    </Flex>
  );
};
