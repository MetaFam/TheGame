import React from 'react';
import Select, {
  components,
  mergeStyles,
  Props as SelectProps,
} from 'react-select';

import { searchSelectStyles, selectStyles, theme } from './theme';

export const SelectComponents = components;

export const SelectSearch: React.FC<SelectProps> = ({
  styles = {},
  ...props
}) => <Select styles={mergeStyles(searchSelectStyles, styles)} {...props} />;

export const metaFilterSelectStyles: typeof selectStyles = {
  ...selectStyles,
  multiValue: (s) => ({
    ...s,
    color: theme.colors.white,
  }),
  multiValueLabel: (s) => ({
    ...s,
    color: theme.colors.white,
  }),
  groupHeading: (s, { children }) => ({
    ...s,
    ...selectStyles.groupHeading?.(s, { children }),
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
