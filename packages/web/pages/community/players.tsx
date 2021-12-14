import { Text, VStack } from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { AdjascentTimeZonePlayers } from 'components/Player/Filter/AdjascentTimeZonePlayers';
import { PlayerFilter } from 'components/Player/Filter/PlayerFilter';
import { PlayersLoading } from 'components/Player/Filter/PlayersLoading';
import { PlayersNotFound } from 'components/Player/Filter/PlayersNotFound';
import { PlayerList } from 'components/Player/PlayerList';
import { HeadComponent } from 'components/Seo';
import { getSsrClient } from 'graphql/client';
import {
  getPlayerFilters,
  getPlayersWithCount,
  PlayersQueryVariables,
} from 'graphql/getPlayers';
import { usePlayerFilter } from 'lib/hooks/players';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import { InferGetStaticPropsType } from 'next';
import React, { useEffect, useMemo, useRef } from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const [ssrClient, ssrCache] = getSsrClient();

  // This populates the cache server-side
  const { error } = await getPlayersWithCount(undefined, ssrClient);
  if (error) {
    throw new Error(`getPlayers error: ${error}`);
  }
  await getPlayerFilters(ssrClient);

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
    revalidate: 1,
  };
};

const Players: React.FC<Props> = () => {
  const {
    players,
    aggregates,
    fetching,
    fetchingMore,
    error,
    queryVariables,
    setQueryVariable,
    resetFilter,
    totalCount,
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

  const isLoading = useMemo(() => fetching || fetchingMore || moreAvailable, [
    fetching,
    fetchingMore,
    moreAvailable,
  ]);

  const showSeasonalXP = useMemo(
    () => Object.keys(queryVariables.orderBy).includes('season_xp'),
    [queryVariables.orderBy],
  );

  return (
    <PageContainer>
      <HeadComponent url="https://my.metagame.wtf/community/players" />
      <VStack
        w="100%"
        spacing={{ base: '4', md: '8' }}
        pb={{ base: '16', lg: '0' }}
      >
        <PlayerFilter
          {...{
            fetching,
            fetchingMore,
            aggregates,
            queryVariables,
            setQueryVariable,
            resetFilter,
            totalCount,
          }}
        />
        {error && <Text>{`Error: ${error.message}`}</Text>}
        {!error && players.length && (fetchingMore || !fetching) && (
          <PlayerList {...{ players, showSeasonalXP }} />
        )}
        <MorePlayers
          ref={moreRef}
          fetching={isLoading}
          totalCount={totalCount}
          queryVariables={queryVariables}
          showSeasonalXP={showSeasonalXP}
        />
      </VStack>
    </PageContainer>
  );
};

export default Players;

type MorePlayersProps = {
  fetching: boolean;
  totalCount: number;
  queryVariables: PlayersQueryVariables;
  showSeasonalXP?: boolean;
};

const MorePlayers = React.forwardRef<HTMLDivElement, MorePlayersProps>(
  ({ fetching, totalCount, queryVariables, showSeasonalXP = false }, ref) => {
    const isTimeZoneSelected = useMemo(
      () => queryVariables.timeZones && queryVariables.timeZones.length > 0,
      [queryVariables],
    );

    return (
      <VStack w="100%" ref={ref}>
        {fetching ? <PlayersLoading /> : null}
        {!fetching && !isTimeZoneSelected && totalCount > 0 ? (
          <Text color="white">No more players available.</Text>
        ) : null}
        {!fetching && totalCount === 0 && <PlayersNotFound />}
        {!fetching && isTimeZoneSelected && (
          <AdjascentTimeZonePlayers {...{ queryVariables, showSeasonalXP }} />
        )}
      </VStack>
    );
  },
);
