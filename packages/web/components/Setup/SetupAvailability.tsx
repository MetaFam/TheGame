import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  MetaButton,
  MetaHeading,
  Text,
} from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { useSetupFlow } from 'contexts/SetupContext';
import React, { useEffect, useState } from 'react';

export const SetupAvailability: React.FC = () => {
  const {
    onNextPress,
    nextButtonLabel,
    availability,
    setAvailability,
  } = useSetupFlow();
  const [invalid, setInvalid] = useState(false);
  useEffect(() => {
    const value = Number(availability);
    setInvalid(value < 0 || value > 168);
  }, [availability]);

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

      <MetaButton onClick={onNextPress} mt={10}>
        {nextButtonLabel}
      </MetaButton>
    </FlexContainer>
  );
};
