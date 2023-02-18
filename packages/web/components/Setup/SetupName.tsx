import { Flex, Input } from '@metafam/ds';
import { getPlayer } from 'graphql/getPlayer';
import React from 'react';

import { ProfileWizardPane } from './ProfileWizardPane';
import { WizardPaneCallbackProps } from './WizardPane';

export const SetupName: React.FC = () => {
  const field = 'name';

  return (
    <ProfileWizardPane
      {...{ field }}
      title="Name"
      prompt="Hey! What's your name? 🙃"
    >
      {({ register, dirty, errored }: WizardPaneCallbackProps) => {
        const { ref: registerRef, ...props } = register(field, {
          minLength: {
            value: 1,
            message: 'Must have at least one character.',
          },
          maxLength: {
            value: 150,
            message: 'Maximum length is 150 characters.',
          },
        });

        return (
          <Flex justify="center" mt={5}>
            <Input
              background="dark"
              placeholder="Name…"
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
