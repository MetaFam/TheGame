import {
  FlexProps,
  MetaTile,
  MetaTileBody,
  MetaTileHeader,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  VStack,
} from '@metafam/ds';


export const PlayerTileSkeleton: React.FC<FlexProps> = (props) => (
  <MetaTile flex={1} {...props}>
    <MetaTileHeader>
      <VStack spacing="1rem">
        <SkeletonCircle w="5.5rem" h="5.5rem" />
        <VStack spacing="1.5rem">
          <Skeleton h="1.25rem" w="8rem" />
          <Skeleton h="1.25rem" w="15rem" />
          <Skeleton h="1.25rem" w="7rem" />
        </VStack>
      </VStack>
      <VStack spacing={2} align="stretch" pt="2rem">
        <SkeletonText noOfLines={4} spacing={4} w="100%" />
      </VStack>
    </MetaTileHeader>
    <MetaTileBody>
      <VStack spacing={2} align="stretch" pt="2rem">
        <SkeletonText noOfLines={2} spacing={4} />
      </VStack>
      <VStack spacing={2} align="stretch" pt="2rem">
        <SkeletonText noOfLines={2} spacing={4} />
      </VStack>
    </MetaTileBody>
  </MetaTile>
);
