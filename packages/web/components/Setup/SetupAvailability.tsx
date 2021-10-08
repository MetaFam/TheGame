import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  MetaButton,
  MetaHeading,
  Text,
  useToast,
} from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { useSetupFlow } from 'contexts/SetupContext';
import { useUpdateProfileMutation } from 'graphql/autogen/types';
import { useUser } from 'lib/hooks';
import React, { useEffect, useState } from 'react';

export type SetupAvailabilityProps = {
  availability: string;
  setAvailability: React.Dispatch<React.SetStateAction<string>>;
};

export const SetupAvailability: React.FC<SetupAvailabilityProps> = ({
  availability,
  setAvailability,
}) => {
  const { onNextPress, nextButtonLabel } = useSetupFlow();

  const [invalid, setInvalid] = useState(false);
  const { user } = useUser();
  const toast = useToast();

  useEffect(() => {
    const value = Number(availability);
    setInvalid(value < 0 || value > 168);
  }, [availability]);

  const [updateProfileRes, updateProfile] = useUpdateProfileMutation();
  const [loading, setLoading] = useState(false);

  const handleNextPress = async () => {
    if (!user) return;

    setLoading(true);
    const { error } = await updateProfile({
      playerId: user.id,
      input: {
        availability_hours: Number(availability),
      },
    });

    if (error) {
      toast({
        title: 'Error',
        description: 'Unable to update availability. The octo is sad 😢',
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
      <MetaHeading mb={5} textAlign="center">
        Avail&#xAD;ability
      </MetaHeading>
      <Text mb={10}>
        What is your weekly availability for any kind of freelance work?
      </Text>
      <InputGroup borderColor="transparent" mb={10}>
        <InputLeftElement>
          <span role="img" aria-label="clock">
            🕛
          </span>
        </InputLeftElement>
        <Input
          background="dark"
          placeholder="40"
          type="number"
          value={availability}
          onChange={({ target: { value } }) => setAvailability(value)}
          isInvalid={invalid}
        />
        <InputRightAddon background="purpleBoxDark">hr/week</InputRightAddon>
      </InputGroup>

      <MetaButton
        disabled={!user}
        onClick={handleNextPress}
        mt={10}
        isDisabled={invalid}
        isLoading={updateProfileRes.fetching || loading}
        loadingText="Saving"
      >
        {nextButtonLabel}
      </MetaButton>
    </FlexContainer>
  );
};
