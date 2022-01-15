import { Box, Flex, Image, ListItem, OrderedList, Text } from '@metafam/ds';
import CardBackground from 'assets/landing/card-background.png';
import CardImage from 'assets/landing/card-image.png';

export const Cards: React.FC = () => (
  <Box
    width="100%"
    maxHeight="100%"
    background="dark"
    bgPosition="center"
    bgSize="cover"
  >
    <Flex spacing={0} direction={{ base: 'column', md: 'row' }}>
      <Box
        backgroundImage={`url(${CardBackground})`}
        bgPosition="center"
        bgSize="cover"
        width={{ base: '100%', md: '33%' }}
        display="flex"
        alignItems="center"
        flexDirection="column"
        pl="4.75rem"
        pr="4.75rem"
      >
        <Image maxWidth="13.75rem" pt="9.563rem" pb="2.5rem" src={CardImage} />
        <Box max-width="20.438rem">
          <Text
            pb="2.5rem"
            fontSize="2.5rem"
            lineHeight="2.5rem"
            textAlign="center"
          >
            PLAYERS
          </Text>
          <Text fontSize="1.25rem" pb="2.5rem">
            MetaGame is for those who want to play an active role in building
            the future.
          </Text>

          <Text pb="1.25rem">For those who want to:</Text>
          <OrderedList pb="9.563rem" fontSize="1.25rem" lineHeight="2rem">
            <ListItem pb="1.25rem">
              Build their knowledge, get experience & level up.
            </ListItem>
            <ListItem pb="1.25rem">
              Find cool projects, solve problems & get paid.
            </ListItem>
            <ListItem pb="1.25rem">Become a part of something bigger.</ListItem>
          </OrderedList>
        </Box>
      </Box>
      <Box
        bgPosition="center"
        bgSize="cover"
        backgroundImage={`url(${CardBackground})`}
        width={{ base: '100%', md: '33%' }}
        display="flex"
        alignItems="center"
        flexDirection="column"
        pl="4.75rem"
        pr="4.75rem"
      >
        <Image maxWidth="13.75rem" pt="9.563rem" pb="2.5rem" src={CardImage} />
        <Box max-width="20.438rem">
          <Text
            pb="2.5rem"
            fontSize="2.313rem"
            lineHeight="2.5rem"
            textAlign="center"
          >
            GUILDS
          </Text>
          <Text fontSize="1.25rem" pb="2.5rem">
            It's also for groups of people, those building tools & services for
            a decentralized future.
          </Text>

          <Text pb="1.25rem">For those who want</Text>
          <OrderedList pb="9.563rem" fontSize="1.25rem" lineHeight="2rem">
            <ListItem pb="1.25rem">
              Help finding tools, frameworks & accessible funds.
            </ListItem>
            <ListItem pb="1.25rem">
              Help getting value-aligned contributors & adopters
            </ListItem>
            <ListItem pb="1.25rem">
              Become part of the "new world" puzzle.
            </ListItem>
          </OrderedList>
        </Box>
      </Box>
      <Box
        backgroundImage={`url(${CardBackground})`}
        bgPosition="center"
        bgSize="cover"
        width={{ base: '100%', md: '33%' }}
        display="flex"
        alignItems="center"
        flexDirection="column"
        pl="4.75rem"
        pr="4.75rem"
      >
        <Image maxWidth="13.75rem" pt="9.563rem" pb="2.5rem" src={CardImage} />
        <Box max-width="20.438rem">
          <Text
            pb="2.5rem"
            fontSize="2.313rem"
            lineHeight="2.5rem"
            textAlign="center"
          >
            PATRONS
          </Text>
          <Text fontSize="1.25rem" pb="2.5rem">
            Those who really want to see MetaGame succeed, but prefer to help
            with funds.
          </Text>

          <Text pb="1.25rem">Why?</Text>
          <OrderedList pb="9.563rem" fontSize="1.25rem" lineHeight="2rem">
            <ListItem pb="1.25rem">
              They love builder onboarding & support systems.
            </ListItem>
            <ListItem pb="1.25rem">
              Membership and other things, all paid in Seeds.
            </ListItem>
            <ListItem pb="1.25rem">
              Understanding MetaGame made them go: Fuck yeah!
            </ListItem>
          </OrderedList>
        </Box>
      </Box>
    </Flex>
  </Box>
);
