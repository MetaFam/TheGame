import React from 'react';
import { Styles } from 'react-select';
import TimezoneSelect, { TimezoneSelectProps } from 'react-timezone-select';

import { theme } from './theme';

export const selectStyles: Styles = {
  menu: (styles) => ({
    ...styles,
    background: theme.colors.dark,
  }),
  input: (styles) => ({
    ...styles,
    color: theme.colors.white,
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: ((() => {
      if (isDisabled) return undefined;
      if (isFocused) return theme.colors.purple[600];
      if (isSelected) return theme.colors.purpleTag;
      return theme.colors.dark
    })()),
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

export const SelectTimeZone: (
  React.FC<TimezoneSelectProps>
  // This is my unsuccessful attempt to pass these
  & { autoFocus?: boolean, onMenuOpen?: () => void }
) = (
  (props) => (
    <TimezoneSelect styles={selectStyles} {...props} />
  )
);
