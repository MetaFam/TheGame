import { Box, Button, Container, Image, Text } from '@metafam/ds';
import BackgroundImage from 'assets/landing/intro-background.png';
import MetaGameLogo from 'assets/landing/synthlogo-2.svg';
import { FaArrowDown } from 'react-icons/fa';

const Intro: React.FC = () => (
  <Box
    width="100%"
    minHeight="100%"
    maxHeight="65rem"
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
    >
      <Image src={MetaGameLogo} />
      <Text
        fontSize="16px"
        fontWeight="normal"
        color="white"
        mt="10px"
        mb="2.188rem"
      >
        A Massive Online Coordination Game
      </Text>
      <Button
        fontWeight="normal"
        fontSize="1.125rem"
        bg="#B40C85"
        mb="16px"
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
        borderColor="cyanText"
        color="#79F8FB"
        width="17.75rem"
        textTransform="uppercase"
        rightIcon={<FaArrowDown />}
      >
        Explore Moar
      </Button>
    </Container>
  </Box>
);

export default Intro;
