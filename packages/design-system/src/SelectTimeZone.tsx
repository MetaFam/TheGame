/* istanbul ignore file */
import cityTimezones from 'city-timezones';
import React, { useCallback, useState } from 'react';
import { Styles } from 'react-select';
import TimezoneSelect, { i18nTimezones } from 'react-timezone-select';
import spacetime from 'spacetime';
import informal from 'spacetime-informal';

import { theme } from './theme';

export type TimezoneType = {
  value: string;
  title: string;
  label: string;
  offset: number;
  abbrev: string;
  altName: string;
};

export interface TimeZone {
  value: string;
  label: string;
  altName: string;
  abbrev: string;
}

export interface TimezoneSelectProps extends Record<string, unknown> {
  value?: TimeZone | string;
  onBlur?: () => void;
  onChange?: (timezone: TimeZone) => void;
  labelStyle: 'original' | 'altName' | 'abbrev';
}

export const TimezoneOptions: TimezoneType[] = Object.entries(i18nTimezones)
  .map(([value, title]) => {
    const now = spacetime.now().goto(value);
    const tz = now.timezone();
    const tzStrings = informal.display(value);

    let abbrev = value;
    let altName = value;

    if (tzStrings && tzStrings.standard) {
      abbrev =
        now.isDST() && tzStrings.daylight
          ? tzStrings.daylight.abbrev
          : tzStrings.standard.abbrev;
      altName =
        now.isDST() && tzStrings.daylight
          ? tzStrings.daylight.name
          : tzStrings.standard.name;
    }

    const min = tz.current.offset * 60;
    const hr = `${(min / 60) ^ 0}:${
      min % 60 === 0 ? '00' : Math.abs(min % 60)
    }`;
    const prefix = `(GMT${hr.includes('-') ? hr : `+${hr}`}) ${title}`;

    const label = `${prefix} ${abbrev.length < 5 ? `(${abbrev})` : ''}`;

    return {
      value,
      title,
      label,
      offset: tz.current.offset,
      abbrev,
      altName,
    };
  })
  .sort((a, b) => (a.offset < b.offset ? -1 : 1));

const selectStyles: Styles = {
  menu: (styles) => ({
    ...styles,
    background: theme.colors.dark,
  }),
  input: (styles) => ({
    ...styles,
    color: theme.colors.white,
  }),
  option: (styles) => ({
    ...styles,
    background: theme.colors.dark,
    color: theme.colors.whiteAlpha[700],
    ':hover': {
      backgroundColor: theme.colors.purpleTag,
      color: theme.colors.white,
    },
  }),
  control: (styles) => ({
    ...styles,
    background: theme.colors.dark,
    border: theme.colors.dark,
  }),
  singleValue: (styles) => ({
    ...styles,
    color: theme.colors.white,
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    color: theme.colors.white,
    cursor: 'pointer',
    ':hover': {
      color: theme.colors.blueLight,
    },
  }),
};

export const timezonesFilter = (
  searchText: string,
  filteredTimezones: string[],
) => ({ value, title, label, abbrev, altName }: TimezoneType): boolean =>
  value.toLowerCase().includes(searchText) ||
  title.toLowerCase().includes(searchText) ||
  label.toLowerCase().includes(searchText) ||
  abbrev.toLowerCase().includes(searchText) ||
  altName.toLowerCase().includes(searchText) ||
  filteredTimezones.includes(value);

export const getTimezonesFor = (searchText: string): string[] =>
  cityTimezones
    .findFromCityStateProvince(searchText)
    .map(({ timezone }) => timezone);

export const SelectTimeZone: React.FC<TimezoneSelectProps> = ({
  value,
  ...props
}) => {
  const [options, setOptions] = useState(TimezoneOptions);

  const onInputChange = useCallback((val: string) => {
    if (!val) {
      setOptions(TimezoneOptions);
    } else {
      const searchText = val.toLowerCase().trim();
      const filteredTimezones = getTimezonesFor(searchText);
      setOptions(
        TimezoneOptions.filter(timezonesFilter(searchText, filteredTimezones)),
      );
    }
  }, []);

  return (
    <TimezoneSelect
      value={value ?? ''}
      styles={selectStyles}
      filterOption={null}
      timezones={Object.fromEntries(
        options.map(({ value: val, title }) => [val, title]),
      )}
      {...{ onInputChange }}
      {...props}
    />
  );
};
