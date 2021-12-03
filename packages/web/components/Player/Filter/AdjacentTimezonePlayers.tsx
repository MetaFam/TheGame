import { Flex, Skeleton, Text, TimezoneOptions, VStack } from '@metafam/ds';
import { PlayerList } from 'components/Player/PlayerList';
import { PlayersQueryVariables } from 'graphql/getPlayers';
import { usePlayerFilter } from 'lib/hooks/players';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { PlayersLoading } from './PlayersLoading';

const getAdjacentTimezoneQueryVariables = (
  defaultQueryVariables: PlayersQueryVariables,
): PlayersQueryVariables => {
  const timezoneValue = defaultQueryVariables.timezones?.[0];
  const timezone = TimezoneOptions.find((t) => t.value === timezoneValue);
  const adjacentTimezones = timezone
    ? TimezoneOptions.filter(
        (t) =>
          Math.abs(t.offset - timezone.offset) <= 4 &&
          t.value !== timezoneValue,
      ).map((t) => t.value)
    : [];
  return {
    ...defaultQueryVariables,
    offset: 0,
    timezones: adjacentTimezones,
  };
};

type Props = {
  queryVariables: PlayersQueryVariables;
  showSeasonalXP?: boolean;
};

export const AdjacentTimezonePlayers: React.FC<Props> = ({
  queryVariables,
  showSeasonalXP,
}) => {
  const [variables, setVariables] = useState<PlayersQueryVariables>(
    getAdjacentTimezoneQueryVariables(queryVariables),
  );

  useEffect(() => {
    setVariables(getAdjacentTimezoneQueryVariables(queryVariables));
  }, [queryVariables]);

  const moreRef = useRef(null);
  const onScreen = useOnScreen(moreRef);

  const {
    players,
    totalCount,
    fetching,
    fetchingMore,
    error,
    nextPage,
    moreAvailable,
  } = usePlayerFilter(variables);

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

  return (
    <VStack
      w="100%"
      spacing={{ base: '4', md: '8' }}
      pt={{ base: '4', md: '8' }}
    >
      {error ? <Text>Error: {error.message}</Text> : null}
      {!error &&
        (fetchingMore || !fetching ? (
          <>
            <Flex
              justify="space-between"
              w="100%"
              maxW="79rem"
              pr={4}
              align="center"
              pb={{ base: 4, md: 0 }}
            >
              <Text fontWeight="bold" fontSize="xl" w="100%" maxW="79rem">
                {totalCount} player{totalCount === 1 ? '' : 's'} in adjacent
                time zones
              </Text>
            </Flex>
            <PlayerList players={players} showSeasonalXP={showSeasonalXP} />
          </>
        ) : (
          <Flex justify="space-between" w="100%" maxW="79rem" align="center">
            <Skeleton h="1.5rem" w="8rem" />
          </Flex>
        ))}
      <VStack w="100%" ref={moreRef}>
        {isLoading ? <PlayersLoading /> : null}
        {!isLoading && totalCount > 0 ? (
          <Text color="white">No more players available</Text>
        ) : null}
      </VStack>
    </VStack>
  );
};
