import { Input, MetaButton, MetaHeading, useToast } from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { useSetupFlow } from 'contexts/SetupContext';
import { useUpdatePlayerUsernameMutation } from 'graphql/autogen/types';
import { useUser } from 'lib/hooks';
import React from 'react';

export type SetupUsernameProps = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

export const SetupUsername: React.FC<SetupUsernameProps> = ({username, setUsername}) => {
  const {
    onNextPress,
    nextButtonLabel
  } = useSetupFlow();
  const { user } = useUser({ redirectTo: '/' });
  const toast = useToast();

  const [updateUsernameRes, updateUsername] = useUpdatePlayerUsernameMutation();

  const handleNextPress = async () => {
    if (!user) return;

    const { error } = await updateUsername({
      playerId: user.id,
      username,
    });

    if (error) {
      let errorDetail = 'The octo is sad 😢';
      if (/uniqueness violation/i.test(error.message)) {
        errorDetail = 'This username is already taken. 😢';
      } else if (error.message.includes('username_is_valid')) {
        errorDetail = 'A username can only contain letters, numbers, and dashes.';
      } else {
        console.warn(error); // eslint-disable-line no-console
      }
      toast({
        title: 'Error',
        description: `Unable to update player's username. ${errorDetail}`,
        status: 'error',
        isClosable: true,
      });
      return;
    }

    onNextPress();
  };

  return (
    <FlexContainer>
      <MetaHeading mb={10} textAlign="center">
        What username would you like?
      </MetaHeading>
      <Input
        background="dark"
        placeholder="USERNAME"
        value={username}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUsername(e.target.value)
        }
      />

      <MetaButton
        onClick={handleNextPress}
        mt={10}
        isLoading={updateUsernameRes.fetching}
        loadingText="Saving"
      >
        {nextButtonLabel}
      </MetaButton>
    </FlexContainer>
  );
};
