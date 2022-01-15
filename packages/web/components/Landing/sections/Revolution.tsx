import { Box, Container, Link, Text } from '@metafam/ds';
import BackgroundImage from 'assets/landing/revolution-background.png';

export const Revolution: React.FC = () => (
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
      justifyContent={{ base: 'center', md: 'flex-end' }}
      maxWidth="100%"
      pl={{ base: '0', md: '8.563rem' }}
      alignItems="flex-end"
      pr={{ base: '0', md: '7.25rem' }}
    >
      <Text
        fontSize={{ base: '3rem', md: '4.188rem' }}
        lineHeight="5rem"
        fontWeight="normal"
        color="white"
        display="flex"
        flexDirection="column"
        maxWidth="35.5rem"
      >
        A revolution is happening online;
      </Text>

      <Text
        pt="1.5rem"
        fontSize={{ base: '3rem', md: '4.188rem' }}
        lineHeight="5rem"
        fontWeight="normal"
        color="white"
        maxWidth="35.5rem"
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
