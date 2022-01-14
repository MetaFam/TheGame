import { Box, Container, Text } from '@metafam/ds';
import BackgroundImage from 'assets/landing/who-background.png';

const Who: React.FC = () => (
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
      justifyContent="flex-end"
      maxWidth="100%"
      alignItems="center"
      textAlign="center"
    >
      <Box
        fontSize="67px"
        lineHeight="5rem"
        fontWeight="normal"
        color="white"
        maxWidth="75rem"
      >
        <Text pt="130px" pb="35px" textAlign="center">
          So, whom is it for?
        </Text>
      </Box>
    </Container>
  </Box>
);

export default Who;
