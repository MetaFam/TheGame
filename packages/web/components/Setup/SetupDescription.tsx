import { Flex, Textarea } from '@metafam/ds';
import {
  ProfileWizardContextProvider,
  useProfileContext,
} from 'contexts/ProfileWizardContext';
import { mutationComposeDBCreateProfileDescription } from 'graphql/composeDB/mutations/profile';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import { WizardPane } from './WizardPane';

export const SetupDescription: React.FC = () => (
  <ProfileWizardContextProvider
    query={mutationComposeDBCreateProfileDescription}
    field="description"
  >
    <WizardPane
      title="Bio"
      prompt="This is where you get to tell the world who you are! What interests you? What are you up to these days? What are your goals & aspirations?? Why are you here???"
    >
      <DescriptionField />
    </WizardPane>
  </ProfileWizardContextProvider>
);

const DescriptionField: React.FC = () => {
  const { register } = useFormContext();
  const { errored, field } = useProfileContext();

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
        placeholder="Come on now, don't be shy… 🙃"
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
};
