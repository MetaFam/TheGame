import { Box, Button, ButtonGroup, Text, VStack } from '@metafam/ds';
import { animated, easings, useSpring } from '@react-spring/web';
import OctoBg from 'assets/baby_octo.png';
import { Dispatch, SetStateAction } from 'react';

export const Chiev = ({
  won,
  setWon,
}: {
  won: boolean;
  setWon: Dispatch<SetStateAction<boolean>>;
}) => {
  const calc = (x: any, y: any) => [
    -(y - window.innerHeight / 2) / 20,
    (x - window.innerWidth / 2) / 20,
    1.1,
  ];
  const trans = (x: any, y: any, s: any) =>
    `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})})`;
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  const springProps = useSpring({
    config: {
      tension: 200,
      friction: 10,
      mass: 1,
    },
    // opacity: won ? 1 : 0,
    transform: won ? 'translateY(0)' : 'translateY(-100%)',
    scale: won ? 1 : 0.5,
    display: won ? 'flex' : 'none',
    loop: false,
  });

  const octoSpringProps = useSpring({
    config: {
      tension: 150,
      friction: 10,
      mass: 2,
      delay: 750,
    },
    scale: won ? 1 : 0.7,
    transformOrigin: 'center',
    transform: won
      ? 'translate3d(0, 0, 0) rotate(45deg)'
      : 'translate3d(-100%, 100%, 0) rotate(40deg)',
  });

  return (
    <animated.div
      style={{
        ...springProps,
        position: 'static',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        left: 0,
        top: 0,
        transform: 'translateY(0)',
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 400,
      }}
    >
      <Box
        position="relative"
        display="flex"
        height="50vh"
        width="33vw"
        border="2px solid var(--chakra-colors-landing600)"
        boxShadow="0 0 50px black"
        overflow="hidden"
        borderRadius="2xl"
        pointerEvents="auto"
        fontSize="lg"
        fontFamily="body"
        p={10}
      >
        <VStack
          spacing={8}
          width="full"
          backdropFilter="none"
          zIndex={5}
          sx={{
            button: {
              px: 4,
              py: 2,
              '&:hover': {
                color: 'var(--chakra-colors-landing300)',
                backgroundColor: 'transparent',
              },
            },
          }}
        >
          <Text
            as="h3"
            fontSize="xl"
            fontWeight="black"
            className="gradient-text"
          >
            🎉 You've won the deep burrower Chievmint! 🎉
          </Text>
          <Text className="gradient-text" fontSize="3xl">
            Nice work Anon.
          </Text>
          <Text>Mint your free NFT here...</Text>
          <ButtonGroup spacing={5}>
            <Button
              onClick={() => setWon(false)}
              variant="ghost"
              color={'var(--chakra-colors-landing550)'}
              textShadow="var(--chakra-colors-landing500)"
              size={'xl'}
            >
              Mint
            </Button>
            <Button
              onClick={() => setWon(false)}
              variant="ghost"
              color="diamond"
              size={'xl'}
            >
              Close
            </Button>
          </ButtonGroup>
        </VStack>
        <Box
          position="absolute"
          top="-2.5%"
          left="-2.5%"
          bottom="-2.5%"
          right="-2.5%"
          width="105%"
          height="105%"
          backgroundColor="rgba(0 0 0 / 70%)"
          backdropFilter={`blur(10px)`}
          backgroundClip="border-box"
          dropShadow="0 0 100px 30px black inset"
          zIndex={1}
        />
        <animated.div
          onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
          onMouseLeave={() => set({ xys: [0, 0, 1] })}
          // eslint-disable-next-line no-param-reassign
          onMouseOver={(event) => console.log(props.xys)}
          style={{
            ...octoSpringProps,
            backgroundImage: `url(${OctoBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.5,
            position: 'absolute',
            left: '-12%',
            bottom: '-10%',
            width: '50%',
            height: '50%',
            zIndex: 20,
            pointerEvents: 'auto',
            // transform: props.xys.to(trans)
          }}
        />
        {/* <Box
          position="absolute"
          bottom={{ base: 3, xl: '-10%' }}
          left={'-12%'}
          w="50%"
          h="50%"
          bgImage={OctoBg}
          backgroundSize="cover"
          backgroundPosition="bottom center"
          backgroundRepeat="no-repeat"
          opacity={0.5}
          pointerEvents="none"
          zIndex={4}
          transform="rotate(45deg)"
        /> */}
        <Box
          position="absolute"
          bottom={{ base: 3, xl: '-10%' }}
          left={'-12%'}
          width={'350px'}
          height={'350px'}
          borderRadius="full"
          backgroundColor="var(--chakra-colors-landing200)"
          filter={`blur(100px)`}
          pointerEvents="none"
          zIndex={0}
        />
        <Box
          position="absolute"
          top={{ base: 3, xl: '-10%' }}
          right={'-22%'}
          width={'500px'}
          height={'500px'}
          borderRadius="full"
          backgroundColor="var(--chakra-colors-landing500)"
          filter={`blur(100px)`}
          opacity={0.7}
          pointerEvents="none"
          zIndex={0}
        />
        <Box
          position="absolute"
          top={{ base: 3, xl: '-10%' }}
          left={'-22%'}
          width={'500px'}
          height={'500px'}
          borderRadius="full"
          backgroundColor="rgba(255 255 255 / 1%)"
          opacity={0.7}
          pointerEvents="none"
          zIndex={10}
        />
        <Box
          position="absolute"
          top={{ base: 3, xl: '35%' }}
          right={'5%'}
          width={'50px'}
          height={'50px'}
          borderRadius="full"
          backgroundColor="rgba(255 255 255 / 1%)"
          opacity={0.7}
          pointerEvents="none"
          zIndex={10}
        />
        <Box
          position="absolute"
          top={{ base: 3, xl: '25%' }}
          right={'25%'}
          width={'75px'}
          height={'75px'}
          borderRadius="full"
          backgroundColor="rgba(255 255 255 / 1%)"
          opacity={0.4}
          zIndex={10}
          pointerEvents="none"
        />
      </Box>
    </animated.div>
  );
};

export const AnimatedChiev = animated(Chiev);
