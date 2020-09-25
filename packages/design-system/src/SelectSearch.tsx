import React from 'react';
import Select, { Styles, Props as SelectProps } from 'react-select';
import { theme } from './theme';

const selectStyles: Styles = {
  menu: styles => ({
    ...styles,
    background: theme.colors.purple[400],
  }),
  noOptionsMessage: styles => ({
    ...styles,
    color: theme.colors.white,
  }),
  input: styles => ({
    ...styles,
    color: theme.colors.white,
  }),
  groupHeading: styles => ({
    ...styles,
    color: theme.colors.white,
  }),
  option: styles => ({
    ...styles,
    background: theme.colors.dark,
    ':hover': {
      backgroundColor: theme.colors.purpleTag,
      color: theme.colors.white,
    },
  }),
  control: styles => ({
    ...styles,
    background: theme.colors.dark,
    border: theme.colors.dark,
  }),
  multiValue: styles => ({
    ...styles,
    background: theme.colors.purpleTag,
    color: theme.colors.white,
  }),
  multiValueLabel: styles => ({
    ...styles,
    background: theme.colors.purpleTag,
    color: theme.colors.white,
  }),
  multiValueRemove: styles => ({
    ...styles,
    color: theme.colors.white,
    cursor: 'pointer',
    ':hover': {
      color: theme.colors.offwhite,
    },
  }),
  clearIndicator: styles => ({
    ...styles,
    color: theme.colors.white,
    cursor: 'pointer',
    ':hover': {
      color: theme.colors.offwhite,
    },
  }),
  dropdownIndicator: styles => ({
    ...styles,
    color: theme.colors.white,
    cursor: 'pointer',
    ':hover': {
      color: theme.colors.offwhite,
    },
  }),
};
export const SelectSearch: React.FC<SelectProps> = props => (
  <Select styles={selectStyles} {...props} />
);
