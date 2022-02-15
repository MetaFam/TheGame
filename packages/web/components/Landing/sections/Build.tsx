import { Box, Container, Text } from '@metafam/ds';
import BackgroundImage from 'assets/landing/build-background.png';

export const Build: React.FC = () => (
  <Box
    width="100%"
   minHeight="100%" 
    maxHeight="100%"
    backgroundImage={`url(${BackgroundImage})`}
    bgPosition="center"
    bgSize="cover"
  >
    <Container
      width="100%"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      maxWidth="100%"
      pl={{ base: '0', md: '8.563rem' }}
    >
      <Text
        fontSize="2.375rem"
        lineHeight="3.5rem"
        fontWeight="normal"
        color="white"
        display="flex"
        flexDirection="column"
        maxWidth="32.75rem"
      >
        Many have already woken up to the world-shaping potential of Web3
        technologies.
      </Text>

      <Text
        pt="3.5rem"
        fontSize="2.375rem"
        lineHeight="3.5rem"
        fontWeight="normal"
        color="white"
        display="flex"
        flexDirection="column"
        maxWidth="32.75rem"
      >
        Some are grabbing the opportunity to build the future they want to live
        in.
      </Text>
    </Container>
  </Box>
);
