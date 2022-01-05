import {
    Container,
    Box,
    Text,
    Link

} from "@chakra-ui/react"
import BackgroundImage from 'assets/landing/revolution-background.png'



function Build() {
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
                justifyContent="flex-end"
                maxWidth="100%"
                pl="137px"
                alignItems="flex-end"
                pr="116px"
            >
                <Text
                    fontSize="67px"
                    LineHeight="80px"
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
                    fontSize="67px"
                    LineHeight="80px"
                    fontWeight="normal"
                    color="white"
                    maxWidth="568px"
                >
                    will you <Link color='#E839B7' href='#'>join</Link> or miss out?
                </Text>
            </Container>
        </Box>
    );
}

export default Build;


