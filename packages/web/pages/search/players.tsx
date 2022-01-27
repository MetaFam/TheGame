import { Text, VStack } from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { PlayerList } from 'components/Player/PlayerList';
import SearchFilters from 'components/SearchFilters';
import { HeadComponent } from 'components/Seo';
import { usePlayerFilter } from 'lib/hooks/players';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useRef } from 'react';

import { GlobalFilters } from '../../utils/GlobalSearch';
import { MorePlayers } from '../community/players';

const PlayerSearchPage = () => {
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
  const { query } = useRouter();
  const search: string = decodeURI(query.q as string);

  useEffect(() => {
    if (search) {
      setQueryVariable('search', `%${search}%`);
    }
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
  const isLoading = useMemo(() => fetching || fetchingMore || moreAvailable, [
    fetching,
    fetchingMore,
    moreAvailable,
  ]);
  return (
    <PageContainer>
      <HeadComponent url="https://my.metagame.wtf/community/search" />
      <VStack
        w="100%"
        spacing={{ base: '4', md: '8' }}
        pb={{ base: '16', lg: '0' }}
      >
        <SearchFilters activeFilter={GlobalFilters.PLAYERS} search={search} />
        {error ? <Text>{`Error: ${error.message}`}</Text> : null}
        {!error && players.length && (fetchingMore || !fetching) ? (
          <PlayerList players={players} showSeasonalXP={showSeasonalXP} />
        ) : null}
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

export default PlayerSearchPage;
