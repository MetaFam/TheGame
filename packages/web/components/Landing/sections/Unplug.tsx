import { Box, Container, Text } from '@metafam/ds';
import BackgroundImage from 'assets/landing/unplug-background.png';

const Unplug: React.FC = () => (
  <Box
    width="100%"
    minHeight="100%"
    maxHeight="65rem"
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
      alignItems="center"
      textAlign="center"
    >
      <Box
        fontSize={{ base: '1.5rem', md: '4.188rem' }}
        lineHeight={{ base: '3rem', md: '5rem' }}
        fontWeight="normal"
        color="white"
        maxWidth="75rem"
      >
        <Text pt="130px" pb="35px" textAlign="center">
          So unplug yourself from the matrix & enter the future.
        </Text>

        <Text textAlign="center">earn, earn & make a difference.</Text>
      </Box>
    </Container>
  </Box>
);

export default Unplug;
