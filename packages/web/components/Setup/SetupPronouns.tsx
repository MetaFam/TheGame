import { Input, MetaButton, MetaHeading, useToast } from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { useSetupFlow } from 'contexts/SetupContext';
import { useUpdateProfilePronounsMutation } from 'graphql/autogen/types';
import { useUser } from 'lib/hooks';
import React, { useState } from 'react';

export type SetupPronounsProps = {
  pronouns: string | undefined;
  setPronouns: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const SetupPronouns: React.FC<SetupPronounsProps> = ({
  pronouns,
  setPronouns,
}) => {
  const { onNextPress, nextButtonLabel } = useSetupFlow();
  const { user } = useUser();
  const toast = useToast();

  const [
    updatePronounsRes,
    updatePronouns,
  ] = useUpdateProfilePronounsMutation();
  const [loading, setLoading] = useState(false);

  const handleNextPress = async () => {
    if (!user) return;

    setLoading(true);
    const { error } = await updatePronouns({
      playerId: user.id,
      input: {
        pronouns: pronouns ?? '',
      },
    });

    if (error) {
      toast({
        title: 'Error',
        description: `Unable to update Player Pronouns. ${error.message}`,
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
        What pronouns do you prefer?
      </MetaHeading>
      <Input
        background="dark"
        placeholder="they/them"
        value={pronouns}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPronouns(e.target.value)
        }
        w="auto"
      />

      <MetaButton
        onClick={handleNextPress}
        mt={10}
        isLoading={updatePronounsRes.fetching || loading}
        loadingText="Saving"
      >
        {nextButtonLabel}
      </MetaButton>
    </FlexContainer>
  );
};
