/* istanbul ignore file */

import { Maybe } from '@metafam/utils';
import cityTimeZones from 'city-timezones';
import React, { useCallback, useState } from 'react';
import TimeZoneSelect, {
  i18nTimezones as i18nTimeZones,
} from 'react-timezone-select';
import spacetime from 'spacetime';
import informal from 'spacetime-informal';
import { chakraesqueStyles } from './theme';

export type TimeZoneType = {
  location: string;
  title: Maybe<string>;
  label: string;
  offset: number;
  abbreviation: Maybe<string>;
  name: string;
};

export interface TimeZone {
  value: string;
  label: string;
  altName: string;
  abbrev: string;
  offset: number;
}

export interface TimeZoneSelectProps extends Record<string, unknown> {
  value?: TimeZone | string;
  onBlur?: () => void;
  onChange?: (timeZone: TimeZone) => void;
  labelStyle: 'original' | 'altName' | 'abbrev';
}

const timeZoneSelectStyles: typeof chakraesqueStyles = {
  ...chakraesqueStyles,
  control: (styles, props) => ({
    ...styles,
    ...chakraesqueStyles.control?.(styles, props),
    minWidth: '17em',
  }),
};

export const getTimeZoneFor = ({
  location,
  title,
}: {
  location: string;
  title?: Maybe<string>;
}): TimeZoneType => {
  title = title ?? null;
  const now = spacetime.now().goto(location);
  const tz = now.timezone();
  const tzStrings = informal.display(location);

  let abbreviation = null;
  let name = location;

  if (tzStrings?.standard) {
    abbreviation =
      now.isDST() && tzStrings.daylight
        ? tzStrings.daylight.abbrev
        : tzStrings.standard.abbrev;
    name =
      now.isDST() && tzStrings.daylight
        ? tzStrings.daylight.name
        : tzStrings.standard.name;
  }

  const min = tz.current.offset * 60;
  const hr = `${(min / 60) ^ 0}:${Math.abs(min % 60)
    .toString()
    .padEnd(2, '0')}`;
  const prefix = `(GMT${hr.includes('-') ? hr : `+${hr}`}) ${title}`;
  const label = `${prefix} ${
    abbreviation && abbreviation.length < 5 ? `(${abbreviation})` : ''
  }`;

  return {
    location,
    title,
    label,
    offset: tz.current.offset,
    abbreviation,
    name,
  };
};

export const TimeZoneOptions: TimeZoneType[] = Object.entries(i18nTimeZones)
  .map(([location, title]) => getTimeZoneFor({ location, title }))
  .sort((a, b) => (a.offset < b.offset ? -1 : 1));

export const timeZonesFilter = (
  searchText: string,
  filteredTimeZones: string[],
) => ({ location, title, label, abbreviation, name }: TimeZoneType): boolean =>
  location.toLowerCase().includes(searchText) ||
  title?.toLowerCase().includes(searchText) ||
  label.toLowerCase().includes(searchText) ||
  abbreviation?.toLowerCase().includes(searchText) ||
  name.toLowerCase().includes(searchText) ||
  filteredTimeZones.includes(location);

export const getTimeZonesFor = (searchText: string): string[] =>
  cityTimeZones
    .findFromCityStateProvince(searchText)
    .map(({ timezone }) => timezone);

export const SelectTimeZone: React.FC<TimeZoneSelectProps> = ({
  value,
  ...props
}) => {
  const [options, setOptions] = useState(TimeZoneOptions);

  const onInputChange = useCallback((val: string) => {
    if (!val) {
      setOptions(TimeZoneOptions);
    } else {
      const searchText = val.toLowerCase().trim();
      const filteredTimeZones = getTimeZonesFor(searchText);
      setOptions(
        TimeZoneOptions.filter(timeZonesFilter(searchText, filteredTimeZones)),
      );
    }
  }, []);

  return (
    <TimeZoneSelect
      value={value ?? ''}
      styles={timeZoneSelectStyles}
      filterOption={null}
      timeZones={Object.fromEntries(
        options.map(({ location, title }) => [location, title]),
      )}
      {...{ onInputChange }}
      {...props}
    />
  );
};
