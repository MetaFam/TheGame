import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Image,
  Link,
  List,
  ListIcon,
  ListItem,
  MetaButton,
  Stack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  UnorderedList,
  useBreakpointValue,
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

const TabImg = ({
  type,
  isSelected,
}: {
  type: string;
  isSelected: boolean;
}) => {
  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });
  const currentImg = {
    Player: (
      <Image
        src={PlayerImg.src}
        h="full"
        w="full"
        style={{
          filter: isSelected
            ? 'grayscale(0%)'
            : 'grayscale(0%) hue-rotate(264deg)',
        }}
        boxShadow={
          isSelected && isMobile
            ? '8px 0px 72px 0px #4D3593, 0px 0px 40px 0px #4D359335'
            : 'none'
        }
      />
    ),
    Guild: (
      <Image
        src={GuildsImg.src}
        h="full"
        w="full"
        style={{
          filter: isSelected
            ? 'grayscale(0%)'
            : 'grayscale(0%) hue-rotate(264deg)',
        }}
        boxShadow={
          isSelected && isMobile
            ? '8px 0px 72px 0px #65BDC9, 0px 0px 40px 0px #65BDC970'
            : 'none'
        }
      />
    ),
    Patron: (
      <Image
        src={PatronsImg.src}
        h="full"
        w="full"
        style={{
          filter: isSelected
            ? 'grayscale(0%)'
            : 'grayscale(0%) hue-rotate(264deg)',
        }}
        boxShadow={
          isSelected && isMobile
            ? '8px 0px 72px 0px #C846C8, 0px 0px 40px 0px #C846C880'
            : 'none'
        }
      />
    ),
  }[type];
  return <Box>{currentImg}</Box>;
};

const RoleTab = React.forwardRef<
  RefObject<HTMLElement>,
  { children: React.ReactNode }
>((props, ref) => {
  const tabProps = useTab({ ...props, ref: ref as Ref<HTMLElement> });
  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });
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
      h={{ base: '60px', lg: '120px' }}
      w="120px"
      variant="outline"
      fontWeight={400}
      transform={isSelected && !isMobile ? 'scale(1.5)' : 'none'}
      transition={isMobile ? 'none' : 'transform 0.3s ease-in-out'}
      _hover={{ bg: 'transparent' }}
      _active={{ bg: 'transparent ' }}
      sx={{
        border: 0,
        borderBottom: isMobile ? `2px solid ${borderColor} !important` : 0,
        color: 'white',
      }}
      isDisabled={isDisabled}
      {...tabProps}
    >
      {!isMobile && (
        <>
          <Box
            padding={1}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="full"
            background="#361443"
            cursor={cursor}
          >
            <TabImg
              type={tabProps.children as string}
              isSelected={isSelected}
            />
          </Box>
          {tabProps.children}
        </>
      )}
      {isMobile && (
        <Flex align="center" gap={3}>
          <TabImg type={tabProps.children as string} isSelected={isSelected} />
          {tabProps.children}
        </Flex>
      )}
    </Button>
  );
});

export const NewOnboard: React.FC = () => {
  const section = 'onboard';
  const roles = ['Player', 'Guild', 'Patron'];
  const router = useRouter();
  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });
  const playerBorder = useBreakpointValue({
    base: 'none',
    lg: '1px solid #A69AC9',
  });
  const guildBorder = useBreakpointValue({
    base: 'none',
    lg: '1px solid #338B97',
  });
  const patronBorder = useBreakpointValue({
    base: 'none',
    lg: '1px solid #C846C8',
  });
  const playerBoxShadow = useBreakpointValue({
    base: 'none',
    lg: 'inset 0px 0px 48px 0px #4D359359, -8px 0px 72px 0px #4D359359',
  });
  const guildBoxShadow = useBreakpointValue({
    base: 'none',
    lg: 'inset 0px 0px 48px 0px #65BDC959, -8px 0px 72px 0px #65BDC959',
  });
  const patronBoxShadow = useBreakpointValue({
    base: 'none',
    lg: 'inset 0px 0px 48px 0px #C846C88C, -8px 0px 72px 0px #C846C859',
  });

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
        paddingY={{ base: 16, lg: 32 }}
        alignItems="center"
        justifyContent="start"
        gap={{ base: 2, lg: '40px' }}
        zIndex={5}
      >
        <Text
          fontSize={{ base: '2xl', lg: '4xl' }}
          textTransform={{ base: 'uppercase', lg: 'capitalize' }}
        >
          Join MetaGame as
        </Text>
        {!isMobile && (
          <Button
            alignSelf="start"
            variant="ghost"
            color="#D59BD5"
            _hover={{ bg: 'transparent' }}
            _active={{ bg: 'transparent ' }}
            onClick={() => router.push('/')}
          >
            <FaArrowLeft
              fontSize="0.875rem"
              style={{ display: 'inline-block', marginRight: '0.5rem' }}
            />{' '}
            Go Back
          </Button>
        )}
        <Tabs variant="unstyled">
          <TabList
            display="flex"
            justifyContent="center"
            gap={8}
            margin={{ base: 0, lg: '-80px' }}
            borderBottom={isMobile ? '2px solid #FFFFFF16' : 0}
          >
            {roles.map((role) => (
              <RoleTab>{role}</RoleTab>
            ))}
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box
                maxW="container.xl"
                maxH="container.md"
                bg="tranparent"
                border={playerBorder}
                borderRadius={8}
                paddingX={{ base: '24px', lg: '96px' }}
                paddingY={{ base: '16px', lg: '128px' }}
                boxShadow={playerBoxShadow}
                color="white"
                overflowY="auto"
              >
                <VStack spacing={4} align="stretch">
                  <Text fontSize="4xl" color="#B6A4F4" align="center">
                    Players are here to learn, get experience, contribute labor
                    and help build MetaGame.
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold">
                    Why become a player?
                  </Text>
                  <Text fontSize="2xl">A few reasons!</Text>
                  <UnorderedList fontSize="md" fontWeight="light">
                    <ListItem>
                      Learn about Web3, DAOs, ReFi & the Metacrisis
                    </ListItem>
                    <ListItem>
                      Join the ecosystem & start making friends
                    </ListItem>
                    <ListItem>
                      Start accruing reputation (XP) & tokens (Seeds)
                    </ListItem>
                    <ListItem>
                      Gain experience & increase chances of landing gigs
                    </ListItem>
                    <ListItem>Get help for starting your own project</ListItem>
                  </UnorderedList>
                  <Text fontSize="2xl" fontWeight="bold">
                    Perks of Joining
                  </Text>
                  {isMobile && (
                    <Tabs variant="soft-rounded" isFitted>
                      <TabList
                        bg="blackAlpha.500"
                        borderRadius="full"
                        paddingY={2}
                        paddingX={4}
                      >
                        <Tab
                          _selected={{ bg: 'green.200', color: 'green.900' }}
                          _active={{ bg: 'transparent' }}
                        >
                          VISITOR
                        </Tab>
                        <Tab
                          _selected={{ bg: 'pink.200', color: 'pink.900' }}
                          _active={{ bg: 'transparent' }}
                        >
                          MEMBER
                        </Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel>
                          <Box
                            h="full"
                            w={{ base: 'full', lg: '50%' }}
                            bg="#FFFFFF0A"
                            display="flex"
                            flexDir="column"
                            alignItems="center"
                            gap={3}
                            p={6}
                          >
                            <Text fontSize="xl">FREE</Text>
                            <List fontSize="md" fontWeight="light">
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Access to educational resources
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Access to community calls
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                List of MetaAlliance guilds
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Free newsletter
                              </ListItem>
                              <ListItem>
                                &#8226; Search & filter people
                              </ListItem>
                              <ListItem>
                                &#8226; Access to the community
                              </ListItem>
                              <ListItem>
                                &#8226; Ability to earn reputation
                              </ListItem>
                              <ListItem>
                                &#8226; Ability to earn Seed tokens
                              </ListItem>
                              <ListItem>
                                &#8226; Get ranked & unlock perks
                              </ListItem>
                            </List>
                          </Box>
                        </TabPanel>
                        <TabPanel>
                          <Box
                            h="full"
                            w={{ base: 'full', lg: '50%' }}
                            bg="#00000029"
                            display="flex"
                            flexDir="column"
                            alignItems="center"
                            gap={3}
                            p={6}
                          >
                            <Text fontSize="xl">Few contributions / month</Text>
                            <List fontSize="md" fontWeight="light">
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Access to educational resources
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Access to community calls
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                List of MetaAlliance guilds
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Free newsletter
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Search & filter people
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Access to the community
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Ability to earn reputation
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Ability to earn Seed tokens
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Get ranked & unlock perks
                              </ListItem>
                            </List>
                          </Box>
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  )}
                  {!isMobile && (
                    <Stack direction={['column', 'row']}>
                      <Box
                        h="full"
                        w={{ base: 'full', lg: '50%' }}
                        bg="#FFFFFF0A"
                        display="flex"
                        flexDir="column"
                        alignItems="center"
                        gap={3}
                        p={6}
                      >
                        <Badge
                          borderRadius="full"
                          variant="subtle"
                          colorScheme="green"
                          p={2}
                          fontSize="0.4em"
                        >
                          VISITOR
                        </Badge>
                        <Text fontSize="xl">FREE</Text>
                        <List fontSize="md" fontWeight="light">
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Access to educational resources
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Access to community calls
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            List of MetaAlliance guilds
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Free newsletter
                          </ListItem>
                          <ListItem>&#8226; Search & filter people</ListItem>
                          <ListItem>&#8226; Access to the community</ListItem>
                          <ListItem>
                            &#8226; Ability to earn reputation
                          </ListItem>
                          <ListItem>
                            &#8226; Ability to earn Seed tokens
                          </ListItem>
                          <ListItem>&#8226; Get ranked & unlock perks</ListItem>
                        </List>
                      </Box>
                      <Box
                        h="full"
                        w={{ base: 'full', lg: '50%' }}
                        bg="#00000029"
                        display="flex"
                        flexDir="column"
                        alignItems="center"
                        gap={3}
                        p={6}
                      >
                        <Badge
                          borderRadius="full"
                          variant="subtle"
                          colorScheme="pink"
                          p={2}
                          fontSize="0.4em"
                        >
                          MEMBER
                        </Badge>
                        <Text fontSize="xl">Few contributions / month</Text>
                        <List fontSize="md" fontWeight="light">
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Access to educational resources
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Access to community calls
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            List of MetaAlliance guilds
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Free newsletter
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Search & filter people
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Access to the community
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Ability to earn reputation
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Ability to earn Seed tokens
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Get ranked & unlock perks
                          </ListItem>
                        </List>
                      </Box>
                    </Stack>
                  )}
                  <Text fontSize="2xl" fontWeight="bold">
                    How to become a player?
                  </Text>
                  <Text fontSize="2xl">
                    Ready to rise & become one of the founders of MetaGame?
                  </Text>
                  <Stack
                    direction={['column', 'row']}
                    spacing={10}
                    align="center"
                  >
                    <Box
                      h="full"
                      w={{ base: 'full', lg: '50%' }}
                      border="4px solid #FF00FF"
                      borderRadius={18}
                      display="flex"
                      flexDir="column"
                      alignItems="center"
                      gap={3}
                      p={6}
                    >
                      <Image
                        src={BabyOctopus.src}
                        h="50%"
                        w="50%"
                        borderRadius="full"
                      />
                      <Text fontSize="2xl" fontWeight="semibold">
                        Take the path
                      </Text>
                      <Badge
                        borderRadius="full"
                        variant="subtle"
                        colorScheme="purple"
                        p={2}
                        fontSize="0.4em"
                      >
                        RECOMMENDED
                      </Badge>
                      <Text fontSize="2xl" align="center">
                        The path will take you through everything a newcomer
                        should do.
                      </Text>
                      <Button
                        colorScheme="pink"
                        onClick={() =>
                          router.push('/play/paths/engaged-octos-path')
                        }
                      >
                        SOUNDS GOOD
                      </Button>
                    </Box>
                    <Text fontSize="2xl">OR</Text>
                    <Box
                      h="full"
                      w={{ base: 'full', lg: '50%' }}
                      border="4px solid #FF00FF"
                      borderRadius={18}
                      display="flex"
                      flexDir="column"
                      alignItems="center"
                      gap={3}
                      p={6}
                    >
                      <Image
                        src={Octopus.src}
                        h="50%"
                        w="50%"
                        borderRadius="full"
                      />
                      <Text fontSize="2xl" fontWeight="semibold">
                        Jump into action
                      </Text>
                      <Text fontSize="2xl" fontWeight="normal">
                        Too busy?
                      </Text>
                      <Text fontSize="2xl" align="center">
                        You can jump straight into action, just say so in the
                        #🏟-metasquare
                      </Text>
                      <Link href="https://chat.metagame.wtf">
                        <Button colorScheme="pink">LFG!</Button>
                      </Link>
                    </Box>
                  </Stack>
                </VStack>
              </Box>
            </TabPanel>
            <TabPanel>
              <Box
                maxW="container.xl"
                maxH="container.md"
                bg="tranparent"
                border={guildBorder}
                borderRadius={8}
                paddingX={{ base: '24px', lg: '96px' }}
                paddingY={{ base: '16px', lg: '128px' }}
                boxShadow={guildBoxShadow}
                color="white"
                overflowY="auto"
              >
                <VStack spacing={4} align="stretch">
                  <Text fontSize="4xl" color="#7DCDDF" align="center">
                    Guilds are groups of people offering tools or services &
                    building projects.
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold">
                    Why join as a guild?
                  </Text>
                  <Text fontSize="2xl">A bunch of reasons, actually!</Text>
                  <UnorderedList fontSize="md" fontWeight="light">
                    <ListItem>
                      Access a network of builders, early adopters & projects
                    </ListItem>
                    <ListItem>
                      Get help or find things you need for your guild
                    </ListItem>
                    <ListItem>
                      Profiles & leaderboards for your members
                    </ListItem>
                    <ListItem>
                      Gain visibility for your tools or services
                    </ListItem>
                    <ListItem>
                      Integrate your tools or services into MetaOS
                    </ListItem>
                  </UnorderedList>
                  <Text fontSize="2xl" fontWeight="bold">
                    Before joining as a guild...
                  </Text>
                  <Text fontSize="2xl" fontWeight="normal">
                    Before trying to join as a guild, we recommend you join as a
                    person.
                  </Text>
                  <Stack
                    direction={['column', 'row']}
                    spacing={10}
                    align="center"
                  >
                    <Box
                      h="full"
                      w={{ base: 'full', lg: '50%' }}
                      border="4px solid #FF00FF"
                      borderRadius={18}
                      display="flex"
                      flexDir="column"
                      alignItems="center"
                      gap={3}
                      p={6}
                    >
                      <Image
                        src={PlayerImg.src}
                        h="50%"
                        w="50%"
                        borderRadius="full"
                      />
                      <Text fontSize="2xl" fontWeight="semibold">
                        Player
                      </Text>
                      <Text fontSize="2xl" align="center">
                        Join MetaGame as an active member.
                      </Text>
                      <Button
                        colorScheme="pink"
                        onClick={() =>
                          router.push('/play/paths/engaged-octos-path')
                        }
                      >
                        LFG!
                      </Button>
                    </Box>
                    <Text fontSize="2xl">OR</Text>
                    <Box
                      h="full"
                      w={{ base: 'full', lg: '50%' }}
                      border="4px solid #FF00FF"
                      borderRadius={18}
                      display="flex"
                      flexDir="column"
                      alignItems="center"
                      gap={3}
                      p={6}
                    >
                      <Image
                        src={PatronsImg.src}
                        h="50%"
                        w="50%"
                        borderRadius="full"
                      />
                      <Text fontSize="2xl" fontWeight="semibold">
                        Patron
                      </Text>
                      <Text fontSize="2xl" align="center">
                        Join MetaGame as a passive player.
                      </Text>
                      <Button
                        colorScheme="pink"
                        onClick={() => router.push('/join/patron')}
                      >
                        LFG!
                      </Button>
                    </Box>
                  </Stack>
                  <Text fontSize="2xl" fontWeight="bold">
                    Tiers & Perks
                  </Text>
                  {isMobile && (
                    <Tabs variant="soft-rounded" isFitted>
                      <TabList
                        bg="blackAlpha.500"
                        borderRadius="full"
                        paddingY={2}
                        paddingX={4}
                      >
                        <Tab
                          _selected={{ bg: 'green.400', color: 'white' }}
                          _active={{ bg: 'transparent' }}
                        >
                          FREE
                        </Tab>
                        <Tab
                          _selected={{ bg: '#6A88DF', color: 'white' }}
                          _active={{ bg: 'transparent' }}
                        >
                          BASIC
                        </Tab>
                        <Tab
                          _selected={{ bg: '#ED61C5', color: 'white' }}
                          _active={{ bg: 'transparent' }}
                        >
                          PRO
                        </Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel>
                          <Box
                            h="xl"
                            w="full"
                            bg="#FFFFFF0A"
                            display="flex"
                            flexDir="column"
                            alignItems="center"
                            gap={3}
                            p={6}
                          >
                            <Text fontSize="xl" fontWeight="semibold">
                              $0
                            </Text>
                            <Text fontSize="xl" fontWeight="light">
                              FOR BROKE GUILDS
                            </Text>
                            <List fontSize="md" fontWeight="light">
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Guild page in MG
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Members directory
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Your leaderboard
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Onboarding paths
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                A guild2guild meetup
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Your news inside MG
                              </ListItem>
                              <ListItem>&#8226; Post calls to action</ListItem>
                              <ListItem>
                                &#8226; Search & filter people
                              </ListItem>
                              <ListItem>&#8226; We shill your grant</ListItem>
                              <ListItem>&#8226; X thread about you</ListItem>
                              <ListItem>
                                &#8226; In the follow list on X
                              </ListItem>
                              <ListItem>
                                &#8226; Your news in the newsletter
                              </ListItem>
                              <ListItem>&#8226; A podcast interview</ListItem>
                              <ListItem>&#8226; Part of MetaAlliance</ListItem>
                              <ListItem>&#8226; A post about you</ListItem>
                              <ListItem>
                                &#8226; Branch in The Onboarding Game
                              </ListItem>
                            </List>
                          </Box>
                        </TabPanel>
                        <TabPanel>
                          <Box
                            h="xl"
                            w="full"
                            bg="#00000029"
                            display="flex"
                            flexDir="column"
                            alignItems="center"
                            gap={3}
                            p={6}
                          >
                            <Text fontSize="xl" fontWeight="semibold">
                              $800 / year
                            </Text>
                            <Text fontSize="xl" fontWeight="light">
                              FOR ESTABLISHED GUILDS
                            </Text>
                            <List fontSize="md" fontWeight="light">
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Guild page in MG
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Members directory
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Your leaderboard
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Onboarding paths
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                A guild2guild meetup
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Your news inside MG
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Post calls to action
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Search & filter people
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                We shill your grant
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                We shill your grant
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                X thread about you
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                In the follow list on X
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Your news in the newsletter
                              </ListItem>
                              <ListItem>&#8226; A podcast interview</ListItem>
                              <ListItem>&#8226; Part of MetaAlliance</ListItem>
                              <ListItem>&#8226; A post about you</ListItem>
                              <ListItem>
                                &#8226; Branch in The Onboarding Game
                              </ListItem>
                            </List>
                          </Box>
                        </TabPanel>
                        <TabPanel>
                          <Box
                            h="xl"
                            w="full"
                            bg="#FFFFFF0A"
                            display="flex"
                            flexDir="column"
                            alignItems="center"
                            gap={3}
                            p={6}
                          >
                            <Text fontSize="xl" fontWeight="semibold">
                              $8K / year
                            </Text>
                            <Text fontSize="xl" fontWeight="light">
                              FOR WELL-OFF GUILDS
                            </Text>
                            <List fontSize="md" fontWeight="light">
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Guild page in MG
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Members directory
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Your leaderboard
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Onboarding paths
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                A guild2guild meetup
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Your news inside MG
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Post calls to action
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Search & filter people
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                We shill your grant
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                We shill your grant
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                X thread about you
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                In the follow list on X
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Your news in the newsletter
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                A podcast interview
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Part of MetaAlliance
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                A post about you
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Branch in The Onboarding Game
                              </ListItem>
                            </List>
                          </Box>
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  )}
                  {!isMobile && (
                    <Stack direction={['column', 'row']}>
                      <Box
                        h="xl"
                        w={{ base: 'full', lg: '1/3' }}
                        bg="#FFFFFF0A"
                        display="flex"
                        flexDir="column"
                        alignItems="center"
                        gap={3}
                        p={6}
                      >
                        <Badge
                          borderRadius="full"
                          variant="subtle"
                          colorScheme="green"
                          p={2}
                          fontSize="0.4em"
                        >
                          FREE
                        </Badge>
                        <Text fontSize="xl" fontWeight="semibold">
                          $0
                        </Text>
                        <Text fontSize="xl" fontWeight="light">
                          FOR BROKE GUILDS
                        </Text>
                        <List fontSize="md" fontWeight="light">
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Guild page in MG
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Members directory
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Your leaderboard
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Onboarding paths
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />A
                            guild2guild meetup
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Your news inside MG
                          </ListItem>
                          <ListItem>&#8226; Post calls to action</ListItem>
                          <ListItem>&#8226; Search & filter people</ListItem>
                          <ListItem>&#8226; We shill your grant</ListItem>
                          <ListItem>&#8226; X thread about you</ListItem>
                          <ListItem>&#8226; In the follow list on X</ListItem>
                          <ListItem>
                            &#8226; Your news in the newsletter
                          </ListItem>
                          <ListItem>&#8226; A podcast interview</ListItem>
                          <ListItem>&#8226; Part of MetaAlliance</ListItem>
                          <ListItem>&#8226; A post about you</ListItem>
                          <ListItem>
                            &#8226; Branch in The Onboarding Game
                          </ListItem>
                        </List>
                      </Box>
                      <Box
                        h="xl"
                        w={{ base: 'full', lg: '1/3' }}
                        bg="#00000029"
                        display="flex"
                        flexDir="column"
                        alignItems="center"
                        gap={3}
                        p={6}
                      >
                        <Badge
                          borderRadius="full"
                          variant="subtle"
                          colorScheme="purple"
                          p={2}
                          fontSize="0.4em"
                        >
                          BASIC
                        </Badge>
                        <Text fontSize="xl" fontWeight="semibold">
                          $800 / year
                        </Text>
                        <Text fontSize="xl" fontWeight="light">
                          FOR ESTABLISHED GUILDS
                        </Text>
                        <List fontSize="md" fontWeight="light">
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Guild page in MG
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Members directory
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Your leaderboard
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Onboarding paths
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />A
                            guild2guild meetup
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Your news inside MG
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Post calls to action
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Search & filter people
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            We shill your grant
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            We shill your grant
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />X
                            thread about you
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            In the follow list on X
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Your news in the newsletter
                          </ListItem>
                          <ListItem>&#8226; A podcast interview</ListItem>
                          <ListItem>&#8226; Part of MetaAlliance</ListItem>
                          <ListItem>&#8226; A post about you</ListItem>
                          <ListItem>
                            &#8226; Branch in The Onboarding Game
                          </ListItem>
                        </List>
                      </Box>
                      <Box
                        h="xl"
                        w={{ base: 'full', lg: '1/3' }}
                        bg="#FFFFFF0A"
                        display="flex"
                        flexDir="column"
                        alignItems="center"
                        gap={3}
                        p={6}
                      >
                        <Badge
                          borderRadius="full"
                          variant="subtle"
                          colorScheme="pink"
                          p={2}
                          fontSize="0.4em"
                        >
                          PRO
                        </Badge>
                        <Text fontSize="xl" fontWeight="semibold">
                          $8K / year
                        </Text>
                        <Text fontSize="xl" fontWeight="light">
                          FOR WELL-OFF GUILDS
                        </Text>
                        <List fontSize="md" fontWeight="light">
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Guild page in MG
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Members directory
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Your leaderboard
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Onboarding paths
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />A
                            guild2guild meetup
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Your news inside MG
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Post calls to action
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Search & filter people
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            We shill your grant
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            We shill your grant
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />X
                            thread about you
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            In the follow list on X
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Your news in the newsletter
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />A
                            podcast interview
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Part of MetaAlliance
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />A
                            post about you
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Branch in The Onboarding Game
                          </ListItem>
                        </List>
                      </Box>
                    </Stack>
                  )}
                  <VStack align="center" spacing={4}>
                    <Text fontSize="4xl" fontWeight="semibold">
                      Decided to Join?
                    </Text>
                    <Text fontSize="2xl" fontWeight="light">
                      Ready to become one of the Founding Guilds of MetaGame?
                      Apply now 👇
                    </Text>
                    <Link href="https://form.typeform.com/to/V5YNcdMQ">
                      <MetaButton maxW="xs">APPLY AS GUILD</MetaButton>
                    </Link>
                  </VStack>
                </VStack>
              </Box>
            </TabPanel>
            <TabPanel>
              <Box
                maxW="container.xl"
                maxH="container.md"
                bg="tranparent"
                border={patronBorder}
                borderRadius={8}
                paddingX={{ base: '24px', lg: '96px' }}
                paddingY={{ base: '16px', lg: '128px' }}
                boxShadow={patronBoxShadow}
                color="white"
                overflowY="auto"
              >
                <VStack spacing={4} align="stretch">
                  <Text fontSize="4xl" color="#E190E1" align="center">
                    Patrons are here to teach, contribute liquidity & support
                    MetaGame.
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold">
                    Why join as a patron?
                  </Text>
                  <Text fontSize="2xl">Here are a few reasons:</Text>
                  <UnorderedList fontSize="md" fontWeight="light">
                    <ListItem>Because you love the idea of MetaGame</ListItem>
                    <ListItem>
                      You want to help fix the onboarding problem for the DAO
                      space
                    </ListItem>
                    <ListItem>
                      You want to see building DAOs become 10x easier & better
                    </ListItem>
                    <ListItem>
                      Besides Web3 & DAOs, you&apos;re into ReFi, Game B &
                      Network States
                    </ListItem>
                    <ListItem>
                      Membership & platform utility will be paid in Seeds
                    </ListItem>
                  </UnorderedList>
                  <Text fontSize="2xl" fontWeight="bold">
                    Perks of joining
                  </Text>
                  {isMobile && (
                    <Tabs variant="soft-rounded" isFitted>
                      <TabList
                        bg="blackAlpha.500"
                        borderRadius="full"
                        paddingY={2}
                        paddingX={4}
                      >
                        <Tab
                          _selected={{ bg: 'green.200', color: 'green.900' }}
                          _active={{ bg: 'transparent' }}
                        >
                          VISITOR
                        </Tab>
                        <Tab
                          _selected={{ bg: 'pink.200', color: 'pink.900' }}
                          _active={{ bg: 'transparent' }}
                        >
                          MEMBER
                        </Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel>
                          <Box
                            h="full"
                            w="full"
                            bg="#FFFFFF0A"
                            display="flex"
                            flexDir="column"
                            alignItems="center"
                            gap={3}
                            p={6}
                          >
                            <Text fontSize="xl">FREE</Text>
                            <List fontSize="md" fontWeight="light">
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Access to educational resources
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Access to community calls
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                List of MetaAlliance guilds
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Free newsletter
                              </ListItem>
                              <ListItem>
                                &#8226; Search & filter people
                              </ListItem>
                              <ListItem>
                                &#8226; Access to the community
                              </ListItem>
                              <ListItem>
                                &#8226; Ability to earn reputation
                              </ListItem>
                              <ListItem>
                                &#8226; Ability to earn Seed tokens
                              </ListItem>
                              <ListItem>
                                &#8226; Get ranked & unlock perks
                              </ListItem>
                            </List>
                          </Box>
                        </TabPanel>
                        <TabPanel>
                          <Box
                            h="full"
                            w="full"
                            bg="#00000029"
                            display="flex"
                            flexDir="column"
                            alignItems="center"
                            gap={3}
                            p={6}
                          >
                            <Text fontSize="xl">$100 / year</Text>
                            <List fontSize="md" fontWeight="light">
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Access to educational resources
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Access to community calls
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                List of MetaAlliance guilds
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Free newsletter
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Search & filter people
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Access to the community
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Ability to earn reputation
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Ability to earn Seed tokens
                              </ListItem>
                              <ListItem>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                Get ranked & unlock perks
                              </ListItem>
                            </List>
                          </Box>
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  )}
                  {!isMobile && (
                    <Stack direction={['column', 'row']}>
                      <Box
                        h="full"
                        w={{ base: 'full', lg: '50%' }}
                        bg="#FFFFFF0A"
                        display="flex"
                        flexDir="column"
                        alignItems="center"
                        gap={3}
                        p={6}
                      >
                        <Badge
                          borderRadius="full"
                          variant="subtle"
                          colorScheme="green"
                          p={2}
                          fontSize="0.4em"
                        >
                          VISITOR
                        </Badge>
                        <Text fontSize="xl">FREE</Text>
                        <List fontSize="md" fontWeight="light">
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Access to educational resources
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Access to community calls
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            List of MetaAlliance guilds
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Free newsletter
                          </ListItem>
                          <ListItem>&#8226; Search & filter people</ListItem>
                          <ListItem>&#8226; Access to the community</ListItem>
                          <ListItem>
                            &#8226; Ability to earn reputation
                          </ListItem>
                          <ListItem>
                            &#8226; Ability to earn Seed tokens
                          </ListItem>
                          <ListItem>&#8226; Get ranked & unlock perks</ListItem>
                        </List>
                      </Box>
                      <Box
                        h="full"
                        w={{ base: 'full', lg: '50%' }}
                        bg="#00000029"
                        display="flex"
                        flexDir="column"
                        alignItems="center"
                        gap={3}
                        p={6}
                      >
                        <Badge
                          borderRadius="full"
                          variant="subtle"
                          colorScheme="purple"
                          p={2}
                          fontSize="0.4em"
                        >
                          MEMBER
                        </Badge>
                        <Text fontSize="xl">$100 / year</Text>
                        <List fontSize="md" fontWeight="light">
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Access to educational resources
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Access to community calls
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            List of MetaAlliance guilds
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Free newsletter
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Search & filter people
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Access to the community
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Ability to earn reputation
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Ability to earn Seed tokens
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            Get ranked & unlock perks
                          </ListItem>
                        </List>
                      </Box>
                    </Stack>
                  )}
                  <Text fontSize="2xl" fontWeight="bold">
                    How to become a patron?
                  </Text>
                  <Text fontSize="2xl" fontWeight="light">
                    Ready to become one of the founding patrons of MetaGame?
                  </Text>
                  <Stack
                    direction={['column', 'row']}
                    spacing={10}
                    align="center"
                  >
                    <Box
                      h="full"
                      w={{ base: 'full', lg: '50%' }}
                      border="4px solid #FF00FF"
                      borderRadius={18}
                      display="flex"
                      flexDir="column"
                      alignItems="center"
                      gap={3}
                      p={6}
                    >
                      <Image
                        src={YoungPlant.src}
                        h="50%"
                        w="50%"
                        borderRadius="full"
                      />
                      <Text fontSize="2xl" fontWeight="semibold">
                        Do it yourself
                      </Text>
                      <Text fontSize="2xl" align="center">
                        You’ll need some Ether & RAI ready on Polygon.
                      </Text>
                      <Text fontSize="2xl" align="center">
                        Detailed instructions 👇
                      </Text>
                      <Button
                        colorScheme="pink"
                        onClick={() => router.push('/join/patron')}
                      >
                        YES PLS!
                      </Button>
                    </Box>
                    <Text fontSize="2xl">OR</Text>
                    <Box
                      h="full"
                      w={{ base: 'full', lg: '50%' }}
                      border="4px solid #FF00FF"
                      borderRadius={18}
                      display="flex"
                      flexDir="column"
                      alignItems="center"
                      gap={3}
                      p={6}
                    >
                      <Image
                        src={PlayerImg.src}
                        h="50%"
                        w="50%"
                        borderRadius="full"
                      />
                      <Text fontSize="2xl" fontWeight="semibold">
                        Buy it & forget it
                      </Text>
                      <Text fontSize="2xl" align="center">
                        Too busy to do it manually? We got you covered!
                      </Text>
                      <Text fontSize="xl" align="center" fontWeight="bold">
                        For amounts over $1k only.
                      </Text>
                      <Button colorScheme="pink">PERFECT!</Button>
                    </Box>
                  </Stack>

                  <VStack align="center" spacing={4}>
                    <Text fontSize="4xl" fontWeight="semibold">
                      Not ready?
                    </Text>
                    <MetaButton maxW="xs">THE RABBIT HOLE</MetaButton>
                    <Text fontSize="2xl" fontWeight="light">
                      & / OR
                    </Text>
                    <MetaButton maxW="xs">THE PURPLEPAPER</MetaButton>
                  </VStack>
                </VStack>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
      <Rain top={-12} effectOpacity={0.3} />
    </FullPageContainer>
  );
};
