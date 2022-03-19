import {
  Box,
  Button,
  ChevronDownIcon,
  Container,
  Heading,
  Stack,
  Text,
} from '@metafam/ds';
import BackgroundImage from 'assets/landing/sections/section-1.jpg';
import { FullPageContainer } from 'components/Container';
import { useEffect, useState } from 'react';

export const Intro: React.FC<{ currentSection: number }> = ({
  currentSection,
}) => {
  // const router = useRouter();
  const [onScreen, setOnScreen] = useState(false);
  const [showQuote, setShowQuote] = useState(false);

  // const handleSectionNav = useCallback(
  //   (sectionId: string) => {
  //     router.push(`#${sectionId}`);
  //   },
  //   [router],
  // );

  const handleScrollHover = () => {
    setShowQuote(!showQuote);
    return null;
  };

  useEffect(() => {
    setTimeout(() => setOnScreen(currentSection === 0), 500);
  }, [currentSection]);

  return (
    <FullPageContainer
      id="start"
      bgImageUrl={BackgroundImage}
      backgroundPosition="top"
      // backgroundSize="cover"
      // backgroundBlendMode="screen"
      // mixBlendMode="screen"
      spacing={{ base: 8, xl: 20 }}
      justify="flex-end"
      sx={
        {
          // '&::after': {
          //   content: '""',
          //   display: 'block',
          //   position: 'absolute',
          //   top: 0,
          //   left: 0,
          //   pointerEvents: 'none',
          //   width: '100vw',
          //   height: '100vh',
          //   bgImageUrl: BackgroundImage,
          //   mixBlendMode: 'screen',
          //   zIndex: 2
          // },
          // '&::before': {
          //   content: '""',
          //   display: 'block',
          //   position: 'absolute',
          //   top: 0,
          //   left: 0,
          //   pointerEvents: 'none',
          //   width: '100vw',
          //   height: '100vh',
          //   background: 'linear-gradient(178.93deg, rgba(40, 6, 63, 0) 0.91%, #C4C4C4 22.38%, rgba(196, 196, 196, 0) 92.51%)',
          //    backgroundBlendMode: 'screen',
          //   zIndex: 2
          // }
        }
      }
    >
      <Container
        d="flex"
        maxW={{ base: '100%', xl: '7xl', '2xl': 'full' }}
        height="100%"
        alignItems="flex-start"
        justifyContent="center"
        pt={{ base: 0, xl: 14 }}
      >
        <Stack
          pos="relative"
          align="flex-start"
          justify="center"
          spacing={0}
          pb={10}
          direction={{ base: 'column', lg: 'column' }}
          maxW={{ base: 'full', xl: '2xl' }}
          zIndex={100}
          transform={`translate3d(0, ${onScreen ? 0 : '3rem'}, 0)`}
          opacity={onScreen ? 1 : 0}
          transition="transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in"
        >
          <Heading
            as="h1"
            fontFamily="landingHeading"
            textTransform="uppercase"
            className="gradient"
            fontSize={{ base: 'md', lg: 'lg' }}
            fontWeight={100}
            my={0}
            textAlign="center"
            sx={{
              strong: {
                fontWeight: 300,
              },
            }}
          >
            <Text as="strong">A</Text> Massive{' '}
            <Text as="strong">Online Coordination</Text> Game
          </Heading>
        </Stack>
        <ScrollLink showQuote={showQuote} />
        <QuoteLayer
          quote="You never change things by fighting the existing reality. To change something, build a new model that  makes the existing model obsolete."
          attr="Buckminster Fuller"
          showQuote={showQuote}
          handleScrollHover={handleScrollHover}
        />
      </Container>
      {/* <ThreeCanvas /> */}
    </FullPageContainer>
  );
};

// function Points() {
//   const particleTexture = useLoader(THREE.TextureLoader, ParticleTexture);
//   const count = 100
//   const sep = 3

//   // let positions = useMemo(() => {
//   //   let pos = []

//   //   for (let xi = 0; xi < count; xi++) {
//   //     for (let zi = 0; zi < count; zi++) {
//   //       let x = sep * (xi - (count / 2))
//   //       let z = sep * (zi - (count / 2))
//   //       let y = 0
//   //     }
//   //   }
//   //   return new Float32Array(positions)
//   // })

//   return (
//     <points>
//       <bufferGeometry attach="geometry">
//         {/* <bufferAttribute
//           attachObject={['attributes', 'position']}
//           array={positions}
//           count={positions.length / 3}
//           itemSize={3}
//         /> */}
//       </bufferGeometry>
//       <pointsMaterial
//         attach="material"
//         map={particleTexture}
//         color="0x00aaff"
//         size={0.5}
//         sizeAttenuation
//         transparent={false}
//         alphaTest={0.5}
//         opacity={1}
//       />
//     </points>
//   )
// }

// export const ThreeCanvas = () => (
//   <Canvas
//     colorManagement={false}
//     camera={{ position: [100, 10, 0], fov: 75 }}
//   >
//     <Points />
//   </Canvas>
// )

export const ScrollLink = ({ showQuote }: { showQuote: boolean }) => (
  <Box
    fontFamily="landingHeading"
    position="absolute"
    bottom={0}
    width="100%"
    textAlign="center"
    fontWeight={100}
    sx={{
      transition: 'all 0.3s 0.1s ease-in-out',
      transform: `translate3d(0, ${showQuote ? -200 : 0}px, 0)`,
      opacity: showQuote ? 0.3 : 1,
    }}
  >
    <Box
      d="flex"
      flexFlow="column wrap"
      sx={{
        button: {
          border: `1px solid ${'white'}`,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '35px',
          height: '35px',
          maxW: '35px',
          maxH: '35px',
          mx: 'auto',
        },
      }}
    >
      <Text as="span" fontSize="xs" pb={3}>
        Scroll Down
      </Text>
      <Button colorScheme="ghost">
        <ChevronDownIcon />
      </Button>
      <Box
        as="span"
        sx={{
          display: 'block',
          backgroundColor: 'white',
          width: '1px',
          height: '50px',
          mx: 'auto',
        }}
      ></Box>
    </Box>
  </Box>
);

export const QuoteLayer = ({
  quote,
  attr,
  showQuote,
  handleScrollHover,
}: {
  quote: string;
  attr: string;
  showQuote: boolean;
  handleScrollHover: () => null;
}) => (
  <Box
    className="quote-layer"
    position="absolute"
    bottom={0}
    width="100vw"
    textAlign="center"
    borderBottom={`${showQuote ? 1 : 0}px solid`}
    onMouseEnter={handleScrollHover}
    onMouseLeave={handleScrollHover}
    transition="all 0.3s 0.2s ease-in-out"
  >
    <Box
      as="figure"
      mx="auto"
      maxW="2xl"
      textAlign="left"
      transition="transform 0.3s 0.2s ease-in-out"
      transform={`translate3d(0, ${showQuote ? -50 : 200}px, 0)`}
    >
      <Text as="blockquote" fontSize="2xl" fontStyle="italic">
        {quote}
      </Text>
      <Text
        as="figcaption"
        className="gradient"
        textAlign="right"
        sx={{
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            right: '15%',
            height: '1px',
            width: '15%',
            backgroundImage:
              'linear-gradient(89.9deg, #8D6586 1.21%, #5A32E6 43.43%, rgba(90, 50, 230, 0) 104.06%)',
          },
        }}
      >
        --{attr}
      </Text>
    </Box>
  </Box>
);
