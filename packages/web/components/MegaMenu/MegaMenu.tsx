import {
  Avatar,
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
  useBreakpointValue,
  useDisclosure,
} from '@metafam/ds';
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
import { MetaLink } from 'components/Link';
import { PlayerAvatar } from 'components/Player/PlayerAvatar';
import { Player } from 'graphql/autogen/types';
import { useUser, useWeb3 } from 'lib/hooks';
import { useRouter } from 'next/router';
import players from 'pages/community/players';
import React from 'react';
import { distinctUntilChanged, forkJoin, Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { MenuLinkItem, MenuLinkSet, MenuSectionLinks } from 'utils/menuLinks';
import { getPlayerURL } from 'utils/playerHelpers';

import { getPlayersByText } from '../../graphql/getPlayers';
import { getGuildsByText } from '../../graphql/queries/guild';
import { XPSeedsBalance } from './XPSeedsBalance';

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

const iconSize = 60;

// Navbar logo
const Logo = ({ link }: LogoProps) => {
  const width = useBreakpointValue({ base: 36, lg: 40 }) ?? (36 as number);
  const height =
    useBreakpointValue({ base: 45, lg: iconSize }) ?? (45 as number);

  return (
    <Box
      className="logo"
      alignSelf="center"
      w={{ base: 'fit-content', lg: '20%' }}
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
    color="#ffffff"
    key={title}
    p={0}
    _active={{ bg: 'none' }}
    _focus={{ bg: 'none' }}
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
        width={`${iconSize}px`}
        height={`${iconSize}px`}
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

// Nav links on desktop -- text and links from utils/menuLinks.ts
const DesktopNavLinks = () => (
  <Flex
    justifyContent="center"
    alignContent="center"
    display={{ base: 'none', lg: 'flex' }}
  >
    {MenuSectionLinks.map((section: MenuLinkSet) => (
      <Menu key={section.label} offset={[0, 0]} preventOverflow placement="top">
        {({ isOpen }) => (
          <>
            <MenuButton
              as={Button}
              variant="link"
              minW="fit-content"
              color="#FFF"
              fontSize={['md', 'md', 'md', 'lg']}
              fontWeight={700}
              textTransform="uppercase"
              mx={23}
              _expanded={{ color: 'cyan.300' }}
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
                width={6}
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

// const getAllSearchResults = async (queryString: string) => {
//   const { players } = await getPlayersByText(queryString);
//   const { guilds } = await getGuildsByText(queryString);
//   return { players, guilds };
// };

// Search -- not working yet
const Search = () => {
  const searchInputSubjectRef = React.useRef(new Subject<string>());
  const [query, setQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState({
    players: [],
    guilds: [],
  });
  const [isLoading, setLoading] = React.useState(false);
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Default Show Players Matching With Query
    //  router.push(`/search/players?q=${inputValue}`);
  };
  const handleChange = (e: any) => {
    setQuery(e.target.value);
  };

  React.useEffect(() => {
    setLoading(true);
    searchInputSubjectRef.current.next(query);
  }, [query]);

  React.useEffect(() => {
    const searchSubscription = searchInputSubjectRef.current
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        // switchMap(async (queryString: string) => {
        //   if (queryString !== '' && !queryString) {
        //     setSearchResults([]);
        //     return;
        //   }
        //   const { players } = await getPlayersByText(queryString);
        //   const { guilds } = await getGuildsByText(queryString);
        //   // eslint-disable-next-line consistent-return
        //   return { players, guilds };
        // }),
        // switchMap((queryString: string) => {
        //   if (queryString !== '' && !queryString) {
        //     setSearchResults([]);
        //     return;
        //   }

        //   // eslint-disable-next-line consistent-return
        //   return forkJoin([
        //     getPlayersByText(queryString),
        //     getGuildsByText(queryString),
        //   ]);
        // }),
      )
      .subscribe(async (val: string) => {
        if (val !== '' && !val) {
          setLoading(false);

          return;
        }
        const { players } = await getPlayersByText(val);
        const { guilds } = await getGuildsByText(val);
        setSearchResults({ guilds, players });
        setLoading(false);
      });

    return searchSubscription.unsubscribe;
  }, []);
  return (
    <Flex alignItems="center" minWidth="40">
      <form onSubmit={handleSubmit} style={{ width: '100%', color: 'black' }}>
        <input value={query} onChange={handleChange} style={inputStyle} />
      </form>
    </Flex>
  );
};

const inputStyle = {
  padding: '5px',
};

type PlayerStatsProps = {
  player: Player;
};
// Display player XP and Seed
const PlayerStats: React.FC<PlayerStatsProps> = ({ player }) => {
  const { disconnect } = useWeb3();

  return (
    <Flex
      align="center"
      display={{ base: 'none', lg: 'flex' }}
      justifyContent="flex-end"
    >
      <XPSeedsBalance totalXP={player.totalXP} />
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
            w="52px"
            h="52px"
            ml={4}
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
  const { user, fetching } = useUser();
  const { player } = user ?? {};

  const { isOpen, onOpen, onClose } = useDisclosure();
  const menuToggle = () => (isOpen ? onClose() : onOpen());

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
        borderBottom="1px"
        bg="rgba(0,0,0,0.5)"
        borderColor="#2B2244"
        sx={{ backdropFilter: 'blur(10px)' }}
        px={4}
        py={1.5}
        h={20}
      >
        <Flex
          onClick={menuToggle}
          flexWrap="nowrap"
          alignItems="center"
          cursor="pointer"
          h="2rem"
          w="2rem"
          display={{ base: 'flex', lg: 'none' }}
          p={2}
          my="auto"
          flexGrow={1}
        >
          {isOpen ? (
            <CloseIcon fontSize="1.5rem" color="#FFF" ml={2} />
          ) : (
            <HamburgerIcon fontSize="2rem" color="#FFF" ml={2} />
          )}
        </Flex>
        <Flex
          w={{ base: 'fit-content', lg: '100%' }}
          justifyContent="space-between"
        >
          <Logo link={user?.player ? '/dashboard' : '/'} />
          <DesktopNavLinks />
          <Search />
          <Box
            w="20%"
            alignSelf="center"
            textAlign="right"
            display={{ base: 'none', lg: 'block' }}
          >
            {fetching ? (
              <Spinner mr={4} />
            ) : (
              <>
                {connected && !!player ? (
                  <PlayerStats {...{ player }} />
                ) : (
                  <MetaButton
                    h="48px"
                    my="10px"
                    px="24px"
                    ml="90px"
                    onClick={connect}
                  >
                    Connect
                  </MetaButton>
                )}
              </>
            )}
          </Box>
        </Flex>
      </Flex>
      <Stack
        display={{ base: isOpen ? 'block' : 'none', xl: 'none' }}
        position="fixed"
        top="4.5rem"
        zIndex={1}
        overflowX="hidden"
        w="100vw"
        bg="rgba(0, 0, 0, 0.8)"
        h="calc(100vh - 10rem)"
        sx={{ backdropFilter: 'blur(10px)' }}
        p="1rem"
        border="none"
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
