import {
  Input,
  MetaButton,
  Select,
  Stack,
  Text,
  TIMEZONE_OPTIONS,
  VStack,
  Wrap,
  WrapItem,
} from '@metafam/ds';
import {
  GetPlayersQueryVariables,
  PlayerFragmentFragment,
} from 'graphql/autogen/types';
import { PlayerAggregates, QueryVariableSetter } from 'lib/hooks/players';
import React, { useState } from 'react';

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
}) => {
  const [search, setSearch] = useState<string>('');
  const onSearch = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQueryVariable('search', `%${search}%`);
  };
  return (
    <>
      <form onSubmit={onSearch}>
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
            placeholder="SEARCH PLAYERS BY USERNAME OR ETHEREUM ADDRESS"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <MetaButton type="submit" size="md" isLoading={fetching}>
            SEARCH
          </MetaButton>
        </Stack>
      </form>
      <Wrap
        justify="space-between"
        w="100%"
        bg="purpleTag30"
        p="6"
        borderRadius="6px"
        maxW="79rem"
      >
        <WrapItem>
          <Wrap spacing="4">
            <WrapItem>
              <VStack spacing="2" w="100%">
                <Text
                  textTransform="uppercase"
                  color="blueLight"
                  w="100%"
                  fontSize="xs"
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
                  fontSize="xs"
                >
                  Player Type
                </Text>
                <Select
                  value={(queryVariables.playerType as number) || ''}
                  onChange={(e) =>
                    setQueryVariable('playerType', e.target.value)
                  }
                  textTransform="uppercase"
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
                  fontSize="xs"
                >
                  Skills
                </Text>
                <Select
                  value={(queryVariables.skillCategory as string) || ''}
                  onChange={(e) =>
                    setQueryVariable('skillCategory', e.target.value)
                  }
                  textTransform="uppercase"
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
            <WrapItem>
              <VStack spacing="2" w="100%">
                <Text
                  textTransform="uppercase"
                  color="blueLight"
                  w="100%"
                  fontSize="xs"
                >
                  Availability
                </Text>
                <Select
                  value={queryVariables.availability as number}
                  onChange={(e) =>
                    setQueryVariable('availability', e.target.value)
                  }
                  textTransform="uppercase"
                >
                  <option value={0}>Any h/week</option>
                  <option value={10}>{'> 10 h/week'}</option>
                  <option value={20}>{'> 20 h/week'}</option>
                  <option value={30}>{'> 30 h/week'}</option>
                  <option value={40}>{'> 40 h/week'}</option>
                </Select>
              </VStack>
            </WrapItem>
            <WrapItem>
              <VStack spacing="2" w="100%">
                <Text
                  textTransform="uppercase"
                  color="blueLight"
                  w="100%"
                  fontSize="xs"
                >
                  Timezone
                </Text>
                <Select
                  value={(queryVariables.timezone as string) || ''}
                  onChange={(e) => setQueryVariable('timezone', e.target.value)}
                  textTransform="uppercase"
                >
                  <option value="">All timezones</option>
                  {TIMEZONE_OPTIONS.map((z) => (
                    <option key={z} value={z}>
                      {z}
                    </option>
                  ))}
                </Select>
              </VStack>
            </WrapItem>
          </Wrap>
        </WrapItem>
        {players && !fetching && (
          <WrapItem>
            <Text align="center" fontWeight="bold">
              {players.length} players
            </Text>
          </WrapItem>
        )}
      </Wrap>
    </>
  );
};
