import { Box, Button, Container, Text } from '@metafam/ds';
import BackgroundImage from 'assets/landing/just-watch-background.png';
import { FaArrowDown } from 'react-icons/fa';

export const JustWatch: React.FC = () => (
  <Box
    width="100%"
    minHeight="100%"
    maxHeight="100%"
    backgroundImage={`url(${BackgroundImage})`}
    bgPosition="center"
    bgSize="cover"
  >
    <Container
      flexDirection="column"
      justifyContent="flex-end"
      display="flex"
      alignItems="center"
      width="100%"
      height="100vh"
      pb="4.875rem"
      maxWidth="75rem"
      textAlign="center"
    >
      <Text
        max-width="75rem"
        fontSize="4.188rem"
        lineHeight="5rem"
        fontWeight="normal"
        color="white"
        mt="0.625rem"
        mb="2.188rem"
      >
        The revolution will be televized, but don’t just watch.
      </Text>
      <Button
        fontWeight="normal"
        fontSize="1.125rem"
        bg="#B40C85"
        mb="1rem"
        width="17.75rem"
        textTransform="uppercase"
      >
        Join Nao
      </Button>
      <Button
        fontWeight="normal"
        fontSize="1.125rem"
        bg="transparent"
        border="1px"
        borderColor="white"
        color="white"
        width="17.75rem"
        textTransform="uppercase"
        rightIcon={<FaArrowDown />}
      >
        Explore Moar
      </Button>
    </Container>
  </Box>
);
