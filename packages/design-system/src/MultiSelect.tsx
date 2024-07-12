import React, { MutableRefObject } from 'react';
import Select, {
  GroupBase,
  Props,
  SelectInstance,
  StylesConfig,
} from 'react-select';

import { multiSelectStyles } from './theme/index.js';

export const MultiSelect = React.forwardRef(
  (
    props: Props<unknown, boolean, GroupBase<unknown>>,
    ref:
      | ((
          instance: SelectInstance<unknown, boolean, GroupBase<unknown>> | null,
        ) => void)
      | MutableRefObject<SelectInstance<
          unknown,
          boolean,
          GroupBase<unknown>
        > | null>
      | null,
  ) => (
    <Select
      styles={multiSelectStyles as StylesConfig}
      {...props}
      {...{ ref }}
    />
  ),
);

export type SelectOption = {
  value: string;
  label: string;
};
