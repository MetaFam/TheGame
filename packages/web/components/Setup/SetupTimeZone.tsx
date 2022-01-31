import { MetaButton, MetaHeading, SelectTimeZone, useToast } from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { useSetupFlow } from 'contexts/SetupContext';
import { useUpdateProfileMutation } from 'graphql/autogen/types';
import { useMounted, useUser } from 'lib/hooks';
import React, { useEffect, useState } from 'react';

export const SetupTimeZone: React.FC = () => {
  const { onNextPress, nextButtonLabel } = useSetupFlow();
  const [timeZone, setTimeZone] = useState<string>('');
  const { user } = useUser();
  const toast = useToast();
  const mounted = useMounted();

  const [updateProfileRes, updateProfile] = useUpdateProfileMutation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.profile?.timeZone && !timeZone) {
        setTimeZone(user.profile.timeZone);
      }
    }
  }, [user, timeZone]);

  const handleNextPress = async () => {
    if (!user) return;

    setLoading(true);
    const { error } = await updateProfile({
      playerId: user.id,
      input: { timeZone },
    });

    if (error) {
      toast({
        title: 'Error',
        description: `Unable to update your time zone: ${error.message}`,
        status: 'error',
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    onNextPress();
  };

  if (!mounted) return null;

  return (
    <FlexContainer>
      <MetaHeading mb={10} mt={-64} textAlign="center">
        Which time zone are you in?
      </MetaHeading>
      <FlexContainer w="100%" align="stretch" maxW="30rem">
        <SelectTimeZone
          value={timeZone ?? ''}
          onChange={(tz) => setTimeZone(tz.value)}
          labelStyle="abbrev"
        />
      </FlexContainer>
      <MetaButton
        disabled={!user}
        onClick={handleNextPress}
        mt={10}
        isLoading={updateProfileRes.fetching || loading}
        loadingText="Saving…"
      >
        {nextButtonLabel}
      </MetaButton>
    </FlexContainer>
  );
};
