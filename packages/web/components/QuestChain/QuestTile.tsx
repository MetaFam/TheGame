import {
  Box,
  Flex,
  HStack,
  MarkdownViewer,
  MetaButton,
  Text,
  useBreakpointValue,
  VStack,
} from '@metafam/ds';
import { graphql } from '@quest-chains/sdk';
import React, { useMemo } from 'react';

import { useCarouselContext } from '#components/Carousel/CarouselContext';

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
  const isFirst = activeItem === 0;
  const lastIndex = questChain.quests.length - 1;
  const isLast = activeItem === lastIndex;

  const isMobile = useBreakpointValue({ base: true, lg: false });
  const onClick = () => {
    if (!isDragging) {
      setTrackIsActive(true);
      setActiveItem(index);
    }
  };

  const gotoNextStep = () => {
    setActiveItem(Math.min(activeItem + 1, lastIndex));
  };

  const gotoPrevStep = () => {
    setActiveItem(Math.max(0, activeItem - 1));
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
        p={{ base: 4, md: isSelected ? 16 : 12 }}
        bg={bgColor}
        backdropFilter="blur(7px)"
        borderRadius="1.5rem"
        h={isSelected ? '100%' : '14rem'}
        transition="all 0.2s"
        justifyContent={isSelected ? 'flex-start' : 'center'}
        position="relative"
        _hover={isSelected || isDragging ? {} : { bgColor: bgHoverColor }}
        {...{ onClick, cursor }}
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
              fontSize={{ base: 'sm', md: 'lg' }}
              px={2}
            >
              <MarkdownViewer>{description}</MarkdownViewer>
            </Box>
            <Box w="100%">
              <UploadProofButton
                onComplete={() => {
                  gotoNextStep();
                  refresh();
                }}
                {...{ questId, name, questChain, questStatus }}
              />
              {isMobile && (
                <HStack
                  justifyContent="space-between"
                  mt={3}
                  overflowX="hidden"
                >
                  <Box>
                    <MetaButton
                      onClick={gotoPrevStep}
                      size="sm"
                      borderRadius="full"
                      aria-label="Previous Step"
                      p={2}
                      display={isFirst ? 'none' : 'initial'}
                    >
                      👈
                    </MetaButton>
                  </Box>
                  <Box>
                    <MetaButton
                      onClick={gotoNextStep}
                      size="sm"
                      borderRadius="full"
                      aria-label="Next Step"
                      p={2}
                      display={isLast ? 'none' : 'initial'}
                    >
                      👉
                    </MetaButton>
                  </Box>
                </HStack>
              )}
            </Box>
          </>
        )}
      </VStack>
    </Flex>
  );
};
