import { FormLabel, FormLabelProps } from '@metafam/ds';
import React, { RefObject } from 'react';

export const Label: React.FC<FormLabelProps> = React.forwardRef(
  ({ children, ...props }, container) => {
    const ref = container as RefObject<HTMLLabelElement>;
    return (
      <FormLabel color="cyan" {...{ ref, ...props }}>
        {children}
      </FormLabel>
    );
  },
);
