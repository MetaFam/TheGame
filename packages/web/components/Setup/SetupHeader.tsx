import {
  Box, Flex, Grid, Image, ResponsiveText, Text, TextProps
} from '@metafam/ds';
import LogoImage from 'assets/logo.png';
import { FlexContainer } from 'components/Container';
import { useSetupFlow } from 'contexts/SetupContext';
import React from 'react';

export const SetupHeader: React.FC = () => {
  const {
    stepIndex, options,
    onNextPress, onBackPress,
    onStartPress, onEndPress,
  } = useSetupFlow();
  const { sectionIndex } = options.steps[stepIndex];

  const Nav = (
    { children, ...props }: TextProps
  ) => (
    <Text
      fontFamily="'Press Start 2P'" fontSize={30}
      cursor="pointer"
      {...props}
    >
      {children}
    </Text>
  )

  return (
    <Grid
      templateColumns={[
        '[left] 1fr [center] 1fr [right] 1fr',
        '[left] 0.25fr [center] 1fr [right] 0.25fr',
      ]}
      gap="0.75rem" w="100%"
    >
      <FlexContainer
        gridColumnStart="left"
        gridRow={1}
        direction="row"
        justify="space-around"
      >
        <Nav onClick={onStartPress}>«</Nav>
        <Nav onClick={onBackPress}>&lt;</Nav>
      </FlexContainer>
      <FlexContainer
        gridColumn={['left / span 3', 'center']}
        gridRow={[2, 1]}
        direction="row"
        w='100%'
      >
        {options.sections.map((option, id) => (
          <SectionProgress
            key={option.label}
            title={option.title}
            isActive={sectionIndex === id}
            isDone={sectionIndex > id}
          />
        ))}
      </FlexContainer>
      <FlexContainer
        gridColumnStart="right"
        gridRow={1}
        justify="space-around"
        direction="row"
      >
        <Nav onClick={onNextPress}>&gt;</Nav>
        <Nav onClick={onEndPress}>»</Nav>
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
  const progress = (
    isDone ? 100 : options.progressWithinSection(stepIndex)
  );

  return (
    <FlexContainer pos="relative" grow={1} mr={3}>
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
          src={LogoImage}
          left={`${progress}%`}
          transform="translateX(-50%)"
          alt="Avatar"
        />
      )}
    </FlexContainer>
  );
};
