import { MetaButton, MetaHeading } from '@metafam/ds';
import React, { useEffect, useState } from 'react';

import { FlexContainer } from './Container';

interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}

export const SetupProfession: React.FC<Props> = ({ setStep, setProgress }) => {
  const numProgressSteps = 3;
  const [progressStep, setProgressStep] = useState<number>(0);

  useEffect(() => {
    const progressValue = (progressStep + 1) / numProgressSteps;
    setProgress(progressValue);
  }, [progressStep, setProgress]);

  return (
    <FlexContainer flex={1}>
      {progressStep === 0 && (
        <MetaHeading mb={10}>What are your superpowers?</MetaHeading>
      )}
      {progressStep === 1 && <MetaHeading mb={10}>Availability</MetaHeading>}
      {progressStep === 2 && <MetaHeading mb={10}>Memberships</MetaHeading>}
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
