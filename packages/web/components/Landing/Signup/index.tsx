import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Link,
  ListItem,
  MetaButton,
  Stack,
  Tab,
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

import { Rain } from '../OnboardingGame/Rain';
import { PerksCard, RoleCard } from './Cards';
import {
  guildBasicList,
  guildFreeList,
  guildProList,
  guildReasons,
  patronFreeList,
  patronMemberList,
  patronReasons,
  playerMemberList,
  playerReasons,
  playerVisitorList,
} from './lists';

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

const getBorderColor = ({
  isSelected,
  tabProps,
}: {
  isSelected: boolean;
  tabProps: any;
}) => {
  let borderColor = 'transparent';
  if (isSelected && tabProps.tabIndex === 0 && tabProps.children === 'Player')
    borderColor = '#A69AC9';
  if (isSelected && tabProps.tabIndex === 0 && tabProps.children === 'Guild')
    borderColor = '#338B97';
  if (isSelected && tabProps.tabIndex === 0 && tabProps.children === 'Patron')
    borderColor = '#C846C8';
  return borderColor;
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
        borderBottom: isMobile
          ? `2px solid ${getBorderColor({ isSelected, tabProps })} !important`
          : 0,
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
            borderColor={getBorderColor({ isSelected, tabProps })}
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

export const Signup: React.FC = () => {
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
                    {playerReasons.map((reason, idx) => (
                      <ListItem key={idx}>{reason}</ListItem>
                    ))}
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
                          <PerksCard
                            type="Free"
                            list={playerVisitorList}
                            width="50%"
                            background="#FFFFFF0A"
                          />
                        </TabPanel>
                        <TabPanel>
                          <PerksCard
                            type="Few contributions / month"
                            list={playerMemberList}
                            width="50%"
                            background="#00000029"
                          />
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  )}
                  {!isMobile && (
                    <Stack direction={['column', 'row']} gap={0}>
                      <PerksCard
                        title="Visitor"
                        type="Free"
                        list={playerVisitorList}
                        width="50%"
                        background="#FFFFFF0A"
                        badgeColor="green"
                      />
                      <PerksCard
                        title="Member"
                        type="Few contributions / month"
                        list={playerMemberList}
                        width="50%"
                        background="#00000029"
                        badgeColor="pink"
                      />
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
                    spacing={{ base: 5, lg: 10 }}
                    align="center"
                  >
                    <RoleCard
                      title="Take the path"
                      image={BabyOctopus.src}
                      description={
                        <Text
                          fontSize={{ base: 'lg', lg: '2xl' }}
                          align="center"
                        >
                          The path will take you through everything a newcomer
                          should do.
                        </Text>
                      }
                      recommended
                      action="Sounds Good"
                      route="/start"
                    />
                    <Text fontSize="2xl">OR</Text>
                    <RoleCard
                      title="Jump into action"
                      image={Octopus.src}
                      description={
                        <Text
                          fontSize={{ base: 'lg', lg: '2xl' }}
                          align="center"
                        >
                          Too busy? You can jump straight into action, just say
                          so in the #🏟-metasquare
                        </Text>
                      }
                      action="Let's Go!"
                      link="https://discord.gg/dMqAW8veKT"
                    />
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
                    {guildReasons.map((reason, idx) => (
                      <ListItem key={idx}>{reason}</ListItem>
                    ))}
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
                    spacing={{ base: 5, lg: 10 }}
                    align="center"
                  >
                    <RoleCard
                      title="Player"
                      image={PlayerImg.src}
                      description={
                        <Text
                          fontSize={{ base: 'lg', lg: '2xl' }}
                          align="center"
                        >
                          Join MetaGame as an active member.
                        </Text>
                      }
                      action="Let's Go!"
                      route="/start"
                    />
                    <Text fontSize="2xl">OR</Text>
                    <RoleCard
                      title="Patron"
                      image={PatronsImg.src}
                      description={
                        <Text
                          fontSize={{ base: 'lg', lg: '2xl' }}
                          align="center"
                        >
                          Join MetaGame as a passive player.
                        </Text>
                      }
                      action="Let's Go!"
                      route="/join/patron"
                    />
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
                          <PerksCard
                            description={
                              <>
                                <Text fontSize="xl" fontWeight="semibold">
                                  $0
                                </Text>
                                <Text fontSize="xl" fontWeight="light">
                                  FOR BROKE GUILDS
                                </Text>
                              </>
                            }
                            list={guildFreeList}
                            width="50%"
                            background="#FFFFFF0A"
                          />
                        </TabPanel>
                        <TabPanel>
                          <PerksCard
                            description={
                              <>
                                <Text fontSize="xl" fontWeight="semibold">
                                  $800 / year
                                </Text>
                                <Text fontSize="xl" fontWeight="light">
                                  FOR ESTABLISHED GUILDS
                                </Text>
                              </>
                            }
                            list={guildBasicList}
                            width="50%"
                            background="#00000029"
                          />
                        </TabPanel>
                        <TabPanel>
                          <PerksCard
                            description={
                              <>
                                <Text fontSize="xl" fontWeight="semibold">
                                  $8K / year
                                </Text>
                                <Text fontSize="xl" fontWeight="light">
                                  FOR WELL-OFF GUILDS
                                </Text>
                              </>
                            }
                            list={guildProList}
                            width="50%"
                            background="#FFFFFF0A"
                          />
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  )}
                  {!isMobile && (
                    <Stack direction={['column', 'row']} gap={0}>
                      <PerksCard
                        title="Free"
                        description={
                          <>
                            <Text fontSize="xl" fontWeight="semibold">
                              $0
                            </Text>
                            <Text fontSize="xl" fontWeight="light">
                              FOR BROKE GUILDS
                            </Text>
                          </>
                        }
                        list={guildFreeList}
                        width="1/3"
                        background="#FFFFFF0A"
                        badgeColor="green"
                      />
                      <PerksCard
                        title="Basic"
                        description={
                          <>
                            <Text fontSize="xl" fontWeight="semibold">
                              $800 / year
                            </Text>
                            <Text fontSize="xl" fontWeight="light">
                              FOR ESTABLISHED GUILDS
                            </Text>
                          </>
                        }
                        list={guildBasicList}
                        width="1/3"
                        background="#00000029"
                        badgeColor="purple"
                      />
                      <PerksCard
                        title="Pro"
                        description={
                          <>
                            <Text fontSize="xl" fontWeight="semibold">
                              $8K / year
                            </Text>
                            <Text fontSize="xl" fontWeight="light">
                              FOR WELL-OFF GUILDS
                            </Text>
                          </>
                        }
                        list={guildProList}
                        width="1/3"
                        background="#FFFFFF0A"
                        badgeColor="pink"
                      />
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
                    <Link href="https://tally.so/r/3EdORl">
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
                    {patronReasons.map((reason, idx) => (
                      <ListItem key={idx}>{reason}</ListItem>
                    ))}
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
                          <PerksCard
                            description={
                              <Text fontSize="xl" fontWeight="semibold">
                                FREE
                              </Text>
                            }
                            list={patronFreeList}
                            width="50%"
                            background="#FFFFFF0A"
                          />
                        </TabPanel>
                        <TabPanel>
                          <PerksCard
                            description={<Text fontSize="xl">$100 / YEAR</Text>}
                            list={patronMemberList}
                            width="50%"
                            background="#00000029"
                          />
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  )}
                  {!isMobile && (
                    <Stack direction={['column', 'row']} gap={0}>
                      <PerksCard
                        title="Visitor"
                        description={<Text fontSize="xl">FREE</Text>}
                        list={patronFreeList}
                        width="50%"
                        badgeColor="green"
                        background="#FFFFFF0A"
                      />
                      <PerksCard
                        title="Member"
                        description={<Text fontSize="xl">$100 / YEAR</Text>}
                        list={patronMemberList}
                        width="50%"
                        badgeColor="purple"
                        background="#00000029"
                      />
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
                    spacing={{ base: 5, lg: 10 }}
                    align="center"
                  >
                    <RoleCard
                      title="Do it yourself"
                      image={YoungPlant.src}
                      description={
                        <>
                          <Text fontSize="2xl" align="center">
                            You’ll need some Ether & RAI ready on Polygon.
                          </Text>
                          <Text fontSize="2xl" align="center">
                            Detailed instructions {isMobile ? '👉' : '👇'}
                          </Text>
                        </>
                      }
                      action="Yes Pls!"
                      route="/join/patron"
                    />
                    <Text fontSize="2xl">OR</Text>
                    <RoleCard
                      title="Buy it & forget it"
                      image={PlayerImg.src}
                      description={
                        <>
                          <Text fontSize="2xl" align="center">
                            Too busy to do it manually? We got you covered!
                          </Text>
                          <Text fontSize="xl" align="center" fontWeight="bold">
                            For amounts over $1k only.
                          </Text>
                        </>
                      }
                      action="Perfect!"
                      link="https://tally.so/r/w4Jb6r"
                    />
                  </Stack>
                  <VStack align="center" spacing={4}>
                    <Text fontSize="4xl" fontWeight="semibold">
                      Not ready?
                    </Text>
                    <MetaButton maxW="xs" onClick={() => router.push('/start')}>
                      THE RABBIT HOLE
                    </MetaButton>
                    <Text fontSize="2xl" fontWeight="light">
                      & / OR
                    </Text>
                    <Link href="https://docs.google.com/document/d/1RoOaW8CR0puEanY0VGtcMbDYH77djkzOPgRSd1nCFJ4/edit#">
                      <MetaButton maxW="xs">THE PURPLEPAPER</MetaButton>
                    </Link>
                  </VStack>
                </VStack>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
      <Rain effectOpacity={0.2} />
    </FullPageContainer>
  );
};
