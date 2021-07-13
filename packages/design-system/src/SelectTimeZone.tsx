/* istanbul ignore file */
import cityTimezones from 'city-timezones';
import React, { useCallback, useState } from 'react';
import { Styles } from 'react-select';
import TimezoneSelect, { TimezoneSelectProps } from 'react-timezone-select';
import { i18nTimezones } from 'react-timezone-select/dist/index.js';
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

export const TimezoneOptions: TimezoneType[] = Object.entries(i18nTimezones)
  .map((zone) => {
    const now = spacetime.now().goto(zone[0]);
    const tz = now.timezone();
    const tzStrings = informal.display(zone[0]);

    let abbrev = zone[0];
    let altName = zone[0];

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
    const prefix = `(GMT${hr.includes('-') ? hr : `+${hr}`}) ${zone[1]}`;

    const label = `${prefix} ${abbrev.length < 5 ? `(${abbrev})` : ''}`;

    return {
      value: zone[0],
      title: zone[1],
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

export const filterTimezones = (
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

export const SelectTimeZone: React.FC<TimezoneSelectProps> = ({ ...props }) => {
  const [options, setOptions] = useState(TimezoneOptions);

  const onInputChange = useCallback((value: string) => {
    if (!value) {
      setOptions(TimezoneOptions);
    } else {
      const searchText = value.toLowerCase().trim();
      const filteredTimezones = getTimezonesFor(searchText);
      setOptions(
        TimezoneOptions.filter(filterTimezones(searchText, filteredTimezones)),
      );
    }
  }, []);

  return (
    <TimezoneSelect
      styles={selectStyles}
      filterOption={null}
      onInputChange={onInputChange}
      timezones={options.reduce(
        (t, { value, title }) => ({ ...t, [value]: title }),
        {},
      )}
      {...props}
    />
  );
};
