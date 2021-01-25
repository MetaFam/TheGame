import { Button, Flex, Image, Stack, useDisclosure } from '@metafam/ds';
import MetaGameLogo from 'assets/logo.png';
import { MetaLink } from 'components/Link';
import { motion } from 'framer-motion';
import NextImage from 'next/dist/client/image';
import React from 'react';

import {
  DrawerItemsLeft,
  DrawerItemsRight,
  DrawerSubItems,
} from '../utils/drawerItems';

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
      _focus={{ outline: 0 }}
    >
      <Button
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="19vw"
        height="100%"
        textDecoration="none"
        variant="link"
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
      margin="0 !important"
      width="33vw"
      height="33vw"
    >
      <Button
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="95%"
        height="95%"
        textDecoration="none"
        fontWeight="normal"
        backgroundColor="rgba(255,255,255,0.08)"
        borderRadius="5px"
        variant="link"
        color="whiteAlpha.700"
      >
        {children}
      </Button>
    </MetaLink>
  );
};

export interface SubImageProps {
  src: string;
  alt: string;
}

export const SubImage: React.FC<SubImageProps> = ({ src, alt }) => {
  return <Image src={src} alt={alt} height="18vw" mb={2} />;
};

export const MobileFooter: React.FC = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Flex
      as="nav"
      align="center"
      justify="center"
      wrap="wrap"
      color="offwhite"
      position="fixed"
      display={{ base: 'flex', md: 'none' }}
      left="0"
      bottom="0"
      width="100%"
      height="25vw"
      zIndex="11"
      background="linear-gradient(180deg, #40347C 58.55%, #A751BD 100%)"
    >
      {DrawerItemsLeft.map((item) => (
        <MenuItem href={item.href} isExternal={item.isExternal} key={item.href}>
          <NextImage src={item.src} alt={item.alt} width={35} height={35} />
          {item.text}
        </MenuItem>
      ))}

      <motion.div
        animate={isOpen ? 'show' : 'hide'}
        transition={{ duration: 0.25 }}
        variants={{
          show: {
            position: 'relative',
            top: '-3rem',
            filter: 'drop-shadow(0 0 15px #a5b9f680)',
          },
          hide: { position: 'relative', top: 0, filter: 'none' },
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
          width="20vw"
          height="25vw"
          onClick={onToggle}
        >
          <Image // TODO use NextImage component once images are without text
            src={MetaGameLogo}
            alt="MetaGameLogo"
            height="30vw"
            position="relative"
            top="0.5rem"
          />
        </Button>
      </motion.div>

      {DrawerItemsRight.map((item) => (
        <MenuItem href={item.href} isExternal={item.isExternal} key={item.href}>
          <NextImage src={item.src} alt={item.alt} width={35} height={35} />
          {item.text}
        </MenuItem>
      ))}

      <motion.div
        animate={isOpen ? 'show' : 'hide'}
        transition={{ duration: 0.25 }}
        variants={{
          show: { opacity: 1, pointerEvents: 'inherit' },
          hide: { opacity: 0, pointerEvents: 'none' },
        }}
        onClick={onClose}
        style={{ opacity: 0 }}
      >
        <Stack
          position="fixed"
          left={0}
          bottom="25vw"
          width="100vw"
          height="min(100vh - 25vw, 5 * 31vw)"
          background="linear-gradient(180deg, rgba(76, 63, 143, 0.95) 62.76%, rgba(184, 169, 255, 0.95) 100%);"
          display="grid"
          gridTemplateColumns="auto auto auto"
          justify="center"
          align="center"
          padding="1rem 1rem 6rem 1rem"
        >
          {DrawerSubItems.map((item) => {
            return (
              <SubMenuItem href={item.href} key={item.alt}>
                <SubImage src={item.src} alt={item.alt} />
                {item.text}
              </SubMenuItem>
            );
          })}
        </Stack>
      </motion.div>
    </Flex>
  );
};
