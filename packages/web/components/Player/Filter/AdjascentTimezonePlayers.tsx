import { Flex, LoadingState, Text, TimezoneOptions, VStack } from '@metafam/ds';
import { PlayerList } from 'components/Player/PlayerList';
import { GetPlayersQueryVariables } from 'graphql/autogen/types';
import { usePlayerFilter } from 'lib/hooks/players';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';

type Props = {
  queryVariables: GetPlayersQueryVariables;
};

export const AdjascentTimezonePlayers: React.FC<Props> = ({
  queryVariables: defaultQueryVariables,
}) => {
  const moreRef = useRef<HTMLDivElement>(null);

  const queryVariables = useMemo(() => {
    const timezoneValue = defaultQueryVariables.timezones
      ? defaultQueryVariables.timezones[0]
      : undefined;
    const timezone = TimezoneOptions.find((t) => t.value === timezoneValue);
    const adjascentTimezones = timezone
      ? TimezoneOptions.filter(
          (t) =>
            Math.abs(t.offset - timezone.offset) <= 4 &&
            t.value !== timezoneValue,
        ).sort((a, b) => (a.offset < b.offset ? -1 : 1))
      : [];
    return {
      ...defaultQueryVariables,
      offset: 0,
      timezones: adjascentTimezones.map((t) => t.value),
    };
  }, [defaultQueryVariables]);

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

  const loadMore = useCallback(() => {
    if (onScreen && !fetching && !fetchingMore && moreAvailable) {
      nextPage();
    }
  }, [nextPage, fetching, fetchingMore, onScreen, moreAvailable]);

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  return (
    <>
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
            <Text fontWeight="bold" fontSize="xl" w="100%" maxW="79rem" mb="8">
              {totalCount} player{totalCount === 1 ? '' : 's'} in adjacent time
              zones
            </Text>
          </Flex>
          <PlayerList players={players} />
        </>
      ) : null}
      <VStack w="100%" ref={moreRef}>
        {fetching || fetchingMore || moreAvailable ? (
          <LoadingState color="white" />
        ) : (
          <Text color="white">No more players available</Text>
        )}
      </VStack>
    </>
  );
};
