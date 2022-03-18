import { Flex, Textarea } from '@metafam/ds';
import React from 'react';

import { ProfileWizardPane } from './ProfileWizardPane';
import { WizardPaneCallbackProps } from './WizardPane';

export const SetupDescription: React.FC = () => {
  const field = 'description';

  return (
    <ProfileWizardPane
      {...{ field }}
      title="Bio"
      prompt="This is where you get to tell the world who you are! What interests you? What are you up to these days? What are your goals & aspirations?? Why are you here???"
    >
      {({ register, errored }: WizardPaneCallbackProps) => {
        const { ref: registerRef, ...props } = register(field, {
          maxLength: {
            value: 420,
            message: 'Maximum length is 420 characters.',
          },
        });

        return (
          <Flex justify="center" mt={5}>
            <Textarea
              maxW="36rem"
              placeholder="Come on now, don't be shy 🙃"
              h="10em"
              color="white"
              _focus={errored ? { borderColor: 'red' } : undefined}
              bg="dark"
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
