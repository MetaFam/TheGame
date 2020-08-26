import { MetaButton, MetaHeading } from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { SetupSkills } from './SetupSkills';
import { SetupContext } from 'contexts/SetupContext';
import React, { useContext } from 'react';

export const SetupProfession: React.FC = () => {
  const { useProgress } = useContext(SetupContext);
  const numProgressSteps = 3;
  const [currentProgress, onNextPress] = useProgress(numProgressSteps);

  return (
    <FlexContainer flex={1}>
      {currentProgress === 0 && <SetupSkills />}
      {currentProgress === 1 && <MetaHeading mb={10}>Availability</MetaHeading>}
      {currentProgress === 2 && <MetaHeading mb={10}>Memberships</MetaHeading>}
      <MetaButton onClick={onNextPress}>Next Step</MetaButton>
    </FlexContainer>
  );
};
