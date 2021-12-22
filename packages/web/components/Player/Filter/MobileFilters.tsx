import {
  ArrowBackIcon,
  ArrowForwardIcon,
  Button,
  CheckIcon,
  CloseIcon,
  CombinedLabel,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Flex,
  FlexProps,
  IconButton,
  Input,
  LabeledOptions,
  LabeledValue,
  MetaButton,
  Text,
  TimeZone,
  TimeZoneOptions,
  timeZonesFilter,
} from '@metafam/ds';
import { SkillCategory_Enum } from 'graphql/autogen/types';
import { SkillColors } from 'graphql/types';
import { PlayerAggregates, sortOptions } from 'lib/hooks/players';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { SkillOption } from 'utils/skillHelpers';

type ValueType = { value: string; label: string };

type Props = {
  aggregates: PlayerAggregates;
  skills: SkillOption[];
  setSkills: React.Dispatch<React.SetStateAction<SkillOption[]>>;
  playerTypes: ValueType[];
  setPlayerTypes: React.Dispatch<React.SetStateAction<ValueType[]>>;
  timeZones: TimeZone[];
  setTimeZones: React.Dispatch<React.SetStateAction<TimeZone[]>>;
  availability: ValueType | null;
  setAvailability: React.Dispatch<React.SetStateAction<ValueType | null>>;
  sortOption: ValueType;
  setSortOption: React.Dispatch<React.SetStateAction<ValueType>>;
  isOpen: boolean;
  onClose: () => void;
  filtersUsed: boolean;
  resetAllFilters: () => void;
};

enum Selected {
  NONE,
  ORDER_BY,
  TYPE,
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
  timeZones,
  setTimeZones,
  availability,
  setAvailability,
  sortOption,
  setSortOption,
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
      case Selected.ORDER_BY: {
        setTitle('Order By');
        return;
      }
      case Selected.TYPE: {
        setTitle('Type of Player');
        return;
      }
      case Selected.SKILLS: {
        setTitle('Skills');
        return;
      }
      case Selected.AVAILABILITY: {
        setTitle('Availability');
        return;
      }
      case Selected.TIME_ZONE: {
        setTitle('Time Zone');
        return;
      }
      case Selected.NONE:
      default: {
        setTitle('Filter');
      }
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
            <DrawerBody p={0}>
              <FilterItem<ValueType>
                title="Order By"
                onClick={() => setSelected(Selected.ORDER_BY)}
                values={[sortOption]}
              />
              <FilterItem<ValueType>
                title="Type Of Player"
                onClick={() => setSelected(Selected.TYPE)}
                values={playerTypes}
              />
              <FilterItem<ValueType>
                title="Skills"
                onClick={() => setSelected(Selected.SKILLS)}
                values={skills as ValueType[]}
              />
              <FilterItem<ValueType>
                title="Availability"
                onClick={() => setSelected(Selected.AVAILABILITY)}
                values={availability ? [availability] : []}
              />
              <FilterItem<TimeZone>
                title="Time Zone"
                onClick={() => setSelected(Selected.TIME_ZONE)}
                values={timeZones}
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
                    p={2}
                    mb="1rem"
                  >
                    Reset All Filters
                  </Button>
                )}
                <MetaButton onClick={onClose} w="15rem">
                  Show Results
                </MetaButton>
              </Flex>
            </DrawerFooter>
          </>
        )}
        {selected === Selected.ORDER_BY && (
          <FilterContent
            values={[sortOption]}
            onChange={(values: ValueType[]) => {
              const [last] = values.slice(-1);
              if (last) setSortOption(last);
            }}
            options={sortOptions}
            onBack={onBack}
            isMulti={false}
            disableEmpty
          />
        )}
        {selected === Selected.TYPE && (
          <FilterContent
            values={playerTypes}
            onChange={(values: ValueType[]) => {
              setPlayerTypes(values);
            }}
            options={aggregates.playerTypes}
            onBack={onBack}
          />
        )}
        {selected === Selected.SKILLS && (
          <FilterContent<SkillOption>
            values={skills}
            onChange={(values) => {
              setSkills(values);
            }}
            options={(aggregates.skillChoices as unknown) as SkillOption[]}
            onBack={onBack}
            showSearch
          />
        )}
        {selected === Selected.AVAILABILITY && (
          <FilterContent<ValueType>
            values={availability ? [availability] : []}
            onChange={(values) => {
              const [last] = (values as ValueType[]).slice(-1);
              setAvailability(last);
            }}
            options={[1, 5, 10, 20, 30, 40].map((value) => ({
              value: value.toString(),
              label: `≥ ${value} hr ⁄ week`,
            }))}
            onBack={onBack}
            isMulti={false}
          />
        )}
        {selected === Selected.TIME_ZONE && (
          <FilterContent<TimeZone>
            values={timeZones}
            onChange={(values) => {
              setTimeZones(values.slice(-1));
            }}
            options={TimeZoneOptions}
            onBack={onBack}
            isMulti={false}
            showSearch
            isTimeZone
          />
        )}
      </DrawerContent>
    </Drawer>
  );
};

type FilterItemProps<T> = {
  title: string;
  values: T[];
} & FlexProps;

function FilterItem<T extends LabeledOptions<T>>({
  title,
  values,
  ...props
}: FilterItemProps<T>): React.ReactElement {
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
        {values.length > 0 && (
          <Text
            fontWeight={300}
            fontSize="sm"
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
            w="100%"
          >
            {values
              .slice(0, -1)
              .map(({ label }) => label)
              .join(', ')}
            {values.length > 3 ? ',' : ''}
            {' & '}
            {values.slice(-1)}
          </Text>
        )}
      </Flex>
      <ArrowForwardIcon boxSize="2rem" color="white" />
    </Flex>
  );
}

type FilterContentProps<T extends CombinedLabel<T>> = {
  values: Array<T>;
  onChange: (values: Array<T>) => void;
  options: Array<T>;
  onBack: () => void;
  isMulti?: boolean;
  showSearch?: boolean;
  isTimeZone?: boolean;
  disableEmpty?: boolean;
};

const scrollbarVisible = (element: HTMLDivElement): boolean =>
  element.scrollHeight > element.clientHeight;

const searchFilter: (
  searchText: string,
) => (v: LabeledValue<string>) => boolean = (searchText) => ({
  value,
  label,
}) =>
  (label?.toLowerCase().includes(searchText) ?? false) ||
  (value?.toLowerCase().includes(searchText) ?? false);

const FilterContent: React.FC<FilterContentProps> = ({
  value: savedValue,
  onChange,
  options: corpus,
  onBack,
  isMulti = true,
  showSearch = false,
  isTimeZone = false,
  disableEmpty = false,
}) => {
  const isCategoryFilter = useMemo(
    () => !!(corpus[0] as LabeledOptions<T>)?.options,
    [corpus],
  );
  const [values, setValues] = useState(savedValue);
  const onClear = useCallback(() => {
    setValues([]);
  }, []);
  const onSave = useCallback(() => {
    onChange(values);
    onBack();
  }, [values, onChange, onBack]);
  const [options, setOptions] = useState(corpus);

  const [search, setSearch] = useState('');
  const isChanged = useMemo(
    () =>
      value.length !== savedValue.length ||
      value.reduce(
        (t, i) => t || !savedValue.find((v) => v.value === i.value),
        false,
      ),
    [value, savedValue],
  );

  const onSearch = useCallback(
    (searchText: string) => {
      if (!searchText) {
        setOptions(corpus);
      }
      if (isCategoryFilter) {
        const newOptions = corpus.reduce(
          (
            t: Array<LabeledOptions<T | TimeZone>>,
            v: LabeledOptions<T | TimeZone>,
          ) => {
            const { label: optionLabel, options: optionSet } = v;
            const filteredOptions = isTimeZone
              ? (optionSet as TimeZone[]).filter(timeZonesFilter(search))
              : (optionSet as T[]).filter(searchFilter(searchText));
            const newValue = {
              optionLabel,
              options: filteredOptions,
            };
            return [...t, newValue];
          },
          [],
        );
        setOptions((newOptions as unknown) as Array<T>); // Hack: fix eventually
      } else {
        const filteredOptions = isTimeZone
          ? ((corpus as unknown) as TimeZone[]).filter(
              timeZonesFilter(searchText),
            )
          : (corpus as T[]).filter(searchFilter(searchText));
        setOptions((filteredOptions as unknown) as T[]);
      }
    },
    [corpus, isCategoryFilter, isTimeZone, search],
  );

  type RenderCallback<U> = (optionsToRender: Array<U>) => React.ReactElement;

  const renderOptions = useCallback<RenderCallback<LabeledValue<T>>>(
    (optionsToRender: Array<LabeledValue<T>>) => {
      const lastIndex = optionsToRender.length - 1;
      return (
        <>
          {optionsToRender.map((option: LabeledValue<T>, index: number) => {
            const { value: optionValue = null, label } = option;
            const isSelected = values.reduce(
              (acc, curr) =>
                acc || (curr as LabeledValue<T>).value === optionValue,
              false,
            );
            return (
              <Flex
                pl="1rem"
                cursor="pointer"
                _hover={{ bg: 'whiteAlpha.100' }}
                key={
                  typeof optionValue === 'string' ? optionValue : Math.random()
                }
                onClick={() => {
                  if (isSelected && disableEmpty && value.length === 1) return;
                  if (isMulti) {
                    if (isSelected) {
                      const newValue = [...values] as Array<
                        LabeledValue<unknown>
                      >;
                      newValue.splice(
                        newValue.findIndex((opt) => opt.value === option.value),
                        1,
                      );
                      setValues(newValue as Array<T>);
                    } else {
                      const newValue = [...values] as Array<
                        LabeledValue<unknown>
                      >;
                      newValue.push(option);
                      setValues(newValue as Array<T>);
                    }
                  } else if (option.value) {
                    setValues(isSelected ? [] : [option.value]);
                  }
                }}
              >
                <Flex
                  w="100%"
                  p="1rem"
                  pl={0}
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
    [isMulti, values, disableEmpty],
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
            ? (options as Array<LabeledOptions<T>>).map(
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
                    {renderOptions(categoryOptions ?? [])}
                  </Flex>
                ),
              )
            : renderOptions(options as Array<LabeledValue<T>>)}
        </Flex>
      </DrawerBody>
      <DrawerFooter p="1.5rem">
        <Flex direction="column" justify="center" w="100%" align="center">
          {values.length > 0 && (!disableEmpty || values.length > 1) && (
            <Button
              variant="link"
              color="cyan.400"
              onClick={onClear}
              size="sm"
              minH="2.5rem"
              p="2"
              mb="1rem"
            >
              Cancel Selection
            </Button>
          )}
          <MetaButton onClick={onSave} isDisabled={!isChanged} w="15rem">
            Save
          </MetaButton>
        </Flex>
      </DrawerFooter>
    </>
  );
}
