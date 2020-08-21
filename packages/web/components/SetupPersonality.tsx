import { MetaButton, MetaHeading } from '@metafam/ds';
import React, { useEffect, useState } from 'react';

import { FlexContainer } from './Container';

interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}

export const SetupPersonality: React.FC<Props> = ({ setStep, setProgress }) => {
  const numProgressSteps = 2;
  const [progressStep, setProgressStep] = useState<number>(0);

  useEffect(() => {
    const progressValue = (progressStep + 1) / numProgressSteps;
    setProgress(progressValue);
  }, [progressStep, setProgress]);

  return (
    <FlexContainer flex={1}>
      {progressStep === 0 && (
        <MetaHeading mb={10}>Personality type</MetaHeading>
      )}
      {progressStep === 1 && <MetaHeading mb={10}>Player type</MetaHeading>}
      <MetaButton
        mb={8}
        onClick={() =>
          setProgressStep(
            (_progressStep) => (_progressStep + 1) % numProgressSteps,
          )
        }
      >
        Progress
      </MetaButton>
      <MetaButton onClick={() => setStep((_step) => (_step + 1) % 4)}>
        Next Step
      </MetaButton>
    </FlexContainer>
  );
};
