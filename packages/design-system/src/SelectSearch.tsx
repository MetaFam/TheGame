import React from 'react';
import Select, { components, Props as SelectProps, Styles } from 'react-select';

import { theme } from './theme';

export const SelectComponents = components;

export const selectStyles: Styles = {
  menuPortal: (styles) => ({
    ...styles,
    borderRadius: theme.radii.md,
  }),
  menu: (styles) => ({
    ...styles,
    background: theme.colors.dark,
    minWidth: '15rem',
    border: `2px solid ${theme.colors.borderPurple}`,
  }),
  menuList: (styles) => ({
    ...styles,
    padding: 0,
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
  }),
  option: (styles) => ({
    ...styles,
    backgroundColor: 'transparent',
    ':hover': {
      backgroundColor: theme.colors.whiteAlpha[100],
      color: theme.colors.white,
    },
  }),
  control: (styles) => ({
    ...styles,
    minWidth: '6rem',
    background: theme.colors.dark,
    border: `2px solid ${theme.colors.borderPurple}`,
    ':hover': {
      borderColor: theme.colors.white,
    },
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

export const SelectSearch: React.FC<SelectProps> = (props) => (
  <Select styles={selectStyles} {...props} />
);
