import {
  MetaFilterSelectSearch,
  MetaTheme,
  selectStyles,
  TimezoneOptions,
  Wrap,
  WrapItem,
  WrapProps,
} from '@metafam/ds';
import { SkillCategory_Enum } from 'graphql/autogen/types';
import { SkillColors } from 'graphql/types';
import { PlayerAggregates } from 'lib/hooks/players';
import { useIsSticky } from 'lib/hooks/useIsSticky';
import React, { useRef } from 'react';
import { SkillOption } from 'utils/skillHelpers';

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
  aggregates: PlayerAggregates;
  skills: SkillOption[];
  setSkills: React.Dispatch<React.SetStateAction<SkillOption[]>>;
  playerTypes: ValueType[];
  setPlayerTypes: React.Dispatch<React.SetStateAction<ValueType[]>>;
  timezones: ValueType[];
  setTimezones: React.Dispatch<React.SetStateAction<ValueType[]>>;
  availability: ValueType | null;
  setAvailability: React.Dispatch<React.SetStateAction<ValueType | null>>;
} & WrapProps;

export const DesktopFilters: React.FC<Props> = ({
  aggregates,
  skills,
  setSkills,
  playerTypes,
  setPlayerTypes,
  timezones,
  setTimezones,
  availability,
  setAvailability,
  ...props
}) => {
  const filterRef = useRef<HTMLDivElement>(null);
  const isSticky = useIsSticky(filterRef);

  return (
    <Wrap
      transition="all 0.25s"
      py="6"
      style={{ backdropFilter: 'blur(7px)' }}
      ref={filterRef}
      position="sticky"
      top="-1px"
      borderTop="1px solid transparent"
      zIndex="1"
      justifyContent="center"
      w={isSticky ? 'calc(100% + 6rem)' : '100%'}
      maxW={isSticky ? 'auto' : '79rem'}
      bg={isSticky ? 'purpleTag70' : 'whiteAlpha.200'}
      px={isSticky ? '4.5rem' : '1.5rem'}
      borderRadius={isSticky ? '0px' : '6px'}
      {...props}
    >
      <WrapItem>
        <MetaFilterSelectSearch
          title="Type Of Player"
          styles={styles}
          value={playerTypes}
          onChange={(value) => {
            setPlayerTypes(value as ValueType[]);
          }}
          options={aggregates.playerTypes}
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
            const values = value as ValueType[];
            setTimezones(values.slice(-1));
          }}
          options={TimezoneOptions}
          showSearch
          isTimezone
        />
      </WrapItem>
    </Wrap>
  );
};
