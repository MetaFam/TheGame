import { Box, Button, Container, Text } from '@metafam/ds';
import BackgroundImage from 'assets/landing/just-watch-background.png';
import { FaArrowDown } from 'react-icons/fa';

const JustWatch: React.FC = () => (
  <Box
    width="100%"
    minHeight="1040px"
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
      pb="78px"
      maxWidth="1200px"
      textAlign="center"
    >
      <Text
        max-width="1200px"
        fontSize="76px"
        lineHeight="80px"
        fontWeight="normal"
        color="white"
        mt="10px"
        mb="35px"
      >
        The revolution will be televized, but don’t just watch.
      </Text>
      <Button
        fontWeight="normal"
        fontSize="18px"
        bg="#B40C85"
        mb="16px"
        width="284px"
        textTransform="uppercase"
      >
        Join Nao
      </Button>
      <Button
        fontWeight="normal"
        fontSize="18px"
        bg="transparent"
        border="1px"
        borderColor="white"
        color="white"
        width="284px"
        textTransform="uppercase"
        rightIcon={<FaArrowDown />}
      >
        Explore Moar
      </Button>
    </Container>
  </Box>
);

export default JustWatch;
