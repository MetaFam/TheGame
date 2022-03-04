import { Flex, Skeleton, Text, TimeZoneOptions, VStack } from '@metafam/ds';
import { PlayerList } from 'components/Player/PlayerList';
import { PlayersQueryVariables } from 'graphql/getPlayers';
import { usePlayerFilter } from 'lib/hooks/players';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { PlayersLoading } from './PlayersLoading';

const getAdjacentTimeZoneQueryVariables = (
  defaultQueryVariables: PlayersQueryVariables,
): PlayersQueryVariables => {
  const [zoneName] = defaultQueryVariables.timeZones ?? [];
  const timeZone = TimeZoneOptions.find(({ name }) => name === zoneName);
  const adjascentTimeZones = !timeZone
    ? []
    : TimeZoneOptions.filter(
        (t) => Math.abs(t.offset - timeZone.offset) <= 4 && t.name === zoneName,
      ).map(({ name }) => name);
  return {
    ...defaultQueryVariables,
    offset: 0,
    timeZones: adjascentTimeZones,
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
    getAdjacentTimeZoneQueryVariables(queryVariables),
  );

  useEffect(() => {
    setVariables(getAdjacentTimeZoneQueryVariables(queryVariables));
  }, [queryVariables]);

  const moreRef = useRef(null);
  const onScreen = useOnScreen(moreRef);

  const {
    players,
    total,
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

  const isLoading = useMemo(
    () => fetching || fetchingMore || moreAvailable,
    [fetching, fetchingMore, moreAvailable],
  );

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
                {total} player{total === 1 ? '' : 's'} in adjacent time zones
              </Text>
            </Flex>
            <PlayerList {...{ players, showSeasonalXP }} />
          </>
        ) : (
          <Flex justify="space-between" w="100%" maxW="79rem" align="center">
            <Skeleton h="1.5rem" w="8rem" />
          </Flex>
        ))}
      <VStack w="100%" ref={moreRef}>
        {isLoading ? <PlayersLoading /> : null}
        {!isLoading && total > 0 ? (
          <Text color="white">No more players available</Text>
        ) : null}
      </VStack>
    </VStack>
  );
};
