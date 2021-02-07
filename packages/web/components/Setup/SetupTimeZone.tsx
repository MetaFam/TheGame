import {
  MetaButton,
  MetaHeading,
  SelectTimeZone,
  useToast,
} from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { useSetupFlow } from 'contexts/SetupContext';
import { useUpdateProfileMutation } from 'graphql/autogen/types';
import { useUser } from 'lib/hooks';
import React from 'react';

export type SetupTimezoneProps = {
  timeZone: string;
  setTimeZone: React.Dispatch<React.SetStateAction<string>>;
}

export const SetupTimeZone: React.FC<SetupTimezoneProps> = ({timeZone, setTimeZone}) => {
  const {
    onNextPress,
    nextButtonLabel
  } = useSetupFlow();
  const { user } = useUser({ redirectTo: '/' });
  const toast = useToast();

  const [updateProfileRes, updateProfile] = useUpdateProfileMutation();

  const handleNextPress = async () => {
    if (!user) return;

    const { error } = await updateProfile({
      playerId: user.id,
      input: {
        timezone: timeZone
      }
    });

    if (error) {
      toast({
        title: 'Error',
        description: 'Unable to update time zone. The octo is sad 😢',
        status: 'error',
        isClosable: true,
      });
      return;
    }

    onNextPress();
  };

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
        onClick={handleNextPress} 
        mt={10}
        isLoading={updateProfileRes.fetching}
        loadingText="Saving"
      >
        {nextButtonLabel}
      </MetaButton>
    </FlexContainer>
  );
};
