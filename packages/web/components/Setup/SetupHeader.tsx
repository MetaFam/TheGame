import { Box, Flex, Grid, Image, ResponsiveText } from '@metafam/ds';
import AvatarImage from 'assets/avatar.png';
import BackImage from 'assets/Back.svg';
import SkipImage from 'assets/Skip.svg';
import { FlexContainer } from 'components/Container';
import { useSetupFlow } from 'contexts/SetupContext';
import React from 'react';

export const SetupHeader: React.FC = () => {
  const { step, screen, onNextPress, onBackPress, options } = useSetupFlow();
  return (
    <Grid templateColumns="0.5fr 1fr 1fr 1fr 0.5fr" gap="1rem" w="100%">
      <FlexContainer justify="flex-end" onClick={onBackPress} cursor="pointer">
        <Image src={BackImage} h="1rem" alt="Back" />
      </FlexContainer>
      {options.map((option, id) => (
        <StepProgress
          key={option.label}
          title={option.title}
          step={id}
          isActive={step === id}
          isDone={step > id}
          screen={screen}
        />
      ))}
      <FlexContainer justify="flex-end" onClick={onNextPress} cursor="pointer">
        <Image src={SkipImage} h="1rem" alt="Forward" />
      </FlexContainer>
    </Grid>
  );
};

interface StepProps {
  title: { [any: string]: string | undefined };
  isDone: boolean;
  isActive: boolean;
  step: number;
  screen: number;
}

export const StepProgress: React.FC<StepProps> = ({
  title,
  isDone,
  isActive,
  step,
  screen,
}) => {
  const { options } = useSetupFlow();

  const progress = isDone
    ? 100
    : Math.floor(((screen + 1) * 100.0) / options[step].screens.length);
  return (
    <FlexContainer pos="relative">
      <ResponsiveText
        w="100%"
        textTransform="uppercase"
        fontSize="xs"
        fontFamily="mono"
        fontWeight="bold"
        color="offwhite"
        opacity={isActive ? 1 : 0.4}
        mb={4}
        content={title}
      />
      <Flex
        bgColor="blue20"
        w="100%"
        h="0.5rem"
        borderRadius="0.25rem"
        overflow="hidden"
      >
        {(isActive || isDone) && (
          <Box bgColor="purple.400" w={`${progress}%`} />
        )}
      </Flex>
      {isActive && (
        <Image
          mt={4}
          pos="absolute"
          w="1.5rem"
          top="100%"
          src={AvatarImage}
          left={`${progress}%`}
          transform="translateX(-50%)"
          alt="Avatar"
        />
      )}
    </FlexContainer>
  );
};
