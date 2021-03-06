import React from 'react';
import Select, { Props as SelectProps, Styles } from 'react-select';

import { theme } from './theme';

export const selectStyles: Styles = {
  menu: (styles) => ({
    ...styles,
    background: theme.colors.dark,
  }),
  menuList: (styles) => ({
    ...styles,
    paddingTop: 0,
  }),
  noOptionsMessage: (styles) => ({
    ...styles,
    color: theme.colors.white,
  }),
  input: (styles) => ({
    ...styles,
    color: theme.colors.white,
  }),
  group: (styles) => ({
    ...styles,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  groupHeading: (styles) => ({
    ...styles,
    color: theme.colors.white,
    background: theme.colors.purple[400],
    paddingTop: theme.space['3'],
    paddingBottom: theme.space['3'],
    position: 'sticky',
    top: 0,
    borderRadius: theme.radii.md,
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: ((() => {
      if (isDisabled) return undefined;
      if (isFocused || isSelected) {
        return theme.colors.purpleTag;
      }
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
  multiValue: (styles) => ({
    ...styles,
    background: theme.colors.purpleTag,
    color: theme.colors.white,
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    background: theme.colors.purpleTag,
    color: theme.colors.white,
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: theme.colors.white,
    cursor: 'pointer',
    ':hover': {
      color: theme.colors.blueLight,
    },
  }),
  clearIndicator: (styles) => ({
    ...styles,
    color: theme.colors.white,
    cursor: 'pointer',
    ':hover': {
      color: theme.colors.blueLight,
    },
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

export const SelectSearch: React.FC<SelectProps> = (
  (props) => (
    <Select styles={selectStyles} {...props} />
  )
);
