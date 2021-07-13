import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import {
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

import { DropDownIcon } from './icons/DropDownIcon';
import { MetaTag } from './MetaTag';
import { SelectComponents, SelectSearch } from './SelectSearch';
import {
  filterTimezones,
  getTimezonesFor,
  TimezoneType,
} from './SelectTimeZone';

export const MetaSelect: React.FC<SelectProps> = (props) => (
  <Select
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

const SelectOption: React.FC<
  React.ComponentProps<typeof SelectComponents.Option>
> = (props) => {
  const {
    isSelected,
    data: { value: optionValue },
    selectProps: { onChange, value: selectValue },
  } = props;

  const clearValue = useCallback(() => {
    if (onChange) {
      const newSelectValue = selectValue
        ? selectValue.filter(
            ({ value }: { value: string }) => !(value === optionValue),
          )
        : [];
      onChange(newSelectValue, {
        action: 'remove-value',
        removedValue: { optionValue },
      });
    }
  }, [optionValue, selectValue, onChange]);

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
      onClick={isSelected ? clearValue : undefined}
      css={{ div: { cursor: 'pointer' } }}
    >
      <SelectComponents.Option {...props} />
      {isSelected && <CheckIcon color="white" mx="2" />}
    </Flex>
  );
};

const ValueDisplay: React.FC<{
  menuIsOpen: boolean | undefined;
  title: string;
  tagLabel: string;
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

const SelectValueContainer: React.FC<
  React.ComponentProps<typeof SelectComponents.ValueContainer>
> = (props) => {
  const {
    selectProps: { value, title, menuIsOpen },
  } = props;

  let tagLabel = '';
  if (Array.isArray(value) && value.length > 0) {
    tagLabel = value.length.toString();
  }
  if (value && !Array.isArray(value)) {
    tagLabel =
      title.toLowerCase() === 'availability' ? `>${value.value}` : value.value;
  }
  return (
    <Flex mr="-1rem" py="1" align="center" cursor="pointer">
      <ValueDisplay title={title} menuIsOpen={menuIsOpen} tagLabel={tagLabel} />
      <SelectComponents.ValueContainer {...props} />
    </Flex>
  );
};

const SelectControl: React.FC<
  React.ComponentProps<typeof SelectComponents.Control>
> = (props) => {
  const {
    hasValue,
    selectProps: { menuIsOpen, onMenuClose, onMenuOpen, showSearch },
  } = props;

  const buttonRef = useRef<HTMLButtonElement>(null);

  const onClick = useCallback(() => {
    if (menuIsOpen) {
      if (onMenuClose) {
        onMenuClose();
      }
    } else {
      if (onMenuOpen) {
        onMenuOpen();
      }
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
      align="center"
      borderTopRadius="4px"
      borderBottomRadius={menuIsOpen ? '0' : '4px'}
      borderColor="borderPurple"
      borderStyle="solid"
      borderWidth={hasValue && !menuIsOpen ? '4px' : '2px'}
      borderBottom={menuIsOpen ? '0' : undefined}
      height="auto"
      bg="dark"
      _hover={{
        borderColor: menuIsOpen ? 'borderPurple' : 'whiteAlpha.800',
      }}
      transform={menuIsOpen ? 'translateY(-1px)' : undefined}
      transition="transform 0s"
    >
      <SelectComponents.Control {...props} />
    </Button>
  );
};

const SelectMenu: React.FC<
  React.ComponentProps<typeof SelectComponents.Menu>
> = (props) => {
  const {
    selectProps: {
      onInputChange,
      title,
      value,
      placement,
      showSearch,
      inputValue,
    },
  } = props;
  const [input, setInput] = useState(inputValue || '');
  let tagLabel = '';
  if (Array.isArray(value) && value.length > 0) {
    tagLabel = value.length.toString();
  }
  if (value && !Array.isArray(value)) {
    tagLabel =
      title.toLowerCase() === 'availability' ? `>${value.value}` : value.value;
  }
  const placeRight = placement === 'right';
  return (
    <Flex
      position="absolute"
      top="calc(100% - 1px)"
      minWidth="15rem"
      left={placeRight ? 'auto' : '0'}
      right={placeRight ? '0' : 'auto'}
      zIndex="1"
      direction="column"
    >
      <Flex w="100%" direction={placeRight ? 'row-reverse' : 'row'}>
        <Flex
          height="3"
          p="0"
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
              placeholder="Search..."
              _placeholder={{ color: 'whiteAlpha.500' }}
              borderRadius="0"
              borderWidth="2px"
              mx="4"
              my="2"
              borderColor="borderPurple"
              onChange={(e) => {
                const val = e.target.value;
                setInput(val);
                if (onInputChange) {
                  onInputChange(val, { action: 'input-change' });
                }
              }}
              value={input}
            />
          </Flex>
        )}
        <SelectComponents.Menu {...props} />
      </Flex>
    </Flex>
  );
};

const SelectContainer: React.FC<
  React.ComponentProps<typeof SelectComponents.SelectContainer>
> = (props) => {
  const {
    selectProps: { onMenuClose },
  } = props;

  // const onOutsideFocus = useCallback(() => {
  //   if (onMenuClose && menuIsOpen) {
  //     onMenuClose();
  //   }
  // }, [menuIsOpen, onMenuClose]);

  // useEffect(() => {
  //   const selectedRef = selectRef.current;
  //   selectedRef?.addEventListener('focusout', onOutsideFocus);
  //   return () => {
  //     selectedRef?.removeEventListener('focusout', onOutsideFocus);
  //   };
  // }, [selectRef, onOutsideFocus]);

  return (
    <Flex position="relative" onBlur={onMenuClose}>
      <SelectComponents.SelectContainer
        {...props}
        innerProps={{ onKeyDown: () => undefined }}
      />
    </Flex>
  );
};

export const MetaFilterSelectSearch: React.FC<
  React.ComponentProps<typeof SelectSearch> & {
    showSearch?: boolean;
    isTimezone?: boolean;
  }
> = ({
  options: defaultOptions,
  showSearch = false,
  isTimezone = false,
  ...props
}) => {
  const [options, setOptions] = useState(defaultOptions);

  const onTimezoneInputChange = useCallback(
    (value: string) => {
      if (!value) {
        setOptions(defaultOptions);
      } else {
        const searchText = value.toLowerCase().trim();
        const filteredTimezones = getTimezonesFor(searchText);
        setOptions(
          (defaultOptions as TimezoneType[])?.filter(
            filterTimezones(searchText, filteredTimezones),
          ),
        );
      }
    },
    [defaultOptions],
  );
  return (
    <SelectSearch
      isMulti
      closeMenuOnSelect={false}
      placeholder=" "
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
      isClearable={false}
      hideSelectedOptions={false}
      showSearch={showSearch}
      options={options}
      filterOption={isTimezone ? null : undefined}
      onInputChange={isTimezone ? onTimezoneInputChange : undefined}
      {...props}
    />
  );
};
