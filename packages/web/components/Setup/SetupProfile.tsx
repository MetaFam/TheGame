import BackgroundImage from 'assets/profile-background.jpg';
import { FlexContainer, PageContainer } from 'components/Container';
import { SetupHeader } from 'components/Setup/SetupHeader';
import { SetupContext } from 'contexts/SetupContext';
import React, { useContext } from 'react';

export const SetupProfile: React.FC = () => {
  const { step, screen, numTotalSteps, options } = useContext(SetupContext);
  return (
    <PageContainer backgroundImage={`url(${BackgroundImage})`}>
      {(step + 1) % numTotalSteps !== 0 && <SetupHeader />}
      <FlexContainer flex={1} pt={24}>
        {options[step].screens[screen].component}
      </FlexContainer>
    </PageContainer>
  );
};
