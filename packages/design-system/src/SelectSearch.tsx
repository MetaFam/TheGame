import React from 'react';
import Select, {
  GroupBase,
  mergeStyles,
  Props as SelectProps,
  StylesConfig,
} from 'react-select';

import { LabeledValue } from './SelectTimeZone.js';
import { searchSelectStyles, selectStyles, theme } from './theme/index.js';

export const SelectSearch = <T extends LabeledValue<string>>({
  styles: incomingStyles = {},
  ...props
}: SelectProps<T, boolean, GroupBase<T>>) => {
  const styles = mergeStyles<T, boolean, GroupBase<T>>(
    searchSelectStyles as StylesConfig<T, boolean, GroupBase<T>>,
    incomingStyles,
  );
  return <Select {...{ styles, ...props }} />;
};

export const metaFilterSelectStyles: StylesConfig<
  LabeledValue<string>,
  boolean,
  GroupBase<LabeledValue<string>>
> = {
  ...selectStyles,
  multiValue: (s) => ({
    ...s,
    color: theme.colors.white,
  }),
  multiValueLabel: (s) => ({
    ...s,
    color: theme.colors.white,
  }),
  groupHeading: (s) => ({
    ...s,
    borderTop: `1px solid ${theme.colors.borderPurple}`,
    margin: 0,
  }),
  option: (s, { isSelected }) => ({
    ...s,
    backgroundColor: 'transparent',
    fontWeight: isSelected ? 'bold' : 'normal',
    ':hover': {
      backgroundColor: 'transparent',
      color: theme.colors.white,
    },
    ':focus': {
      boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.6)',
    },
  }),
  menu: () => ({}),
  control: (s) => ({
    ...s,
    background: theme.colors.dark,
    border: 'none',
    ':hover': {},
  }),
  noOptionsMessage: (s) => ({
    ...s,
    borderTop: `1px solid ${theme.colors.borderPurple}`,
  }),
};
