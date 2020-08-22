import React, { useContext } from 'react';

import { PageContainer } from '../../components/Container';
import { SetupDone } from '../../components/SetupDone';
import { SetupHeader } from '../../components/SetupHeader';
import { SetupPersonality } from '../../components/SetupPersonality';
import { SetupProfession } from '../../components/SetupProfession';
import {
  SetupContext,
  SetupContextProvider,
} from '../../contexts/SetupContext';
import BackgroundImage from '../../public/images/profile-background.jpg';

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
