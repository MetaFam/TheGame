import { Input, MetaButton, MetaHeading, useToast } from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { useSetupFlow } from 'contexts/SetupContext';
import { useUpdatePlayerUsernameMutation } from 'graphql/autogen/types';
import { useUser } from 'lib/hooks';
import React, { useEffect, useState } from 'react';

const USERNAME_REGEX = /^[a-z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-z0-9]){2,18}[a-z0-9]$/;

export type SetupUsernameProps = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

export const SetupUsername: React.FC<SetupUsernameProps> = ({username, setUsername}) => {
  const {
    onNextPress,
    nextButtonLabel
  } = useSetupFlow();
  const [invalid, setInvalid] = useState(false);
  const { user } = useUser({ redirectTo: '/' });
  const toast = useToast();

  useEffect(() => {
    setInvalid(!USERNAME_REGEX.test(username));
  }, [username]);

  const [updateUsernameRes, updateUsername] = useUpdatePlayerUsernameMutation();

  const handleNextPress = async () => {
    if (!user) return;

    const { error } = await updateUsername({
      username,
    });

    if (error) {
      // eslint-disable-next-line no-console
      console.warn(error);
      const errorDescription = error.message.includes('Uniqueness violation')
        ? 'Username already taken 😢'
        : 'The octo is sad 😢';
      toast({
        title: 'Error',
        description: `Unable to update Player Username. ${errorDescription}`,
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
        isInvalid={invalid}
      />

      <MetaButton
        onClick={handleNextPress}
        mt={10}
        isDisabled={invalid}
        isLoading={updateUsernameRes.fetching}
        loadingText="Saving"
      >
        {nextButtonLabel}
      </MetaButton>
    </FlexContainer>
  );
};
