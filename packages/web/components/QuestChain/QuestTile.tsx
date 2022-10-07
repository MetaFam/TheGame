import { Box, Flex, Text, VStack } from '@metafam/ds';
import { graphql } from '@quest-chains/sdk';
import { MarkdownViewer } from 'components/MarkdownViewer';
import { UserStatusType } from 'lib/hooks/questChains';
import { useContext } from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';

import { UploadProofButton } from './UploadProofButton';

export const QuestTile: React.FC<{
  name: string;
  number: number;
  description: string;
  isSelected?: boolean;
  bgColor?: string;
  questId: string;
  userStatus: UserStatusType;
  questChain: graphql.QuestChainInfoFragment;
  refresh: () => void;
  onClick: (visibility: React.ContextType<typeof VisibilityContext>) => void;
}> = ({
  name,
  number,
  description,
  bgColor = 'gray.900',
  isSelected = false,
  questId,
  userStatus,
  questChain,
  refresh,
  onClick,
}) => {
  const visibility = useContext(VisibilityContext);

  return (
    <Flex
      alignItems="stretch"
      justifyContent="center"
      flexDir="column"
      w={isSelected ? '40rem' : '16rem'}
      h="60rem"
      onClick={() => onClick(visibility)}
      p={4}
    >
      <VStack
        spacing={4}
        p={8}
        bg={bgColor}
        borderWidth="1rem"
        borderColor="#B99BCB"
        borderRadius="3rem"
        h={isSelected ? '100%' : '14rem'}
      >
        <Flex
          textAlign="left"
          fontWeight="bold"
          w="full"
          flexDir={isSelected ? 'row' : 'column'}
          gap={2}
          fontSize={isSelected ? 'lg' : 'md'}
        >
          <Text textAlign="center">{number}.</Text>
          <Text textAlign="center">{name}</Text>
        </Flex>
        {isSelected && (
          <>
            <Box w="100%" flex={1} overflow="auto">
              <MarkdownViewer markdown={description ?? ''} />
            </Box>
            <Box w="100%">
              <UploadProofButton
                questId={questId}
                name={name}
                questChain={questChain}
                userStatus={userStatus}
                refresh={refresh}
              />
            </Box>
          </>
        )}
      </VStack>
    </Flex>
  );
};
