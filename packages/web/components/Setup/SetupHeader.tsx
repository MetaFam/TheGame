import {
  Box,
  BoxedNextImage,
  Flex,
  Grid,
  ResponsiveText,
  Text,
} from '@metafam/ds';
import LogoImage from 'assets/logo.png';
import { FlexContainer } from 'components/Container';
import { useSetupFlow } from 'contexts/SetupContext';
import React from 'react';

export const SetupHeader: React.FC = () => {
  const {
    stepIndex,
    onNextPress,
    onBackPress,
    options: { steps, sections },
  } = useSetupFlow();

  const { sectionIndex } = steps[stepIndex];

  const templateColumns = [0.5, ...sections.map(() => 1), 0.5].map(
    (col) => `${col}fr`,
  );

  return (
    <Grid templateColumns={templateColumns.join(' ')} gap="1rem" w="100%">
      <FlexContainer justify="flex-end" onClick={onBackPress} cursor="pointer">
        <Text fontSize={25} fontFamily="heading">
          &lt;
        </Text>
      </FlexContainer>
      {sections.map(({ label, title }, id) => (
        <SectionProgress
          key={label}
          {...{ title }}
          isActive={sectionIndex === id}
          isDone={sectionIndex > id}
        />
      ))}
      <FlexContainer justify="flex-end" onClick={onNextPress} cursor="pointer">
        <Text fontSize={25} fontFamily="heading">
          &gt;
        </Text>
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
        fontWeight="bold"
        color="offwhite"
        opacity={isActive ? 1 : 0.4}
        mb={4}
        content={title}
      />
      <Flex bgColor="blue20" w="full" h={2} borderRadius="sm" overflow="hidden">
        {(isActive || isDone) && (
          <Box bgColor="purple.400" w={`${progress}%`} />
        )}
      </Flex>
      {isActive && (
        <BoxedNextImage
          pos="absolute"
          mt={24}
          w={[4, 6]}
          h={[5, 7]}
          src={LogoImage}
          left={`${progress}%`}
          transform="translateX(-50%)"
          alt="˅"
        />
      )}
    </FlexContainer>
  );
};
