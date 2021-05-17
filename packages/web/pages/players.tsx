import {
  Input,
  LoadingState,
  MetaButton,
  Stack,
  Text,
  VStack,
} from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { PlayerFilter } from 'components/Player/PlayerFilter';
import { PlayerList } from 'components/Player/PlayerList';
import { getSsrClient } from 'graphql/client';
import { getPlayers } from 'graphql/getPlayers';
import { usePlayerFilter } from 'lib/hooks/players';
import { InferGetStaticPropsType } from 'next';
import React, { useState } from 'react';

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
  const [search, setSearch] = useState<string>('');
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
        <Stack
          spacing="4"
          w="100%"
          maxW="2xl"
          direction={{ base: 'column', md: 'row' }}
          align="center"
        >
          <Input
            background="dark"
            w="100%"
            type="text"
            minW={{ base: 'sm', sm: 'md', md: 'lg', lg: 'xl' }}
            placeholder="SEARCH PLAYERS BY NAME, LOCATION OR SKILLS"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
          />
          <MetaButton size="md">SEARCH</MetaButton>
        </Stack>
        <PlayerFilter
          fetching={fetching}
          aggregates={aggregates}
          queryVariables={queryVariables}
          setQueryVariable={setQueryVariable}
          players={players || []}
        />
        {error && <Text>{`Error: ${error.message}`}</Text>}
        {fetching && <LoadingState />}
        {players && !fetching && <PlayerList players={players} />}
      </VStack>
    </PageContainer>
  );
};

export default Players;
