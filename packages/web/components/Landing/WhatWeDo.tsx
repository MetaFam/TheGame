import {
    Container,
    Box,
    Text,
    ListItem,
    UnorderedList,
} from "@chakra-ui/react"
import BackgroundImage from 'assets/landing/whatWeDo-background.png'



function WhatWeDo() {
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
                <Box fontSize="40px"
                    LineHeight="64px"
                    maxWidth="999px">

                    <Text pt="130px" pb="35px" fontWeight = "700">
                    What are we doing?
                    </Text>
                    <UnorderedList pb="35px" fontWeight = "300" opacity = "0.8">
                        <ListItem >Curating knowledge</ListItem>
                        <ListItem>Organizing events</ListItem>
                        <ListItem>Producing content</ListItem>
                         <ListItem>Building technologies</ListItem>
                         <ListItem>Uniting aligned people & communities</ListItem>
                         <ListItem>Putting together the pieces of the New World puzzle</ListItem>
                    </UnorderedList>

                    <Text fontWeight = "700" width = "100%">In short, anything & everything related to DAOs & helping people build the future they want to live in</Text>
                   

                </Box>

            </Container>
        </Box>
    );
}

export default WhatWeDo;


