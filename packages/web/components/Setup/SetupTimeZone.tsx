import { MetaButton, MetaHeading, SelectTimeZone, useToast } from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { useSetupFlow } from 'contexts/SetupContext';
import { useUpdateProfileMutation } from 'graphql/autogen/types';
import { useUser } from 'lib/hooks';
import React, { useEffect, useState } from 'react';

export type SetupTimezoneProps = {
  timeZone: string;
  setTimeZone: React.Dispatch<React.SetStateAction<string>>;
};

export const SetupTimeZone: React.FC<SetupTimezoneProps> = ({
  timeZone,
  setTimeZone,
}) => {
  const { onNextPress, nextButtonLabel } = useSetupFlow();
  const { user } = useUser();
  const toast = useToast();

  const [updateProfileRes, updateProfile] = useUpdateProfileMutation();
  const [loading, setLoading] = useState(false);

  const handleNextPress = async () => {
    if (!user) return;

    setLoading(true);
    const { error } = await updateProfile({
      playerId: user.id,
      input: {
        timezone: timeZone,
      },
    });

    if (error) {
      toast({
        title: 'Error',
        description: 'Unable to update time zone. The octo is sad 😢',
        status: 'error',
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    onNextPress();
  };

  const [isComponentMounted, setIsComponentMounted] = useState(false);

  useEffect(() => setIsComponentMounted(true), []);

  if (!isComponentMounted) {
    return null;
  }

  return (
    <FlexContainer>
      <MetaHeading mb={10} mt={-64} textAlign="center">
        Which time zone are you in?
      </MetaHeading>
      <FlexContainer w="100%" align="stretch" maxW="30rem">
        <SelectTimeZone
          value={timeZone}
          onChange={(tz) => setTimeZone(tz.value)}
          labelStyle="abbrev"
        />
      </FlexContainer>
      <MetaButton
        disabled={!user}
        onClick={handleNextPress}
        mt={10}
        isLoading={updateProfileRes.fetching || loading}
        loadingText="Saving"
      >
        {nextButtonLabel}
      </MetaButton>
    </FlexContainer>
  );
};
