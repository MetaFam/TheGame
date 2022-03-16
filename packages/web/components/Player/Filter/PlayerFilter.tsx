import {
  Button,
  CloseIcon,
  FilterTag,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  MetaButton,
  Skeleton,
  Stack,
  styled,
  Text,
  TimeZoneType,
  useBreakpointValue,
  useDisclosure,
  Wrap,
  WrapItem,
} from '@metafam/ds';
import { DesktopFilters } from 'components/Player/Filter/DesktopFilters';
import { MobileFilters } from 'components/Player/Filter/MobileFilters';
import { PlayersQueryVariables } from 'graphql/getPlayers';
import {
  PlayerAggregates,
  QueryVariableSetter,
  SortOption,
  sortOptionsMap,
  useFiltersUsed,
} from 'lib/hooks/players';
import React, { useCallback, useEffect, useState } from 'react';
import { SkillOption } from 'utils/skillHelpers';

const Form = styled.form({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

type ValueType = { value: string; label: string };

type Props = {
  fetching: boolean;
  fetchingMore: boolean;
  aggregates: PlayerAggregates;
  queryVariables: PlayersQueryVariables;
  setQueryVariable: QueryVariableSetter;
  resetFilter: () => void;
  total: number;
};

export const PlayerFilter: React.FC<Props> = ({
  fetching,
  fetchingMore,
  aggregates,
  queryVariables,
  setQueryVariable,
  resetFilter,
  total,
}) => {
  const [search, setSearch] = useState<string>('');

  const [skills, setSkills] = useState<SkillOption[]>([]);
  const [playerTypes, setPlayerTypes] = useState<ValueType[]>([]);
  const [timeZones, setTimeZones] = useState<Array<TimeZoneType>>([]);
  const [availability, setAvailability] = useState<ValueType | null>(null);
  const [sortOption, setSortOption] = useState<ValueType>(
    sortOptionsMap[SortOption.SEASON_XP],
  );

  const onSearch = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.length >= 2) {
      setQueryVariable('search', `%${search}%`);
    } else {
      setSearch('');
      setQueryVariable('search', '%%');
    }
  };

  const filtersUsed = useFiltersUsed(queryVariables);
  const resetAllFilters = useCallback(() => {
    resetFilter();
    setSortOption(sortOptionsMap[SortOption.SEASON_XP]);
    setSkills([]);
    setPlayerTypes([]);
    setTimeZones([]);
    setAvailability(null);
  }, [resetFilter]);
  const isSearchUsed = queryVariables.search !== '%%';
  const searchText = queryVariables.search?.slice(1, -1) || '';

  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    setQueryVariable(
      'explorerTypeTitles',
      playerTypes.length > 0 ? playerTypes.map(({ label }) => label) : null,
    );
  }, [setQueryVariable, playerTypes]);

  useEffect(() => {
    setQueryVariable(
      'skillIds',
      skills.length > 0 ? skills.map((s) => s.id) : null,
    );
  }, [setQueryVariable, skills]);

  useEffect(() => {
    setQueryVariable(
      'timeZones',
      timeZones.length > 0 ? timeZones.map((t) => t.label) : null,
    );
  }, [setQueryVariable, timeZones]);

  useEffect(() => {
    setQueryVariable(
      'availability',
      availability ? parseInt(availability.value, 10) : null,
    );
  }, [setQueryVariable, availability]);

  useEffect(() => {
    setQueryVariable('orderBy', sortOption.value);
  }, [setQueryVariable, sortOption]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Form onSubmit={onSearch}>
        <Stack
          spacing="4"
          w="100%"
          maxW="2xl"
          direction={{ base: 'column', md: 'row' }}
          align="center"
        >
          <InputGroup size="lg">
            <Input
              background="dark"
              w="100%"
              type="text"
              minW={{
                base: 'min(18rem, calc(100vw - 2rem))',
                sm: 'md',
                md: 'lg',
                lg: 'xl',
              }}
              placeholder="SEARCH PLAYERS BY NAME OR ETHEREUM ADDRESS"
              _placeholder={{ color: 'whiteAlpha.500' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="lg"
              borderRadius="0"
              borderColor="borderPurple"
              fontSize="md"
              borderWidth="2px"
            />
            {search.length > 0 && (
              <InputRightElement>
                <IconButton
                  p="2"
                  variant="link"
                  colorScheme="white"
                  icon={<CloseIcon />}
                  onClick={() => {
                    setSearch('');
                    setQueryVariable('search', '%%');
                  }}
                  aria-label="Clear Search"
                />
              </InputRightElement>
            )}
          </InputGroup>
          <MetaButton
            type="submit"
            size="lg"
            isDisabled={fetching}
            px="16"
            display={isSmallScreen ? 'none' : 'flex'}
          >
            SEARCH
          </MetaButton>
        </Stack>
      </Form>
      <DesktopFilters
        display={isSmallScreen ? 'none' : 'flex'}
        {...{
          aggregates,
          skills,
          setSkills,
          playerTypes,
          setPlayerTypes,
          timeZones,
          setTimeZones,
          availability,
          setAvailability,
          sortOption,
          setSortOption,
        }}
      />
      <MobileFilters
        aggregates={aggregates}
        skills={skills}
        setSkills={setSkills}
        playerTypes={playerTypes}
        setPlayerTypes={setPlayerTypes}
        timeZones={timeZones}
        setTimeZones={setTimeZones}
        availability={availability}
        setAvailability={setAvailability}
        isOpen={isSmallScreen ? isOpen : false}
        onClose={onClose}
        filtersUsed={filtersUsed}
        resetAllFilters={resetAllFilters}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      {filtersUsed && (
        <Flex w="100%" maxW="79rem" justify="space-between">
          <Wrap flex="1">
            {!isSmallScreen && (
              <WrapItem>
                <Flex w="100%" h="100%" justify="center" align="center">
                  <Text> {`Selected Filters: `}</Text>
                </Flex>
              </WrapItem>
            )}
            {isSearchUsed && (
              <WrapItem>
                <FilterTag
                  label={searchText}
                  onRemove={() => {
                    setSearch('');
                    setQueryVariable('search', '%%');
                  }}
                />
              </WrapItem>
            )}
            {sortOption?.value !== SortOption.SEASON_XP && (
              <WrapItem>
                <FilterTag
                  label={`Sorted By: ${sortOption.label}`}
                  onRemove={() => {
                    setSortOption(sortOptionsMap[SortOption.SEASON_XP]);
                  }}
                />
              </WrapItem>
            )}
            {playerTypes.map(({ value, label }, index) => (
              <WrapItem key={value}>
                <FilterTag
                  label={label}
                  onRemove={() => {
                    const newPlayerTypes = playerTypes.slice();
                    newPlayerTypes.splice(index, 1);
                    setPlayerTypes(newPlayerTypes);
                  }}
                />
              </WrapItem>
            ))}
            {skills.map(({ value, label }, index) => (
              <WrapItem key={value}>
                <FilterTag
                  label={label}
                  onRemove={() => {
                    const newSkills = skills.slice();
                    newSkills.splice(index, 1);
                    setSkills(newSkills);
                  }}
                />
              </WrapItem>
            ))}
            {availability && (
              <WrapItem>
                <FilterTag
                  label={`Available ≥${availability.value} h/week`}
                  onRemove={() => {
                    setAvailability(null);
                  }}
                />
              </WrapItem>
            )}
            {timeZones.map(({ name, label }, index) => (
              <WrapItem key={name}>
                <FilterTag
                  label={label}
                  onRemove={() => {
                    const newZones = [...timeZones];
                    newZones.splice(index, 1);
                    setTimeZones(newZones);
                  }}
                />
              </WrapItem>
            ))}
          </Wrap>
          <Button
            variant="link"
            color="cyan.400"
            onClick={resetAllFilters}
            minH="2.5rem"
            display={isSmallScreen ? 'none' : 'flex'}
            p="2"
          >
            RESET ALL FILTERS
          </Button>
        </Flex>
      )}
      {fetchingMore || !fetching ? (
        <Flex justify="space-between" w="100%" maxW="79rem" align="center">
          <Text fontWeight="bold" fontSize="xl">
            {total} player{total === 1 ? '' : 's'}
          </Text>
          <Button
            variant="link"
            color="cyan.400"
            onClick={onOpen}
            fontSize="sm"
            minH="2.5rem"
            minW="8.5rem"
            display={isSmallScreen ? 'flex' : 'none'}
            p={2}
          >
            FILTER AND SORT
          </Button>
        </Flex>
      ) : (
        <Flex justify="space-between" w="100%" maxW="79rem" align="center">
          <Skeleton h="1.5rem" w="8rem" />
        </Flex>
      )}
    </>
  );
};
