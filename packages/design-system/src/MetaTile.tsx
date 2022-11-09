import { Flex, FlexProps, StackProps, VStack } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import VanillaTilt from 'vanilla-tilt';

export const MetaTileHeader: React.FC<StackProps> = ({
  children,
  ...props
}) => (
  <VStack
    w="full"
    spacing="6"
    align="stretch"
    position="relative"
    {...props}
    borderTopRadius={10}
    bgColor="rgba(255, 255, 255, 0.2)"
  >
    {children}
  </VStack>
);

export const MetaTileBody: React.FC<StackProps> = ({ children, ...props }) => (
  <VStack
    w="full"
    spacing={3}
    align="stretch"
    position="relative"
    height="full"
    p={3}
    pt={8}
    borderBottomRadius={10}
    bgColor="rgba(255, 255, 255, 0.06)"
    style={{ backdropFilter: 'blur(10px)' }}
    {...props}
  >
    {children}
  </VStack>
);

type MetaTileProps = {
  noTilt?: boolean;
};

export const MetaTile: React.FC<FlexProps & MetaTileProps> = ({
  children,
  ...props
}) => {
  if (typeof window !== 'undefined' && !props.noTilt) {
    const element = document.querySelectorAll('.js-tilt');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    VanillaTilt.init(element);
  }

  return (
    <div
      className={props.noTilt ? '' : 'js-tilt'}
      data-tilt-scale="1.03"
      data-tilt-max="6"
      data-tilt-speed="800"
      data-tilt-easing="cubic-bezier(.03,.98,.52,.99)"
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        borderRadius: '8px',
      }}
    >
      <Flex
        direction="column"
        bg="rgba(255, 255, 255, 0.06)"
        style={{ backdropFilter: 'blur(7px)' }}
        rounded="lg"
        p={6}
        maxW="26rem" // (2 / 3.5) = ~0.571 aspect ratio desired
        w="full"
        h="full"
        align="stretch"
        position="relative"
        // overflow="hidden"
        justify="space-between"
        {...props}
      >
        {children}
      </Flex>
    </div>
  );
};

export const MetaTileLinkWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => (
  <Flex
    align="center"
    justifyContent="center"
    bgColor="rgba(255, 255, 255, 0.06)"
    minW={8}
    h={8}
    borderRadius={8}
  >
    {children}
  </Flex>
);
