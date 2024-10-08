import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  List,
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
import { useRouter } from 'next/router';
import React, { Ref, RefObject, useState } from 'react';

import GuildsImg from '#assets/guilds-sun_800x800.webp';
import PatronsImg from '#assets/patrons-sun_800x820.webp';
import PlayerImg from '#assets/players-sun_800x822.webp';
import { FullPageContainer } from '#components/Container';

import { Rain } from '../OnboardingGame/Rain';
import { PerksCard, PerksChecklist, RoleCard } from './Cards';
import {
  guildPerks,
  guildPerksList,
  guildReasons,
  patronPerks,
  patronReasons,
  PerkType,
  playerPerks,
  playerReasons,
  roles,
  RoleTitle,
} from './data';

const tabs = ['Player', 'Guild', 'Patron'];
const bgColors = ['green.200', '#6A88DF', '#ED61C5'];
const textColors = ['green.900', 'purple.900', 'pink.900'];

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tabProps: any;
}) => {
  let borderColor = 'transparent';
  if (isSelected && tabProps.tabIndex === 0 && tabProps.children === roles[0])
    borderColor = '#A69AC9';
  if (isSelected && tabProps.tabIndex === 0 && tabProps.children === roles[1])
    borderColor = '#338B97';
  if (
    isSelected &&
    tabProps.tabIndex === 0 &&
    tabProps.children === roles[roles.length - 1]
  )
    borderColor = '#C846C8';
  return borderColor;
};

const RoleTab = React.forwardRef<
  RefObject<HTMLElement>,
  { children: React.ReactNode }
>((props, ref) => {
  const tabProps = useTab({ ...props, ref: ref as Ref<HTMLElement> });
  const { query } = useRouter();
  const activeTab = query.tab ?? RoleTitle.Player;
  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });
  const styles = useMultiStyleConfig('Tabs', tabProps);
  const isSelected =
    !!tabProps['aria-selected'] &&
    activeTab === (tabProps.children as string).toLowerCase();
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
      zIndex={100}
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
      aria-selected={activeTab === (tabProps.children as string).toLowerCase()}
    >
      {isMobile ? (
        <Flex align="center" gap={3}>
          <TabImg type={tabProps.children as string} isSelected={isSelected} />
          {tabProps.children}
        </Flex>
      ) : (
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
    </Button>
  );
});

export const Signup: React.FC = () => {
  const section = 'signup';
  const router = useRouter();
  const activeTab = router.query.tab ?? RoleTitle.Player;
  const [hasRedirected, setHasRedirected] = useState(false);

  if (router.asPath === '/signup' && !hasRedirected) {
    router.push(
      { href: router.asPath, query: { tab: RoleTitle.Player } },
      undefined,
      { shallow: true },
    );
    setHasRedirected(true);
  }

  const selectedIndex =
    tabs.map((tab) => tab.toLowerCase()).indexOf(activeTab as string) ?? 0;
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

  if (!router.isReady) {
    return null;
  }

  return (
    <FullPageContainer
      id={section}
      overflow="clip"
      fontSize={{ base: 'xl', md: '5xl' }}
    >
      <Container
        display="flex"
        flexDirection="column"
        maxW={{ base: 'full', md: '7xl', '2xl': '8xl' }}
        height="auto"
        paddingY={{ base: 8, lg: 32 }}
        alignItems="center"
        justifyContent="start"
        gap={{ base: 2, lg: '40px' }}
        zIndex={5}
      >
        <Tabs
          mt={{ lg: '5em', base: '2em' }}
          variant="unstyled"
          index={selectedIndex}
          defaultIndex={selectedIndex}
          onChange={(index: number) => {
            const tab = tabs.at(index)?.toLowerCase();
            router.replace({ href: '/signup', query: { tab } }, undefined, {
              shallow: true,
            });
          }}
          p={1}
        >
          <TabList
            display="flex"
            justifyContent="center"
            gap={8}
            margin={{ base: 0, lg: '-80px' }}
            borderBottom={isMobile ? '2px solid #FFFFFF16' : 0}
          >
            {tabs.map((tab, idx) => (
              <RoleTab key={idx}>{tab}</RoleTab>
            ))}
          </TabList>
          <TabPanels>
            <TabPanel
              paddingY={{ base: 0, lg: 'initial' }}
              border={playerBorder}
              boxShadow={playerBoxShadow}
              borderRadius={8}
            >
              <Box
                maxW="container.lg"
                maxH="container.md"
                bg="transparent"
                paddingX={{ base: '24px', lg: '96px' }}
                paddingY={{ base: '10px', lg: '128px' }}
                sx={{
                  maskImage: isMobile
                    ? 'unset'
                    : 'linear-gradient(to top, rgba(0, 0, 0, 1) 78%, rgba(0, 0, 0, 0) 96%);',
                }}
                color="white"
                overflowY="auto"
              >
                <VStack spacing="56px" align="stretch">
                  <VStack spacing="16px" align="start">
                    <Text
                      fontSize={{ base: '2xl', lg: '4xl' }}
                      color="#B6A4F4"
                      alignSelf={{ base: 'start', lg: 'center' }}
                    >
                      Learn, earn, grow & build MetaGame.
                    </Text>
                    <Text
                      fontSize={{ base: 'xl', lg: '2xl' }}
                      fontWeight="bold"
                    >
                      Why become a player?
                    </Text>
                    <Text fontSize={{ base: 'xl', lg: '2xl' }}>
                      A few reasons!
                    </Text>
                    <UnorderedList fontSize="md" fontWeight="light" spacing={2}>
                      {playerReasons.map((reason, idx) => (
                        <ListItem key={idx}>{reason}</ListItem>
                      ))}
                    </UnorderedList>
                  </VStack>
                  <VStack spacing="24px" align="start">
                    <Text
                      fontSize={{ base: 'xl', lg: '2xl' }}
                      fontWeight="bold"
                    >
                      Perks of Joining
                    </Text>
                    {isMobile ? (
                      <Tabs variant="soft-rounded" isFitted>
                        <TabList
                          bg="blackAlpha.500"
                          borderRadius="full"
                          paddingY={2}
                          paddingX={4}
                        >
                          {playerPerks.map((perk, index) => (
                            <Tab
                              key={index}
                              _selected={{
                                bg: bgColors[index] || 'defaultColor',
                                color: textColors[index] || 'defaultColor',
                              }}
                              _active={{ bg: 'transparent' }}
                              textTransform="uppercase"
                            >
                              {perk.title}
                            </Tab>
                          ))}
                        </TabList>
                        <TabPanels>
                          {playerPerks.map((perk, index) => (
                            <TabPanel key={index}>
                              <PerksCard
                                {...perk}
                                id={index === 0 ? 'visitor' : 'member'}
                              />
                            </TabPanel>
                          ))}
                        </TabPanels>
                      </Tabs>
                    ) : (
                      <Stack direction={['column', 'row']} gap={0}>
                        {playerPerks.map((perk, index) => (
                          <PerksCard
                            key={index}
                            {...perk}
                            id={index === 0 ? 'visitor' : 'member'}
                            badgeColor={index === 0 ? 'green' : 'pink'}
                          />
                        ))}
                      </Stack>
                    )}
                  </VStack>
                  <VStack spacing="34px" align="start">
                    <Text
                      fontSize={{ base: 'xl', lg: '2xl' }}
                      fontWeight="bold"
                    >
                      How to become a player?
                    </Text>
                    <Text fontSize={{ base: 'xl', lg: '2xl' }}>
                      Ready to rise & become one of the founders of MetaGame?
                    </Text>
                    <MetaButton
                      textTransform="uppercase"
                      onClick={() => router.push('/onboarding')}
                      alignSelf="center"
                    >
                      Go
                    </MetaButton>
                  </VStack>
                </VStack>
              </Box>
            </TabPanel>
            <TabPanel
              paddingY={{ base: 0, lg: 'initial' }}
              border={guildBorder}
              boxShadow={guildBoxShadow}
              borderRadius={8}
            >
              <Box
                maxW="container.lg"
                maxH="container.md"
                bg="transparent"
                paddingX={{ base: '24px', lg: '96px' }}
                paddingY={{ base: '10px', lg: '128px' }}
                sx={{
                  maskImage: isMobile
                    ? 'unset'
                    : 'linear-gradient(to top, rgba(0, 0, 0, 1) 78%, rgba(0, 0, 0, 0) 96%);',
                }}
                color="white"
                overflowY="auto"
              >
                <VStack spacing="56px" align="stretch">
                  <VStack spacing="16px" align="start">
                    <Text
                      fontSize={{ base: '2xl', lg: '4xl' }}
                      color="#7DCDDF"
                      alignSelf={{ base: 'start', lg: 'center' }}
                    >
                      Get help, contributors & users to grow.
                    </Text>
                    <Text
                      fontSize={{ base: 'xl', lg: '2xl' }}
                      fontWeight="bold"
                    >
                      Why join as a guild?
                    </Text>
                    <Text fontSize={{ base: 'xl', lg: '2xl' }}>
                      A bunch of reasons, actually!
                    </Text>
                    <UnorderedList fontSize="md" fontWeight="light" spacing={2}>
                      {guildReasons.map((reason, idx) => (
                        <ListItem key={idx}>{reason}</ListItem>
                      ))}
                    </UnorderedList>
                  </VStack>
                  <VStack spacing="16px" align="start">
                    <Text
                      fontSize={{ base: 'xl', lg: '2xl' }}
                      fontWeight="bold"
                    >
                      Before joining as a guild...
                    </Text>
                    <Text
                      fontSize={{ base: 'xl', lg: '2xl' }}
                      fontWeight="normal"
                    >
                      Before trying to join as a guild, we recommend you join as
                      a person.
                    </Text>
                  </VStack>
                  <Stack
                    direction={['column', 'row']}
                    spacing={{ base: 2, lg: 10 }}
                    align="center"
                    justify="center"
                  >
                    {roles.map((role, index) => (
                      <React.Fragment key={index}>
                        {role.tab === activeTab && <RoleCard {...role} />}
                        {role.tab === activeTab &&
                          index ===
                            roles.findIndex(
                              (r) => r.tab === RoleTitle.Guild,
                            ) && (
                            <Text
                              fontSize={{ base: 'xl', lg: '2xl' }}
                              fontWeight={{ base: 'bold', lg: 'normal' }}
                              mx={2}
                            >
                              OR
                            </Text>
                          )}
                      </React.Fragment>
                    ))}
                  </Stack>
                  <Text fontSize={{ base: 'xl', lg: '2xl' }} fontWeight="bold">
                    Tiers & Perks
                  </Text>
                  {isMobile ? (
                    <Tabs variant="soft-rounded" isFitted>
                      <TabList
                        bg="blackAlpha.500"
                        borderRadius="full"
                        paddingY={2}
                        paddingX={4}
                      >
                        {guildPerks.map((perk, index) => (
                          <Tab
                            key={index}
                            _selected={{
                              bg: bgColors[index] || 'defaultColor',
                              color: textColors[index] || 'defaultColor',
                            }}
                            _active={{ bg: 'transparent' }}
                            textTransform="uppercase"
                          >
                            {perk.type}
                          </Tab>
                        ))}
                      </TabList>
                      <TabPanels>
                        {guildPerks.map((perk, index) => (
                          <TabPanel key={index}>
                            <PerksCard
                              {...perk}
                              id={
                                ['free', 'basic', 'pro'][index] as
                                  | 'free'
                                  | 'basic'
                                  | 'pro'
                              }
                            />
                          </TabPanel>
                        ))}
                      </TabPanels>
                    </Tabs>
                  ) : (
                    <Flex align="end" w="full">
                      <List spacing="10px" p="0px 24px 0px 24px">
                        {guildPerksList.map(({ title }, perkIndex) => (
                          <ListItem key={perkIndex}>
                            <Text fontSize={{ base: 'sm', lg: 'lg' }}>
                              {title}
                            </Text>
                          </ListItem>
                        ))}
                      </List>
                      <PerksChecklist
                        perks={guildPerksList}
                        id={PerkType.Free}
                      />
                      <PerksChecklist
                        perks={guildPerksList}
                        id={PerkType.Basic}
                        altBackground
                      />
                      <PerksChecklist
                        perks={guildPerksList}
                        id={PerkType.Pro}
                      />
                    </Flex>
                  )}
                  <VStack align="center" spacing={4}>
                    <Text
                      fontSize={{ base: '2xl', lg: '4xl' }}
                      fontWeight="semibold"
                    >
                      Decided to Join?
                    </Text>
                    <Text
                      fontSize={{ base: 'xl', lg: '2xl' }}
                      color="#A5B9F6"
                      fontWeight="light"
                    >
                      Ready to become one of the founding guilds?
                    </Text>
                    <MetaButton maxW="xs" href="https://tally.so/r/3EdORl">
                      APPLY AS GUILD
                    </MetaButton>
                  </VStack>
                </VStack>
              </Box>
            </TabPanel>
            <TabPanel
              paddingY={{ base: 0, lg: 'initial' }}
              border={patronBorder}
              boxShadow={patronBoxShadow}
              borderRadius={8}
            >
              <Box
                maxW="container.lg"
                maxH="container.md"
                bg="transparent"
                paddingX={{ base: '24px', lg: '96px' }}
                paddingY={{ base: '10px', lg: '128px' }}
                sx={{
                  maskImage: isMobile
                    ? 'unset'
                    : 'linear-gradient(to top, rgba(0, 0, 0, 1) 78%, rgba(0, 0, 0, 0) 96%);',
                }}
                color="white"
                overflowY="auto"
              >
                <VStack spacing="56px" align="stretch">
                  <VStack spacing="16px" align="start">
                    <Text
                      fontSize={{ base: '2xl', lg: '4xl' }}
                      color="#E190E1"
                      alignSelf={{ base: 'start', lg: 'center' }}
                    >
                      Buy, hodl & support passively.
                    </Text>
                    <Text
                      fontSize={{ base: 'xl', lg: '2xl' }}
                      fontWeight="bold"
                    >
                      Why join as a patron?
                    </Text>
                    <Text fontSize={{ base: 'xl', lg: '2xl' }}>
                      Here are a few reasons:
                    </Text>
                    <UnorderedList fontSize="md" fontWeight="light" spacing={2}>
                      {patronReasons.map((reason, idx) => (
                        <ListItem key={idx}>{reason}</ListItem>
                      ))}
                    </UnorderedList>
                  </VStack>
                  <VStack spacing="24px" align="start">
                    <Text
                      fontSize={{ base: 'xl', lg: '2xl' }}
                      fontWeight="bold"
                    >
                      Perks of joining
                    </Text>
                    {isMobile ? (
                      <Tabs variant="soft-rounded" isFitted>
                        <TabList
                          bg="blackAlpha.500"
                          borderRadius="full"
                          paddingY={2}
                          paddingX={4}
                        >
                          {patronPerks.map((perk, index) => (
                            <Tab
                              key={index}
                              _selected={{
                                bg: index === 0 ? 'green.200' : 'pink.200',
                                color: index === 0 ? 'green.900' : 'pink.900',
                              }}
                              _active={{ bg: 'transparent' }}
                              textTransform="uppercase"
                            >
                              {perk.title}
                            </Tab>
                          ))}
                        </TabList>
                        <TabPanels>
                          {patronPerks.map((perk, index) => (
                            <TabPanel key={index}>
                              <PerksCard {...perk} id="member" />
                            </TabPanel>
                          ))}
                        </TabPanels>
                      </Tabs>
                    ) : (
                      <Stack direction={['column', 'row']} gap={0}>
                        {patronPerks.map((perk, index) => (
                          <PerksCard
                            key={index}
                            {...perk}
                            id={index === 0 ? 'free' : 'member'}
                            badgeColor={index === 0 ? 'green' : 'pink'}
                          />
                        ))}
                      </Stack>
                    )}
                  </VStack>
                  <VStack spacing="16px" align="start">
                    <Text
                      fontSize={{ base: 'xl', lg: '2xl' }}
                      fontWeight="bold"
                    >
                      How to become a patron?
                    </Text>
                    <Text
                      fontSize={{ base: 'xl', lg: '2xl' }}
                      fontWeight="light"
                    >
                      Ready to become one of the founding patrons of MetaGame?
                    </Text>
                  </VStack>
                  <Stack
                    direction={['column', 'row']}
                    spacing={{ base: 2, lg: 10 }}
                    align="center"
                    justify="center"
                  >
                    {roles.map((role, index) => (
                      <React.Fragment key={index}>
                        {role.tab === activeTab && <RoleCard {...role} />}
                        {role.tab === activeTab &&
                          index ===
                            roles.findIndex(
                              (r) => r.tab === RoleTitle.Patron,
                            ) && (
                            <Text
                              fontSize={{ base: 'xl', lg: '2xl' }}
                              fontWeight={{ base: 'bold', lg: 'normal' }}
                            >
                              OR
                            </Text>
                          )}
                      </React.Fragment>
                    ))}
                  </Stack>
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
