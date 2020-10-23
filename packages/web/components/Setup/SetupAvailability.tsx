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
import { useUpdatePlayerSkillsMutation } from 'graphql/autogen/types';
import { useUser } from 'lib/hooks';
import React, { useEffect, useState } from 'react';

export const SetupAvailability: React.FC = () => {
  const {
    onNextPress,
    nextButtonLabel,
    availability,
    setAvailability,
    skills,
  } = useSetupFlow();
  const [invalid, setInvalid] = useState(false);
  const { user } = useUser({ redirectTo: '/' });
  const toast = useToast();

  useEffect(() => {
    const value = Number(availability);
    setInvalid(value < 0 || value > 168);
  }, [availability]);

  const [updateSkillsRes, updateSkills] = useUpdatePlayerSkillsMutation();

  const handleNextPress = async () => {
    if (!user) return;

    const { error } = await updateSkills({
      availability_hours: Number(availability),
      skills: skills.map((s) => ({ skill_id: s.id })),
    });

    if (error) {
      console.warn(error);
      toast({
        title: 'Error',
        description: 'Unable to update Player Skills. The octo is sad 😢',
        status: 'error',
        isClosable: true,
      });
      return;
    }

    onNextPress();
  };

  return (
    <FlexContainer>
      <MetaHeading mb={5} textAlign="center">
        Availability
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAvailability(e.target.value)
          }
          isInvalid={invalid}
        />
        <InputRightAddon background="purpleBoxDark">hr/week</InputRightAddon>
      </InputGroup>

      <MetaButton
        onClick={handleNextPress}
        mt={10}
        isDisabled={!availability}
        isLoading={updateSkillsRes.fetching}
        loadingText="Saving"
      >
        {nextButtonLabel}
      </MetaButton>
    </FlexContainer>
  );
};
