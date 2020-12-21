import { Box, Button, Flex, Image, Stack, useDisclosure } from '@metafam/ds';
import { MetaLink } from 'components/Link';
import { LoginButton } from 'components/LoginButton';
import NextImage from 'next/image';
import React from 'react';

import {
  DrawerItemsLeft,
  DrawerItemsRight,
  DrawerSubItems,
} from '../utils/drawerItems';

const MetaBoxButton = '/assets/drawer/box.button.bg.png';
const MetaBox = '/assets/drawer/desktop.box.png';
const MetaDrawer = '/assets/drawer/desktop.gradient.png';
const MetaGameLogo = '/assets/logo.png';
const MetaGameImage = '/assets/metagame.png';

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
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      color="offwhite"
      px="8"
      position="relative"
      display={{ base: 'none', md: 'flex' }}
    >
      <MetaLink href="/" display="block" mr="10">
        <Box mt={2}>
          <NextImage
            src={MetaGameImage}
            alt="MetaGame"
            width={144}
            height={62}
          />
        </Box>
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
        <Box position="absolute" left="calc(50% - 24rem)" top="0" zIndex="1">
          <NextImage
            src={MetaDrawer}
            alt="MetaDrawer"
            width={768}
            height={94}
          />
        </Box>

        {DrawerItemsLeft.map((item) => (
          <MenuItem
            key={item.alt}
            href={item.href}
            isExternal={item.isExternal}
          >
            <NextImage src={item.src} alt={item.alt} width={35} height={35} />
            {item.text}
          </MenuItem>
        ))}

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
          top={isOpen ? '46rem' : '1rem'}
          left="-0.25rem"
          onClick={onToggle}
        >
          <NextImage
            src={MetaGameLogo}
            alt="MetaGameLogo"
            width={80}
            height={96}
          />
        </Button>

        {DrawerItemsRight.map((item) => (
          <MenuItem
            key={item.alt}
            href={item.href}
            isExternal={item.isExternal}
          >
            <NextImage src={item.src} alt={item.alt} width={35} height={35} />
            {item.text}
          </MenuItem>
        ))}
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
        opacity={isOpen ? 1 : 0}
        pointerEvents={isOpen ? 'inherit' : 'none'}
      >
        <Box
          position="fixed"
          top="0"
          bottom="0"
          left="0"
          right="0"
          onClick={() => onClose()}
        />
        <Box position="absolute" left="calc(50% - 16.5rem)" top="0">
          <NextImage src={MetaBox} alt="MetaBox" width={528} height={695} />
        </Box>
        {DrawerSubItems.map((item) => {
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
