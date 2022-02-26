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
import React, { ReactElement } from 'react';

export const SetupHeader: React.FC = () => {
  const {
    stepIndex,
    onNextPress,
    onBackPress,
    options: { steps, sections },
  } = useSetupFlow();

  const { sectionIndex } = steps[stepIndex];

  const templateColumns = [0, ...sections.map(() => 1), 0].map(
    (col) => `${col}fr`,
  );

  return (
    <Grid templateColumns={templateColumns.join(' ')} gap={[1, 4]} w="full">
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
  title: { [any: string]: string | undefined | ReactElement };
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
        mb={2}
        content={title}
        ml={[0, '3.5em']}
        pr={2}
        sx={{ textIndent: [0, '-1.5em'] }}
        h={4}
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
