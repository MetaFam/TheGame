import { Box, Container, Link, Text } from '@metafam/ds';
import BackgroundImage from 'assets/landing/revolution-background.png';

const Build: React.FC = () => (
  <Box
    width="100%"
    minHeight="65rem"
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
      pl="137px"
      alignItems="flex-end"
      pr="116px"
    >
      <Text
        fontSize="4.188rem"
        lineHeight="5rem"
        fontWeight="normal"
        color="white"
        display="flex"
        flexDirection="column"
        maxWidth="568px"
      >
        A revolution is happening online;
      </Text>

      <Text
        pt="24px"
        fontSize="4.188rem"
        lineHeight="5rem"
        fontWeight="normal"
        color="white"
        maxWidth="568px"
      >
        will you{' '}
        <Link color="#E839B7" href="#">
          join
        </Link>{' '}
        or miss out?
      </Text>
    </Container>
  </Box>
);

export default Build;
