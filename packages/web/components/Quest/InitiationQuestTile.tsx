import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
} from '@metafam/ds';
import { graphql } from '@quest-chains/sdk';

import { UploadProofButton } from './UploadProofButton';

type UserStatusType = {
  [questId: string]: {
    submissions: {
      description: string | undefined | null;
      externalUrl: string | undefined | null;
      timestamp: string;
    }[];
    reviews: {
      description: string | undefined | null;
      externalUrl: string | undefined | null;
      timestamp: string;
      reviewer: string;
      accepted: boolean;
    }[];
    status: graphql.Status;
  };
};

export const Quest: React.FC<{
  name: string;
  description: string;
  bgColor?: string;
  questId?: string;
  userStatus?: UserStatusType;
  questChain?: graphql.QuestChainInfoFragment;
  refresh?: () => void;
}> = ({
  name,
  description,
  bgColor = 'gray.900',
  questId,
  userStatus,
  questChain,
  refresh,
}) => (
  <AccordionItem bg={bgColor} borderRadius={10} px={4} mb={3} border={0}>
    <Flex alignItems="center">
      <AccordionButton py={6}>
        <Box flex="1" textAlign="left" fontWeight="bold">
          {name}
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </Flex>
    <AccordionPanel>
      <Box>{description}</Box>
      {questId && userStatus && questChain && refresh && (
        <UploadProofButton
          questId={questId}
          name={name}
          questChain={questChain}
          userStatus={userStatus}
          refresh={refresh}
        />
      )}
    </AccordionPanel>
  </AccordionItem>
);
