import {
  Box,
  FlexProps,
  HStack,
  LinkBox,
  LinkOverlay,
  MetaButton,
  // MetaTile,
  // MetaTileBody,
  // MetaTileHeader,
  Skeleton,
  // SkeletonCircle,
  // SkeletonText,
  Text,
  VStack,
} from '@metafam/ds';
import { PlayersNotFound } from 'components/Player/Filter/PlayersNotFound';
// import { PlayerFragmentFragment } from 'graphql/autogen/types';
// import { getSsrClient } from 'graphql/client';
// import { getPlayerFilters, getPlayersWithCount } from 'graphql/getPlayers';
import { PlayerAvatar } from 'components/Player/PlayerAvatar';
import { GetPlayersQueryVariables } from 'graphql/autogen/types';
import { usePlayerFilter } from 'lib/hooks/players';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import NextLink from 'next/link';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getPlayerName } from 'utils/playerHelpers';

// type StaticProps = InferGetStaticPropsType<typeof getStaticProps>;

// export const getStaticProps = async () => {
//   const [ssrClient, ssrCache] = getSsrClient();

//   // This populates the cache server-side
//   const { error } = await getPlayersWithCount(undefined, ssrClient);
//   if (error) {
//     // eslint-disable-next-line no-console
//     console.error('getPlayers error', error);
//   }
//   await getPlayerFilters(ssrClient);

//   return {
//     props: {
//       urqlState: ssrCache.extractData(),
//     },
//     revalidate: 1,
//   };
// };

export const Leaderboard: React.FC = () => {
  const {
    players,
    // aggregates,
    fetching,
    fetchingMore,
    error,
    queryVariables,
    // setQueryVariable,
    // resetFilter,
    totalCount,
    nextPage,
    moreAvailable,
  } = usePlayerFilter();

  const moreRef = useRef<HTMLDivElement>(null);

  const onScreen = useOnScreen(moreRef);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (onScreen && !fetching && !fetchingMore && moreAvailable) {
      nextPage();
    }
  }, [nextPage, onScreen, fetching, fetchingMore, moreAvailable]);

  const isLoading = useMemo(() => fetching || fetchingMore || moreAvailable, [
    fetching,
    fetchingMore,
    moreAvailable,
  ]);

  // console.log('loading players: ', isLoading);

  const showSeasonalXP = useMemo(
    () => Object.keys(queryVariables.orderBy).includes('total_xp'),
    [queryVariables.orderBy],
  );

  // console.log(players);

  return (
    <VStack
      className="leaderboard"
      width="100%"
      mt={5}
      fontFamily="exo2"
      fontWeight="700"
    >
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
      <Box>
        <MetaButton onClick={() => setShowMore(!showMore)}>More</MetaButton>
      </Box>
      {fetching ? <LeaderboardSkeleton /> : null}
      {showMore ? (
        <MorePlayers
          ref={moreRef}
          fetching={isLoading}
          totalCount={totalCount}
          queryVariables={queryVariables}
          showSeasonalXP={showSeasonalXP}
        />
      ) : null}
    </VStack>
  );
};

type MorePlayersLeaderboardProps = {
  fetching: boolean;
  totalCount: number;
  queryVariables: GetPlayersQueryVariables;
  showSeasonalXP?: boolean;
};

const MorePlayers = React.forwardRef<
  HTMLDivElement,
  MorePlayersLeaderboardProps
>(({ fetching, totalCount = false }, ref) => (
  <VStack w="100%" ref={ref}>
    {fetching ? <LeaderboardSkeleton /> : null}
    {!fetching && totalCount === 0 ? <PlayersNotFound /> : null}
  </VStack>
));

export const LeaderboardSkeleton: React.FC<FlexProps> = () => (
  <Box flex={1}>
    <HStack spacing={2} align="stretch" pt="2rem">
      <Skeleton h="30px" w="100%" />
    </HStack>
  </Box>
);
