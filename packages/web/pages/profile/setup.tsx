import React, { useState } from 'react';

import { PageContainer } from '../../components/Container';
import { SetupDone } from '../../components/SetupDone';
import { SetupHeader } from '../../components/SetupHeader';
import { SetupPersonality } from '../../components/SetupPersonality';
import { SetupProfession } from '../../components/SetupProfession';
import BackgroundImage from '../../public/images/profile-background.jpg';

const ProfileSetup: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0.33);

  return (
    <PageContainer backgroundImage={`url(${BackgroundImage})`}>
      {step % 3 !== 2 && <SetupHeader step={step} progress={progress} />}

      {step === 0 && (
        <SetupPersonality setStep={setStep} setProgress={setProgress} />
      )}
      {step === 1 && (
        <SetupProfession setStep={setStep} setProgress={setProgress} />
      )}
      {step === 2 && <SetupDone />}
    </PageContainer>
  );
};

export default ProfileSetup;
