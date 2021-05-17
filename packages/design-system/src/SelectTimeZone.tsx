/* istanbul ignore file */
import React from 'react';
import { Styles } from 'react-select';
import TimezoneSelect, { TimezoneSelectProps } from 'react-timezone-select';
import { i18nTimezones } from 'react-timezone-select/dist/index.js';
import spacetime from 'spacetime';
import informal from 'spacetime-informal';

import { theme } from './theme';

export type TimezoneType = {
  id: string;
  label: string;
};

export const TimezoneOptions: TimezoneType[] = Object.entries(
  i18nTimezones,
).map((zone) => {
  const now = spacetime.now().goto(zone[0]);
  const tz = now.timezone();
  const tzStrings = informal.display(zone[0]);

  let abbrev = zone[0];

  if (tzStrings && tzStrings.daylight && tzStrings.standard) {
    abbrev = now.isDST()
      ? tzStrings.daylight.abbrev
      : tzStrings.standard.abbrev;
  }

  const min = tz.current.offset * 60;
  const hr = `${(min / 60) ^ 0}:${min % 60 === 0 ? '00' : Math.abs(min % 60)}`;
  const prefix = `(GMT${hr.includes('-') ? hr : `+${hr}`}) ${zone[1]}`;

  const label = `${prefix} ${abbrev.length < 5 ? `(${abbrev})` : ''}`;

  return {
    id: zone[0],
    label,
  };
});

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

export const SelectTimeZone: React.FC<TimezoneSelectProps> = (props) => (
  <TimezoneSelect styles={selectStyles} {...props} />
);
