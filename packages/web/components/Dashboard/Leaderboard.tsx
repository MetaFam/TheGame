import {
  Box,
  FlexProps,
  HStack,
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
import { getPlayerName } from 'utils/playerHelpers';

type ValueType = { value: string; label: string };

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

  const [sortOption, setSortOption] = useState<ValueType>(
    sortOptionsMap[SortOption.SEASON_XP.toString()],
  );

  return (
    <VStack
      className="leaderboard"
      width="100%"
      mt={5}
      fontFamily="exo2"
      fontWeight="700"
      alignItems="baseline"
    >
      <Box mb={4}>
        <MetaFilterSelectSearch
          title={`Sorted By: ${sortOption.label}`}
          styles={metaFilterSelectStyles}
          tagLabel=""
          hasValue={sortOption.value !== SortOption.SEASON_XP}
          value={[sortOption]}
          onChange={(value) => {
            const values = value as ValueType[];
            if (values && values[values.length - 1]) {
              setSortOption(values[values.length - 1]);
              setQueryVariable('orderBy', values[values.length - 1].value);
            }
          }}
          options={sortOptions}
        />
      </Box>
      {error ? <Text>{`Error: ${error.message}`}</Text> : null}
      {fetching ? (
        <LoadingState />
      ) : (
        !error &&
        players.map((p, i) => {
          const playerPosition: number = i + 1;
          if (
            playerPosition <= 7 &&
            ((showSeasonalXP && p.seasonXP >= 1) ||
              (!showSeasonalXP && p.totalXP >= 50))
          ) {
            return (
              <LinkBox
                key={`player-chip-${p.id}`}
                className="player player__chip"
                display="flex"
                width="100%"
                px={8}
                py={2}
                flexFlow="row nowrap"
                alignItems="center"
                justifyContent="flex-start"
                backgroundColor="blackAlpha.500"
                borderRadius="md"
                overflowX="hidden"
                overflowY="hidden"
              >
                <Box className="player__position" flex={0} mr={3}>
                  {playerPosition}
                </Box>
                <PlayerAvatar
                  className="player__avatar"
                  bg="cyan.200"
                  border="0"
                  mr={3}
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
                <Box className="player__name">
                  <NextLink
                    as={`/player/${p.username}`}
                    href="/player/[username]"
                    passHref
                  >
                    <LinkOverlay>{getPlayerName(p)}</LinkOverlay>
                  </NextLink>
                </Box>
                <Box className="player__score" textAlign="right" flex={1}>
                  {Math.floor(showSeasonalXP ? p.seasonXP : p.totalXP)}
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
