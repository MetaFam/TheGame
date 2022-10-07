import { Box, Flex, Text, VStack } from '@metafam/ds';
import { graphql } from '@quest-chains/sdk';
import { MarkdownViewer } from 'components/MarkdownViewer';
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
  questStatus: graphql.Status | null;
  questChain: graphql.QuestChainInfoFragment;
  refresh: () => void;
  onClick: (visibility: React.ContextType<typeof VisibilityContext>) => void;
  isLast?: boolean;
}> = ({
  name,
  number,
  description,
  bgColor = 'gray.900',
  isSelected = false,
  questId,
  questStatus,
  questChain,
  refresh,
  onClick,
  isLast = false,
}) => {
  const visibility = useContext(VisibilityContext);

  return (
    <Flex
      alignItems="stretch"
      justifyContent="center"
      flexDir="column"
      w={isSelected ? '37.5rem' : '18rem'}
      h="50rem"
      py={4}
      px={2}
    >
      <VStack
        spacing={4}
        p={isSelected ? 12 : 8}
        bg={bgColor}
        borderWidth="1rem"
        borderColor="#B99BCB"
        borderRadius="3rem"
        h={isSelected ? '100%' : '14rem'}
        justifyContent={isSelected ? 'flex-start' : 'center'}
        onClick={() => onClick(visibility)}
        cursor={isSelected ? 'initial' : 'pointer'}
        position="relative"
        _after={
          isLast
            ? {}
            : {
                content: '""',
                h: '1rem',
                w: '3.75rem',
                borderRadius: 'full',
                bg: '#DBD1DB',
                zIndex: 1,
                position: 'absolute',
                top: '50%',
                left: '100%',
                transform: 'translate(-6px, -50%)',
              }
        }
      >
        <Flex
          textAlign="left"
          fontWeight={isSelected ? 'bold' : 'normal'}
          w="full"
          flexDir={isSelected ? 'row' : 'column'}
          gap={isSelected ? 2 : 0}
          fontSize={isSelected ? 'xl' : 'md'}
        >
          <Text textAlign="center">{number}.</Text>
          <Text textAlign="center">{name}</Text>
        </Flex>
        {isSelected && (
          <>
            <Box w="100%" flex={1} overflow="auto" fontSize="lg" px={2}>
              <MarkdownViewer>{description}</MarkdownViewer>
            </Box>
            <Box w="100%">
              <UploadProofButton
                questId={questId}
                name={name}
                questChain={questChain}
                questStatus={questStatus}
                refresh={refresh}
              />
            </Box>
          </>
        )}
      </VStack>
    </Flex>
  );
};
