declare module 'react-timezone-select' {
  // eslint-disable-next-line import/no-extraneous-dependencies
  import * as React from 'react';

  // eslint-disable-next-line import/no-default-export, react/prefer-stateless-function
  export default class TimezoneSelect extends React.Component<SelectTimezoneProps> {}

  export interface TimeZone {
    value: string;
    label: string;
    altName: string;
    abbrev: string;
  }

  export interface TimezoneSelectProps extends Props {
    value?: TimeZone | string;
    onBlur?: () => void;
    onChange?: (timezone: TimeZone) => void;
    labelStyle: 'original' | 'altName' | 'abbrev';
  }
}
