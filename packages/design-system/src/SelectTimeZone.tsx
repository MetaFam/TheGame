/* istanbul ignore file */
import cityTimeZones from 'city-timezones';
import React, { useCallback, useState } from 'react';
import TimeZoneSelect, {
  i18nTimezones as i18nTimeZones,
} from 'react-timezone-select';
import spacetime from 'spacetime';
import informal from 'spacetime-informal';

import { chakraesqueStyles } from './theme';

export type TimeZoneType = {
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

export const TimeZoneOptions: TimeZoneType[] = Object.entries(i18nTimeZones)
  .map(([value, title]) => {
    const now = spacetime.now().goto(value);
    const tz = now.timezone();
    const tzStrings = informal.display(value);

    let abbrev = value;
    let altName = value;

    if (tzStrings?.standard) {
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
    const hr = `${(min / 60) ^ 0}:${Math.abs(min % 60)
      .toString()
      .padEnd(2, '0')}`;
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

export const timeZonesFilter = (
  searchText: string,
  filteredTimeZones: string[],
) => ({ value, title, label, abbrev, altName }: TimeZoneType): boolean =>
  value.toLowerCase().includes(searchText) ||
  title.toLowerCase().includes(searchText) ||
  label.toLowerCase().includes(searchText) ||
  abbrev.toLowerCase().includes(searchText) ||
  altName.toLowerCase().includes(searchText) ||
  filteredTimeZones.includes(value);

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
        options.map(({ value: val, title }) => [val, title]),
      )}
      {...{ onInputChange }}
      {...props}
    />
  );
};
