import { FlexContainer, PageContainer } from 'components/Container';
import { SetupHeader } from 'components/Setup/SetupHeader';
import { useSetupFlow } from 'contexts/SetupContext';
import React from 'react';

export const SetupProfile: React.FC = ({ children }) => {
  const { options, stepIndex } = useSetupFlow();

  return (
    <PageContainer>
      {options.numSteps - 1 > stepIndex && <SetupHeader />}
      <FlexContainer flex={1} pt={[10, 12]}>
        {children}
      </FlexContainer>
    </PageContainer>
  );
};
