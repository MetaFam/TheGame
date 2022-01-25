import React from 'react';
import Select, { Props as SelectProps } from 'react-select';

import { multiSelectStyles } from './theme';

export const MultiSelect: React.FC<SelectProps> = React.forwardRef<
  Select,
  SelectProps
>((props, ref) => (
  <Select styles={multiSelectStyles} {...props} {...{ ref }} />
));

export type SelectOption = {
  value: string;
  label: string;
};
