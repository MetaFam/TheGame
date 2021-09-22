import { Box, Flex, Grid, ResponsiveText } from '@metafam/ds';
import BackImage from 'assets/Back.svg';
import LogoImage from 'assets/logo.png';
import SkipImage from 'assets/Skip.svg';
import { FlexContainer } from 'components/Container';
import { useSetupFlow } from 'contexts/SetupContext';
import Image from 'next/image';
import React from 'react';

export const SetupHeader: React.FC = () => {
  const { stepIndex, onNextPress, onBackPress, options } = useSetupFlow();

  const { sectionIndex } = options.steps[stepIndex];

  return (
    <Grid templateColumns="0.5fr 1fr 1fr 1fr 0.5fr" gap="1rem" w="100%">
      <FlexContainer justify="flex-end" onClick={onBackPress} cursor="pointer">
        <Image src={BackImage} height={20} width={20} priority alt="Back" />
      </FlexContainer>
      {options.sections.map((option, id) => (
        <SectionProgress
          key={option.label}
          title={option.title}
          isActive={sectionIndex === id}
          isDone={sectionIndex > id}
        />
      ))}
      <FlexContainer justify="flex-end" onClick={onNextPress} cursor="pointer">
        <Image src={SkipImage} height={20} width={20} priority alt="Forward" />
      </FlexContainer>
    </Grid>
  );
};

interface StepProps {
  title: { [any: string]: string | undefined };
  isDone: boolean;
  isActive: boolean;
}

export const SectionProgress: React.FC<StepProps> = ({
  title,
  isDone,
  isActive,
}) => {
  const { options, stepIndex } = useSetupFlow();

  const progress = isDone ? 100 : options.progressWithinSection(stepIndex);
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
        <>
          <Box
            mt={4}
            pos="absolute"
            w="1.5rem"
            h="1.75rem"
            top="100%"
            left={`${progress}%`}
            transform="translateX(-50%)"
          >
            <Image
              layout="fill"
              className="Avatar"
              src={LogoImage}
              priority
              alt="Avatar"
            />
          </Box>
        </>
      )}
    </FlexContainer>
  );
};
