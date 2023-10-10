import {
  Badge,
  Box,
  Button,
  Container,
  Image,
  List,
  ListIcon,
  ListItem,
  MetaButton,
  Stack,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  UnorderedList,
  useMultiStyleConfig,
  useTab,
  VStack,
} from '@metafam/ds';
import GuildsImg from 'assets/guilds-sun_800x800.webp';
import PatronsImg from 'assets/patrons-sun_800x820.webp';
import PlayerImg from 'assets/players-sun_800x822.webp';
import BabyOctopus from 'assets/quests/baby_octo.webp';
import Octopus from 'assets/quests/octopus.webp';
import YoungPlant from 'assets/young-plant.webp';
import { FullPageContainer } from 'components/Container';
import { useRouter } from 'next/router';
import React, { Ref, RefObject } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { MdCheckCircle } from 'react-icons/md';

import { Rain } from './OnboardingGame/Rain';

const TabImg = ({ type, isSelected }: { type: string, isSelected: boolean }) => {
  const currentImg = {
    Player: <Image src={PlayerImg.src} h="full" w="full" style={{ filter: isSelected ? 'grayscale(0%)' : 'grayscale(0%) hue-rotate(264deg)' }} />,
    Guild: <Image src={GuildsImg.src} h="full" w="full" style={{ filter: isSelected ? 'grayscale(0%)' : 'grayscale(0%) hue-rotate(264deg)' }} />,
    Patron: <Image src={PatronsImg.src} h="full" w="full" style={{ filter: isSelected ? 'grayscale(0%)' : 'grayscale(0%) hue-rotate(264deg)' }} />,
  }[type];
  return <Box>{currentImg}</Box>;
};

const CustomTab = React.forwardRef<
  RefObject<HTMLElement>,
  { children: React.ReactNode }
>((props, ref) => {
  const tabProps = useTab({ ...props, ref: ref as Ref<HTMLElement> });
  const styles = useMultiStyleConfig('Tabs', tabProps);
  const isSelected = !!tabProps['aria-selected'];
  const isDisabled = !!tabProps['aria-disabled'];
  let borderColor = 'transparent';
  if (isSelected && tabProps.tabIndex === 0 && tabProps.children === 'Player')
    borderColor = '#A69AC9';
  if (isSelected && tabProps.tabIndex === 0 && tabProps.children === 'Guild')
    borderColor = '#338B97';
  if (isSelected && tabProps.tabIndex === 0 && tabProps.children === 'Patron')
    borderColor = '#C846C8';
  const cursor = isDisabled ? 'not-allowed' : 'pointer';
  return (
    <Button
      __css={styles.tab}
      size="md"
      h="120px"
      w="120px"
      variant="outline"
      fontWeight={400}
      sx={{ border: 0, color: 'white' }}
      isDisabled={isDisabled}
      {...tabProps}
    >
      <Box
        padding={1}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="full"
        background="#361443"
        cursor={cursor}
      >
        <TabImg type={tabProps.children as string} isSelected={isSelected} />
      </Box>
      {tabProps.children}
    </Button>
  );
});

export const NewOnboard: React.FC = () => {
  const section = 'onboard';
  const router = useRouter();

  return (
    <FullPageContainer
      id={section}
      position="relative"
      overflow="clip"
      fontSize={{ base: 'xl', md: '5xl' }}
      spacing={12}
      px={{ base: 3, lg: 12 }}
      py={{ base: 6, lg: '6rem' }}
      minH="100vh"
    >
      <Container
        display="flex"
        flexDirection="column"
        maxW={{ base: '100%', md: '7xl', '2xl': '8xl' }}
        height={{ base: '100vh', lg: 'auto' }}
        alignItems="center"
        justifyContent="start"
        gap="40px"
        zIndex={5}
      >
        <Text fontSize="4xl">Join MetaGame as</Text>
        <Button
          alignSelf="start"
          variant="ghost"
          color="#D59BD5"
          _hover={{ bg: 'transparent' }}
          _active={{ bg: 'transparent ' }}
          onClick={() => router.push('/')}
        >
          <FaArrowLeft fontSize="0.875rem"
            style={{ display: 'inline-block', marginRight: '0.5rem' }} /> Go Back
        </Button>
        <Tabs variant="unstyled">
          <TabList display="flex" justifyContent="center" gap={8} style={{ margin: "-80px" }}>
            <CustomTab>Player</CustomTab>
            <CustomTab>Guild</CustomTab>
            <CustomTab>Patron</CustomTab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box
                maxW="container.lg"
                maxH='80vh'
                bg="tranparent"
                border="1px solid #A69AC9"
                borderRadius={8}
                paddingX={{ base: 8, lg: '96px' }}
                paddingY='128px'
                boxShadow="inset 0px 0px 48px 0px #4D359359, -8px 0px 72px 0px #4D359359"
                color="white"
                overflowY='auto'
              >
                <VStack spacing={4}
                  align='stretch'>
                  <Text fontSize="4xl" color="#B6A4F4" align='center'>
                    Players are here to learn, get experience, contribute labor and help build
                    MetaGame.
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold">
                    Why become a player?
                  </Text>
                  <Text fontSize="2xl">
                    A few reasons!
                  </Text>
                  <UnorderedList fontSize="md" fontWeight="light">
                    <ListItem>Learn about Web3, DAOs, ReFi & the Metacrisis</ListItem>
                    <ListItem>Join the ecosystem & start making friends</ListItem>
                    <ListItem>Start accruing reputation (XP) & tokens (Seeds)</ListItem>
                    <ListItem>Gain experience & increase chances of landing gigs</ListItem>
                    <ListItem>Get help for starting your own project</ListItem>
                  </UnorderedList>
                  <Text fontSize="2xl" fontWeight="bold">
                    Perks of Joining
                  </Text>
                  <Stack direction={['column', 'row']}>
                    <Box h="full" w={{ base: 'full', lg: "50%" }} bg="#FFFFFF0A" display='flex' flexDir="column" alignItems='center' gap={3} p={6}>
                      <Badge borderRadius="full" variant='subtle' colorScheme="green" p={2} fontSize='0.4em'>VISITOR</Badge>
                      <Text fontSize="xl">FREE</Text>
                      <List fontSize="md" fontWeight="light">
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Access to educational resources
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Access to community calls
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          List of MetaAlliance guilds
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Free newsletter
                        </ListItem>
                        <ListItem>&#8226; Search & filter people</ListItem>
                        <ListItem>&#8226; Access to the community</ListItem>
                        <ListItem>&#8226; Ability to earn reputation</ListItem>
                        <ListItem>&#8226; Ability to earn Seed tokens</ListItem>
                        <ListItem>&#8226; Get ranked & unlock perks</ListItem>
                      </List>
                    </Box>
                    <Box h="full" w={{ base: 'full', lg: "50%" }} bg="#00000029" display='flex' flexDir="column" alignItems='center' gap={3} p={6}>
                      <Badge borderRadius="full" variant='subtle' colorScheme='pink' p={2} fontSize='0.4em'>MEMBER</Badge>
                      <Text fontSize="xl">Few contributions / month</Text>
                      <List fontSize="md" fontWeight="light">
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Access to educational resources
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Access to community calls
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          List of MetaAlliance guilds
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Free newsletter
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Search & filter people
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Access to the community
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Ability to earn reputation
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Ability to earn Seed tokens
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Get ranked & unlock perks
                        </ListItem>
                      </List>
                    </Box>
                  </Stack>
                  <Text fontSize="2xl" fontWeight="bold">
                    How to become a player?
                  </Text>
                  <Text fontSize="2xl">
                    Ready to rise & become one of the founders of MetaGame?
                  </Text>
                  <Stack direction={['column', 'row']} spacing={10} align={{ base: 'center', lg: 'start' }}>
                    <Box h="full" w={{ base: 'full', lg: "50%" }} border="4px solid #FF00FF" borderRadius={18} display='flex' flexDir="column" alignItems='center' gap={3} p={6}>
                      <Image src={BabyOctopus.src} h="50%" w="50%" borderRadius='full' />
                      <Text fontSize="2xl" fontWeight="semibold">
                        Take the path
                      </Text>
                      <Badge borderRadius="full" variant='subtle' colorScheme="purple" p={2} fontSize='0.4em'>RECOMMENDED</Badge>
                      <Text fontSize='2xl' align='center'>The path will take you through everything a newcomer should do.</Text>
                      <Button colorScheme='pink'>SOUNDS GOOD</Button>
                    </Box>
                    <Text fontSize='2xl'>OR</Text>
                    <Box h="full" w={{ base: 'full', lg: "50%" }} border="4px solid #FF00FF" borderRadius={18} display='flex' flexDir="column" alignItems='center' gap={3} p={6}>
                      <Image src={Octopus.src} h="50%" w="50%" borderRadius='full' />
                      <Text fontSize="2xl" fontWeight="semibold">
                        Jump into action
                      </Text>
                      <Text fontSize="2xl" fontWeight="normal">
                        Too busy?
                      </Text>
                      <Text fontSize='2xl' align='center'>You can jump straight into action, just say so in the #🏟-metasquare</Text>
                      <Button colorScheme='pink'>LFG!</Button>
                    </Box>
                  </Stack>
                </VStack>
              </Box>
            </TabPanel>
            <TabPanel>
              <Box
                maxW="container.lg"
                maxH='80vh'
                bg="tranparent"
                border="1px solid #A69AC9"
                borderRadius={8}
                paddingX={{ base: 8, lg: '96px' }}
                paddingY='128px'
                boxShadow="inset 0px 0px 48px 0px #4D359359, -8px 0px 72px 0px #4D359359"
                color="white"
                overflowY='auto'
              >
                <VStack spacing={4}
                  align='stretch'>
                  <Text fontSize="4xl" color="#7DCDDF" align='center'>
                    Guilds are groups of people offering tools or services & building projects.
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold">
                    Why join as a guild?
                  </Text>
                  <Text fontSize="2xl">
                    A bunch of reasons, actually!
                  </Text>
                  <UnorderedList fontSize="md" fontWeight="light">
                    <ListItem>Access a network of builders, early adopters & projects</ListItem>
                    <ListItem>Get help or find things you need for your guild</ListItem>
                    <ListItem>Profiles & leaderboards for your members</ListItem>
                    <ListItem>Gain visibility for your tools or services</ListItem>
                    <ListItem>Integrate your tools or services into MetaOS</ListItem>
                  </UnorderedList>
                  <Text fontSize="2xl" fontWeight="bold">
                    Before joining as a guild...
                  </Text>
                  <Text fontSize="2xl" fontWeight="normal">
                    Before trying to join as a guild, we recommend you join as a person.
                  </Text>
                  <Stack direction={['column', 'row']} spacing={10} align={{ base: 'center', lg: 'start' }}>
                    <Box h="full" w={{ base: 'full', lg: "50%" }} border="4px solid #FF00FF" borderRadius={18} display='flex' flexDir="column" alignItems='center' gap={3} p={6}>
                      <Image src={PlayerImg.src} h="50%" w="50%" borderRadius='full' />
                      <Text fontSize="2xl" fontWeight="semibold">
                        Player
                      </Text>
                      <Text fontSize='2xl' align='center'>Join MetaGame as an active member.</Text>
                      <Button colorScheme='pink'>LFG!</Button>
                    </Box>
                    <Text fontSize='2xl'>OR</Text>
                    <Box h="full" w={{ base: 'full', lg: "50%" }} border="4px solid #FF00FF" borderRadius={18} display='flex' flexDir="column" alignItems='center' gap={3} p={6}>
                      <Image src={PatronsImg.src} h="50%" w="50%" borderRadius='full' />
                      <Text fontSize="2xl" fontWeight="semibold">
                        Patron
                      </Text>
                      <Text fontSize='2xl' align='center'>Join MetaGame as a passive player.</Text>
                      <Button colorScheme='pink'>LFG!</Button>
                    </Box>
                  </Stack>
                  <Text fontSize="2xl" fontWeight="bold">
                    Tiers & Perks
                  </Text>
                  <Stack direction={['column', 'row']}>
                    <Box h="full" w={{ base: 'full', lg: "1/3" }} bg="#FFFFFF0A" display='flex' flexDir="column" alignItems='center' gap={3} p={6}>
                      <Badge borderRadius="full" variant='subtle' colorScheme="green" p={2} fontSize='0.4em'>FREE</Badge>
                      <List fontSize="md" fontWeight="light">
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Guild page in MG
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Members directory
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Your leaderboard
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Onboarding paths
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          A guild2guild meetup
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Your news inside MG
                        </ListItem>
                        <ListItem>&#8226; Post calls to action</ListItem>
                        <ListItem>&#8226; Search & filter people</ListItem>
                        <ListItem>&#8226; We shill your grant</ListItem>
                        <ListItem>&#8226; X thread about you</ListItem>
                        <ListItem>&#8226; In the follow list on X</ListItem>
                        <ListItem>&#8226; Your news in the newsletter</ListItem>
                        <ListItem>&#8226; A podcast interview</ListItem>
                        <ListItem>&#8226; Part of MetaAlliance</ListItem>
                        <ListItem>&#8226; A post about you</ListItem>
                        <ListItem>&#8226; Branch in The Onboarding Game</ListItem>
                      </List>
                    </Box>
                    <Box h="full" w={{ base: 'full', lg: "1/3" }} bg="#00000029" display='flex' flexDir="column" alignItems='center' gap={3} p={6}>
                      <Badge borderRadius="full" variant='subtle' colorScheme='purple' p={2} fontSize='0.4em'>BASIC</Badge>
                      <List fontSize="md" fontWeight="light">
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Guild page in MG
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Members directory
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Your leaderboard
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Onboarding paths
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          A guild2guild meetup
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Your news inside MG
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Post calls to action
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Search & filter people
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          We shill your grant
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          We shill your grant
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          X thread about you
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          In the follow list on X
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Your news in the newsletter
                        </ListItem>
                        <ListItem>&#8226; A podcast interview</ListItem>
                        <ListItem>&#8226; Part of MetaAlliance</ListItem>
                        <ListItem>&#8226; A post about you</ListItem>
                        <ListItem>&#8226; Branch in The Onboarding Game</ListItem>
                      </List>
                    </Box>
                    <Box h="full" w={{ base: 'full', lg: "1/3" }} bg="#FFFFFF0A" display='flex' flexDir="column" alignItems='center' gap={3} p={6}>
                      <Badge borderRadius="full" variant='subtle' colorScheme='pink' p={2} fontSize='0.4em'>PRO</Badge>
                      <List fontSize="md" fontWeight="light">
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Guild page in MG
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Members directory
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Your leaderboard
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Onboarding paths
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          A guild2guild meetup
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Your news inside MG
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Post calls to action
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Search & filter people
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          We shill your grant
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          We shill your grant
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          X thread about you
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          In the follow list on X
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Your news in the newsletter
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          A podcast interview
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Part of MetaAlliance
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          A post about you
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Branch in The Onboarding Game
                        </ListItem>
                      </List>
                    </Box>
                  </Stack>
                  <VStack align='center' spacing={4}>
                    <Text fontSize="4xl" fontWeight="semibold">
                      Decided to Join?
                    </Text>
                    <Text fontSize='2xl' fontWeight='light'>Ready to become one of the Founding Guilds of MetaGame? Apply now 👇</Text>
                    <MetaButton maxW='xs'>APPLY AS GUILD</MetaButton>
                  </VStack>
                </VStack>
              </Box>
            </TabPanel>
            <TabPanel>
              <Box
                maxW="container.lg"
                maxH='80vh'
                bg="tranparent"
                border="1px solid #A69AC9"
                borderRadius={8}
                paddingX={{ base: 8, lg: '96px' }}
                paddingY='128px'
                boxShadow="inset 0px 0px 48px 0px #4D359359, -8px 0px 72px 0px #4D359359"
                color="white"
                overflowY='auto'
              >
                <VStack spacing={4}
                  align='stretch'>
                  <Text fontSize="4xl" color="#E190E1" align='center'>
                    Patrons are here to teach, contribute liquidity & support MetaGame.
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold">
                    Why join as a patron?
                  </Text>
                  <Text fontSize="2xl">
                    Here are a few reasons:
                  </Text>
                  <UnorderedList fontSize="md" fontWeight="light">
                    <ListItem>Because you love the idea of MetaGame</ListItem>
                    <ListItem>You want to help fix the onboarding problem for the DAO space</ListItem>
                    <ListItem>You want to see building DAOs become 10x easier & better</ListItem>
                    <ListItem>Besides Web3 & DAOs, you&apos;re into ReFi, Game B & Network States</ListItem>
                    <ListItem>Membership & platform utility will be paid in Seeds</ListItem>
                  </UnorderedList>
                  <Text fontSize="2xl" fontWeight="bold">
                    Perks of joining
                  </Text>
                  <Stack direction={['column', 'row']}>
                    <Box h="full" w={{ base: 'full', lg: "50%" }} bg="#FFFFFF0A" display='flex' flexDir="column" alignItems='center' gap={3} p={6}>
                      <Badge borderRadius="full" variant='subtle' colorScheme="green" p={2} fontSize='0.4em'>VISITOR</Badge>
                      <Text fontSize="xl">FREE</Text>
                      <List fontSize="md" fontWeight="light">
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Access to educational resources
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Access to community calls
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          List of MetaAlliance guilds
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Free newsletter
                        </ListItem>
                        <ListItem>&#8226; Search & filter people</ListItem>
                        <ListItem>&#8226; Access to the community</ListItem>
                        <ListItem>&#8226; Ability to earn reputation</ListItem>
                        <ListItem>&#8226; Ability to earn Seed tokens</ListItem>
                        <ListItem>&#8226; Get ranked & unlock perks</ListItem>
                      </List>
                    </Box>
                    <Box h="full" w={{ base: 'full', lg: "50%" }} bg="#00000029" display='flex' flexDir="column" alignItems='center' gap={3} p={6}>
                      <Badge borderRadius="full" variant='subtle' colorScheme='purple' p={2} fontSize='0.4em'>MEMBER</Badge>
                      <Text fontSize="xl">$100 / year</Text>
                      <List fontSize="md" fontWeight="light">
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Access to educational resources
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Access to community calls
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          List of MetaAlliance guilds
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Free newsletter
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Search & filter people
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Access to the community
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Ability to earn reputation
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Ability to earn Seed tokens
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Get ranked & unlock perks
                        </ListItem>
                      </List>
                    </Box>
                  </Stack>
                  <Text fontSize="2xl" fontWeight="bold">
                    How to become a patron?
                  </Text>
                  <Text fontSize="2xl" fontWeight="light">
                    Ready to become one of the founding patrons of MetaGame?
                  </Text>
                  <Stack direction={['column', 'row']} spacing={10} align={{ base: 'center', lg: 'start' }}>
                    <Box h="full" w={{ base: 'full', lg: "50%" }} border="4px solid #FF00FF" borderRadius={18} display='flex' flexDir="column" alignItems='center' gap={3} p={6}>
                      <Image src={YoungPlant.src} h="50%" w="50%" borderRadius='full' />
                      <Text fontSize="2xl" fontWeight="semibold">
                        Do it yourself
                      </Text>
                      <Text fontSize='2xl' align='center'>You’ll need some Ether & RAI ready on Polygon.
                      </Text>
                      <Text fontSize='2xl' align='center'>Detailed instructions 👇</Text>
                      <Button colorScheme='pink'>YES PLS!</Button>
                    </Box>
                    <Text fontSize='2xl'>OR</Text>
                    <Box h="full" w={{ base: 'full', lg: "50%" }} border="4px solid #FF00FF" borderRadius={18} display='flex' flexDir="column" alignItems='center' gap={3} p={6}>
                      <Image src={PlayerImg.src} h="50%" w="50%" borderRadius='full' />
                      <Text fontSize="2xl" fontWeight="semibold">
                        Buy it & forget it
                      </Text>
                      <Text fontSize='2xl' align='center'>Too busy to do it manually? We got you covered!
                      </Text>
                      <Text fontSize='xl' align='center' fontWeight='bold'>For amounts over $1k only.
                      </Text>
                      <Button colorScheme='pink'>PERFECT!</Button>
                    </Box>
                  </Stack>

                  <VStack align='center' spacing={4}>
                    <Text fontSize="4xl" fontWeight="semibold">
                      Not ready?
                    </Text>
                    <MetaButton maxW='xs'>THE RABBIT HOLE</MetaButton>
                    <Text fontSize='2xl' fontWeight='light'>& / OR</Text>
                    <MetaButton maxW='xs'>THE PURPLEPAPER</MetaButton>
                  </VStack>
                </VStack>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
      <Rain top={-12} effectOpacity={0.3} />
    </FullPageContainer >
  );
};
