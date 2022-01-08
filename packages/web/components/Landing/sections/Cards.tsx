import {
    Box,
    Text,
    Image,
    HStack,
    ListItem,
    OrderedList,
} from "@metafam/ds"
import CardBackground from 'assets/landing/card-background.png'
import CardImage from 'assets/landing/card-image.png'


function Intro() {
    return (
        <Box
            width="100%"
            minHeight="1040px"
            background="#1B0D2A"
            bgPosition="center"
            bgSize="cover"
        >

            <HStack spacing={0}>
                <Box
                    backgroundImage={`url(${CardBackground})`}
                    bgPosition="center"
                    bgSize="cover"
                    width="33%"
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                    pl="76px"
                    pr="76px"
                >
                    <Image maxWidth="220px" pt="153px" pb="40px"
                        src={CardImage} />
                    <Box max-width="327px">
                        <Text pb="40px" fontSize="37px" lineHeight="40px" textAlign="center">PLAYERS</Text>
                        <Text fontSize="20px" pb="40px">MetaGame is for those who want to play an active role in building the future.</Text>

                        <Text pb="20px">For those who want to:</Text>
                        <OrderedList pb="153px" fontSize="20px" lineHeight="32px">
                            <ListItem pb="20px" >Build their knowledge, get experience & level up.</ListItem>
                            <ListItem pb="20px" >Find cool projects, solve problems & get paid.</ListItem>
                            <ListItem pb="20px" >Become a part of something bigger.</ListItem>

                        </OrderedList>
                    </Box>
                </Box>
                <Box
                      bgPosition="center"
                      bgSize="cover"
                    backgroundImage={`url(${CardBackground})`}
                   
              
                    width="33%"
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                    pl="76px"
                    pr="76px"
                >
                    <Image maxWidth="220px" pt="153px" pb="40px"
                        src={CardImage} />
                    <Box max-width="327px">
                        <Text pb="40px" fontSize="37px" lineHeight="40px" textAlign="center">GUILDS</Text>
                        <Text fontSize="20px" pb="40px">It's also for groups of people, those building tools & services for a decentralized future.</Text>

                        <Text pb="20px">For those who want to:</Text>
                        <OrderedList pb="153px" fontSize="20px" lineHeight="32px">
                            <ListItem pb="20px" >Help finding tools, frameworks & funds accessible.</ListItem>
                            <ListItem pb="20px" >Help getting value-aligned contributors & adopters</ListItem>
                            <ListItem pb="20px" >Become a part of the "new world" puzzle.</ListItem>

                        </OrderedList>
                    </Box>
                </Box>
                <Box
                 
                    backgroundImage={`url(${CardBackground})`}
                    bgPosition="center"
                    bgSize="cover"
                    width="33%"
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                    pl="76px"
                    pr="76px"
                >
                    <Image maxWidth="220px" pt="153px" pb="40px"
                        src={CardImage} />
                    <Box max-width="327px">
                        <Text pb="40px" fontSize="37px" lineHeight="40px" textAlign="center">PATRONS</Text>
                        <Text fontSize="20px" pb="40px">Those who really want to see MetaGame succeed, but prefer to help with funds.</Text>

                        <Text pb="20px">Why?</Text>
                        <OrderedList pb="153px" fontSize="20px" lineHeight="32px">
                            <ListItem pb="20px" >They love builder onboarding & support systems.</ListItem>
                            <ListItem pb="20px" >Membership and other things, all paid in Seeds.</ListItem>
                            <ListItem pb="20px" >Understanding MetaGame made them go: Fuck yeah!</ListItem>

                        </OrderedList>
                    </Box>
                </Box>

            </HStack>


        </Box>
    );
}

export default Intro;