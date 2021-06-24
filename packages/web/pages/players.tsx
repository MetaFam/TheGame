import { LoadingState, Text, VStack } from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { PlayerFilter } from 'components/Player/PlayerFilter';
import { PlayerList } from 'components/Player/PlayerList';
import { HeadComponent } from 'components/Seo';
import { getSsrClient } from 'graphql/client';
import { getPlayerFilters, getPlayers } from 'graphql/getPlayers';
import { usePlayerFilter } from 'lib/hooks/players';
import { InferGetStaticPropsType } from 'next';
import React from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const [ssrClient, ssrCache] = getSsrClient();

  // This populates the cache server-side
  const { error } = await getPlayers(undefined, ssrClient);
  if (error != null) {
    // eslint-disable-next-line no-console
    console.error('error', error);
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
    error,
    queryVariables,
    setQueryVariable,
    resetFilter,
  } = usePlayerFilter();
  return (
    <PageContainer>
      <HeadComponent url="https://my.metagame.wtf/players" />
      <VStack w="100%" spacing="8">
        <PlayerFilter
          fetching={fetching}
          aggregates={aggregates}
          queryVariables={queryVariables}
          setQueryVariable={setQueryVariable}
          players={players || []}
          resetFilter={resetFilter}
        />
        {error && <Text>{`Error: ${error.message}`}</Text>}
        {fetching && <LoadingState />}
        {players && !fetching && !error && <PlayerList players={players} />}
      </VStack>
    </PageContainer>
  );
};

export default Players;
