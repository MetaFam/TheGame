import { Input, MetaButton, MetaHeading, useToast } from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { useSetupFlow } from 'contexts/SetupContext';
import { useUpdatePlayerUsernameMutation } from 'graphql/autogen/types';
import { useUser } from 'lib/hooks';
import React, { useState } from 'react';

export type SetupUsernameProps = {
  username: string | undefined;
  setUsername: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const SetupUsername: React.FC<SetupUsernameProps> = ({
  username,
  setUsername,
}) => {
  const { onNextPress, nextButtonLabel } = useSetupFlow();
  const { user } = useUser({ redirectTo: '/' });
  const toast = useToast();

  const [updateUsernameRes, updateUsername] = useUpdatePlayerUsernameMutation();
  const [loading, setLoading] = useState(false);

  const handleNextPress = async () => {
    if (!user) return;

    setLoading(true);
    const { error } = await updateUsername({
      playerId: user.id,
      username: username ?? '',
    });

    if (error) {
      let errorDetail = 'The octo is sad 😢';
      if (error.message.includes('Uniqueness violation')) {
        errorDetail = 'This username is already taken 😢';
      } else if (error.message.includes('username_is_valid')) {
        errorDetail =
          'A username can only contain lowercase letters, numbers, and dashes.';
      }
      toast({
        title: 'Error',
        description: `Unable to update Player Username. ${errorDetail}`,
        status: 'error',
        isClosable: true,
      });
      setLoading(false);
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
        value={username ?? ''}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUsername(e.target.value)
        }
        w="auto"
      />

      <MetaButton
        onClick={handleNextPress}
        mt={10}
        isLoading={updateUsernameRes.fetching || loading}
        loadingText="Saving"
      >
        {nextButtonLabel}
      </MetaButton>
    </FlexContainer>
  );
};
