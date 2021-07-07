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
  MetaFilterSelectSearch,
  MetaTheme,
  selectStyles,
  Stack,
  styled,
  Text,
  TimezoneOptions,
  useBreakpointValue,
  Wrap,
  WrapItem,
} from '@metafam/ds';
import {
  GetPlayersQueryVariables,
  SkillCategory_Enum,
} from 'graphql/autogen/types';
import { SkillColors } from 'graphql/types';
import {
  PlayerAggregates,
  QueryVariableSetter,
  useFiltersUsed,
} from 'lib/hooks/players';
import React, { useEffect, useRef, useState } from 'react';
import { SkillOption } from 'utils/skillHelpers';

const Form = styled.form({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

type ValueType = { value: string; label: string };

const styles: typeof selectStyles = {
  ...selectStyles,
  multiValue: (s, { data }) => ({
    ...s,
    background: SkillColors[data.category as SkillCategory_Enum],
    color: MetaTheme.colors.white,
  }),
  multiValueLabel: (s, { data }) => ({
    ...s,
    background: SkillColors[data.category as SkillCategory_Enum],
    color: MetaTheme.colors.white,
  }),
  groupHeading: (s, { children }) => ({
    ...s,
    ...(selectStyles.groupHeading &&
      selectStyles.groupHeading(s, { children })),
    background: SkillColors[children as SkillCategory_Enum],
    borderTop: `1px solid ${MetaTheme.colors.borderPurple}`,
    margin: 0,
  }),
  option: (s, { isSelected }) => ({
    ...s,
    backgroundColor: 'transparent',
    fontWeight: isSelected ? 'bold' : 'normal',
    ':hover': {
      backgroundColor: 'transparent',
      color: MetaTheme.colors.white,
    },
    ':focus': {
      boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.6)',
    },
  }),
  menu: () => ({}),
  control: (s) => ({
    ...s,
    background: MetaTheme.colors.dark,
    border: 'none',
    ':hover': {},
  }),
  noOptionsMessage: (s) => ({
    ...s,
    borderTop: `1px solid ${MetaTheme.colors.borderPurple}`,
  }),
};

type Props = {
  fetching: boolean;
  aggregates: PlayerAggregates;
  queryVariables: GetPlayersQueryVariables;
  setQueryVariable: QueryVariableSetter;
  resetFilter: () => void;
  totalCount: number;
};

export const PlayerFilter: React.FC<Props> = ({
  fetching,
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
      setQueryVariable('search', `%%`);
    }
  };

  const filtersUsed = useFiltersUsed(queryVariables);
  const isSearchUsed = search.length >= 2 && queryVariables.search !== '%%';

  const [isElementSticky, setIsSticky] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cachedRef = ref.current as Element;
    const observer = new IntersectionObserver(
      ([e]) => setIsSticky(e.intersectionRatio < 1),
      { threshold: [1] },
    );

    observer.observe(cachedRef);

    return () => observer.unobserve(cachedRef);
  }, []);

  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const isSticky = !isSmallScreen && isElementSticky;

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
                  variant="link"
                  colorScheme="cyan"
                  icon={<CloseIcon />}
                  onClick={() => {
                    setSearch('');
                    setQueryVariable('search', `%%`);
                  }}
                  aria-label="Clear Search"
                />
              </InputRightElement>
            )}
          </InputGroup>
          <MetaButton type="submit" size="lg" isDisabled={fetching} px="16">
            SEARCH
          </MetaButton>
        </Stack>
      </Form>
      <Wrap
        spacing="4"
        justify={{ base: 'flex-start', md: 'center' }}
        w={isSticky ? 'calc(100% + 6rem)' : '100%'}
        maxW={isSticky ? 'auto' : '79rem'}
        transition="all 0.25s"
        bg={isElementSticky ? 'purpleTag70' : 'whiteAlpha.200'}
        py="6"
        px={isSticky ? '4.5rem' : '1.5rem'}
        style={{ backdropFilter: 'blur(7px)' }}
        borderRadius={isSticky ? '0px' : '6px'}
        ref={ref}
        position={isSmallScreen ? 'relative' : 'sticky'}
        top="-1px"
        borderTop="1px solid transparent"
        zIndex="1"
        align="center"
      >
        <WrapItem>
          <MetaFilterSelectSearch
            title="Type Of Player"
            styles={styles}
            value={playerTypes}
            onChange={(value) => {
              setPlayerTypes(value as ValueType[]);
            }}
            options={aggregates.playerTypes.map(({ id, title }) => ({
              value: id.toString(),
              label: title,
            }))}
          />
        </WrapItem>
        <WrapItem>
          <MetaFilterSelectSearch
            title="Skills"
            styles={styles}
            value={skills}
            onChange={(value) => {
              setSkills(value as SkillOption[]);
            }}
            options={aggregates.skillChoices}
            showSearch
          />
        </WrapItem>
        <WrapItem>
          <MetaFilterSelectSearch
            title="Availability"
            styles={styles}
            value={availability}
            onChange={(value) => {
              const values = value as ValueType[];
              setAvailability(values[values.length - 1]);
            }}
            options={[1, 5, 10, 20, 30, 40].map((value) => ({
              value: value.toString(),
              label: `> ${value.toString()} h/week`,
            }))}
          />
        </WrapItem>
        <WrapItem>
          <MetaFilterSelectSearch
            title="Time Zone"
            styles={styles}
            value={timezones}
            onChange={(value) => {
              setTimezones(value as ValueType[]);
            }}
            options={TimezoneOptions.map(({ id, label }) => ({
              value: id.toString(),
              label,
            }))}
            showSearch
          />
        </WrapItem>
      </Wrap>
      {filtersUsed && (
        <Flex w="100%" maxW="79rem" justify="space-between">
          <Wrap flex="1">
            <WrapItem>
              <Flex w="100%" h="100%" justify="center" align="center">
                <Text> {`Selected Filters: `}</Text>
              </Flex>
            </WrapItem>
            {isSearchUsed && (
              <WrapItem>
                <FilterTag
                  label={search}
                  onRemove={() => {
                    setSearch('');
                    setQueryVariable('search', `%%`);
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
          </Wrap>
          <Button
            variant="link"
            color="cyan.400"
            onClick={() => {
              resetFilter();
              setSkills([]);
              setPlayerTypes([]);
              setTimezones([]);
              setAvailability(null);
            }}
            minH="2.5rem"
          >
            RESET ALL FILTERS
          </Button>
        </Flex>
      )}
      {!fetching && (
        <Flex justify="space-between" w="100%" maxW="80rem" px="4">
          <Text fontWeight="bold" fontSize="xl" w="100%" maxW="79rem">
            {`${totalCount} player${totalCount === 1 ? '' : 's'}`}
          </Text>
        </Flex>
      )}
    </>
  );
};
