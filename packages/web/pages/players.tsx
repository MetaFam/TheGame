import { Center, Link, Text, VStack } from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { AdjascentTimeZonePlayers } from 'components/Player/Filter/AdjascentTimeZonePlayers';
import { PlayerFilter } from 'components/Player/Filter/PlayerFilter';
import { PlayersLoading } from 'components/Player/Filter/PlayersLoading';
import { PlayersNotFound } from 'components/Player/Filter/PlayersNotFound';
import { PlayerList } from 'components/Player/PlayerList';
import { HeadComponent } from 'components/Seo';
import { getSSRClient } from 'graphql/client';
import {
  getPlayerFilters,
  getPlayersWithCount,
  PlayersQueryVariables,
} from 'graphql/getPlayers';
import { usePlayerFilter } from 'lib/hooks/player/players';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import { InferGetStaticPropsType } from 'next';
import { SSRData } from 'next-urql';
import React, { useEffect, useMemo, useRef } from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async (): Promise<{
  props: { urqlState?: SSRData };
  revalidate: 1;
}> => {
  const [ssrClient, ssrCache] = getSSRClient();

  // This populates the cache server-side
  const { error } = await getPlayersWithCount(undefined, ssrClient);
  if (error) {
    throw new Error(`getPlayers Error: ${error}`);
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
    total,
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

  const isLoading = useMemo(
    () => fetching || fetchingMore || moreAvailable,
    [fetching, fetchingMore, moreAvailable],
  );

  const showSeasonalXP = useMemo(
    () => Object.keys(queryVariables.orderBy).includes('seasonXP'),
    [queryVariables.orderBy],
  );

  return (
    <PageContainer>
      <HeadComponent
        title="MetaGame Players"
        description="See the players of MetaGame."
        url="https://metagame.wtf/players"
      />
      <VStack w="100%" spacing={{ base: 6, md: 8 }} pb={8}>
        <Center
          fontSize={{ base: 'sm', md: 'md' }}
          fontWeight={{ base: '400', md: '700' }}
          marginTop={{ base: 3, sm: 0 }}
          w="100%"
          maxW="4xl"
        >
          <Text as="p" textAlign="center">
            Want to get on this leaderboard and rank high? Why not{' '}
            <Link
              href="/signup?tab=player"
              color="pink.300"
              textDecoration="underline"
              whiteSpace="nowrap"
            >
              become a player
            </Link>{' '}
            or just start contributing more?
          </Text>
        </Center>

        <PlayerFilter
          {...{
            fetching,
            fetchingMore,
            aggregates,
            queryVariables,
            setQueryVariable,
            resetFilter,
            total,
          }}
        />
        {error && <Text>{`Error: ${error.message}`}</Text>}
        {!error && players.length && (fetchingMore || !fetching) && (
          <PlayerList {...{ players, showSeasonalXP }} />
        )}
        <MorePlayers
          ref={moreRef}
          fetching={isLoading}
          {...{
            total,
            queryVariables,
            showSeasonalXP,
          }}
        />
      </VStack>
    </PageContainer>
  );
};

export default Players;

type MorePlayersProps = {
  fetching: boolean;
  total: number;
  queryVariables: PlayersQueryVariables;
  showSeasonalXP?: boolean;
};

export const MorePlayers = React.forwardRef<HTMLDivElement, MorePlayersProps>(
  ({ fetching, total, queryVariables, showSeasonalXP = false }, ref) => {
    const isTimeZoneSelected = useMemo(
      () => queryVariables.timeZones && queryVariables.timeZones.length > 0,
      [queryVariables],
    );

    return (
      <VStack w="100%" {...{ ref }}>
        {fetching && <PlayersLoading />}
        {!fetching && !isTimeZoneSelected && total > 0 && (
          <Text color="white">No more players available.</Text>
        )}
        {!fetching && total === 0 && <PlayersNotFound />}
        {!fetching && isTimeZoneSelected && (
          <AdjascentTimeZonePlayers {...{ queryVariables, showSeasonalXP }} />
        )}
      </VStack>
    );
  },
);
