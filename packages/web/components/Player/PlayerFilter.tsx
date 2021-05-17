import { Select, Text, VStack, Wrap, WrapItem } from '@metafam/ds';
import {
  GetPlayersQueryVariables,
  PlayerFragmentFragment,
} from 'graphql/autogen/types';
import { PlayerAggregates, QueryVariableSetter } from 'lib/hooks/players';
import React from 'react';

type Props = {
  fetching: boolean;
  players: PlayerFragmentFragment[];
  aggregates: PlayerAggregates;
  queryVariables: GetPlayersQueryVariables;
  setQueryVariable: QueryVariableSetter;
};

export const PlayerFilter: React.FC<Props> = ({
  fetching,
  players,
  aggregates,
  queryVariables,
  setQueryVariable,
}) => (
  <Wrap
    justify="space-between"
    w="100%"
    bg="purpleTag30"
    p="4"
    borderRadius="6px"
  >
    <WrapItem>
      <Wrap>
        <WrapItem>
          <VStack spacing="2" w="100%">
            <Text
              textTransform="uppercase"
              color="blueLight"
              w="100%"
              fontSize="sm"
            >
              Show
            </Text>
            <Select
              value={queryVariables.limit as number}
              onChange={(e) =>
                setQueryVariable('limit', Number(e.target.value))
              }
              minW="3rem"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={150}>150</option>
            </Select>
          </VStack>
        </WrapItem>
        <WrapItem>
          <VStack spacing="2" w="100%">
            <Text
              textTransform="uppercase"
              color="blueLight"
              w="100%"
              fontSize="sm"
            >
              Type
            </Text>
            <Select
              value={(queryVariables.playerType as number) || ''}
              onChange={(e) => setQueryVariable('playerType', e.target.value)}
            >
              <option value="">All Types</option>
              {aggregates.playerTypes &&
                aggregates.playerTypes.map(({ id, title }) => (
                  <option key={id} value={id}>
                    {title}
                  </option>
                ))}
            </Select>
          </VStack>
        </WrapItem>
        <WrapItem>
          <VStack spacing="2" w="100%">
            <Text
              textTransform="uppercase"
              color="blueLight"
              w="100%"
              fontSize="sm"
            >
              Skills
            </Text>
            <Select
              value={(queryVariables.skillCategory as string) || ''}
              onChange={(e) =>
                setQueryVariable('skillCategory', e.target.value)
              }
            >
              <option value="">All Skills</option>
              {aggregates.skillCategories &&
                aggregates.skillCategories.map(({ name }) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
            </Select>
          </VStack>
        </WrapItem>
      </Wrap>
    </WrapItem>
    {players && !fetching && (
      <WrapItem>
        <Text align="center">{players.length} players</Text>
      </WrapItem>
    )}
  </Wrap>
);
