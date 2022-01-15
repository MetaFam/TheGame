import { Box, Container, Text } from '@metafam/ds';
import BackgroundImage from 'assets/landing/wildweb-background.png';

export const WildWeb: React.FC = () => (
  <Box
    width="100%"
    minHeight="100%"
    maxHeight="100%"
    backgroundImage={`url(${BackgroundImage})`}
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
    >
      <Box
        fontSize={{ base: '1.5rem', md: '3rem' }}
        lineHeight={{ base: '2.25rem', md: '4rem' }}
        fontWeight="normal"
        color="white"
        maxWidth="61.125rem"
      >
        <Text
          pt={{ base: '1rem', md: '8.125rem' }}
          pb={{ base: '1.188rem', md: '2.188rem' }}
        >
          Web3 technologies are allowing us to{' '}
          <Text fontWeight="bold">reimagine socioeconomic systems</Text> from
          ground up.
        </Text>
        <Text pb="2.188remx">
          A new world is being built but it’s{' '}
          <Text fontWeight="bold">hard to navigate.</Text>
        </Text>
        <Text pb="2.188rem">
          The resources, building blocks & tools are all over the place{' '}
          <Text fontWeight="bold">but the maps are inexistent.</Text>
        </Text>
        <Text pb="2.188rem">
          There are pitfalls, gold rushing cowboys & snake oil salesmen at every
          corner.
        </Text>

        <Text
          pb="2.188rem"
          maxWidth="61.125rem"
          width="100%"
          textTransform="uppercase"
        >
          It’s a Wild Web.
        </Text>
      </Box>
    </Container>
  </Box>
);
