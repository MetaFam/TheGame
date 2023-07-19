/* istanbul ignore file */

import { Maybe } from '@metafam/utils';
import cityTimeZones from 'city-timezones';
import React, { useCallback, useState } from 'react';
import { CSSObjectWithLabel, GroupBase, StylesConfig } from 'react-select';
import type { ITimezone, ITimezoneOption } from 'react-timezone-select';
import TimeZoneSelect, { allTimezones } from 'react-timezone-select';
import spacetime from 'spacetime';
import informal from 'spacetime-informal';

import { chakraesqueStyles } from './theme';

export type LabeledValue<T> = Required<{ label?: string; value?: T }>;
export type LabeledOptions<T> = GroupBase<LabeledValue<T>>;
export type TimeZoneType = {
  utc: string;
  location: string;
  title: Maybe<string>;
  label: string;
  offset: number;
  abbreviation: Maybe<string>;
  name: string;
  value: string; // for compatibility w/ select option
};
export type { ITimezoneOption };

export interface TimeZoneSelectProps extends Record<string, unknown> {
  value?: ITimezone;
  onBlur?: () => void;
  onChange?: (timeZone: ITimezoneOption) => void;
  labelStyle: 'original' | 'altName' | 'abbrev';
}

const timeZoneSelectStyles: typeof chakraesqueStyles = {
  ...chakraesqueStyles,
  container: (styles: CSSObjectWithLabel, props) => ({
    ...styles,
    ...chakraesqueStyles.container?.(styles, props),
    width: '100%',
    maxWidth: 'calc(100vw - 2rem)',
  }),
};

export const getTimeZoneFor = ({
  location,
  title,
  opts = {},
}: {
  location?: string;
  title?: Maybe<string>;
  opts?: Record<string, boolean>;
}): Maybe<TimeZoneType> => {
  const anchor = location ?? title;

  if (!anchor) return null;

  title = title ?? null; // eslint-disable-line no-param-reassign
  const now = spacetime.now().goto(anchor);
  const tz = now.timezone();
  const tzStrings = informal.display(anchor);

  let abbreviation: Maybe<string> = null;
  let name = anchor;

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

  const mins = tz.current.offset * 60;
  let hrs = `${(mins / 60) ^ 0}`;
  if (!opts.shortHours || Math.abs(mins % 60) !== 0) {
    hrs += `:${Math.abs(mins % 60)
      .toString()
      .padStart(2, '0')}`;
  }
  const utc = `(GMT${hrs.includes('-') ? hrs : `+${hrs}`})`;
  const label = `${utc} ${title ?? name} ${
    abbreviation && ` (${abbreviation})`
  }`;

  return {
    utc,
    location: anchor,
    title,
    label,
    offset: tz.current.offset,
    abbreviation,
    name,
    get value() {
      return abbreviation ?? 'Unknown';
    },
  };
};

export const TimeZoneOptions: TimeZoneType[] = Object.entries(allTimezones)
  .map(
    ([location, title]) => getTimeZoneFor({ location, title }) as TimeZoneType,
  )
  .sort((a, b) => (a.offset < b.offset ? -1 : 1));

export const timeZonesFilter =
  (search: string, cityZones: Array<string> = []) =>
  (tz: TimeZoneType): boolean => {
    // eslint-disable-next-line no-param-reassign
    cityZones = getCityZonesFor(search);
    return (
      cityZones.includes(tz.location) ||
      Object.values(tz).reduce(
        (acc: boolean, val: number | Maybe<string>) =>
          acc || (val?.toString().toLowerCase() ?? '').includes(search),
        false,
      )
    );
  };

export const getCityZonesFor = (search: string): string[] =>
  cityTimeZones.findFromCityStateProvince(search).map(({ timezone: tz }) => tz);

export const SelectTimeZone: React.FC<TimeZoneSelectProps> = ({
  value,
  onChange,
  ...props
}) => {
  const [options, setOptions] = useState(TimeZoneOptions);

  const onInputChange = useCallback((val: string) => {
    const search = val.length > 0 ? val.toLowerCase().trim() : null;
    let opts = TimeZoneOptions;
    if (search) {
      opts = opts.filter(timeZonesFilter(search));
    }
    setOptions(opts);
  }, []);

  return (
    <TimeZoneSelect
      value={value ?? ''}
      styles={timeZoneSelectStyles as StylesConfig<ITimezone, false, GroupBase<ITimezone>>}
      filterOption={null}
      timezones={Object.fromEntries(
        options.map(({ location, title }) => [location, title ?? '']),
      )}
      onChange={(tz) => onChange?.(tz as ITimezoneOption)}
      {...{ onInputChange }}
      {...props}
    />
  );
};
