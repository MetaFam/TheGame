import { FlexContainer, PageContainer } from 'components/Container';
import { SetupHeader } from 'components/Setup/SetupHeader';
import { useSetupFlow } from 'contexts/SetupContext';
import React from 'react';

export const SetupProfile: React.FC = ({children}) => {
  const {
    step,
    numTotalSteps
  } = useSetupFlow();

  return (
    <PageContainer>
      {(step + 1) % numTotalSteps !== 0 && <SetupHeader />}
      <FlexContainer flex={1} pt={24}>
        {children}
      </FlexContainer>
    </PageContainer>
  );
};
