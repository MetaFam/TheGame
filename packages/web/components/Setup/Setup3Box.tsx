import { MetaButton, MetaHeading, Text } from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { SetupContext } from 'contexts/SetupContext';
import React, { useContext } from 'react';

export const Setup3Box: React.FC = () => {
  const { onNextPress, nextButtonLabel } = useContext(SetupContext);
  return (
    <FlexContainer>
      <MetaHeading mb={5} textAlign="center">
        3Box Profile
      </MetaHeading>
      <Text mb={10}>3Box Profile Edit</Text>

      <MetaButton onClick={onNextPress} mt={10}>
        {nextButtonLabel}
      </MetaButton>
    </FlexContainer>
  );
};
