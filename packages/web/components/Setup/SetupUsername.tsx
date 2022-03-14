import { Flex, Input } from '@metafam/ds';
import { getPlayer } from 'graphql/getPlayer';
import React from 'react';

import { ProfileWizardPane } from './ProfileWizardPane';
import { WizardPaneCallbackProps } from './WizardPane';

export const SetupUsername: React.FC = () => {
  const field = 'username';

  return (
    <ProfileWizardPane
      {...{ field }}
      title="Username"
      prompt="What name would you like to use in your MyMeta profile URL?"
    >
      {({ register, dirty, errored }: WizardPaneCallbackProps) => {
        const { ref: registerRef, ...props } = register(field, {
          validate: async (value: string) => {
            if (/^0x[0-9a-z]{40}$/i.test(value)) {
              return `Username “${value}” has the same format as an Ethereum address.`;
            }
            if (dirty && (await getPlayer(value))) {
              return `Username “${value}” is already in use.`;
            }
            return true;
          },
          pattern: {
            value: /^[a-z0-9-_]+$/,
            message:
              'Only lowercase letters, digits, dashes, & underscores allowed.',
          },
          minLength: {
            value: 3,
            message: 'Must have at least three characters.',
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
              placeholder="USERNAME"
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
