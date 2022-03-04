import { Center, SelectTimeZone, Text } from '@metafam/ds';
import { useMounted } from 'lib/hooks';
import React from 'react';
import { Controller } from 'react-hook-form';

import { ProfileWizardPane } from './ProfileWizardPane';
import { WizardPaneCallbackProps } from './WizardPane';

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
        <Center maxW="20rem" m="auto">
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
                  onChange={onChange}
                  {...props}
                />
              )
            }
          />
        </Center>
      )}
    </ProfileWizardPane>
  );
};
