import { Flex, SelectTimeZone } from '@metafam/ds';
import React from 'react';
import { Controller } from 'react-hook-form';

import { SetupWizardPane, WizardPaneCallbackProps } from './SetupWizardPane';

export const SetupTimeZone: React.FC = () => {
  const field = 'timeZone';

  return (
    <SetupWizardPane
      {...{ field }}
      title="Time Zone"
      prompt="Which zone are you in?"
    >
      {({ control }: WizardPaneCallbackProps) => (
        <Flex justify="center" maxW="30rem">
          <Controller
            {...{ control }}
            name={field}
            // defaultValue={Intl.DateTimeFormat().resolvedOptions().timeZone}
            render={({ field: { onChange, ref, ...props } }) => (
              <SelectTimeZone
                labelStyle="abbrev"
                onChange={(tz) => {
                  onChange(tz.value);
                }}
                {...props}
              />
            )}
          />
        </Flex>
      )}
    </SetupWizardPane>
  );
};
