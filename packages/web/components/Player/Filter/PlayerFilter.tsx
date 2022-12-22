// import { InputLeftAddon } from '@chakra-ui/input';
import {
  Box,
  Button,
  chakra,
  CloseIcon,
  FiltersIcon,
  FilterTag,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  MetaButton,
  SearchIcon,
  Skeleton,
  Stack,
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
   * Search and filters container appearance and behaviour
   * Basics
   * - the search input and filters are in a box
   * - the box sticks to the top of the screen on scrolls IF the screen is wider than the md breakpoint
   * - if the screen is not wider than the md breakpoint, it stays as a plain box, no sticky behaviour
   *
   * Hack warning (HHH-GH)
   * - When the box is not sticky, it is full *container* width i.e. maxW 7xl
   * - When the box is sticky, it breaks out of the page container to full *screen* width
   * - Previously that was achieved with `w={isSticky ? 'calc(100% + 6rem)' : '100%'}`
   * - BUT there was a bug that meant it got stuck at full width for certain screenwidths (betwen 768px/md and 1024px)
   * - Solution: set the width to 98vw (values greater than 98vw also trigger the bug), fill in the 2vw gap with a box-shadow
   * - lmk if you have a better solution :)
   */
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const stickyRef = useRef<HTMLDivElement>(null);
  const isSticky = useIsSticky(stickyRef);

  // Adds/removes styles to the search and filters container
  function toggleStickyStyles() {
    if (isSticky && !isSmallScreen) {
      return searchFiltersStickyStyles;
    }
    if (!isSmallScreen) {
      return searchFiltersNotStickyStyles;
    }
    return searchFiltersSmallScreenStyles;
  }

  // The styles to toggle for sticky/not sticky
  // How it looks when it's sticky
  const searchFiltersStickyStyles = {
    bg: 'purpleTag70',
    borderRadius: '0',
    boxShadow:
      '-1vw 0px 0px var(--chakra-colors-purpleTag70), 1vw 0px 0px var(--chakra-colors-purpleTag70)', // Sticky, fills in the gap left by the 98vw
    maxWidth: 'auto',
    position: 'sticky',
    px: '2.5em',
    py: '1em',
    w: '98vw', // If it's higher than 98vw it gets stuck full width and won't unstick
  };

  // How it looks when it's not sticky
  const searchFiltersNotStickyStyles = {
    bg: 'whiteAlpha.200',
    borderRadius: '6px',
    maxWidth: '7xl',
    px: '1.5em',
    py: '1em',
    w: '100%',
  };

  // How it looks when it's a small screen
  const searchFiltersSmallScreenStyles = {
    w: '100%',
  };

  // Styles that are not toggled
  const searchFiltersBoxCommonStyles = {
    backdropFilter: 'blur(7px)',
    borderTop: '1px solid transparent', // These styles on top and borderTop are needed for it to stick right
    top: '-1px', // These styles on top and borderTop are needed for it to stick right
    transition: 'all 0.25s',
    zIndex: '1',
  };

  return (
    <>
      {/**
       * Search and filters container
       * This Box provides a container and background for the Player search and filters
       * Styles for its appearance are provided in variables/by functions so they can be switched around easily
       * (for e.g. instead of using nested ternary operators [which cause lint errors anyway])
       * Basics
       * - toggleStickyStyles() - adds/removes styles when the box is sticky/not sticky
       * - searchFiltersBoxCommonStyles - styles used for both sticky/not sticky
       * - any props added below on the Box will override styles set in the vars above
       */}
      <Box
        as="div"
        ref={stickyRef}
        {...searchFiltersBoxCommonStyles}
        {...toggleStickyStyles()}
      >
        {/**
         * Layout
         * base: search/filter button side by side, left is search, right is the filters button that opens the filter options drawer on mobile
         * md: search/filter button are stacked, top is search, bottom is the desktop filters
         * 2xl: search/filters side by side, left is search, right is desktop filters (this is when the screen is wide enough to fit the search and desktop filters on one line)
         */}
        <Flex
          maxWidth="7xl"
          mx="auto"
          w="100%"
          alignItems="center"
          justifyContent="center"
          flexWrap={{
            base: 'nowrap',
            md: 'wrap',
            '2xl': 'nowrap',
          }}
          flexDirection={{
            base: 'row',
            md: 'column',
            '2xl': 'row',
          }}
        >
          <Box
            flexGrow={{
              base: '2', // expand to take up more space when side-by-side with filters button
              md: '0',
            }}
            marginRight={{
              base: '4',
              md: '0',
              '2xl': '6',
            }}
            marginBottom={{
              base: '0',
              md: '4',
              '2xl': '0',
            }}
            maxW={{
              base: 'sm',
              md: '100%',
              '2xl': 'sm',
            }}
          >
            {/**
             * SEARCH BOX
             * For small screens: the search icon is inside the input as mobile devices have a search button to go with the text input
             * For md+: the search icon in the input is removed, a search button is shown instead (b/c not everyone knows to hit Enter to submit a form)
             * Initial minWidth of the search input is 14em, so it will fit on a tiny screen. After md breakpoint, the minWidth is 18em (wide enough to show the placeholder text)
             */}
            <Form width="fill" onSubmit={onSearch} display="flex">
              <InputGroup>
                {isSmallScreen && (
                  <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon />}
                  />
                )}
                <Input
                  background="dark"
                  borderColor="borderPurple"
                  borderLeftRadius={4}
                  borderRightRadius={{
                    base: '4',
                    md: '0',
                  }}
                  borderWidth={{
                    base: '1px',
                    md: '2px',
                  }}
                  fontSize={{
                    base: 'sm',
                    md: '1em',
                  }}
                  height="40px"
                  minW={{
                    base: '14em',
                    md: '30em',
                    '2xl': '20em',
                  }}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="SEARCH NAME OR ETH ADDRESS"
                  _placeholder={{ color: 'whiteAlpha.500' }}
                  size="md"
                  type="text"
                  value={search}
                  w="100%"
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
              {!isSmallScreen && (
                <MetaButton
                  aria-label="SEARCH"
                  borderLeftRadius={{
                    base: '4',
                    md: '0',
                  }}
                  borderRightRadius={4}
                  fontSize="sm"
                  isDisabled={fetching}
                  size="md"
                  type="submit"
                  p={0}
                >
                  <SearchIcon />
                </MetaButton>
              )}
            </Form>
          </Box>
          <Box
            flexGrow={{
              '2xl': '2', // take up more space when side-by-side with search on wide screens
            }}
          >
            {/**
             * Put in the filters button or the DesktopFilters, depending on the screen size
             * The button has a label 'Filters' if the screen is wide enough to fit it
             * The FiltersIcon has a marginTop to align it in the middle
             */}
            {isSmallScreen ? (
              <Button
                variant="outline"
                borderColor="blueLight"
                borderRadius={4}
                borderWidth="1px"
                color="white"
                onClick={onOpen}
                fontSize="sm"
                fontWeight="400"
                px={3}
                minH="2.5rem"
                size="md"
              >
                <FiltersIcon marginTop="1px" />
                <Text
                  as="span"
                  display={{
                    base: 'none',
                    sm: 'inline',
                  }}
                  paddingLeft={2}
                >
                  FILTERS
                </Text>
              </Button>
            ) : (
              /**
               * Drop downs for the filters
               * DESKTOP VERSION
               */

              <DesktopFilters
                display="flex"
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
            )}
          </Box>
        </Flex>
      </Box>

      {/**
       * Drop downs for the filters
       * MOBILE VERSION
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
        <Flex justify="space-between" w="100%" maxW="79rem" align="center">
          <Text fontWeight="bold" fontSize="xl">
            {total} player{total === 1 ? '' : 's'}
          </Text>
          {/**
           * <Button
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
      */}
        </Flex>
      ) : (
        <Flex justify="space-between" w="100%" maxW="79rem" align="center">
          <Skeleton h="1.5rem" w="8rem" />
        </Flex>
      )}
    </>
  );
};
