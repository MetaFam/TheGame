import { Box, Container, Text } from '@metafam/ds';
import BackgroundImage from 'assets/landing/frontier-background.png';

function Frontier() {
  return (
    <Box
      width="100%"
      minHeight="1040px"
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
        pl="137px"
      >
        <Text
          fontSize="38px"
          LineHeight="56px"
          fontWeight="normal"
          color="white"
          display="flex"
          flexDirection="column"
          maxWidth="524px"
        >
          Many have already woken up to the world-shaping potential of Web3
          technologies.
        </Text>

        <Text
          pt="56px"
          fontSize="38px"
          LineHeight="56px"
          fontWeight="normal"
          color="white"
          display="flex"
          flexDirection="column"
          maxWidth="524px"
        >
          Some are grabbing the opportunity to build the future they want to
          live in.
        </Text>
      </Container>
    </Box>
  );
}
export default Frontier;
