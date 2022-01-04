import {
    Container,
    Box,
    Text,
} from "@chakra-ui/react"
import BackgroundImage from 'assets/landing/optimal-background.png'



function Optimal() {
    return (
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
                <Box fontSize="48px"
                    LineHeight="64px"
                    fontWeight="normal"
                    color="white"
                    maxWidth="978px">

                    <Text pt="130px" pb="35px" textAlign = "center">
                    To find your metagame means to <Text fontWeight = "bold" color = "#79F8FB">play life in the optimal way.</Text>
                    </Text>
                    <Box pb="35px">
                    <Text> By coordinating with others on building a better world;
                    doing things that create a positive impact, make </Text>
                  
                    <Text  fontWeight = "bold" color = "#79F8FB">you happy</Text>
                     AND 
                     <Text fontWeight = "bold" color = "#79F8FB">earn you money.</Text>
                  
                    </Box>

                </Box>

            </Container>
        </Box>
    );
}

export default Optimal;

<Text fontWeight = "bold" color = "#79F8FB">earn you money.</Text>
