import { Box, Container, Text } from '@metafam/ds';
import BackgroundImage from 'assets/landing/who-background.png';

export const Who: React.FC = () => (
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
        fontSize="4.188rem"
        lineHeight="5rem"
        fontWeight="normal"
        color="white"
        maxWidth="75rem"
      >
        <Text pt="8.125rem" pb="2.188rem" textAlign="center">
          So, whom is it for?
        </Text>
      </Box>
    </Container>
  </Box>
);
