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
  available: number | null;
  setAvailability: React.Dispatch<React.SetStateAction<number | null>>;
};

export const SetupAvailability: React.FC<SetupAvailabilityProps> = ({
  available,
  setAvailability,
}) => {
  const { onNextPress, nextButtonLabel } = useSetupFlow();

  const [invalid, setInvalid] = useState(false);
  const { user } = useUser();
  const toast = useToast();

  useEffect(() => {
    const value = Number(available);
    setInvalid(value < 0 || value > 24 * 7);
  }, [available]);

  const [updateProfileRes, updateProfile] = useUpdateProfileMutation();
  const [loading, setLoading] = useState(false);

  const handleNextPress = async () => {
    if (!user) return;
    setLoading(true);

    const { error } = await updateProfile({
      playerId: user.id,
      input: {
        availableHours: Number(available),
      },
    });

    if (error) {
      toast({
        title: 'Error',
        description: `Unable to update availability: "${error}"`,
        status: 'error',
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    onNextPress();
  };

  return (
    <FlexContainer mb={8}>
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
          value={available ?? undefined}
          onChange={({ target: { value } }) => {
            setAvailability(parseFloat(value));
          }}
          isInvalid={invalid}
        />
        <InputRightAddon background="purpleBoxDark">hr ⁄ week</InputRightAddon>
      </InputGroup>

      <MetaButton
        disabled={!user}
        onClick={handleNextPress}
        mt={10}
        isDisabled={invalid}
        isLoading={updateProfileRes.fetching || loading}
        loadingText="Saving…"
      >
        {nextButtonLabel}
      </MetaButton>
    </FlexContainer>
  );
};
