import { Flex, Input, MetaButton, MetaHeading, Text } from '@metafam/ds';
import React, { useState } from 'react';

import { FlexContainer, PageContainer } from '../../components/Container';
import { SetupHeader } from '../../components/SetupHeader';
import BackgroundImage from '../../public/images/profile-background.png';

const ProfileSetup: React.FC = () => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0.33);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, min, max } = event.currentTarget;
    const progressValue =
      Math.max(Number(min), Math.min(Number(max), Number(value))) / Number(max);
    setProgress(progressValue);
  };

  return (
    <PageContainer backgroundImage={`url(${BackgroundImage})`}>
      <SetupHeader step={step} progress={progress} />

      {/* SAMPLE CODE TO TEST PROGRESS/STEPS */}
      {/* * * * * * * STARTS HERE * * * * *  */}
      <FlexContainer flex={1}>
        <MetaHeading mb={10}>What are your superpowers?</MetaHeading>
        <Flex align="center" mb={10}>
          <Text fontFamily="heading" mr={4}>
            Progress:
          </Text>
          <Input
            color="black"
            min={0}
            max={100}
            type="number"
            value={Math.floor(progress * 100)}
            onChange={handleChange}
          />
        </Flex>
        <MetaButton onClick={() => setStep(_step => (_step + 1) % 4)}>
          Next Step
        </MetaButton>
      </FlexContainer>
      {/* * * * * * * * ENDS HERE * * * * *  */}

    </PageContainer>
  );
};

export default ProfileSetup;
