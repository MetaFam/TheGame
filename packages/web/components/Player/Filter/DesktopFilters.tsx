import {
  LabeledOptions,
  MetaFilterSelectSearch,
  metaFilterSelectStyles,
  TimeZoneOptions,
  TimeZoneType,
  Wrap,
  WrapItem,
  WrapProps,
} from '@metafam/ds';
import { SkillCategory_Enum } from 'graphql/autogen/types';
import { SkillColors } from 'graphql/types';
import {
  PlayerAggregates,
  SortOption,
  sortOptions,
} from 'lib/hooks/player/players';
import React from 'react';
import { SkillOption } from 'utils/skillHelpers';

type ValueType = { value: string; label: string };

const styles: typeof metaFilterSelectStyles = {
  ...metaFilterSelectStyles,
  multiValue: (s, { data }) => ({
    ...s,
    background:
      SkillColors[(data as SkillOption).category as SkillCategory_Enum],
  }),
  multiValueLabel: (s, { data }) => ({
    ...s,
    background:
      SkillColors[(data as SkillOption).category as SkillCategory_Enum],
  }),
  groupHeading: (s, { children }) => ({
    ...s,
    background: SkillColors[children as SkillCategory_Enum],
  }),
};

type Props = {
  aggregates: PlayerAggregates;
  skills: SkillOption[];
  setSkills: React.Dispatch<React.SetStateAction<SkillOption[]>>;
  playerTypes: ValueType[];
  setPlayerTypes: React.Dispatch<React.SetStateAction<ValueType[]>>;
  timeZones: TimeZoneType[];
  setTimeZones: React.Dispatch<React.SetStateAction<TimeZoneType[]>>;
  availability: ValueType | null;
  setAvailability: React.Dispatch<React.SetStateAction<ValueType | null>>;
  sortOption: ValueType;
  setSortOption: React.Dispatch<React.SetStateAction<ValueType>>;
} & WrapProps;

export const DesktopFilters: React.FC<Props> = ({
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
  ...props
}) => (
  <Wrap
    justify="center"
    overflow="visible" // Wrap defaults to hidden
    {...props}
  >
    <WrapItem>
      <MetaFilterSelectSearch
        title={`Sorted By: ${sortOption.label}`}
        hasValue={sortOption.value !== SortOption.SEASON_XP}
        {...{ styles }}
        value={[sortOption]}
        onChange={(value) => {
          const values = value as ValueType[];
          if (values[values.length - 1]) {
            setSortOption(values[values.length - 1]);
          }
        }}
        options={sortOptions}
      />
    </WrapItem>
    <WrapItem>
      <MetaFilterSelectSearch
        title="Availability"
        tagLabel={availability ? `≥${availability.value}` : ''}
        styles={styles}
        value={availability ? [availability] : []}
        hasValue={!!availability}
        onChange={(value) => {
          const values = value as ValueType[];
          setAvailability(values[values.length - 1]);
        }}
        options={[1, 5, 10, 20, 30, 40].map((value) => ({
          value: value.toString(),
          label: `≥ ${value.toString()} hr ⁄ week`,
        }))}
      />
    </WrapItem>
    <WrapItem>
      <MetaFilterSelectSearch
        title="Time Zone"
        tagLabel={timeZones.length > 0 ? timeZones.length.toString() : ''}
        styles={styles}
        value={timeZones}
        hasValue={timeZones.length > 0}
        onChange={(values) => {
          setTimeZones((values as TimeZoneType[]).slice(-1));
        }}
        options={TimeZoneOptions}
        showSearch
        isTimeZone
      />
    </WrapItem>
  </Wrap>
);
