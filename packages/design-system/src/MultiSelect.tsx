import React, { MutableRefObject } from 'react';
import {  } from 'react-markdown';
import Select, {
  GroupBase,
  Options,
  SelectInstance,
  StylesConfig,
} from 'react-select';

import { multiSelectStyles } from './theme/index.js';

export const MultiSelect = React.forwardRef<
  SelectInstance<unknown, boolean, GroupBase<unknown>>,
  { options: Options<SelectOption> }
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
