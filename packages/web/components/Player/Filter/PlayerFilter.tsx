import {
  Box,
  Button,
  chakra,
  CloseIcon,
  FilterTag,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  SearchIcon,
  Skeleton,
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
import { useIsSticky } from 'lib/hooks/useIsSticky';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SkillOption } from 'utils/skillHelpers';

const Form = chakra.form;

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

  /**
   * filterRef is used to mark the element that holds the search and filters
   * Used by useIsSticky to check if it's off the viewport and should be sticky
   * e.g. if isSticky is true, then the element should be stuck tot the top
   */
  const filterRef = useRef<HTMLDivElement>(null);
  const isSticky = useIsSticky(filterRef);

  return (
    <>
      {/**
       * Test here
       * Search box inside the filters
       * Is sticky
       * Can go full width and get stuck
       * maxW = 7xl, which is 1280px
       * Shows in columns until we get to isSmallScreen/md
       * Shows in rows from isSmallScreen/md until the screen gets to 86em (~=1368px)
       * - because there isn't enough room to show the search and dropdowns all in one row
       * When the screen gets to 86em, there's enough room for columns again
       */}

      <Flex
        ref={filterRef}
        alignItems="flex-start"
        justifyContent="center"
        transition="all 0.25s"
        py={6}
        backdropFilter="blur(7px)"
        position="sticky"
        top="-1px"
        borderTop="1px solid transparent"
        zIndex={1}
        w={isSticky ? 'calc(100% + 6rem)' : '100%'}
        maxW={isSticky ? 'auto' : '7xl'}
        bg={isSticky ? 'purpleTag70' : 'whiteAlpha.200'}
        px={isSticky ? '4.5rem' : '1.5rem'}
        borderRadius={isSticky ? 0 : '6px'}
      >
        <Box
          paddingRight={2} // Match wrap margins on the other column/rows in DesktopFilters
        >
          <Form onSubmit={onSearch} maxW="28rem" marginX="auto">
            <InputGroup size="md">
              <InputLeftElement>
                <SearchIcon color="whiteAlpha.500" />
              </InputLeftElement>
              <Input
                background="dark"
                w="100%"
                type="text"
                placeholder="SEARCH PLAYERS BY USERNAME OR ETH ADDRESS"
                _placeholder={{ color: 'whiteAlpha.500' }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                size="md"
                borderRadius={4}
                borderColor="borderPurple"
                borderWidth="2px"
                height="auto" // or it gets set by Chakra
                lineHeight="38px" // with height, this makes the input the same height as the dropdowns
              />
              {search.length > 0 && (
                <InputRightElement>
                  <IconButton
                    p="2"
                    variant="link"
                    color="whiteAlpha.500"
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
            {/**
               * The old version had a submit button
               * <MetaButton
                  type="submit"
                  size="lg"
                  isDisabled={fetching}
                  px="16"
                  display={isSmallScreen ? 'none' : 'flex'}
                >
                  SEARCH
                </MetaButton>
              */}
          </Form>
        </Box>
        {/**
         * Here goes the desktop filters OR the Filter and Sort button
         * If isSmallScreen
         * -> Show the filter and sort button
         * -> Do not show the Desktop filters
         * If !isSmallScreen
         * -> Show the Desktop filters
         * -> Do not show the Filter and sort button
         */}
        <Box>
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

          {/**
           * The filters icon is shown only for small screens
           */}
          <Button
            variant="link"
            color="cyan.400"
            onClick={onOpen}
            fontSize="sm"
            minH="2.5rem"
            display={isSmallScreen ? 'flex' : 'none'}
            p={2}
          >
            FILTERS
          </Button>
        </Box>
      </Flex>

      {/**
       * Drop downs for the filters
       * MOBILE VIEW ONLY
       * They're in a Drawer component that opens when the
       * Filter And Sort button is clicked
       */}
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

      {/**
       * A row that shows which filters are currently selected
       * Has a Selected Filters title if it's not a small screen
       * The row is split into two columns
       * Selected filters are in the left column
       * The Reset All Filters button is in the right column
       */}
      {filtersUsed && (
        <Flex w="100%" maxW="7xl" justify="space-between">
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

      {/**
       * If not currently fetching results,
       * Show count of Players found by current filter/search set
       * Show the Filter and Sort button for small screens only
       *
       * OR
       *
       * If currently fetching results,
       * Show a place holder while the results
       * are being fetched
       */}
      {fetchingMore || !fetching ? (
        <Flex justify="space-between" w="100%" maxW="7xl" align="center">
          <Text fontWeight="bold" fontSize="xl">
            {total} player{total === 1 ? '' : 's'}
          </Text>
        </Flex>
      ) : (
        <Flex justify="space-between" w="100%" maxW="7xl" align="center">
          <Skeleton h="1.5rem" w="8rem" />
        </Flex>
      )}
    </>
  );
};
