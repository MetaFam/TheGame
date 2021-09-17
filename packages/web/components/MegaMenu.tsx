import {
  Avatar,
  Badge,
  Box,
  Button,
  ChevronDownIcon,
  ChevronUpIcon,
  CloseIcon,
  Flex,
  HamburgerIcon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MetaButton,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from '@metafam/ds';
import { numbers } from '@metafam/utils';
import Alliances from 'assets/menuIcon/alliances.svg';
import Asketh from 'assets/menuIcon/asketh.svg';
import Contribute from 'assets/menuIcon/contribute.svg';
import Discord from 'assets/menuIcon/discord.svg';
import Forum from 'assets/menuIcon/forum.svg';
import Grants from 'assets/menuIcon/grants.svg';
import Guilds from 'assets/menuIcon/guilds.svg';
import Invest from 'assets/menuIcon/invest.svg';
import Learn from 'assets/menuIcon/learn.svg';
import MetaGameWiki from 'assets/menuIcon/metagamewiki.svg';
import Patrons from 'assets/menuIcon/patrons.svg';
import Playbooks from 'assets/menuIcon/playbooks.svg';
import Players from 'assets/menuIcon/players.svg';
import Quests from 'assets/menuIcon/quests.svg';
import Raids from 'assets/menuIcon/raids.svg';
import Roles from 'assets/menuIcon/roles.svg';
import SeedEarned from 'assets/menuIcon/seedearned.svg';
import Seeds from 'assets/menuIcon/seeds.svg';
import TheGreatHouses from 'assets/menuIcon/thegreathouses.svg';
import WelcomeToMetagame from 'assets/menuIcon/welcometometagame.svg';
import XPEarned from 'assets/menuIcon/xpearned.svg';
import { MetaLink } from 'components/Link';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import { usePSeedBalance } from 'lib/hooks/balances';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { getPlayerImage, getPlayerName } from 'utils/playerHelpers';

// import SearchIcon from '../assets/search-icon.svg';
import SeedMarket from '../assets/seed-icon.svg';
import XPStar from '../assets/xp-star.svg';
import { useUser, useWeb3 } from '../lib/hooks';
import {
  MenuLinkItem,
  MenuLinkSet,
  MenuSectionLinks,
} from '../utils/menuLinks';

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
  welcometometagame: WelcomeToMetagame,
  xpearned: XPEarned,
};

// Navbar logo
const Logo = () => (
  <Box
    className="logo"
    w={{ base: 'fit-content', lg: '209px' }}
    mt="5px"
    ml="16px"
    textAlign={{ base: 'center', lg: 'left' }}
  >
    <Image src="/assets/logo.png" height={44} width={36} />
  </Box>
);

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
    fontFamily="exo"
    p="0"
    mb="50px"
    pr="50px"
    _active={{ bg: 'none' }}
    _focus={{ bg: 'none' }}
  >
    <Link
      display="flex"
      href={url}
      _hover={{ bg: 'none', textDecoration: 'none' }}
      _focus={{ outline: 'none' }}
    >
      <Avatar
        alt={title}
        src={menuIcons[icon]}
        width="64px"
        height="64px"
        style={{ padding: '10px', marginRight: '20px' }}
        bg="linear-gradient(180deg, #170B23 0%, #350C58 100%)"
      />
      <Box>
        <Text fontFamily="exo2" color="#000" fontSize="xl" fontWeight="700">
          {title}
        </Text>
        <Text
          fontFamily="body"
          color="#000"
          fontSize="13px"
          font="IBM Plex Sans"
        >
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
    fontFamily="exo"
    display={{ base: 'none', lg: 'flex' }}
    minW={{ base: 'auto', md: '40%' }}
  >
    {MenuSectionLinks.map((section: MenuLinkSet) => (
      <Menu key={section.label}>
        {({ isOpen }) => (
          <>
            <MenuButton
              as={Button}
              variant="link"
              minW="fit-content"
              color="#ffffff"
              fontSize={['md', 'md', 'md', 'lg']}
              fontWeight="600"
              textTransform="uppercase"
              ml={23}
              mr={23}
              fontFamily="exo2"
              _expanded={{ color: '#FD9FE3' }}
              _focus={{ outline: 'none', border: 'none' }}
            >
              {section.label}
              {isOpen ? (
                <ChevronUpIcon color="#ffffff" />
              ) : (
                <ChevronDownIcon color="#ffffff" />
              )}
            </MenuButton>
            {section.menuItems.length > 3 ? (
              <MenuList
                display="grid"
                gridTemplateColumns="repeat(2, 1fr)"
                width="948px"
                p="56px 6px 6px 56px"
              >
                {section.menuItems.map((item: MenuLinkItem) => (
                  <DesktopMenuItem {...item} key={item.title} />
                ))}
              </MenuList>
            ) : (
              <MenuList
                display="grid"
                gridTemplateColumns="repeat(1, 1fr)"
                width="474px"
                p="56px 6px 6px 56px"
              >
                {section.menuItems.map((item: MenuLinkItem) => (
                  <DesktopMenuItem key={item.title} {...item} />
                ))}
              </MenuList>
            )}
          </>
        )}
      </Menu>
    ))}
  </Flex>
);

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
  player: PlayerFragmentFragment;
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
      flex="1"
      my="auto"
      mr="0"
    >
      <Badge
        display={{ base: 'none', lg: 'flex' }}
        flexDirection="row"
        px={4}
        py={2}
        bg="rgba(0,0,0,0.25)"
        border="1px solid #2B2244"
        borderRadius={50}
        minW="fit-content"
      >
        <Image src={XPStar} alt="XP" height={14} width={14} />{' '}
        <Text color="white" ml={[0, 0, 0, 2]}>
          {Math.trunc(player.total_xp * 100) / 100}
        </Text>
      </Badge>
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
      >
        <Image src={SeedMarket} alt="Seed" height={14} width={14} />{' '}
        <Text color="white" ml={[0, 0, 0, 2]}>
          {parseInt(amountToDecimal(pSeedBalance || '0', 18), 10)}
        </Text>
      </Badge>

      <Menu>
        <MenuButton
          bg="transparent"
          aria-label="Options"
          _focus={{ outline: 'none', bg: 'transparent' }}
          _hover={{ bg: 'transparent' }}
          _active={{ bg: 'transparent' }}
        >
          <Avatar
            name={getPlayerName(player)}
            src={getPlayerImage(player)}
            w="52px"
            h="52px"
          />
        </MenuButton>
        <MenuList mt="8px" color="black" fontFamily="exo2">
          <MetaLink
            color="black"
            href={`/player/${player.username}`}
            _hover={{ textDecoration: 'none' }}
          >
            <MenuItem>View Profile</MenuItem>
          </MetaLink>
          <MetaLink
            color="black"
            href="/profile/setup/username"
            _hover={{ textDecoration: 'none' }}
          >
            <MenuItem>Edit Profile</MenuItem>
          </MetaLink>
          <MenuItem onClick={disconnect}>Disconnect</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export const MegaMenu: React.FC = () => {
  const { isConnected, connectWeb3 } = useWeb3();
  const router = useRouter();

  const handleLoginClick = useCallback(async () => {
    await connectWeb3();
  }, [connectWeb3]);
  const { user, fetching } = useUser();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const menuToggle = () => {
    if (isOpen) {
      document.body.style.height = 'auto';
      document.body.style.overflow = 'scroll';
      return onClose();
    }
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';
    return onOpen();
  };
  return (
    <Stack
      position={router.pathname === '/players' ? 'relative' : 'sticky'}
      top={0}
      zIndex={11}
      fontFamily="exo"
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
            <CloseIcon color="#ffffff" ml={2} />
          ) : (
            <HamburgerIcon color="#ffffff" ml={2} />
          )}
        </Flex>
        <Flex
          w={{ base: 'fit-content', lg: '100%' }}
          justifyContent="space-between"
        >
          <Logo />
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
              {isConnected && !!user?.player ? (
                <PlayerStats player={user.player} />
              ) : (
                <MetaButton
                  display={{ base: 'none', lg: 'block' }}
                  h="48px"
                  my="auto"
                  px="24px"
                  ml="32px"
                  fontFamily="exo2"
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
        top={{ base: '76px', md: '76px' }}
        zIndex={1}
        overflowY="scroll"
        w="100vw"
        bg="rgba(0,0,0,0.8)"
        h="calc(100vh - 160px)"
        sx={{ backdropFilter: 'blur(10px)' }}
        p="0px 16px 16px"
        border="none"
        style={{ marginTop: '0px' }}
      >
        {MenuSectionLinks.map((section) => (
          <Stack pt="16px" key={section.label}>
            <Text fontSize="16px" fontWeight="600" textTransform="capitalize">
              {section.label}
            </Text>
            <SimpleGrid columns={2}>
              {section.menuItems.map((item: MenuLinkItem) => (
                <Link
                  key={item.title}
                  display="flex"
                  alignItems="center"
                  fontSize="12px"
                  href={item.url}
                  border="1px"
                  _odd={{ marginRight: '-1px' }}
                  marginBottom="-1px"
                  borderColor="purple.400"
                  background="rgba(0, 0, 0, 0.35)"
                  px={4}
                  py={3}
                  fontFamily="exo2"
                >
                  <Avatar
                    name="alt text"
                    src={menuIcons[item.icon]}
                    p="2px"
                    w="24px"
                    h="24px"
                    mr="8px"
                    bg="linear-gradient(180deg, #170B23 0%, #350C58 100%)"
                  />
                  {item.title}
                </Link>
              ))}
            </SimpleGrid>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
