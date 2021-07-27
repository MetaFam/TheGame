import {
  FlexProps,
  HStack,
  MetaTile,
  MetaTileBody,
  MetaTileHeader,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
  VStack,
} from '@metafam/ds';
import React from 'react';
import { FaGlobe } from 'react-icons/fa';

export const PlayerTileSkeleton: React.FC<FlexProps> = (props) => (
  <MetaTile flex={1} {...props}>
    <MetaTileHeader>
      <VStack spacing="1rem">
        <SkeletonCircle w="5.5rem" h="5.5rem" />
        <VStack spacing="1.5rem">
          <Skeleton h="1.25rem" w="8rem" />
          <HStack spacing="0.5rem">
            <Skeleton h="1.25rem" w="4.5rem" />
            <Skeleton h="1.25rem" w="4.5rem" />
            <Skeleton h="1.25rem" w="4.5rem" />
          </HStack>
          <HStack spacing="0.5rem">
            <FaGlobe color="blueLight" fontSize="0.875rem" />
            <Skeleton h="1.25rem" w="7rem" />
          </HStack>
        </VStack>
      </VStack>
      <VStack spacing={2} align="stretch" pt="1rem">
        <Text textStyle="caption">ABOUT</Text>
        <SkeletonText noOfLines={4} spacing={4} w="100%" />
      </VStack>
    </MetaTileHeader>
    <MetaTileBody>
      <VStack spacing={2} align="stretch" pt="1rem">
        <Text textStyle="caption">SKILLS</Text>
        <SkeletonText noOfLines={2} spacing={4} />
      </VStack>
      <VStack spacing={2} align="stretch" pt="1rem">
        <Text textStyle="caption">MEMBER OF</Text>
        <SkeletonText noOfLines={2} spacing={4} />
      </VStack>
      <VStack spacing={2} align="stretch" pt="1rem">
        <Text textStyle="caption">CONTACT</Text>
        <SkeletonText noOfLines={1} spacing={4} />
      </VStack>
    </MetaTileBody>
  </MetaTile>
);
