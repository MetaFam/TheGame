import { MetaButton, MetaHeading } from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { Edit } from 'components/Setup/3BoxProfileEdit/Edit';
import { SetupContext } from 'contexts/SetupContext';
import React, { useContext } from 'react';

export const Setup3Box: React.FC = () => {
  const { onNextPress, nextButtonLabel } = useContext(SetupContext);

  return (
    <FlexContainer>
      <MetaHeading mb={5} textAlign="center">
        3Box Profile
      </MetaHeading>
      <Edit />
      <MetaButton onClick={onNextPress} mt={10}>
        {nextButtonLabel}
      </MetaButton>
    </FlexContainer>
  );
};
