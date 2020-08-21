import React, { useState } from 'react';

import { PageContainer } from '../../components/Container';
import { SetupAvatar } from '../../components/SetupAvatar';
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
      {step % 4 !== 3 && <SetupHeader step={step} progress={progress} />}

      {step === 0 && (
        <SetupProfession setStep={setStep} setProgress={setProgress} />
      )}
      {step === 1 && (
        <SetupPersonality setStep={setStep} setProgress={setProgress} />
      )}
      {step === 2 && (
        <SetupAvatar setStep={setStep} setProgress={setProgress} />
      )}
      {step === 3 && <SetupDone />}
    </PageContainer>
  );
};

export default ProfileSetup;
