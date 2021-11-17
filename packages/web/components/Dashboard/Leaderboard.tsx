import {
  Box,
  FlexProps,
  HStack,
  LinkBox,
  LinkOverlay,
  MetaFilterSelectSearch,
  Skeleton,
  Text,
  VStack,
} from '@metafam/ds';
import { PlayerAvatar } from 'components/Player/PlayerAvatar';
import { SortOption, sortOptionsMap, usePlayerFilter } from 'lib/hooks/players';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import NextLink from 'next/link';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getPlayerName } from 'utils/playerHelpers';

type ValueType = { value: string; label: string };

export const Leaderboard: React.FC = () => {
  const {
    players,
    // aggregates,
    fetching,
    fetchingMore,
    error,
    queryVariables,
    setQueryVariable,
    // resetFilter,
    nextPage,
    moreAvailable,
  } = usePlayerFilter();

  const moreRef = useRef<HTMLDivElement>(null);

  const onScreen = useOnScreen(moreRef);

  useEffect(() => {
    if (onScreen && !fetching && !fetchingMore && moreAvailable) {
      nextPage();
    }
  }, [nextPage, onScreen, fetching, fetchingMore, moreAvailable]);

  const showSeasonalXP = useMemo(
    () => Object.keys(queryVariables.orderBy).includes('season_xp'),
    [queryVariables.orderBy],
  );

  const sortOptions = Object.values(sortOptionsMap);

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
    >
      <MetaFilterSelectSearch
        title={`Sorted By: ${sortOption.label}`}
        tagLabel=""
        hasValue={sortOption.value !== SortOption.SEASON_XP}
        // styles={styles}
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
      {error ? <Text>{`Error: ${error.message}`}</Text> : null}
      {!error && players.length && (fetchingMore || !fetching)
        ? players.map((p, i) => {
            const playerPosition: number = i + 1;
            if (
              playerPosition <= 7 &&
              ((showSeasonalXP && p.season_xp >= 1) ||
                (!showSeasonalXP && p.total_xp >= 50))
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
                    {Math.floor(showSeasonalXP ? p.season_xp : p.total_xp)}
                  </Box>
                </LinkBox>
              );
            }
            return null;
          })
        : null}
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
