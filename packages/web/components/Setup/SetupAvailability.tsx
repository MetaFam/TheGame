import { MetaButton, MetaHeading } from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { SetupContext } from 'contexts/SetupContext';
import React, { useContext } from 'react';

export const SetupAvailability: React.FC = () => {
  const { onNextPress } = useContext(SetupContext);
  return (
    <FlexContainer>
      <MetaHeading mb={10} textAlign="center">
        Availability
      </MetaHeading>
      <MetaButton onClick={onNextPress} mt={10} w="auto">
        Next Step
      </MetaButton>
    </FlexContainer>
  );
};
