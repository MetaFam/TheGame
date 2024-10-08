import { Text, VStack } from '@metafam/ds';
import { useRouter } from 'next/router';
import { MorePlayers } from 'pages/players';
import { lazy, useEffect, useMemo, useRef } from 'react';

import { PlayerList } from '#components/Player/PlayerList';
import SearchFilters from '#components/SearchFilters';
import { HeadComponent } from '#components/Seo';
import { usePlayerFilter } from '#lib/hooks/player/players';
import { useOnScreen } from '#lib/hooks/useOnScreen';
import { GlobalFilters } from '#utils/GlobalSearch';

const PageContainer = lazy(() => import('components/Container'));

const PlayerSearchPage: React.FC = () => {
  const {
    players,
    fetching,
    fetchingMore,
    error,
    queryVariables,
    setQueryVariable,
    total,
    nextPage,
    moreAvailable,
  } = usePlayerFilter();
  const { query } = useRouter();
  const searchQuery = Array.from(query.q ?? '')[0];

  const search = decodeURI(searchQuery);

  useEffect(() => {
    setQueryVariable('search', `%${search}%`);
  }, [search, setQueryVariable]);

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
  const isLoading = useMemo(
    () => fetching || fetchingMore || moreAvailable,
    [fetching, fetchingMore, moreAvailable],
  );
  return (
    <PageContainer>
      <HeadComponent url="https://my.metagame.wtf/community/search" />
      <VStack w="100%" spacing={{ base: 4, md: 8 }} pb={{ base: 16, lg: 0 }}>
        <SearchFilters activeFilter={GlobalFilters.PLAYERS} search={search} />
        {error && <Text>Error: {error.message}</Text>}
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

export default PlayerSearchPage;
