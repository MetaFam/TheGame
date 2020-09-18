import { MetaButton, MetaHeading } from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { SetupContext } from 'contexts/SetupContext';
import React, { useContext } from 'react';

export const SetupPersonality: React.FC = () => {
  const { useProgress } = useContext(SetupContext);
  const numProgressSteps = 2;
  const [currentProgress, onNextPress] = useProgress(numProgressSteps);
  return (
    <FlexContainer flex={1}>
      {currentProgress === 0 && (
        <MetaHeading mb={10}>Personality type</MetaHeading>
      )}
      {currentProgress === 1 && <MetaHeading mb={10}>Player type</MetaHeading>}
      <MetaButton onClick={onNextPress}>Next Step</MetaButton>
    </FlexContainer>
  );
};
