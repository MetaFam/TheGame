import {
  ArrowBackIcon,
  ArrowForwardIcon,
  Button,
  CheckIcon,
  CloseIcon,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  filterTimezones,
  Flex,
  FlexProps,
  getTimezonesFor,
  IconButton,
  Input,
  MetaButton,
  Text,
  TimezoneOptions,
  TimezoneType,
} from '@metafam/ds';
import { SkillCategory_Enum } from 'graphql/autogen/types';
import { SkillColors } from 'graphql/types';
import { PlayerAggregates } from 'lib/hooks/players';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { SkillOption } from 'utils/skillHelpers';

type ValueType = { value: string; label: string };
type CategoryValueType = {
  label: string;
  options: ValueType[];
};

type Props = {
  aggregates: PlayerAggregates;
  skills: SkillOption[];
  setSkills: React.Dispatch<React.SetStateAction<SkillOption[]>>;
  playerTypes: ValueType[];
  setPlayerTypes: React.Dispatch<React.SetStateAction<ValueType[]>>;
  timezones: ValueType[];
  setTimezones: React.Dispatch<React.SetStateAction<ValueType[]>>;
  availability: ValueType | null;
  setAvailability: React.Dispatch<React.SetStateAction<ValueType | null>>;
  isOpen: boolean;
  onClose: () => void;
  filtersUsed: boolean;
  resetAllFilters: () => void;
};

enum Selected {
  NONE,
  PLAYER_TYPE,
  SKILLS,
  AVAILABILITY,
  TIME_ZONE,
}

export const MobileFilters: React.FC<Props> = ({
  aggregates,
  skills,
  setSkills,
  playerTypes,
  setPlayerTypes,
  timezones,
  setTimezones,
  availability,
  setAvailability,
  isOpen,
  onClose: closeDrawer,
  filtersUsed,
  resetAllFilters,
  ...props
}) => {
  const [title, setTitle] = useState('Filter');
  const [selected, setSelected] = useState<Selected>(Selected.NONE);

  const onBack = useCallback(() => {
    setSelected(Selected.NONE);
  }, []);
  const onClose = useCallback(() => {
    setSelected(Selected.NONE);
    closeDrawer();
  }, [closeDrawer]);

  useEffect(() => {
    switch (selected) {
      case Selected.PLAYER_TYPE:
        setTitle('Type of Player');
        return;
      case Selected.SKILLS:
        setTitle('Skills');
        return;
      case Selected.AVAILABILITY:
        setTitle('Availability');
        return;
      case Selected.TIME_ZONE:
        setTitle('Time Zone');
        return;
      case Selected.NONE:
      default:
        setTitle('Filter');
    }
  }, [selected]);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} {...props}>
      <DrawerContent maxW="100%" bg="black" color="white">
        <DrawerHeader
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          p="0.5rem"
          borderBottom="1px solid"
          borderBottomColor="borderPurple"
        >
          {selected !== Selected.NONE ? (
            <IconButton
              p="1"
              variant="link"
              colorScheme="white"
              icon={<ArrowBackIcon boxSize="2rem" />}
              onClick={onBack}
              aria-label="Clear Search"
            />
          ) : (
            <Flex w="2.5rem" />
          )}
          <Text textTransform="uppercase" fontWeight="bold" fontSize="md">
            {title}
          </Text>
          <IconButton
            py="3"
            variant="link"
            colorScheme="white"
            icon={<CloseIcon boxSize="1rem" />}
            onClick={onClose}
            aria-label="Clear Search"
          />
        </DrawerHeader>
        {selected === Selected.NONE && (
          <>
            <DrawerBody p="0">
              <FilterItem
                title="Type Of Player"
                onClick={() => setSelected(Selected.PLAYER_TYPE)}
                value={playerTypes}
              />
              <FilterItem
                title="Skills"
                onClick={() => setSelected(Selected.SKILLS)}
                value={skills as ValueType[]}
              />
              <FilterItem
                title="Availability"
                onClick={() => setSelected(Selected.AVAILABILITY)}
                value={availability ? [availability] : []}
              />
              <FilterItem
                title="Time Zone"
                onClick={() => setSelected(Selected.TIME_ZONE)}
                value={timezones}
              />
            </DrawerBody>
            <DrawerFooter p="1.5rem">
              <Flex direction="column" justify="center" w="100%" align="center">
                {filtersUsed && (
                  <Button
                    variant="link"
                    color="cyan.400"
                    onClick={resetAllFilters}
                    size="sm"
                    minH="2.5rem"
                    p="2"
                    mb="1rem"
                  >
                    RESET ALL FILTERS
                  </Button>
                )}
                <MetaButton onClick={onClose} w="15rem">
                  SHOW RESULTS
                </MetaButton>
              </Flex>
            </DrawerFooter>
          </>
        )}
        {selected === Selected.PLAYER_TYPE && (
          <FilterContent
            value={playerTypes}
            onChange={(value) => {
              setPlayerTypes(value as ValueType[]);
            }}
            options={aggregates.playerTypes}
            onBack={onBack}
          />
        )}
        {selected === Selected.SKILLS && (
          <FilterContent
            value={skills as ValueType[]}
            onChange={(value) => {
              setSkills(value as SkillOption[]);
            }}
            options={aggregates.skillChoices as CategoryValueType[]}
            onBack={onBack}
            showSearch
          />
        )}
        {selected === Selected.AVAILABILITY && (
          <FilterContent
            value={availability ? [availability] : []}
            onChange={(value) => {
              const values = value as ValueType[];
              setAvailability(values[values.length - 1]);
            }}
            options={[1, 5, 10, 20, 30, 40].map((value) => ({
              value: value.toString(),
              label: `> ${value.toString()} h/week`,
            }))}
            onBack={onBack}
            isMulti={false}
          />
        )}
        {selected === Selected.TIME_ZONE && (
          <FilterContent
            value={timezones}
            onChange={(value) => {
              const values = value as ValueType[];
              setTimezones(values.slice(-1));
            }}
            options={TimezoneOptions}
            onBack={onBack}
            isMulti={false}
            showSearch
            isTimezone
          />
        )}
      </DrawerContent>
    </Drawer>
  );
};

type FilterItemProps = {
  title: string;
  value: ValueType[];
} & FlexProps;

const FilterItem: React.FC<FilterItemProps> = ({ title, value, ...props }) => {
  const lastIndex = value.length - 1;
  return (
    <Flex
      justify="space-between"
      align="center"
      p="1rem"
      pr="0.75rem"
      borderBottom="1px solid"
      borderBottomColor="borderPurple"
      cursor="pointer"
      _hover={{ bg: 'whiteAlpha.100' }}
      w="100%"
      {...props}
    >
      <Flex
        direction="column"
        align="flex-start"
        w="100%"
        overflow="hidden"
        mr="1rem"
      >
        <Text fontWeight="bold" fontSize="md">
          {title}
        </Text>
        {value.length > 0 && (
          <Text
            fontWeight="300"
            fontSize="sm"
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
            w="100%"
          >
            {value.reduce(
              (t, v, i) =>
                i === lastIndex ? t.concat(v.label) : t.concat(v.label, ', '),
              '',
            )}
          </Text>
        )}
      </Flex>
      <ArrowForwardIcon boxSize="2rem" color="white" />
    </Flex>
  );
};

type FilterContentProps = {
  value: ValueType[];
  onChange: (value: ValueType[]) => void;
  options: ValueType[] | CategoryValueType[];
  onBack: () => void;
  isMulti?: boolean;
  showSearch?: boolean;
  isTimezone?: boolean;
};

const scrollbarVisible = (element: HTMLDivElement): boolean =>
  element.scrollHeight > element.clientHeight;

const searchFilter: (searchText: string) => (v: ValueType) => boolean = (
  searchText,
) => ({ value, label }) =>
  label.toLowerCase().includes(searchText) ||
  value.toLowerCase().includes(searchText);

const FilterContent: React.FC<FilterContentProps> = ({
  value: selectedValue,
  onChange,
  options: allOptions,
  onBack,
  isMulti = true,
  showSearch = false,
  isTimezone = false,
}) => {
  const isCategoryFilter = useMemo(
    () =>
      allOptions.length > 0 && !!(allOptions as CategoryValueType[])[0].options,
    [allOptions],
  );
  const [value, setValue] = useState(selectedValue);
  const onClear = useCallback(() => {
    setValue([]);
  }, []);
  const onSave = useCallback(() => {
    onChange(value);
    onBack();
  }, [value, onChange, onBack]);
  const [options, setOptions] = useState(allOptions);

  const [search, setSearch] = useState('');

  const onSearch = useCallback(
    (searchText: string) => {
      if (!searchText) {
        setOptions(allOptions);
      }
      let filteredTimezones: string[] = [];
      if (isTimezone) {
        filteredTimezones = getTimezonesFor(searchText);
      }
      if (isCategoryFilter) {
        const newOptions: CategoryValueType[] = (allOptions as CategoryValueType[]).reduce(
          (t: CategoryValueType[], v: CategoryValueType) => {
            const { label, options: categoryOptions } = v;
            const filteredOptions = isTimezone
              ? (categoryOptions as TimezoneType[]).filter(
                  filterTimezones(searchText, filteredTimezones),
                )
              : categoryOptions.filter(searchFilter(searchText));
            const newValue: CategoryValueType = {
              label,
              options: filteredOptions,
            };
            return newOptions.length > 0 ? [...t, newValue] : t;
          },
          [],
        );
        setOptions(newOptions);
      } else {
        const filteredOptions = isTimezone
          ? (allOptions as TimezoneType[]).filter(
              filterTimezones(searchText, filteredTimezones),
            )
          : (allOptions as ValueType[]).filter(searchFilter(searchText));
        setOptions(filteredOptions);
      }
    },
    [allOptions, isCategoryFilter, isTimezone],
  );

  const renderOptions = useCallback(
    (optionsToRender: ValueType[]) => {
      const lastIndex = optionsToRender.length - 1;
      return (
        <>
          {optionsToRender.map((option: ValueType, index: number) => {
            const { value: optionValue, label } = option;
            const isSelected = value.reduce(
              (t, v) => t || v.value === optionValue,
              false,
            );
            return (
              <Flex
                pl="1rem"
                cursor="pointer"
                _hover={{ bg: 'whiteAlpha.100' }}
                key={optionValue}
                onClick={() => {
                  if (isMulti) {
                    if (isSelected) {
                      const newValue = value.slice();
                      newValue.splice(value.indexOf(option), 1);
                      setValue(newValue);
                    } else {
                      const newValue = value.slice();
                      newValue.push(option);
                      setValue(newValue);
                    }
                  } else {
                    setValue(isSelected ? [] : [option]);
                  }
                }}
              >
                <Flex
                  w="100%"
                  p="1rem"
                  pl="0"
                  justify="space-between"
                  align="center"
                  borderBottom={lastIndex === index ? '0' : '1px solid'}
                  borderBottomColor="borderPurple"
                >
                  <Text fontWeight="bold" fontSize="md">
                    {label}
                  </Text>
                  {isSelected && (
                    <CheckIcon color="white" boxSize="1.25rem" mr="0.1rem" />
                  )}
                </Flex>
              </Flex>
            );
          })}
        </>
      );
    },
    [isMulti, value],
  );

  const [hasScrollbar, setHasScrollbar] = useState(false);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (bodyRef.current) {
      setHasScrollbar(scrollbarVisible(bodyRef.current));
    }
  }, []);

  return (
    <>
      {showSearch && (
        <Flex
          w="100%"
          borderBottomWidth="1px"
          borderBottomColor="borderPurple"
          borderBottomStyle="solid"
        >
          <Input
            autoFocus
            width="calc(100% - 2rem)"
            placeholder="Search..."
            _placeholder={{ color: 'whiteAlpha.500' }}
            borderRadius="0"
            borderWidth="2px"
            mx="4"
            my="2"
            borderColor="borderPurple"
            onChange={(e) => {
              const inputValue = e.target.value;
              setSearch(inputValue);
              onSearch(inputValue.toLowerCase().trim());
            }}
            value={search}
          />
        </Flex>
      )}
      <DrawerBody
        p="0"
        ref={bodyRef}
        borderBottom={hasScrollbar ? '1px solid' : '0'}
        borderBottomColor="borderPurple"
      >
        <Flex
          direction="column"
          borderBottom={hasScrollbar ? '0' : '1px solid'}
          borderBottomColor="borderPurple"
          position="relative"
        >
          {isCategoryFilter
            ? (options as CategoryValueType[]).map(
                ({ label, options: categoryOptions }) => (
                  <Flex direction="column" key={label}>
                    <Flex
                      w="100%"
                      p="1rem"
                      justify="space-between"
                      align="center"
                      bg={SkillColors[label as SkillCategory_Enum]}
                      position="sticky"
                      top="0"
                    >
                      <Text fontWeight="bold" fontSize="md">
                        {label}
                      </Text>
                    </Flex>
                    {renderOptions(categoryOptions)}
                  </Flex>
                ),
              )
            : renderOptions(options as ValueType[])}
        </Flex>
      </DrawerBody>
      <DrawerFooter p="1.5rem">
        <Flex direction="column" justify="center" w="100%" align="center">
          {value.length > 0 && (
            <Button
              variant="link"
              color="cyan.400"
              onClick={onClear}
              size="sm"
              minH="2.5rem"
              p="2"
              mb="1rem"
            >
              CANCEL SELECTION
            </Button>
          )}
          <MetaButton onClick={onSave} w="15rem">
            SAVE
          </MetaButton>
        </Flex>
      </DrawerFooter>
    </>
  );
};
