import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FlexProps,
  IconButton,
  Input,
  Select,
  SelectProps,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import React, { useCallback, useRef, useState } from 'react';
import {
  components,
  ContainerProps,
  ControlProps,
  GroupBase,
  MenuProps,
  OptionProps,
  Props as ReactSelectProps,
  ValueContainerProps,
} from 'react-select';

import { DropDownIcon } from './icons/DropDownIcon';
import { MetaTag } from './MetaTag';
import { SelectSearch } from './SelectSearch';
import { LabeledValue, timeZonesFilter, TimeZoneType } from './SelectTimeZone';

export const MetaSelect: React.FC<SelectProps> = (props) => (
  <Box
    as={Select}
    textTransform="uppercase"
    maxW="48"
    bg="dark"
    iconColor="purple.400"
    iconSize="xs"
    icon={<DropDownIcon boxSize={2} />}
    borderColor="borderPurple"
    borderWidth="2px"
    borderRadius="4px"
    {...props}
  />
);

type FilterTagProps = {
  label: string;
  onRemove: () => void;
};

export const FilterTag: React.FC<FilterTagProps> = ({ label, onRemove }) => {
  const tagSize = useBreakpointValue({ base: 'md', md: 'lg' });
  return (
    <MetaTag
      backgroundColor="black"
      size={tagSize}
      fontSize={{ base: 'sm', md: 'md' }}
      borderRadius="1rem"
      py="1"
      px="4"
      fontWeight="normal"
    >
      {label}
      <IconButton
        ml="3"
        minW="4"
        variant="unstyled"
        size="xs"
        color="silver"
        icon={<CloseIcon />}
        _hover={{ color: 'white' }}
        aria-label={`Remove filter ${label}`}
        onClick={onRemove}
      />
    </MetaTag>
  );
};

const SelectedTag: React.FC<FlexProps> = (props) => (
  <Flex
    color="black"
    bg="#E839B7"
    borderRadius="2px"
    justify="center"
    align="center"
    px="1"
    ml="2"
    fontSize="sm"
    fontWeight="bold"
    {...props}
  />
);

const SelectOption = <T extends LabeledValue<string>>(
  props: OptionProps<T>,
) => {
  const {
    isSelected,
    data: { value: optionValue, label: optionLabel },
    selectProps,
  } = props;
  const {
    onChange,
    value: selectValue,
    disableEmpty,
  } = selectProps as ReactSelectProps<T, true> & ExtendedSelectProps;

  const clearValue = useCallback(() => {
    if (onChange) {
      const newSelectValue = selectValue
        ? (selectValue as T[]).filter(
            ({ value }: { value: string }) => !(value === optionValue),
          )
        : [];
      onChange(newSelectValue, {
        action: 'remove-value',
        removedValue: { value: optionValue, label: optionLabel } as T,
      });
    }
  }, [optionValue, optionLabel, selectValue, onChange]);

  return (
    <Flex
      fontWeight="normal"
      w="100%"
      justify="space-between"
      cursor="pointer"
      align="center"
      borderBottomWidth="1px"
      borderBottomStyle="solid"
      borderBottomColor="borderPurple"
      _hover={{ backgroundColor: 'whiteAlpha.100' }}
      onClick={isSelected && !disableEmpty ? clearValue : undefined}
      css={{ div: { cursor: 'pointer' } }}
    >
      <components.Option {...props} />
      {isSelected && <CheckIcon color="white" mx="2" />}
    </Flex>
  );
};

const ValueDisplay: React.FC<{
  menuIsOpen?: boolean;
  title?: string | JSX.Element;
  tagLabel?: string;
}> = ({ menuIsOpen, tagLabel, title }) => (
  <>
    <Text ml="2" textTransform="uppercase">
      {title}
    </Text>
    {tagLabel ? <SelectedTag>{tagLabel}</SelectedTag> : null}
    <DropDownIcon
      boxSize={3}
      color="purple.400"
      mx="2"
      transition="transform 0.1s"
      transform={menuIsOpen ? 'rotate(180deg) translateY(10%)' : 'none'}
    />
  </>
);

const SelectValueContainer = <T extends LabeledValue<string>>(
  props: ValueContainerProps<T>,
) => {
  const { selectProps } = props;
  const { title, tagLabel, menuIsOpen } = selectProps as ReactSelectProps<
    T,
    true
  > &
    ExtendedSelectProps;

  return (
    <Flex mr="-1rem" py={1} align="center" cursor="pointer">
      <ValueDisplay {...{ title, menuIsOpen, tagLabel }} />
      <components.ValueContainer {...props} />
    </Flex>
  );
};

const SelectControl = <T extends LabeledValue<string>>(
  props: ControlProps<T>,
) => {
  const { selectProps } = props;
  const { menuIsOpen, hasValue, onMenuClose, onMenuOpen, showSearch } =
    selectProps as ReactSelectProps<T, true> & ExtendedSelectProps;

  const buttonRef = useRef<HTMLButtonElement>(null);

  const onClick = useCallback(() => {
    if (menuIsOpen) {
      onMenuClose?.();
    } else {
      onMenuOpen?.();
      if (!showSearch && buttonRef.current) {
        buttonRef.current.focus();
      }
    }
  }, [menuIsOpen, onMenuOpen, onMenuClose, showSearch]);

  return (
    <Button
      fontWeight="normal"
      variant="unstyled"
      boxShadow={menuIsOpen ? '0px 10px 20px rgba(0, 0, 0, 0.4)' : 'none'}
      cursor="pointer"
      ref={buttonRef}
      onClick={onClick}
      onTouchEnd={onClick}
      alignItems="center"
      borderTopRadius="4px"
      borderBottomRadius={menuIsOpen ? 0 : '4px'}
      borderColor="borderPurple"
      borderStyle="solid"
      borderWidth={hasValue && !menuIsOpen ? '4px' : '2px'}
      borderBottom={menuIsOpen ? 0 : undefined}
      height="auto"
      bg="dark"
      _hover={{
        borderColor: menuIsOpen ? 'borderPurple' : 'whiteAlpha.800',
      }}
      transform={menuIsOpen ? 'translateY(-1px)' : undefined}
      transition="transform 0s"
    >
      <components.Control {...props} />
    </Button>
  );
};

const SelectMenu = <T extends LabeledValue<string>>(props: MenuProps<T>) => {
  const { selectProps } = props;
  const { onInputChange, title, tagLabel, placement, showSearch, inputValue } =
    selectProps as ReactSelectProps<T, true> & ExtendedSelectProps;
  const [input, setInput] = useState(inputValue || '');
  const placeRight = placement === 'right';
  return (
    <Flex
      position="absolute"
      top="calc(100% - 1px)"
      minWidth="15rem"
      left={placeRight ? 'auto' : 0}
      right={placeRight ? 0 : 'auto'}
      zIndex={1}
      direction="column"
    >
      <Flex w="100%" direction={placeRight ? 'row-reverse' : 'row'}>
        <Flex
          height={3}
          p={0}
          bg="dark"
          borderLeftColor="borderPurple"
          borderLeftStyle="solid"
          borderLeftWidth="2px"
          borderRightColor="borderPurple"
          borderRightStyle="solid"
          borderRightWidth="2px"
          overflow="hidden"
          whiteSpace="nowrap"
          boxShadow="0px 10px 20px rgba(0, 0, 0, 0.4)"
        >
          <Flex visibility="hidden">
            <ValueDisplay title={title} tagLabel={tagLabel} menuIsOpen />
          </Flex>
        </Flex>
        <Flex
          borderBottomColor="borderPurple"
          borderBottomStyle="solid"
          borderBottomWidth="2px"
          flex={1}
          pointerEvents="none"
        />
      </Flex>
      <Flex
        w="100%"
        boxShadow="0px 10px 20px rgba(0, 0, 0, 0.4)"
        bg="dark"
        borderWidth="2px"
        borderColor="borderPurple"
        borderStyle="solid"
        borderBottomWidth={showSearch ? '2px' : '1px'}
        borderTop="none"
        borderBottomRadius="4px"
        direction="column"
      >
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
              placeholder="Search…"
              _placeholder={{ color: 'whiteAlpha.500' }}
              borderRadius="0"
              borderWidth="2px"
              mx={4}
              my={2}
              borderColor="borderPurple"
              onChange={({ target: { value } }) => {
                setInput(value);
                onInputChange?.(value, {
                  action: 'input-change',
                  prevInputValue: value,
                });
              }}
              value={input}
            />
          </Flex>
        )}
        <components.Menu {...props} />
      </Flex>
    </Flex>
  );
};

const SelectContainer = <T extends LabeledValue<string>>(
  props: ContainerProps<T>,
) => {
  const {
    selectProps: { onMenuClose },
  } = props;

  return (
    <Flex position="relative" onBlur={onMenuClose}>
      <components.SelectContainer
        {...props}
        innerProps={{ onKeyDown: () => undefined }}
      />
    </Flex>
  );
};

export const zonesToOptions = (zones: TimeZoneType[] = []) =>
  zones.map(({ location, label }) => ({ value: location, label }));

export type ExtendedSelectProps = {
  title?: string | JSX.Element;
  showSearch?: boolean;
  isTimeZone?: boolean;
  hasValue?: boolean;
  tagLabel?: string;
  disableEmpty?: boolean;
  placement?: string;
};

export const MetaFilterSelectSearch = <T extends LabeledValue<string>>({
  options: defaults,
  showSearch = false,
  isTimeZone = false,
  tagLabel = '',
  hasValue = false,
  ...props
}: ReactSelectProps<T | TimeZoneType, boolean, GroupBase<T | TimeZoneType>> &
  ExtendedSelectProps) => {
  const [options, setOptions] = useState(
    isTimeZone
      ? (zonesToOptions(defaults as TimeZoneType[]) as Array<T>)
      : (defaults as Array<T>),
  );

  const onZoneInputChange = useCallback(
    (val: string) => {
      const search = val.length > 0 ? val.toLowerCase().trim() : null;
      let opts = defaults ?? [];
      if (search) {
        opts = zonesToOptions(
          (opts as Array<TimeZoneType>).filter(timeZonesFilter(search)),
        ) as Array<T>;
      }
      setOptions(opts as Array<T>);
    },
    [defaults],
  );

  return (
    <SelectSearch
      isMulti
      closeMenuOnSelect={false}
      components={{
        MultiValueContainer: () => null,
        SingleValue: () => null,
        IndicatorSeparator: () => null,
        DropdownIndicator: () => null,
        IndicatorsContainer: () => null,
        Input: () => null,
        ValueContainer: SelectValueContainer,
        Option: SelectOption,
        Menu: SelectMenu,
        Control: SelectControl,
        SelectContainer,
      }}
      placeholder=""
      isClearable={false}
      hideSelectedOptions={false}
      filterOption={isTimeZone ? null : undefined}
      onInputChange={isTimeZone ? onZoneInputChange : undefined}
      {...{
        showSearch,
        options,
        tagLabel,
        hasValue,
        ...props,
      }}
    />
  );
};
