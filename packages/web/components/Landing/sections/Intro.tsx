import {
  Box,
  Button,
  Container,
  Heading,
  keyframes,
  Stack,
  Text,
} from '@metafam/ds';
import BackgroundImage from 'assets/landing/sections/section-1.jpg';
import { BsArrowRight } from 'react-icons/bs';

const gradientShift = keyframes`
  from {
    backgroundSize: 46% 90%;
  }
  to {
    backgroundsize: 70% 60%;
  }
`;

export const Intro: React.FC = () => (
  <Container
    pos="relative"
    width="100vw"
    height="100vh"
    minHeight="100%"
    maxHeight="100vh"
    maxW="full"
    px={8}
    sx={{
      'h2 > .gradient': {
        background:
          'conic-gradient(from 92.2deg at 53.45% 74.83%, #8EBBFF 0deg, #DE3FFF 88.12deg, #79F8FB 105deg, #7C56FF 165deg, #FF61E6 251.25deg, #927CFF 286.87deg, #76EBF2 326.25deg, #8EBBFF 360deg)',
        backgroundClip: 'text',
        backgroundSize: '46% 90%',
        WebkitTextFillColor: 'transparent',
        '&:hover': {
          animation: `${gradientShift} infinite 2s linear`,
        },
      },
      'p > span': {
        background: 'linear-gradient(90deg, #FF61E6 -29.22%, #7C56FF 107.53%)',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
      '.border-grad': {
        border: '1px double transparent',
        background: 'transparent',
        backgroundImage:
          'linear-gradient(#1B0D2A, #1B0D2A), radial-gradient(circle at top left, #FF61E6 -29.22%, #7C56FF 107.53%)',
        backgroundClip: 'padding-box, border-box',
        backgroundOrigin: 'border-box',
        WebkitBackgroundOrigin: 'border-box',
        boxSizing: 'border-box',
        '& > span': {
          background:
            'linear-gradient(90deg, #FF61E6 -29.22%, #7C56FF 107.53%)',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
      },
    }}
  >
    <Box
      pos="absolute"
      top={0}
      left={0}
      backgroundImage={`url(${BackgroundImage})`}
      bgPosition="bottom right"
      bgRepeat="no-repeat"
      bgSize="contain"
      height="100%"
      width="100%"
      zIndex={0}
    />
    <Stack
      align="center"
      justify="left"
      spacing={{ base: 8, lg: 10 }}
      py={{ base: 20, lg: 28 }}
      direction={{ base: 'column', lg: 'row' }}
      maxW="lg"
    >
      <Stack flex={1} spacing={{ base: 5, lg: 10 }}>
        <Heading
          fontFamily="landingHero"
          fontSize="60px"
          fontWeight="700"
          color="landing250"
        >
          <Text as="span">To find your metagame means to</Text>{' '}
          <Text as="span" className="gradient">
            play life in an optimal way
          </Text>
        </Heading>
        <Text as="p">
          By coordinating with others on building a better world; doing things
          that create <Text as="span">a positive impact</Text>, make{' '}
          <Text as="span">you happy</Text>, and{' '}
          <Text as="span">earn you money</Text>.
        </Text>

        <Stack
          spacing={{ base: 4, sm: 6 }}
          direction={{ base: 'column', sm: 'row' }}
        >
          <Button className="border-grad" rounded="md" size="lg">
            <Text as="span">Join now</Text>
          </Button>
          <Button colorScheme="white" size="lg" rightIcon={<BsArrowRight />}>
            Explore more
          </Button>
        </Stack>
      </Stack>
    </Stack>
  </Container>
);
