import { Flex, SelectTimeZone, Text } from '@metafam/ds';
import { useMounted } from 'lib/hooks';
import React from 'react';
import { Controller } from 'react-hook-form';

import {
  ProfileWizardPane,
  WizardPaneCallbackProps,
} from './ProfileWizardPane';

export const SetupTimeZone: React.FC = () => {
  const field = 'timeZone';
  const mounted = useMounted();

  return (
    <ProfileWizardPane
      {...{ field }}
      title="Time Zone"
      prompt="Which zone are you in?"
    >
      {({ control }: WizardPaneCallbackProps) => (
        <Flex justify="center" maxW="30rem">
          <Controller
            {...{ control }}
            name={field}
            defaultValue={Intl.DateTimeFormat().resolvedOptions().timeZone}
            render={({ field: { onChange, ref, ...props } }) =>
              !mounted ? (
                <Text>⸘Not Mounted‽</Text> // avoiding “different className” error
              ) : (
                <SelectTimeZone
                  labelStyle="abbrev"
                  onChange={(tz) => onChange(tz.value)}
                  {...props}
                />
              )
            }
          />
        </Flex>
      )}
    </ProfileWizardPane>
  );
};
