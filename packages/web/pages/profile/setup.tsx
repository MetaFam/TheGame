import { PageContainer } from 'components/Container';
import { SetupDone } from 'components/Setup/SetupDone';
import { SetupHeader } from 'components/Setup/SetupHeader';
import { SetupPersonality } from 'components/Setup/SetupPersonality';
import { SetupProfession } from 'components/Setup/SetupProfession';
import { SetupContext, SetupContextProvider } from 'contexts/SetupContext';
import BackgroundImage from 'public/images/profile-background.jpg';
import React, { useContext } from 'react';

export const getStaticProps = async () => {
  return {
    props: {
      hidePageHeader: true,
    },
  };
};

const ProfileSetup: React.FC = () => {
  const { step, numTotalSteps } = useContext(SetupContext);
  return (
    <PageContainer backgroundImage={`url(${BackgroundImage})`}>
      {(step + 1) % numTotalSteps !== 0 && <SetupHeader />}
      {step === 0 && <SetupPersonality />}
      {step === 1 && <SetupProfession />}
      {step === 2 && <SetupDone />}
    </PageContainer>
  );
};

const ProfileSetupWithContext: React.FC = () => (
  <SetupContextProvider>
    <ProfileSetup />
  </SetupContextProvider>
);

export default ProfileSetupWithContext;
