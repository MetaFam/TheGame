import {
  Input,
  MetaButton,
  MetaSelect,
  Stack,
  Text,
  TimezoneOptions,
  TimezoneType,
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
    if (search.length >= 2) {
      setQueryVariable('search', `%${search}%`);
    }
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
            _placeholder={{ color: 'whiteAlpha.500' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="lg"
            borderRadius="0"
            borderColor="purple.400"
            fontSize="md"
            borderWidth="2px"
          />
          <MetaButton type="submit" size="lg" isLoading={fetching} px="16">
            SEARCH
          </MetaButton>
        </Stack>
      </form>
      <Wrap
        justify="space-between"
        w="100%"
        bg="whiteAlpha.200"
        style={{ backdropFilter: 'blur(7px)' }}
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
                <MetaSelect
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
                </MetaSelect>
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
                <MetaSelect
                  value={(queryVariables.playerType as number) || ''}
                  onChange={(e) =>
                    setQueryVariable('playerType', e.target.value)
                  }
                >
                  <option value="">All Types</option>
                  {aggregates.playerTypes &&
                    aggregates.playerTypes.map(({ id, title }) => (
                      <option key={id} value={id}>
                        {title}
                      </option>
                    ))}
                </MetaSelect>
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
                <MetaSelect
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
                </MetaSelect>
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
                <MetaSelect
                  value={queryVariables.availability as number}
                  onChange={(e) =>
                    setQueryVariable('availability', e.target.value)
                  }
                >
                  <option value={0}>Any h/week</option>
                  <option value={1}>{'> 1 h/week'}</option>
                  <option value={5}>{'> 5 h/week'}</option>
                  <option value={10}>{'> 10 h/week'}</option>
                  <option value={20}>{'> 20 h/week'}</option>
                  <option value={30}>{'> 30 h/week'}</option>
                  <option value={40}>{'> 40 h/week'}</option>
                </MetaSelect>
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
                <MetaSelect
                  value={(queryVariables.timezone as string) || ''}
                  onChange={(e) => setQueryVariable('timezone', e.target.value)}
                >
                  <option value="">All timezones</option>
                  {TimezoneOptions.map((z: TimezoneType) => (
                    <option key={z.id} value={z.id}>
                      {z.label}
                    </option>
                  ))}
                </MetaSelect>
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
