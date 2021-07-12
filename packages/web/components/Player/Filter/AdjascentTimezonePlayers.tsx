import { Flex, LoadingState, Text, TimezoneOptions, VStack } from '@metafam/ds';
import { PlayerList } from 'components/Player/PlayerList';
import { GetPlayersQueryVariables } from 'graphql/autogen/types';
import { usePlayerFilter } from 'lib/hooks/players';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import React, { useEffect, useMemo, useRef, useState } from 'react';

type Props = {
  queryVariables: GetPlayersQueryVariables;
};

const getAdjacentTimezoneQueryVariables = (
  defaultQueryVariables: GetPlayersQueryVariables,
): GetPlayersQueryVariables => {
  const timezoneValue = defaultQueryVariables.timezones
    ? defaultQueryVariables.timezones[0]
    : undefined;
  const timezone = TimezoneOptions.find((t) => t.value === timezoneValue);
  const adjascentTimezones = timezone
    ? TimezoneOptions.filter(
        (t) =>
          Math.abs(t.offset - timezone.offset) <= 4 &&
          t.value !== timezoneValue,
      )
        .sort((a, b) => (a.offset < b.offset ? -1 : 1))
        .map((t) => t.value)
    : [];
  return {
    ...defaultQueryVariables,
    offset: 0,
    timezones: adjascentTimezones,
  };
};

export const AdjascentTimezonePlayers: React.FC<Props> = ({
  queryVariables: defaultQueryVariables,
}) => {
  const moreRef = useRef<HTMLDivElement>(null);

  const [queryVariables] = useState(
    getAdjacentTimezoneQueryVariables(defaultQueryVariables),
  );

  const onScreen = useOnScreen(moreRef);

  const {
    players,
    totalCount,
    fetching,
    fetchingMore,
    error,
    nextPage,
    moreAvailable,
  } = usePlayerFilter(queryVariables);

  useEffect(() => {
    if (onScreen) {
      nextPage();
    }
  }, [nextPage, onScreen]);

  const isLoading = useMemo(() => fetching || fetchingMore || moreAvailable, [
    fetching,
    fetchingMore,
    moreAvailable,
  ]);

  return (
    <VStack
      w="100%"
      spacing={{ base: '4', md: '8' }}
      pt={{ base: '4', md: '8' }}
    >
      {error ? <Text>{`Error: ${error.message}`}</Text> : null}
      {!error && players.length && (fetchingMore || !fetching) ? (
        <>
          <Flex
            justify="space-between"
            w="100%"
            maxW="80rem"
            px="4"
            align="center"
          >
            <Text fontWeight="bold" fontSize="xl" w="100%" maxW="79rem">
              Found {totalCount} player{totalCount === 1 ? '' : 's'} in adjacent
              time zones
            </Text>
          </Flex>
          <PlayerList players={players} />
        </>
      ) : null}
      <VStack w="100%" ref={moreRef}>
        {isLoading ? <LoadingState color="white" /> : null}
        {!isLoading && totalCount > 0 ? (
          <Text color="white">No more players available</Text>
        ) : null}
      </VStack>
    </VStack>
  );
};
