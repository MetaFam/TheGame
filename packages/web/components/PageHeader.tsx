import { Box, Button, Flex, Image, Stack } from '@metafam/ds';
import MetaBoxButton from 'assets/drawer/box.button.bg.png';
import MetaBox from 'assets/drawer/desktop.box.png';
import MetaDrawer from 'assets/drawer/desktop.gradient.png';
import MetaForum from 'assets/drawer/forum.png';
import MetaPlayers from 'assets/drawer/players.png';
import MetaQuests from 'assets/drawer/quests.png';
import MetaRaids from 'assets/drawer/raids.png';
import MetaGameLogo from 'assets/logo.png';
import MetaGameImage from 'assets/metagame.png';
import { MetaLink } from 'components/Link';
import { LoginButton } from 'components/LoginButton';
import React from 'react';

import { DrawerItems } from './DrawerItems';

const MenuItem: React.FC<React.ComponentProps<typeof MetaLink>> = ({
  children,
  href,
  isExternal,
}) => {
  return (
    <MetaLink
      zIndex="2"
      href={href}
      isExternal={isExternal}
      textDecoration="none"
      _hover={{ textDecoration: 'none' }}
    >
      <Button
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="calc(32rem / 5)"
        textDecoration="none"
        _hover={{ textDecoration: 'none' }}
        variant="link"
        p="1"
        fontFamily="mono"
        color="whiteAlpha.700"
        className="filter-effect"
      >
        {children}
      </Button>
    </MetaLink>
  );
};

const SubMenuItem: React.FC<React.ComponentProps<typeof MetaLink>> = ({
  children,
  href,
  isExternal,
}) => {
  return (
    <MetaLink
      zIndex="2"
      href={href}
      isExternal={isExternal}
      textDecoration="none"
      _hover={{ textDecoration: 'none' }}
    >
      <Button
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="8.25rem"
        height="8.25rem"
        textDecoration="none"
        variant="link"
        p="1"
        fontFamily="mono"
        color="whiteAlpha.700"
        className="filter-effect"
        margin="1rem"
        padding="1rem"
        backgroundImage={`url(${MetaBoxButton})`}
      >
        {children}
      </Button>
    </MetaLink>
  );
};

export const PageHeader: React.FC = () => {
  const [show, setShow] = React.useState(true);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      color="offwhite"
      py="4"
      px="8"
      position="relative"
      display={{ base: 'none', md: 'flex' }}
    >
      <MetaLink href="/" display="block" mr="10">
        <Image src={MetaGameImage} alt="MetaGame" mt={-2} w="9rem" />
      </MetaLink>

      <Stack
        width="48rem"
        height="100%"
        direction="row"
        justify="center"
        align="center"
        position="absolute"
        top="0"
        left="calc(50% - 24rem)"
        padding="0 0 0.5rem 0"
      >
        <Image
          src={MetaDrawer}
          alt="MetaDrawer"
          w="48rem"
          position="absolute"
          left="calc(50% - 24rem)"
          top="0"
          zIndex="1"
        />

        <MenuItem
          href="https://forum.metagame.wtf/c/quest/5/l/latest?board=default"
          isExternal
        >
          <Image src={MetaQuests} alt="MetaQuests" />
          Quests
        </MenuItem>

        <MenuItem
          href="https://forum.metagame.wtf/c/quest/5/l/latest?board=default"
          isExternal
        >
          <Image src={MetaRaids} alt="MetaRaids" />
          Raids
        </MenuItem>

        <Button
          display="flex"
          zIndex="11"
          textDecoration="none"
          variant="link"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="calc(32rem / 5)"
          className="filter-effect"
          position="relative"
          top={show ? '1rem' : '46rem'}
          left="-0.25rem"
          onClick={handleToggle}
        >
          <Image src={MetaGameLogo} alt="MetaGameLogo" height="6rem" />
        </Button>

        <MenuItem href="https://forum.metagame.wtf/" isExternal>
          <Image src={MetaForum} alt="MetaForum" />
          Forum
        </MenuItem>

        <MenuItem href="/">
          <Image src={MetaPlayers} alt="MetaPlayers" />
          Players
        </MenuItem>
      </Stack>

      <Box justifyContent="center" width={{ base: 'full', md: 'auto' }}>
        <LoginButton />
      </Box>

      <Stack
        width="33rem"
        direction="row"
        flexWrap="wrap"
        position="absolute"
        zIndex="10"
        top="5rem"
        left="calc(50% - 16.5rem)"
        padding="1rem 0"
        transition="opacity 0.8s cubic-bezier(0.65, 0, 0.35, 1)"
        opacity={show ? 0 : 1}
        pointerEvents={show ? 'none' : 'inherit'}
      >
        <Image
          src={MetaBox}
          alt="MetaBox"
          w="33rem"
          position="absolute"
          left="calc(50% - 16.5rem)"
          top="0"
          zIndex="1"
        />
        {DrawerItems.map((item) => {
          return (
            <SubMenuItem
              href={item.href}
              key={item.alt}
              isExternal={item.isExternal}
            >
              <Image src={item.src} alt={item.alt} />
            </SubMenuItem>
          );
        })}
      </Stack>
    </Flex>
  );
};
