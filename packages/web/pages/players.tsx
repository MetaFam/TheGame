import { LoadingState, Text, VStack } from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { PlayerFilter } from 'components/Player/PlayerFilter';
import { PlayerList } from 'components/Player/PlayerList';
import { getSsrClient } from 'graphql/client';
import { getPlayers } from 'graphql/getPlayers';
import { usePlayerFilter } from 'lib/hooks/players';
import { InferGetStaticPropsType } from 'next';
import React from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const [ssrClient, ssrCache] = getSsrClient();
  // This populate the cache server-side
  await getPlayers(undefined, ssrClient);
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
  } = usePlayerFilter();
  return (
    <PageContainer>
      <VStack w="100%" spacing="8">
        <PlayerFilter
          fetching={fetching}
          aggregates={aggregates}
          queryVariables={queryVariables}
          setQueryVariable={setQueryVariable}
          players={players || []}
        />
        {error && <Text>{`Error: ${error.message}`}</Text>}
        {fetching && <LoadingState />}
        {players && !fetching && !error && <PlayerList players={players} />}
      </VStack>
    </PageContainer>
  );
};

export default Players;
