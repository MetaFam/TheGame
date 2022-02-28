import { Flex, Input } from '@metafam/ds';
import React from 'react';

import { ProfileWizardPane } from './ProfileWizardPane';
import { WizardPaneCallbackProps } from './WizardPane';

export const SetupPronouns: React.FC = () => {
  const field = 'pronouns';

  return (
    <ProfileWizardPane
      {...{ field }}
      title="Pronouns"
      prompt="Which pronouns do you prefer?"
    >
      {({ register, errored }: WizardPaneCallbackProps) => {
        const { ref: registerRef, ...props } = register(field, {
          maxLength: {
            value: 150,
            message: 'Maximum length is 150 characters.',
          },
        });

        return (
          <Flex justify="center" mt={5}>
            <Input
              background="dark"
              placeholder="they / them"
              w="auto"
              _focus={errored ? { borderColor: 'red' } : undefined}
              ref={(ref) => {
                ref?.focus();
                registerRef(ref);
              }}
              {...props}
            />
          </Flex>
        );
      }}
    </ProfileWizardPane>
  );
};
