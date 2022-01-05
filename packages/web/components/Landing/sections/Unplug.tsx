import {
    Container,
    Box,
    Text,
} from "@chakra-ui/react"
import BackgroundImage from 'assets/landing/unplug-background.png'



function Unplug() {
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
                textAlign="center"

            >
                <Box fontSize="67px"
                     LineHeight="80px"
                     fontWeight="normal"
                     color="white"
                     maxWidth="1200px">

                    <Text pt="130px" pb="35px" textAlign = "center">
                    So unplug yourself from the matrix & enter the future.
                    </Text>
                   
                    <Text  textAlign = "center">
                    earn, earn & make a difference.
                    </Text>
                </Box>

            </Container>
        </Box>
    );
}

export default Unplug;

