/* istanbul ignore file */

import { Maybe, Optional } from '@metafam/utils';
import cityTimeZones from 'city-timezones';
import React, { useCallback, useState } from 'react';
import TimeZoneSelect, {
  i18nTimezones as i18nTimeZones,
  ITimezone,
  ITimezoneOption,
} from 'react-timezone-select';
import spacetime from 'spacetime';
import informal from 'spacetime-informal';

import { chakraesqueStyles } from './theme';

export type Labeled = { label?: string };
export type LabeledValue<T> = Labeled & { value?: T };
export type LabeledOptions<T> = Labeled & { options?: Array<T> };
export type CombinedLabel<T> = LabeledValue<T> & LabeledOptions<T>;

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

export interface TimeZoneSelectProps extends Record<string, unknown> {
  value?: ITimezone;
  onBlur?: () => void;
  onChange?: (timeZone: ITimezoneOption) => void;
  labelStyle: 'original' | 'altName' | 'abbrev';
}

const timeZoneSelectStyles: typeof chakraesqueStyles = {
  ...chakraesqueStyles,
  container: (styles, props) => ({
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

export const TimeZoneOptions: TimeZoneType[] = Object.entries(i18nTimeZones)
  .map(
    ([location, title]) => getTimeZoneFor({ location, title }) as TimeZoneType,
  )
  .sort((a, b) => (a.offset < b.offset ? -1 : 1));

export const timeZonesFilter = (
  search: string,
  cityZones: Optional<Array<string>> = undefined,
) => (tz: TimeZoneType): boolean => {
  if (!cityZones) {
    // eslint-disable-next-line no-param-reassign
    cityZones = getCityZonesFor(search);
  }
  return (
    Object.values(tz).reduce((acc: boolean, val: number | Maybe<string>) => {
      const match =
        val != null &&
        val !== '' &&
        val.toString().toLowerCase().includes(search);
      return acc || match;
    }, false) || cityZones.length > 0
  );
};

export const getCityZonesFor = (search: string): string[] =>
  cityTimeZones.findFromCityStateProvince(search).map(({ timezone: tz }) => tz);

export const SelectTimeZone: React.FC<TimeZoneSelectProps> = ({
  value,
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
