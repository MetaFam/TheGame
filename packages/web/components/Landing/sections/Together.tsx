import {
    Container,
    Box,
    Text,
} from "@chakra-ui/react"
import BackgroundImage from 'assets/landing/together-background.png'



function Together() {
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
                maxWidth="1200px"
                alignItems="center"

            >
                <Box
                    fontSize="48px"
                    LineHeight="64px"
                    fontWeight="normal"
                    color="white"
                    bgGradient=' linear-gradient(180deg, #FFFFFF 15.3%, #FD208A 85.41%);                    '
                    bgClip='text'
                    maxWidth="1200px"
                    display="inline"
                    pb="35px"
                    pt="130px"
                    textAlign="center"
                >
                    <Text pb="50px"> We are bringing together the people & building blocks aligned on the idea of creating a new kind of society.</Text>
                    <Text pb="50px"> One that is optimized for human wellbeing rather than profit.</Text>
                    <Text pb="50px">One that revolves around solving problems & living well, in balance with nature.</Text>
                </Box>

            </Container>
        </Box>
    );
}

export default Together;


