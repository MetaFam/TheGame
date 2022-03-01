import {
  Box,
  FlexProps,
  HStack,
  LabeledValue,
  LinkBox,
  LinkOverlay,
  LoadingState,
  MetaFilterSelectSearch,
  metaFilterSelectStyles,
  Skeleton,
  Text,
  VStack,
} from '@metafam/ds';
import { PlayerAvatar } from 'components/Player/PlayerAvatar';
import {
  OptionType,
  SortOption,
  sortOptionsMap,
  usePlayerFilter,
} from 'lib/hooks/players';
import NextLink from 'next/link';
import React, { useMemo, useState } from 'react';
import { getPlayerName, getPlayerURL } from 'utils/playerHelpers';

export const Leaderboard: React.FC = () => {
  const {
    players,
    fetching,
    error,
    queryVariables,
    setQueryVariable,
  } = usePlayerFilter();

  const showSeasonalXP = useMemo(
    () => Object.keys(queryVariables.orderBy).includes('seasonXP'),
    [queryVariables.orderBy],
  );

  // Only using two sort options seasonal XP and Total XP
  const sortOptions = Object.values(sortOptionsMap).slice(
    0,
    2,
  ) as Array<OptionType>;

  const [sortOption, setSortOption] = useState<LabeledValue<string>>(
    sortOptionsMap[SortOption.SEASON_XP],
  );

  return (
    <VStack
      width="100%"
      mt={5}
      fontFamily="exo2"
      fontWeight={700}
      alignItems="baseline"
    >
      <Box mb={4}>
        <MetaFilterSelectSearch
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
              setQueryVariable('orderBy', labeled.value);
            }
          }}
          options={sortOptions}
        />
      </Box>
      {error && <Text>{`Error: ${error.message}`}</Text>}
      {fetching ? (
        <LoadingState />
      ) : (
        !error &&
        players.map((p, i) => {
          const position = i + 1;
          if (
            position <= 7 &&
            ((showSeasonalXP && p.seasonXP >= 1) ||
              (!showSeasonalXP && p.totalXP >= 50))
          ) {
            return (
              <LinkBox
                key={`player-chip-${p.id}`}
                display="flex"
                width="100%"
                maxW="100%"
                px={3}
                py={2}
                fontSize={['sm', 'md']}
                flexFlow="row nowrap"
                alignItems="center"
                justifyContent="flex-start"
                backgroundColor="blackAlpha.500"
                borderRadius="md"
                overflow="hidden"
                _hover={{
                  boxShadow: 'md',
                }}
              >
                <Box flex={0} mr={1.5}>
                  {position}
                </Box>
                <PlayerAvatar
                  bg="cyan.200"
                  border={0}
                  mr={1}
                  size="sm"
                  player={p}
                  sx={{
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      border: '1px solid white',
                      borderColor: p.rank
                        ? p.rank.toLocaleLowerCase()
                        : 'red.400',
                    },
                  }}
                />
                <Box>
                  <NextLink
                    as={getPlayerURL(p)}
                    href="/player/[username]"
                    passHref
                  >
                    <LinkOverlay
                      overflowX="hidden"
                      whiteSpace="pre"
                      textOverflow="ellipsis"
                      mr={2}
                    >
                      {getPlayerName(p)}
                    </LinkOverlay>
                  </NextLink>
                </Box>
                <Box textAlign="right" flex={1}>
                  {Math.floor(
                    showSeasonalXP ? p.seasonXP : p.totalXP,
                  ).toLocaleString()}
                </Box>
              </LinkBox>
            );
          }
          return null;
        })
      )}
    </VStack>
  );
};

export const LeaderboardSkeleton: React.FC<FlexProps> = () => (
  <Box flex={1}>
    <HStack spacing={2} align="stretch" pt="2rem">
      <Skeleton h="30px" w="100%" />
    </HStack>
  </Box>
);
