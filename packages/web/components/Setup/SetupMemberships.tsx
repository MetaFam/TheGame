import { MetaButton, MetaHeading } from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { SetupContext } from 'contexts/SetupContext';
import React, { useContext } from 'react';

export const SetupMemberships: React.FC = () => {
  const { onNextPress } = useContext(SetupContext);
  return (
    <FlexContainer>
      <MetaHeading mb={10} textAlign="center">
        Memberships
      </MetaHeading>
      <MetaButton onClick={onNextPress} mt={10}>
        Next Step
      </MetaButton>
    </FlexContainer>
  );
};
