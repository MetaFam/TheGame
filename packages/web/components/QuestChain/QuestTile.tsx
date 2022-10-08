import { Box, Flex, Text, VStack } from '@metafam/ds';
import { graphql } from '@quest-chains/sdk';
import { useCarouselContext } from 'components/Carousel/CarouselContext';
import { MarkdownViewer } from 'components/MarkdownViewer';
import { useMemo } from 'react';

import { UploadProofButton } from './UploadProofButton';

export const QuestTile: React.FC<{
  name: string;
  index: number;
  description: string;
  questId: string;
  questStatus: graphql.Status | null;
  questChain: graphql.QuestChainInfoFragment;
  refresh: () => void;
}> = ({
  name,
  index,
  description,
  questId,
  questStatus,
  questChain,
  refresh,
}) => {
  const { activeItem, setActiveItem, isDragging, setTrackIsActive } =
    useCarouselContext();

  const isSelected = activeItem === index;

  const onClick = () => {
    if (!isDragging) {
      setTrackIsActive(true);
      setActiveItem(index);
    }
  };

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

  const bgHoverColor = useMemo(() => {
    switch (questStatus) {
      case graphql.Status.Pass:
        return '#2DF8C740';
      case graphql.Status.Review:
        return '#EFFF8F40';
      default:
        return 'whiteAlpha.400';
    }
  }, [questStatus]);

  const cursor = useMemo(() => {
    if (isDragging) return 'unset';
    return isSelected ? 'initial' : 'pointer';
  }, [isSelected, isDragging]);

  return (
    <Flex
      alignItems="stretch"
      justifyContent="center"
      flexDir="column"
      w="100%"
      h="calc(100vh - 15rem)"
      maxH="50rem"
    >
      <VStack
        spacing={4}
        p={{ base: 8, md: isSelected ? 16 : 12 }}
        bg={bgColor}
        style={{ backdropFilter: 'blur(7px)' }}
        borderRadius="1.5rem"
        h={isSelected ? '100%' : '14rem'}
        justifyContent={isSelected ? 'flex-start' : 'center'}
        onClick={onClick}
        cursor={cursor}
        position="relative"
        _hover={isSelected || isDragging ? {} : { bgColor: bgHoverColor }}
      >
        <Flex
          textAlign="left"
          fontWeight={isSelected ? 'bold' : 'normal'}
          w="full"
          flexDir={isSelected ? 'row' : 'column'}
          gap={isSelected ? 2 : 0}
          fontSize={isSelected ? { base: 'lg', md: 'xl' } : 'md'}
        >
          <Text textAlign="center">{index + 1}.</Text>
          <Text textAlign="center">{name}</Text>
        </Flex>
        {isSelected && (
          <>
            <Box
              w="100%"
              flex={1}
              overflow="auto"
              fontSize={{ base: 'md', md: 'lg' }}
              px={2}
            >
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
