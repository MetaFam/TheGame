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
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from '@metafam/ds';
import { useUser } from 'lib/hooks/index';
import Image from 'next/image';
import React from 'react';

import SearchIcon from '../assets/search-icon.svg';
import SeedMarket from '../assets/seed-icon.svg';
import XPStar from '../assets/xp-star.svg';
import { MenuSectionLinks } from '../utils/menuLinks';

// Navbar logo
const Logo = () => (
  <Box
    className="logo"
    flex="1"
    maxW={{ base: 'auto', md: '10%' }}
    mt="auto"
    mb="auto"
    textAlign={{ base: 'center', md: 'left' }}
  >
    <Image src="/assets/logo.png" height={44} width={36} />
  </Box>
);

// Menu links (with icons and explanatory text) -- used in DesktopNavLinks below
const DesktopMenuItem = ({ title, url, explainerText }: MenuItemProps) => (
  <MenuItem color="#000" p={7} key={title} fontFamily="exo">
    <Link
      display="flex"
      alignItems="top"
      href={url}
      _hover={{ bg: 'none', textDecoration: 'none' }}
    >
      <Avatar
        name="alt text"
        src="https://bit.ly/tioluwani-kolawole"
        mr={5}
        width={24}
        height={24}
      />
      <Box>
        <Text fontSize="xl" fontWeight="700">
          {title}
        </Text>
        <Text font="IBM Plex Sans">{explainerText}</Text>
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
    display={{ base: 'none', md: 'flex' }}
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
                  width="72vw"
                  p={7}
                >
                  {section.menuItems.map((item: any) => (
                    <DesktopMenuItem
                      title={item.title}
                      url={item.url}
                      explainerText={item.explainerText}
                    />
                  ))}
                </MenuList>
              ) : (
                <MenuList
                  display="grid"
                  gridTemplateColumns="repeat(1, 1fr)"
                  width="36vw"
                  p={7}
                >
                  {section.menuItems.map((item: any) => (
                    <DesktopMenuItem
                      title={item.title}
                      url={item.url}
                      explainerText={item.explainerText}
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
const Search = () => (
  <Flex
    justifyContent={{ base: 'flex-end', xl: 'center' }}
    minW={{ base: 'auto', md: '10%' }}
    h="fit-content"
    pt={2}
    pr={4}
    pb={2}
    pl={4}
    mt="auto"
    mb="auto"
    bg={{ base: 'none', xl: 'rgba(255,255,255,0.05)' }}
    border={{ base: 'none', xl: '1px solid #2B2244' }}
    borderRadius={4}
  >
    <Image src={SearchIcon} alt="search" height={16} width={16} />
    <Text
      display={{ base: 'none', xl: 'block' }}
      color="rgba(255,255,255,0.5)"
      alignSelf="center"
      ml={2}
    >
      find anything
    </Text>
  </Flex>
);

// Display player XP and Seed -- not working yet
const PlayerStats = () => (
  <Flex
    align="center"
    display={{ base: 'none', xl: 'flex' }}
    justifyContent="flex-end"
    maxW={{ base: 'auto', xl: '20%' }}
    pl={2}
    pr={2}
    flex="1"
    mt="auto"
    mr={{ base: 4, md: 0 }}
    mb="auto"
  >
    <Badge
      display={{ base: 'none', md: 'flex' }}
      flexDirection={['column', 'column', 'column', 'row']}
      pt={2}
      pr={4}
      pb={2}
      pl={4}
      bg="rgba(0,0,0,0.25)"
      border="1px solid #2B2244"
      borderRadius={50}
    >
      <Image src={XPStar} alt="XP" height={14} width={14} />{' '}
      <Text ml={[0, 0, 0, 2]}>N</Text>
    </Badge>
    <Badge
      display={{ base: 'none', md: 'flex' }}
      flexDirection={['column', 'column', 'column', 'row']}
      m={2}
      pt={2}
      pr={4}
      pb={2}
      pl={4}
      bg="rgba(0,0,0,0.25)"
      border="1px solid #2B2244"
      borderRadius={50}
    >
      <Image src={SeedMarket} alt="Seed" height={14} width={14} />{' '}
      <Text ml={[0, 0, 0, 2]}>N</Text>
    </Badge>
    <Avatar
      name="alt text"
      src="https://bit.ly/tioluwani-kolawole"
      width="52px"
      height="52px"
    />
  </Flex>
);

export const MegaMenu: React.FC = () => {
  // const { user } = useUser();
  // const playerXp = user?.player?.total_xp || 0;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const menuToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <Stack position="sticky" top={0} zIndex={1} fontFamily="exo">
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
          display={{ base: 'flex', md: 'none' }}
          pt={2}
          pl={4}
          pb={2}
          pr={4}
          // border='2px'
          // borderColor='purple.700'
          // borderRadius={4}
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
        <Search />
        <PlayerStats />
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
        pt={4}
        pl={4}
        pb={16}
        pr={4}
        border="none"
      >
        {MenuSectionLinks.map((section) => (
          <>
            <Stack mb={4}>
              <Text
                fontSize="xl"
                fontWeight="600"
                textTransform="capitalize"
                mt={4}
                mb={2}
              >
                {section.label}
              </Text>
              <SimpleGrid columns={2}>
                {section.menuItems.map((item) => (
                  <Link
                    display="flex"
                    alignItems="center"
                    href={item.url}
                    p={4}
                    border="1px"
                    _odd={{ marginRight: '-1px' }}
                    marginBottom="-1px"
                    borderColor="purple.400"
                  >
                    <Avatar
                      name="alt text"
                      src="https://bit.ly/tioluwani-kolawole"
                      width={8}
                      height={8}
                      mr={4}
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
