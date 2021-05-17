import React from 'react';
import { Styles } from 'react-select';
import TimezoneSelect, { TimezoneSelectProps } from 'react-timezone-select';
import { i18nTimezones } from 'react-timezone-select/dist/index.js';

import { theme } from './theme';

export const TIMEZONE_OPTIONS: string[] = Object.keys(i18nTimezones);

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
