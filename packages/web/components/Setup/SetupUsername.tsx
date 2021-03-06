import { Input, MetaButton, MetaHeading, useToast } from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { useSetupFlow } from 'contexts/SetupContext';
import { useUpdatePlayerUsernameMutation } from 'graphql/autogen/types';
import { useUser } from 'lib/hooks';
import React, { useEffect, useState } from 'react';

const USERNAME_REGEX = /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){2,18}[a-zA-Z0-9]$/;

export type SetupUsernameProps = {
  username: string | undefined;
  setUsername: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const SetupUsername: React.FC<SetupUsernameProps> = (
  ({ username = '', setUsername }) => {
    const { onNextPress, nextButtonLabel } = useSetupFlow();
    const [invalid, setInvalid] = useState(false);
    const { user } = useUser({ redirectTo: '/' });
    const toast = useToast();

    useEffect(() => {
      setInvalid(!USERNAME_REGEX.test(username));
    }, [username]);

    const [updateUsernameRes, updateUsername] = (
      useUpdatePlayerUsernameMutation()
    );

    const handleNextPress = async () => {
      if (!user) return;

      const { error } = await updateUsername({
        playerId: user.id,
        username,
      });

      if (error) {
        let errorDescription = 'The octo is sad. 😢';
        if (/uniqueness violation/i.test(error.message)) {
          errorDescription = 'Username already taken.';
        } else {
          console.warn(error); // eslint-disable-line no-console
        }
        toast({
          title: 'Error',
          description: (
            `Unable to update player's username. ${errorDescription}`
          ),
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
          onKeyDown={e => e.key === 'Enter' && handleNextPress()}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUsername(e.target.value)
          }}
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
  }
);
