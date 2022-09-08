import { Box, Button, Flex } from '@metafam/ds';
import { graphql } from '@quest-chains/sdk';
import { UserStatusType } from 'pages/quests/initiation';

// import { UploadProof } from './UploadProof';

type UploadProofButtonProps = {
  userStatus: UserStatusType;
  questChain: graphql.QuestChainInfoFragment;
  name: string;
  questId: string;
  refresh: () => void;
};

export const UploadProofButton: React.FC<UploadProofButtonProps> = ({
  userStatus,
  questId,
  name,
  questChain,
  refresh,
}) => (
  <Flex mt={5}>
    {
      // TODO: Also display prev submissions and reviews here
      !userStatus[questId]?.status ||
      userStatus[questId]?.status === 'init' ||
      userStatus[questId]?.status === 'fail' ? (
        // <UploadProof
        //   // TODO: move the modal inside this outside so that we don't render a new Modal for each quest
        //   questId={questId}
        //   name={name}
        //   questChain={questChain}
        //   refresh={refresh}
        // />
        <Button>Upload Proof</Button>
      ) : (
        <Box>
          <Box
            color={
              userStatus[questId]?.status === 'review' ? 'pending' : 'main'
            }
            border="1px solid"
            borderColor={
              userStatus[questId]?.status === 'review' ? 'pending' : 'main'
            }
            bgColor={
              userStatus[questId]?.status === 'review'
                ? '#EFFF8F20'
                : 'main.100'
            }
            px={4}
            borderRadius={6}
            fontSize="sm"
          >
            {userStatus[questId]?.status === 'review'
              ? 'Review Pending'
              : 'Accepted'}
          </Box>
        </Box>
      )
    }
  </Flex>
);
