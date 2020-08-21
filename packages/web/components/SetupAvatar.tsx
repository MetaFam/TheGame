import { MetaButton, MetaHeading } from '@metafam/ds';
import React, { useEffect } from 'react';

import { FlexContainer } from './Container';

interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}

export const SetupAvatar: React.FC<Props> = ({ setStep, setProgress }) => {
  useEffect(() => {
    setProgress(1);
  }, [setProgress]);

  return (
    <FlexContainer flex={1}>
      <MetaHeading mb={10}>Dress up your Avatar</MetaHeading>
      <MetaButton onClick={() => setStep((_step) => (_step + 1) % 4)}>
        Next Step
      </MetaButton>
    </FlexContainer>
  );
};
