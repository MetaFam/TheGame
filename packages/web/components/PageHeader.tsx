import {
  Box,
  BoxedNextImage,
  Button,
  Flex,
  Image,
  Stack,
  useDisclosure,
} from '@metafam/ds';
import { MetaLink } from 'components/Link';
import { LoginButton } from 'components/LoginButton';
import { Ticker } from 'components/Ticker';
import { motion } from 'framer-motion';
import React from 'react';

import { useMounted } from '../lib/hooks';
import { isBackdropFilterSupported } from '../utils/compatibilityHelpers';
import {
  DrawerItemsLeft,
  DrawerItemsRight,
  DrawerSubItems,
} from '../utils/drawerItems';

const MetaDrawer = '/assets/drawer/desktop.gradient.png';
const MetaGradientBottom = '/assets/drawer/desktop.gradient.bottom.png';
const MetaGameLogo = '/assets/logo.alt.png';
const drawer = { width: '39rem', height: '5.5rem' };
const content = { width: '33rem', height: '46rem' };

const MenuItem: React.FC<React.ComponentProps<typeof MetaLink>> = ({
  children,
  href,
  isExternal,
}) => {
  return (
    <MetaLink
      href={href}
      isExternal={isExternal}
      textDecoration="none"
      _hover={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      zIndex={15}
    >
      <Button
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width={`calc(${drawer.width} / 5 - 1rem)`}
        top="0.25rem"
        textDecoration="none"
        _hover={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}
        variant="link"
        p="1"
        fontFamily="mono"
        color="whiteAlpha.700"
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
        position="relative"
        overflow="hidden"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="8.25rem"
        height="8.25rem"
        backgroundColor="rgba(255,255,255,0.08)"
        borderRadius="5px"
        textDecoration="none"
        variant="link"
        fontWeight="normal"
        color="whiteAlpha.700"
        margin={3}
        _after={{
          content: "''",
          position: 'absolute',
          display: 'block',
          width: '100%',
          height: '100%',
          filter: 'blur(10px)',
          transform: 'translate3d(-120%, 0, 0)',
          background: `linear-gradient(
              45deg, transparent,
              rgba(255, 255, 255, 0),
              rgba(255, 255, 255, 0.06),
              rgba(255, 255, 255, 0),
              transparent
            )`,
          transition: 'all 0.3s 0.1s ease-in-out',
          zIndex: 1,
        }}
        _hover={{
          textDecoration: 'none',
          boxShadow: '0 0 2rem rgba(0,0,0,.1)',
          _before: { transform: 'translate3d(120%, 0, 0)' },
          _after: { transform: 'translate3d(120%, 0, 0)' },
        }}
      >
        {children}
      </Button>
    </MetaLink>
  );
};

export const PageHeader: React.FC = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const hasMounted = useMounted();

  const drawerOpacity = hasMounted && isBackdropFilterSupported() ? 0.75 : 0.98;

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      color="offwhite"
      px={8}
      position="relative"
      display={{ base: 'none', lg: 'flex' }}
    >
      <Box>
        <Ticker />
      </Box>

      <Stack
        width={drawer.width}
        height="100%"
        direction="row"
        justify="center"
        align="center"
        position="absolute"
        top="0"
        left={`calc(50% - (${drawer.width} / 2))`}
      >
        {/* margin-inline-start = 0.5rem is set and I don't know how to remove it */}
        <Box
          position="absolute"
          left={`calc(50% - (${drawer.width} / 2) + 0.5rem)`}
          top="0"
          zIndex="1"
        >
          <Image
            src={MetaDrawer}
            alt="MetaDrawer"
            width={drawer.width}
            height={drawer.height}
          />
        </Box>

        {DrawerItemsLeft.map((item) => (
          <MenuItem
            key={item.alt}
            href={item.href}
            isExternal={item.isExternal}
          >
            <BoxedNextImage
              width="2rem"
              height="2rem"
              src={item.src}
              alt={item.alt}
            />
            {item.text}
          </MenuItem>
        ))}

        <motion.div
          animate={isOpen ? 'show' : 'hide'}
          transition={{ duration: 0.25 }}
          variants={{
            show: { position: 'relative', top: content.height },
            hide: { position: 'relative', top: '1rem' },
          }}
        >
          <Button
            display="flex"
            zIndex="11"
            textDecoration="none"
            variant="link"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width={`calc(${drawer.width} / 5 - 2rem)`}
            position="relative"
            _focus={{ outline: 0 }}
            onClick={onToggle}
          >
            <BoxedNextImage
              src={MetaGameLogo}
              alt="MetaGameLogo"
              width={drawer.height}
              height={`calc(${drawer.height} * 1.1)`}
            />
          </Button>
        </motion.div>

        {DrawerItemsRight.map((item) => (
          <MenuItem
            key={item.alt}
            href={item.href}
            isExternal={item.isExternal}
          >
            <BoxedNextImage
              src={item.src}
              alt={item.alt}
              width="2rem"
              height="2rem"
            />
            {item.text}
          </MenuItem>
        ))}
      </Stack>

      <Flex justifyContent="center" alignItems="center">
        <LoginButton />
      </Flex>

      <motion.div
        animate={isOpen ? 'show' : 'hide'}
        transition={{ duration: 0.25 }}
        variants={{
          show: { opacity: 1, pointerEvents: 'auto' },
          hide: { opacity: 0, pointerEvents: 'none' },
        }}
        onClick={onClose}
        style={{
          position: 'absolute',
          zIndex: 10,
          top: `calc(${drawer.height} - 0.85rem)`,
          left: `calc(50% - ${content.width} / 2)`,
          opacity: 0,
        }}
      >
        <Stack
          width={content.width}
          direction="row"
          flexWrap="wrap"
          padding={4}
        >
          <Box
            position="fixed"
            top="0"
            bottom="0"
            left="0"
            right="0"
            onClick={onClose}
          />

          <Box
            position="absolute"
            left={`calc(50% - ${content.width} / 2)`}
            top="0"
            width={`calc(${content.width} - 0.5rem)`}
            height={`calc(${content.height} - 3.5rem)`}
            background={`linear-gradient(
              180deg, rgba(76, 63, 143, ${drawerOpacity}) 62.76%,
              rgba(184, 169, 255, ${drawerOpacity}) 100%
            )`}
            style={{
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          />
          {/* ToDo: switch to BoxedNextImage */}
          <Image
            position="absolute"
            left="-0"
            top={`calc(${content.height} - 3.6rem)`}
            src={MetaGradientBottom}
            alt="MetaGradientBottom"
            height="1rem"
            width={`calc(${content.width} - 0.5rem)`}
          />

          {DrawerSubItems.map((item) => {
            return (
              <SubMenuItem
                href={item.href}
                key={item.alt}
                isExternal={item.isExternal}
              >
                <BoxedNextImage
                  src={item.src}
                  alt={item.alt}
                  height="5rem"
                  width="5rem"
                  mb={2}
                />
                {item.text}
              </SubMenuItem>
            );
          })}
        </Stack>
      </motion.div>
    </Flex>
  );
};
