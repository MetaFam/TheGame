import React, { MutableRefObject } from 'react';
import Select, {
  GroupBase,
  Props,
  SelectInstance,
  StylesConfig,
} from 'react-select';

import { multiSelectStyles } from './theme/index.js';

export const MultiSelect = React.forwardRef<
  SelectInstance<unknown, boolean, GroupBase<unknown>>,
  { options: Array<any> }
>(
  (props, ref) => (
    <Select
      styles={multiSelectStyles as StylesConfig}
      isMulti={true}
      {...props}
      {...{ ref }}
    />
  ),
);

export type SelectOption = {
  value: string;
  label: string;
};
