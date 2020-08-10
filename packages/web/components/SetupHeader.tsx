import { Box, Flex, Grid, Image, Text } from '@metafam/ds';
import React from 'react';

import AvatarImage from '../public/images/avatar.png';
import BackImage from '../public/images/Back.svg';
import SkipImage from '../public/images/Skip.svg';
import { FlexContainer } from './Container';

interface HeaderProps {
  step: number;
  progress: number;
}

export const SetupHeader: React.FC<HeaderProps> = ({ step, progress }) => (
  <Grid templateColumns="0.5fr 1fr 1fr 1fr 1fr 0.5fr" gap="1rem" w="100%">
    <FlexContainer justify="flex-end">
      <Image src={BackImage} h="1rem" />
    </FlexContainer>
    <StepProgress
      title="1. Professional Profile"
      isActive={step === 0}
      progress={progress}
    />
    <StepProgress
      title="2. About You"
      isActive={step === 1}
      progress={progress}
    />
    <StepProgress
      title="3. Choose Your Avatar"
      isActive={step === 2}
      progress={progress}
    />
    <StepProgress
      title="4. Start Playing"
      isActive={step === 3}
      progress={progress}
    />
    <FlexContainer justify="flex-end">
      <Image src={SkipImage} h="1rem" />
    </FlexContainer>
  </Grid>
);

interface StepProps {
  title: string;
  isActive: boolean;
  progress: number;
}

export const StepProgress: React.FC<StepProps> = ({
  title,
  isActive,
  progress,
}) => (
  <FlexContainer pos="relative">
    <Text
      w="100%"
      textTransform="uppercase"
      fontSize="xs"
      fontFamily="mono"
      fontWeight="bold"
      color="offwhite"
      opacity={isActive ? 1 : 0.4}
      mb={4}
    >
      {title}
    </Text>
    <Flex
      bgColor="blue02"
      w="100%"
      h="0.5rem"
      borderRadius="0.25rem"
      overflow="hidden"
    >
      {isActive && <Box bgColor="purple.400" w={`${progress * 100}%`} />}
    </Flex>
    {isActive && (
      <Image
        mt={4}
        pos="absolute"
        w="1.5rem"
        top="100%"
        src={AvatarImage}
        left={`${progress * 100}%`}
        transform="translateX(-50%)"
      />
    )}
  </FlexContainer>
);
