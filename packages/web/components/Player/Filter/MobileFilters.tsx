import {
  ArrowBackIcon,
  ArrowForwardIcon,
  CheckIcon,
  CloseIcon,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Flex,
  FlexProps,
  IconButton,
  Text,
  TimezoneOptions,
} from '@metafam/ds';
import { PlayerAggregates } from 'lib/hooks/players';
import React, { useCallback, useEffect, useState } from 'react';
import { SkillOption } from 'utils/skillHelpers';

type ValueType = { value: string; label: string };

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
        <DrawerBody p="0">
          {selected === Selected.NONE && (
            <>
              <FilterItem
                title="Type Of Player"
                onClick={() => setSelected(Selected.PLAYER_TYPE)}
              />
              <FilterItem
                title="Skills"
                onClick={() => setSelected(Selected.SKILLS)}
                // value={skills}
                // onChange={(value) => {
                //   setSkills(value as SkillOption[]);
                // }}
                // options={aggregates.skillChoices}
                // showSearch
              />
              <FilterItem
                title="Availability"
                onClick={() => setSelected(Selected.AVAILABILITY)}
              />
              <FilterItem
                title="Time Zone"
                onClick={() => setSelected(Selected.TIME_ZONE)}
              />
            </>
          )}
          {selected === Selected.PLAYER_TYPE && (
            <FilterContent
              value={playerTypes}
              onChange={(value) => {
                setPlayerTypes(value as ValueType[]);
              }}
              options={aggregates.playerTypes.map(
                ({ id, title: playerType }) => ({
                  value: id.toString(),
                  label: playerType,
                }),
              )}
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
            />
          )}
          {selected === Selected.TIME_ZONE && (
            <FilterContent
              value={timezones}
              onChange={(value) => {
                setTimezones(value as ValueType[]);
              }}
              options={TimezoneOptions.map(({ id, label }) => ({
                value: id.toString(),
                label,
              }))}
              // showSearch
            />
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

type FilterItemProps = {
  title: string;
  onClick: () => void;
} & FlexProps;

const FilterItem: React.FC<FilterItemProps> = ({ title, ...props }) => (
  <Flex
    justify="space-between"
    align="center"
    p="1rem"
    pr="0.75rem"
    borderBottom="1px solid"
    borderBottomColor="borderPurple"
    cursor="pointer"
    _hover={{ bg: 'whiteAlpha.100' }}
    {...props}
  >
    <Text fontWeight="bold" fontSize="md">
      {title}
    </Text>
    <ArrowForwardIcon boxSize="2rem" color="white" />
  </Flex>
);

type FilterContentProps = {
  value: ValueType[];
  onChange: (value: ValueType[]) => void;
  options: ValueType[];
};

const FilterContent: React.FC<FilterContentProps> = ({
  value,
  onChange,
  options,
}) => {
  const lastIndex = options.length - 1;
  return (
    <Flex
      direction="column"
      borderBottom="1px solid"
      borderBottomColor="borderPurple"
    >
      {options.map((option, index) => {
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
            onClick={() => {
              if (isSelected) {
                const newValue = value.slice();
                newValue.splice(value.indexOf(option), 1);
                onChange(newValue);
              } else {
                const newValue = value.slice();
                newValue.push(option);
                onChange(newValue);
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
    </Flex>
  );
};
