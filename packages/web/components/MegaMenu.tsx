import {
  Avatar,
  Badge,
  Box,
  BoxedNextImage as Image,
  Button,
  ChevronDownIcon,
  ChevronUpIcon,
  CloseIcon,
  Dashboard,
  Flex,
  HamburgerIcon,
  Icon,
  Link,
  LogOut,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MetaButton,
  Profile,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  Tooltip,
  useBreakpointValue,
  useDisclosure,
} from '@metafam/ds';
import { numbers } from '@metafam/utils';
import Alliances from 'assets/menuIcon/alliances.svg';
import Asketh from 'assets/menuIcon/asketh.svg';
import BecomeAPatron from 'assets/menuIcon/becomeapatron.svg';
import Contribute from 'assets/menuIcon/contribute.svg';
import Discord from 'assets/menuIcon/discord.svg';
import Events from 'assets/menuIcon/events.svg';
import Forum from 'assets/menuIcon/forum.svg';
import Grants from 'assets/menuIcon/grants.svg';
import Guilds from 'assets/menuIcon/guilds.svg';
import Invest from 'assets/menuIcon/invest.svg';
import Learn from 'assets/menuIcon/learn.svg';
import MetaGameWiki from 'assets/menuIcon/metagamewiki.svg';
import MetaRadio from 'assets/menuIcon/metaradio.svg';
import Patrons from 'assets/menuIcon/patrons.svg';
import Playbooks from 'assets/menuIcon/playbooks.svg';
import Players from 'assets/menuIcon/players.svg';
import Quests from 'assets/menuIcon/quests.svg';
import Raids from 'assets/menuIcon/raids.svg';
import Roles from 'assets/menuIcon/roles.svg';
import SeedEarned from 'assets/menuIcon/seedearned.svg';
import Seeds from 'assets/menuIcon/seeds.svg';
import TheGreatHouses from 'assets/menuIcon/thegreathouses.svg';
import WelcomeToMetaGame from 'assets/menuIcon/welcometometagame.svg';
import XPEarned from 'assets/menuIcon/xpearned.svg';
import Youtube from 'assets/menuIcon/youtube.svg';
import SeedMarket from 'assets/seed-icon.svg';
import XPStar from 'assets/xp-star.svg';
import { MetaLink } from 'components/Link';
import { PlayerAvatar } from 'components/Player/PlayerAvatar';
import { Player } from 'graphql/autogen/types';
import { useUser, useWeb3 } from 'lib/hooks';
import { usePSeedBalance } from 'lib/hooks/balances';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { MenuLinkItem, MenuLinkSet, MenuSectionLinks } from 'utils/menuLinks';
import { getPlayerURL } from 'utils/playerHelpers';

const { amountToDecimal } = numbers;

const menuIcons: { [key: string]: string } = {
  alliances: Alliances,
  asketh: Asketh,
  contribute: Contribute,
  discord: Discord,
  forum: Forum,
  grants: Grants,
  guilds: Guilds,
  invest: Invest,
  learn: Learn,
  metagamewiki: MetaGameWiki,
  patrons: Patrons,
  playbooks: Playbooks,
  players: Players,
  quests: Quests,
  raids: Raids,
  roles: Roles,
  seedearned: SeedEarned,
  seeds: Seeds,
  thegreathouses: TheGreatHouses,
  welcometometagame: WelcomeToMetaGame,
  xpearned: XPEarned,
  youtube: Youtube,
  metaradio: MetaRadio,
  events: Events,
  becomeapatron: BecomeAPatron,
};

type LogoProps = {
  link: string;
};
// Navbar logo
const Logo = ({ link }: LogoProps) => {
  const width = useBreakpointValue({ base: 36, lg: 55 }) ?? (36 as number);
  const height = useBreakpointValue({ base: 45, lg: 75 }) ?? (45 as number);

  return (
    <Box
      className="logo"
      w={{ base: 'fit-content', lg: '209px' }}
      mt={[0.5, 2]}
      ml={3}
    >
      <MetaLink
        href={link}
        _focus={{ outline: 'none', bg: 'transparent' }}
        _hover={{ bg: 'transparent' }}
        _active={{ bg: 'transparent' }}
      >
        <Image
          src="/assets/logo.png"
          height={`${height}px`}
          width={`${width}px`}
          _hover={{ transform: 'scale(1.1)' }}
        />
      </MetaLink>
    </Box>
  );
};

type MenuItemProps = {
  title: string;
  url: string;
  explainerText: string;
  icon: string;
};
// Menu links (with icons and explanatory text) -- used in DesktopNavLinks below
const DesktopMenuItem = ({
  title,
  url,
  explainerText,
  icon,
}: MenuItemProps) => (
  <MenuItem
    color="#FFF"
    key={title}
    mb={4}
    p={2}
    borderRadius="md"
    _active={{ bg: 'none' }}
    _focus={{ bg: 'none' }}
    _hover={{ bg: '#C8BAFC33' }}
  >
    <Link
      display="flex"
      className="desktop-menu-item"
      href={url}
      width="full"
      m={1}
      padding="1rem"
      borderRadius="0.618vmax"
      _hover={{
        backgroundColor: 'rgba(0,0,0,0.56)',
        textDecoration: 'none',
        transition: '0s',
      }}
      transitionTimingFunction="ease-in"
      transition="0.5s"
      _focus={{ outline: 'none' }}
      alignItems="center"
    >
      <Avatar
        alt={title}
        src={menuIcons[icon]}
        width="64px"
        height="64px"
        style={{ padding: '10px', marginRight: '20px' }}
        bg="linear-gradient(180deg, rgba(0, 0, 0, 0.36) 0%, rgba(0, 0, 0, 0.36) 100%);"
        boxShadow="0 0 0 2px rgba(0, 0, 0, 0.08)"
        sx={{
          '.desktop-menu-item:hover &': {
            boxShadow: '0 0 1px 1px rgba(255, 255, 255, 0.1)',
            bg: 'linear-gradient(180deg, #170B23 0%, #350C58 100%);',
            transition: '0s',
          },
        }}
        transitionTimingFunction="ease-in"
        transition="0.3s"
      />
      <Box>
        <Text color="#fff" fontSize="xl" fontWeight="bold">
          {title}
        </Text>
        <Text color="#fff" fontSize="13px">
          {explainerText}
        </Text>
      </Box>
    </Link>
  </MenuItem>
);

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener('resize', handleResize);

      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    }
    return undefined;
  }, []);
  return windowSize;
};

// Nav links on desktop -- text and links from utils/menuLinks.ts
const DesktopNavLinks = () => {
  const size = useWindowSize();

  return (
    <Flex
      justifyContent="center"
      alignContent="center"
      display={{ base: 'none', lg: 'flex' }}
      minW={{ base: 'auto', md: '40%' }}
      ml={-20}
    >
      {MenuSectionLinks.map((section: MenuLinkSet) => (
        <Menu
          key={section.label}
          offset={
            section.label === 'invest' && size.width > 1463 && size.width < 2200
              ? [0, -10]
              : [-56, -10]
          }
        >
          {({ isOpen }) => (
            <>
              <MenuButton
                as={Button}
                variant="link"
                minW="fit-content"
                color="#FFF"
                fontSize={['md', 'md', 'md', 'lg']}
                fontWeight={600}
                textTransform="uppercase"
                mx={23}
                _expanded={{ color: '#FFF' }}
                _focus={{ outline: 'none', border: 'none' }}
              >
                {section.label}
                {isOpen ? (
                  <ChevronUpIcon color="#FFF" />
                ) : (
                  <ChevronDownIcon color="#FFF" />
                )}
                <Icon
                  position="absolute"
                  left="calc(50% - 21px)"
                  top={14}
                  borderColor="transparent"
                  h={isOpen ? 'auto' : 0}
                  opacity={isOpen ? 1 : 0}
                  transition="opacity 0.2s"
                  zIndex="2"
                >
                  <path
                    d="M12 0L24 12C14.6274 12 9.37258 12 0 12L12 0Z"
                    fill="rgba(42, 31, 71, 0.99)"
                  />
                </Icon>
              </MenuButton>
              {isOpen ? (
                <Box
                  zIndex="-2"
                  position="absolute"
                  minW="100vw"
                  top="81px"
                  left="calc(100% - 100vw)"
                  mx="0"
                  h="100vh"
                  bg="linear-gradient(rgba(0,0,0,0.9) 10%, rgba(0,0,0,0) 96%)"
                  sx={{ filter: 'blur(3rem)' }}
                />
              ) : (
                <span />
              )}
              <MenuList
                display="grid"
                gridTemplateColumns={
                  section.menuItems.length > 3
                    ? 'repeat(2, 1fr)'
                    : 'repeat(1, 1fr)'
                }
                width={section.menuItems.length > 3 ? '948px' : '474px'}
                p="2rem"
                boxShadow="dark-lg"
                bg="linear-gradient(180deg, rgba(42, 31, 71, 0.9) 6.18%, rgba(17, 3, 32, 0.86) 140%)"
                borderRadius="0.618vmax"
                border="0"
              >
                {section.menuItems.map((item: MenuLinkItem) => (
                  <DesktopMenuItem {...item} key={item.title} />
                ))}
              </MenuList>
            </>
          )}
        </Menu>
      ))}
    </Flex>
  );
};

// Search -- not working yet
// const Search = () => (
//   <Flex
//     justifyContent="flex-end"
//     minW={{ base: '20%', lg: '10%' }}
//     h="fit-content"
//     p={2}
//     mt="auto"
//     mb="auto"
//     bg={{ base: 'none', xl: 'rgba(255,255,255,0.05)' }}
//     border={{ base: 'none', xl: '1px solid #2B2244' }}
//     borderRadius={4}
//   >
//     <Image src={SearchIcon} alt="search" height={16} width={16} />
//     <Text
//       display={{ base: 'none', xl: 'block' }}
//       color="rgba(255,255,255,0.5)"
//       alignSelf="center"
//       ml={2}
//     >
//       find anything
//     </Text>
//   </Flex>
// );

type PlayerStatsProps = {
  player: Player;
};
// Display player XP and Seed
const PlayerStats: React.FC<PlayerStatsProps> = ({ player }) => {
  const { disconnect } = useWeb3();
  const { pSeedBalance } = usePSeedBalance();

  return (
    <Flex
      align="center"
      display={{ base: 'none', lg: 'flex' }}
      justifyContent="flex-end"
      minW={{ base: '20%', lg: 'fit-content' }}
      maxW={{ base: '20%', lg: 'fit-content' }}
      p={2}
      flex={1}
      my="auto"
      mr={0}
    >
      <Tooltip label="XP" hasArrow>
        <Badge
          display={{ base: 'none', lg: 'flex' }}
          flexDirection="row"
          px={4}
          py={2}
          bg="rgba(0,0,0,0.25)"
          border="1px solid #2B2244"
          borderRadius={50}
          minW="fit-content"
          alignItems="center"
        >
          <Image src={XPStar} alt="XP" height={5} width={5} />
          <Text color="white" ml={[0, 0, 0, 2]} fontSize={18}>
            {Math.floor(player.totalXP)}
          </Text>
        </Badge>
      </Tooltip>
      <Tooltip label="pSEEDs" hasArrow>
        <Badge
          display={{ base: 'none', lg: 'flex' }}
          flexDirection="row"
          m={2}
          px={4}
          py={2}
          bg="rgba(0,0,0,0.25)"
          border="1px solid #2B2244"
          borderRadius={50}
          minW="fit-content"
          alignItems="center"
        >
          <Image src={SeedMarket} alt="pSeed" height={5} width={5} />
          <Text color="white" ml={[0, 0, 0, 2]} fontSize={18}>
            {parseInt(amountToDecimal(pSeedBalance || '0', 18), 10)}
          </Text>
        </Badge>
      </Tooltip>
      <Menu>
        <MenuButton
          bg="transparent"
          aria-label="Options"
          _focus={{ outline: 'none', bg: 'transparent' }}
          _hover={{ bg: 'transparent' }}
          _active={{ bg: 'transparent' }}
        >
          <PlayerAvatar
            {...{ player }}
            isOwnProfile={true}
            w={14}
            h={14}
            m={0}
            _hover={{ transform: 'scale(0.9)' }}
          />
        </MenuButton>
        <MenuList mt="8px" color="black">
          <MetaLink
            color="black"
            href={getPlayerURL(player) ?? '/'}
            _hover={{ textDecoration: 'none' }}
          >
            <MenuItem>
              <Profile w={4} h={4} mr={4} /> View Profile
            </MenuItem>
          </MetaLink>
          <MetaLink
            color="black"
            href={'/dashboard'}
            _hover={{ textDecoration: 'none' }}
          >
            <MenuItem>
              <Dashboard w={4} h={4} mr={4} color="red.500" />
              Dashboard
            </MenuItem>
          </MetaLink>
          <MenuItem onClick={disconnect}>
            <LogOut w={4} h={4} mr={4} />
            Disconnect
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export const MegaMenu: React.FC = () => {
  const { connected, connect } = useWeb3();
  const router = useRouter();

  const handleLoginClick = useCallback(async () => {
    await connect();
  }, [connect]);
  const { user, fetching } = useUser();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const menuToggle = () => {
    if (isOpen) {
      document.body.style.height = 'auto';
      document.body.style.overflowY = 'scroll';
      return onClose();
    }
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';
    return onOpen();
  };

  return (
    <Stack
      position={
        router.pathname === '/community/players' ? 'relative' : 'sticky'
      }
      top={0}
      id="MegaMenu"
      zIndex={11}
    >
      <Flex
        justifyContent="space-between"
        minH={{ base: '76px', md: '76px' }}
        borderBottom="1px"
        bg="rgba(0,0,0,0.5)"
        borderColor="#2B2244"
        sx={{ backdropFilter: 'blur(10px)' }}
        px={4}
        py={1.5}
      >
        <Flex
          onClick={menuToggle}
          flexWrap="nowrap"
          alignItems="center"
          h="fit-content"
          w="fit-content"
          display={{ base: 'flex', lg: 'none' }}
          p={2}
          my="auto"
        >
          {isOpen ? (
            <CloseIcon color="#FFF" ml={2} />
          ) : (
            <HamburgerIcon color="#FFF" ml={2} />
          )}
        </Flex>
        <Flex
          w={{ base: 'fit-content', lg: '100%' }}
          justifyContent="space-between"
        >
          <Logo link={user ? '/dashboard' : '/'} />
          <DesktopNavLinks />
          {/* <Search /> */}
          {fetching ? (
            <Spinner
              mt="18px"
              mr="24px"
              ml="162px"
              mb="26px"
              display={{ base: 'none', lg: 'block' }}
            />
          ) : (
            <>
              {connected && !!user ? (
                <PlayerStats player={user} />
              ) : (
                <MetaButton
                  display={{ base: 'none', lg: 'block' }}
                  h="48px"
                  my="10px"
                  px="24px"
                  ml="90px"
                  onClick={handleLoginClick}
                >
                  Connect
                </MetaButton>
              )}
            </>
          )}
        </Flex>
      </Flex>
      <Stack
        display={{ base: isOpen ? 'block' : 'none', xl: 'none' }}
        position="absolute"
        top={76}
        zIndex={1}
        overflowY="scroll"
        w="100vw"
        bg="rgba(0, 0, 0, 0.8)"
        h="calc(100vh - 160px)"
        sx={{ backdropFilter: 'blur(10px)' }}
        p="0px 16px 16px"
        border="none"
        mt={0}
      >
        {MenuSectionLinks.map((section) => (
          <Stack pt={1} key={section.label}>
            <Text fontSize={18} fontWeight={600} textTransform="capitalize">
              {section.label}
            </Text>
            <SimpleGrid columns={2}>
              {section.menuItems.map(({ title, icon, url }) => (
                <Link
                  key={title}
                  display="flex"
                  alignItems="center"
                  href={url}
                  border="1px"
                  _odd={{ marginRight: '-1px' }}
                  marginBottom="-1px"
                  borderColor="purple.400"
                  bg="rgba(0, 0, 0, 0.35)"
                  px={2}
                  py={1.5}
                  _hover={{
                    bg: 'rgba(255, 255, 255, 0.1)',
                  }}
                  isExternal={/^https?:\/\//.test(url)}
                >
                  <Avatar
                    name={title}
                    src={menuIcons[icon]}
                    p={0}
                    w={7}
                    h={7}
                    mr={1}
                    bg="linear-gradient(180deg, #170B23 0%, #350C58 100%)"
                  />
                  <Text fontSize={20}>{title}</Text>
                </Link>
              ))}
            </SimpleGrid>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
