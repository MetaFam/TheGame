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
  Stack,
  styled,
  Text,
  useBreakpointValue,
  useDisclosure,
  Wrap,
  WrapItem,
} from '@metafam/ds';
import { DesktopFilters } from 'components/Player/Filter/DesktopFilters';
import { MobileFilters } from 'components/Player/Filter/MobileFilters';
import { GetPlayersQueryVariables } from 'graphql/autogen/types';
import {
  PlayerAggregates,
  QueryVariableSetter,
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
  queryVariables: GetPlayersQueryVariables;
  setQueryVariable: QueryVariableSetter;
  resetFilter: () => void;
  totalCount: number;
};

export const PlayerFilter: React.FC<Props> = ({
  fetching,
  fetchingMore,
  aggregates,
  queryVariables,
  setQueryVariable,
  resetFilter,
  totalCount,
}) => {
  const [search, setSearch] = useState<string>('');

  const [skills, setSkills] = useState<SkillOption[]>([]);
  const [playerTypes, setPlayerTypes] = useState<ValueType[]>([]);
  const [timezones, setTimezones] = useState<ValueType[]>([]);
  const [availability, setAvailability] = useState<ValueType | null>(null);

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
    setSkills([]);
    setPlayerTypes([]);
    setTimezones([]);
    setAvailability(null);
  }, [resetFilter]);
  const isSearchUsed = queryVariables.search !== '%%';
  const searchText = queryVariables.search?.slice(1, -1) || '';

  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    setQueryVariable(
      'playerTypeIds',
      playerTypes.length > 0
        ? playerTypes.map((pT) => Number.parseInt(pT.value, 10))
        : null,
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
      'timezones',
      timezones.length > 0 ? timezones.map((t) => t.value) : null,
    );
  }, [setQueryVariable, timezones]);

  useEffect(() => {
    setQueryVariable(
      'availability',
      availability ? parseInt(availability.value, 10) : 0,
    );
  }, [setQueryVariable, availability]);

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
              minW={{ base: '18rem', sm: 'md', md: 'lg', lg: 'xl' }}
              placeholder="SEARCH PLAYERS BY USERNAME OR ETHEREUM ADDRESS"
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
        aggregates={aggregates}
        skills={skills}
        setSkills={setSkills}
        playerTypes={playerTypes}
        setPlayerTypes={setPlayerTypes}
        timezones={timezones}
        setTimezones={setTimezones}
        availability={availability}
        setAvailability={setAvailability}
      />
      <MobileFilters
        aggregates={aggregates}
        skills={skills}
        setSkills={setSkills}
        playerTypes={playerTypes}
        setPlayerTypes={setPlayerTypes}
        timezones={timezones}
        setTimezones={setTimezones}
        availability={availability}
        setAvailability={setAvailability}
        isOpen={isSmallScreen ? isOpen : false}
        onClose={onClose}
        filtersUsed={filtersUsed}
        resetAllFilters={resetAllFilters}
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
                  label={`Available >${availability.value} h/week`}
                  onRemove={() => {
                    setAvailability(null);
                  }}
                />
              </WrapItem>
            )}
            {timezones.map(({ value, label }, index) => (
              <WrapItem key={value}>
                <FilterTag
                  label={label}
                  onRemove={() => {
                    const newTimezones = timezones.slice();
                    newTimezones.splice(index, 1);
                    setTimezones(newTimezones);
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
      {(fetchingMore || !fetching) && (
        <Flex
          justify="space-between"
          w="100%"
          maxW="80rem"
          px="4"
          align="center"
        >
          <Text fontWeight="bold" fontSize="xl" w="100%" maxW="79rem">
            {totalCount} player{totalCount === 1 ? '' : 's'}
          </Text>
          <Button
            variant="link"
            color="cyan.400"
            onClick={onOpen}
            size="sm"
            minH="2.5rem"
            display={isSmallScreen ? 'flex' : 'none'}
            p="2"
          >
            FILTER
          </Button>
        </Flex>
      )}
    </>
  );
};
