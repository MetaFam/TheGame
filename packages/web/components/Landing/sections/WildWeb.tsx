import { Box, Container, Text } from '@metafam/ds';
import BackgroundImage from 'assets/landing/wildweb-background.png';

const WildWeb: React.FC = () => (
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
      alignItems="center"
    >
      <Box
        fontSize="48px"
        lineHeight="64px"
        fontWeight="normal"
        color="white"
        maxWidth="978px"
      >
        <Text pt="130px" pb="35px">
          Web3 technologies are allowing us to{' '}
          <Text fontWeight="bold">reimagine socioeconomic systems</Text> from
          ground up.
        </Text>
        <Text pb="35px">
          A new world is being built but it’s{' '}
          <Text fontWeight="bold">hard to navigate.</Text>
        </Text>
        <Text pb="35px">
          The resources, building blocks & tools are all over the place{' '}
          <Text fontWeight="bold">but the maps are inexistent.</Text>
        </Text>
        <Text pb="35px">
          There are pitfalls, gold rushing cowboys & snake oil salesmen at every
          corner.
        </Text>

        <Text pb="35px" maxWidth="978px" width="100%" textTransform="uppercase">
          It’s a Wild Web.
        </Text>
      </Box>
    </Container>
  </Box>
);

export default WildWeb;
