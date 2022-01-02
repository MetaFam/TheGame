import React from 'react';
import { Container, Box, Text, Image, Button } from "@chakra-ui/react"
import BackgroundImage from 'assets/landing/intro-background.png'
import MetaGameLogo from 'assets/landing/synthlogo-2.svg'
import { FaArrowDown } from 'react-icons/fa';

function Intro() {
  return (
    <Box
      width="100%"
      height="100vh"
      backgroundImage={`url(${BackgroundImage})`}
      bgPosition="center"
      bgSize="cover"
    >

      <Container
        flexDirection="column"
        justifyContent="flex-end"
        display="flex" alignItems="center"
        width="100%"
        height="100vh"
        pb = '78px'
      >
        <Image
          src={MetaGameLogo} />
        <Text
         fontSize="16px" 
         fontWeight="normal"
          color="white"
           mt="10px"
            mb="35px"
            >
              A Massive Online Coordination Game 
        </Text>
        <Button
         fontWeight="normal"
          fontSize="18px"
           bg="#B40C85" 
           mb="16px"
           width='284px'
            >
              JOIN NAO
              </Button>
        <Button 
        fontWeight="normal"
         fontSize="18px"
          bg="transparent" 
          border='1px'
           borderColor="#79F8FB"
            color="#79F8FB"
            width='284px'
 
              rightIcon={<FaArrowDown />}
             
                >
                  EXPLORE MOAR
                  </Button>
      </Container>
    </Box>
  );
}

export default Intro;