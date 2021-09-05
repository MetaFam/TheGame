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
import Alliances from 'assets/menuIcon/alliances.png';
import Asketh from 'assets/menuIcon/asketh.png';
import Contribute from 'assets/menuIcon/contribute.png';
import Discord from 'assets/menuIcon/discord.png';
import Forum from 'assets/menuIcon/forum.png';
import Grants from 'assets/menuIcon/grants.png';
import Guilds from 'assets/menuIcon/guilds.png';
import Invest from 'assets/menuIcon/invest.png';
import Learn from 'assets/menuIcon/learn.png';
import MetaGameWiki from 'assets/menuIcon/metagamewiki.png';
import Patrons from 'assets/menuIcon/patrons.png';
import Playbooks from 'assets/menuIcon/playbooks.png';
import Players from 'assets/menuIcon/players.png';
import Quests from 'assets/menuIcon/quests.png';
import Raids from 'assets/menuIcon/raids.png';
import Roles from 'assets/menuIcon/roles.png';
import SeedEarned from 'assets/menuIcon/seedearned.png';
import Seeds from 'assets/menuIcon/seeds.png';
import TheGreatHouses from 'assets/menuIcon/thegreathouses.png';
import WelcomeToMetagame from 'assets/menuIcon/welcometometagame.png';
import XPEarned from 'assets/menuIcon/xpearned.png';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import { usePSeedBalance } from 'lib/hooks/balances';
import Image from 'next/image';
import React, { useCallback } from 'react';
import { getPlayerImage } from 'utils/playerHelpers';

// import SearchIcon from '../assets/search-icon.svg';
import SeedMarket from '../assets/seed-icon.svg';
import XPStar from '../assets/xp-star.svg';
import { useUser, useWeb3 } from '../lib/hooks';
import { MenuSectionLinks } from '../utils/menuLinks';

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
    flex="1"
    minW="20%"
    maxW="20%"
    my="auto"
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
        <Text color="#000" fontSize="xl" fontWeight="700">
          {title}
        </Text>
        <Text color="#000" fontSize="13px" font="IBM Plex Sans">
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
    {MenuSectionLinks.map((section: any) => (
      <>
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
                  {section.menuItems.map((item: any) => (
                    <DesktopMenuItem
                      title={item.title}
                      url={item.url}
                      explainerText={item.explainerText}
                      icon={item.icon}
                    />
                  ))}
                </MenuList>
              ) : (
                <MenuList
                  display="grid"
                  gridTemplateColumns="repeat(1, 1fr)"
                  width="474px"
                  p="56px 6px 6px 56px"
                >
                  {section.menuItems.map((item: any) => (
                    <DesktopMenuItem
                      title={item.title}
                      url={item.url}
                      explainerText={item.explainerText}
                      icon={item.icon}
                    />
                  ))}
                </MenuList>
              )}
            </>
          )}
        </Menu>
      </>
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
  pSeedBalance: string | null;
};
// Display player XP and Seed
const PlayerStats: React.FC<PlayerStatsProps> = ({ player, pSeedBalance }) => (
  <Flex
    align="center"
    display={{ base: 'none', lg: 'flex' }}
    justifyContent="flex-end"
    // w='fit-content'
    minW={{ base: '20%', lg: 'fit-content' }}
    maxW={{ base: '20%', lg: 'fit-content' }}
    p={2}
    flex="1"
    mt="auto"
    mr="0"
    mb="auto"
  >
    <Badge
      display={{ base: 'none', lg: 'flex' }}
      flexDirection="row"
      pt={2}
      pr={4}
      pb={2}
      pl={4}
      bg="rgba(0,0,0,0.25)"
      border="1px solid #2B2244"
      borderRadius={50}
      minW="fit-content"
    >
      <Image src={XPStar} alt="XP" height={14} width={14} />{' '}
      <Text color="white" ml={[0, 0, 0, 2]}>
        {player.total_xp}
      </Text>
    </Badge>
    <Badge
      display={{ base: 'none', lg: 'flex' }}
      flexDirection="row"
      m={2}
      pt={2}
      pr={4}
      pb={2}
      pl={4}
      bg="rgba(0,0,0,0.25)"
      border="1px solid #2B2244"
      borderRadius={50}
      minW="fit-content"
    >
      <Image src={SeedMarket} alt="Seed" height={14} width={14} />{' '}
      <Text color="white" ml={[0, 0, 0, 2]}>
        {pSeedBalance || 0}
      </Text>
    </Badge>
    <Link href="profile/setup/username">
      <Avatar
        name="alt text"
        src={getPlayerImage(player)}
        width="52px"
        height="52px"
      />
    </Link>
  </Flex>
);

export const MegaMenu: React.FC = () => {
  const { isConnected, connectWeb3 } = useWeb3();

  const handleLoginClick = useCallback(async () => {
    await connectWeb3();
  }, [connectWeb3]);
  const { user, fetching } = useUser();
  const { pSeedBalance } = usePSeedBalance();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const menuToggle = () => (isOpen ? onClose() : onOpen());
  return (
    <Stack position="sticky" top={0} zIndex={10} fontFamily="exo">
      <Flex
        justifyContent="space-between"
        minH={{ base: '12vh', md: '10vh' }}
        borderBottom="1px"
        bg="rgba(0,0,0,0.5)"
        borderColor="#2B2244"
        sx={{ backdropFilter: 'blur(10px)' }}
        pt={1.5}
        pl={4}
        pb={1.5}
        pr={4}
      >
        <Flex
          onClick={menuToggle}
          flexWrap="nowrap"
          alignItems="center"
          h="fit-content"
          w="20%"
          display={{ base: 'flex', lg: 'none' }}
          p={2}
          mt="auto"
          mb="auto"
        >
          {isOpen ? (
            <CloseIcon color="#ffffff" ml={2} />
          ) : (
            <HamburgerIcon color="#ffffff" ml={2} />
          )}
        </Flex>
        <Logo />
        <DesktopNavLinks />
        {/* <Search /> */}
        {fetching ? (
          <Spinner mt="18px" mr="24px" ml="162px" mb="26px" />
        ) : (
          <>
            {isConnected && !!user?.player ? (
              <PlayerStats player={user.player} pSeedBalance={pSeedBalance} />
            ) : (
              <MetaButton
                display={{ base: 'none', lg: 'block' }}
                w="200px"
                h="auto"
                my="6px"
                px="0"
                ml="32px"
                onClick={handleLoginClick}
              >
                Connect wallet
              </MetaButton>
            )}
          </>
        )}
      </Flex>
      <Stack
        display={{ base: isOpen ? 'block' : 'none', xl: 'none' }}
        position="absolute"
        top={{ base: '11vh', md: '9vh' }}
        zIndex={1}
        overflowY="scroll"
        w="100vw"
        h="89vh"
        bg="rgba(0,0,0,0.7)"
        sx={{ backdropFilter: 'blur(10px)' }}
        p="0px 16px 16px"
        border="none"
      >
        {MenuSectionLinks.map((section) => (
          <>
            <Stack pt="16px">
              <Text fontSize="16px" fontWeight="600" textTransform="capitalize">
                {section.label}
              </Text>
              <SimpleGrid columns={2}>
                {section.menuItems.map((item: any) => (
                  <Link
                    display="flex"
                    alignItems="center"
                    fontSize="12px"
                    href={item.url}
                    border="1px"
                    _odd={{ marginRight: '-1px' }}
                    marginBottom="-1px"
                    borderColor="purple.400"
                    p="12px 16px"
                  >
                    <Avatar
                      name="alt text"
                      src={menuIcons[item.icon]}
                      p="5px"
                      width="24px"
                      height="24px"
                      mr="8px"
                      bg="linear-gradient(180deg, #170B23 0%, #350C58 100%)"
                    />
                    {item.title}
                  </Link>
                ))}
              </SimpleGrid>
            </Stack>
          </>
        ))}
      </Stack>
    </Stack>
  );
};
