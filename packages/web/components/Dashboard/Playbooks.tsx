import {
  Box,
  Flex,
  FlexProps,
  HStack,
  LabeledValue,
  LoadingState,
  MetaFilterSelectSearch,
  metaFilterSelectStyles,
  Skeleton,
  Text,
  VStack,
} from '@metafam/ds';
import {
  OptionType,
  SortOption,
  sortOptionsMap,
  usePlayerFilter,
} from 'lib/hooks/player/players';
import React, { useMemo, useState } from 'react';
import { QuestChainPathsAndPlaybooksDetails } from 'utils/questChains';

import { LeaderboardLink } from './LeaderboardLink';
import { PlaybookLink } from './PlaybookLink';

export const Playbooks: React.FC = () => {
  // Only using two sort options seasonal XP and Total XP
  const sortOptions = Object.values(sortOptionsMap).slice(
    0,
    2,
  ) as Array<OptionType>;

  const [sortOption, setSortOption] = useState<LabeledValue<string>>(
    sortOptionsMap[SortOption.SEASON_XP],
  );

  return (
    <Flex direction="column" p={6} w="100%">
      <Text fontSize="lg" fontWeight="bold" textTransform="uppercase">
        Playbooks
      </Text>
      <VStack
        width="100%"
        mt={5}
        fontFamily="exo2"
        fontWeight={700}
        alignItems="baseline"
      >
        <Box mb={4} h="2.75rem">
          {/* <MetaFilterSelectSearch
            title={
              <Text
                as="span"
                textTransform="none"
                style={{ fontVariant: 'small-caps' }}
              >
                Sort By: <Text as="span">{sortOption.label}</Text>
              </Text>
            }
            styles={metaFilterSelectStyles}
            hasValue={sortOption.value !== SortOption.SEASON_XP}
            value={[
              { label: sortOption.label ?? '', value: sortOption.value ?? '' },
            ]} // Hack
            onChange={(choice) => {
              if (Array.isArray(choice)) {
                // eslint-disable-next-line no-param-reassign
                [choice] = choice.slice(-1);
              }

              if (choice) {
                const labeled = choice as LabeledValue<string>;
                setSortOption(labeled);
                //setQueryVariable('orderBy', labeled.value);
              }
            }}
            options={sortOptions}
          /> */}
        </Box>
        <VStack w="100%" align="stretch" h="24rem">
          <>
            {Object.values(QuestChainPathsAndPlaybooksDetails)
              .slice(0, 7)
              .map((value) => (
                <PlaybookLink name={value.title} completed={true} />
              ))}
          </>
        </VStack>
      </VStack>
    </Flex>
  );
};

export const LeaderboardSkeleton: React.FC<FlexProps> = () => (
  <Box flex={1}>
    <HStack spacing={2} align="stretch" pt="2rem">
      <Skeleton h="30px" w="100%" />
    </HStack>
  </Box>
);
