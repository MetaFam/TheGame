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
      href={href} 
      isExternal={isExternal}
      _focus={{ outline: 0 }}
      flexGrow={1}
      alignItems="center"
      _hover={{ textDecoration: 'none' }}
    >
      <Button
        display="flex"
        flexDirection="column"
        textDecoration="none"
        variant="link"
        fontFamily="mono"
        color="whiteAlpha.700"
        width="100%"
        _focus={{ boxShadow: 'none' }}
        _hover={{ textDecoration: 'none' }}
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
      display="flex"
      height="100%"
    >
      <Button
        display="flex"
        flexDirection="column"
        textDecoration="none"
        fontWeight="normal"
        backgroundColor="rgba(255,255,255,0.08)"
        borderRadius="0.25rem"
        variant="link"
        color="whiteAlpha.700"
        flexGrow={1}
        padding="0.5rem"
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
  return <Image src={src} alt={alt} mb={2} maxHeight="calc(100% - 1.5rem)"/>;
};

export const MobileFooter: React.FC = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Flex
      as="nav"
      display={{ base: 'flex', lg: 'none' }}
    >
      <Flex
        align="center"
        position="fixed"
        zIndex="11"
        left="calc(50vw - (min(100vw, 30rem) / 2))"
        bottom="0"
        width="min(100vw, 30rem)"
        height="5rem"
        background="linear-gradient(180deg, #40347C 58.55%, #A751BD 100%)"
        borderRadius="1rem 1rem 0 0"
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
              top: '-2.5rem',
              filter: 'drop-shadow(0 0 15px #a5b9f680)',
            },
            hide: { position: 'relative', top: '-0.5rem', filter: 'none' },
          }}
        >
          <Button
            display="flex"
            textDecoration="none"
            variant="link"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            onClick={onToggle}
            _focus={{ boxShadow: 'none' }}
          >
            <Image // TODO use NextImage component once images are without text
              src={MetaGameLogo}
              alt="MetaGameLogo"
              position="relative"
              top="0.5rem"
              maxHeight="6rem"
            />
          </Button>
        </motion.div>

        {DrawerItemsRight.map((item) => (
          <MenuItem href={item.href} isExternal={item.isExternal} key={item.href}>
            <NextImage src={item.src} alt={item.alt} width={35} height={35} />
            {item.text}
          </MenuItem>
        ))}
      </Flex>

      <motion.div
        animate={isOpen ? 'show' : 'hide'}
        transition={{ duration: 0.25 }}
        variants={{
          show: { display: 'block', opacity: 1, pointerEvents: 'inherit' },
          hide: { display: 'none', opacity: 0, pointerEvents: 'none' },
        }}
        onClick={onClose}
        style={{ opacity: 0 }}
      >
        <Stack
          position="fixed"
          zIndex="10"
          left="calc((100vw - min(100vw, 3 * 10rem)) / 2)"
          bottom="4rem"
          width="min(100vw, 3 * 10rem)"
          maxHeight="calc(100vh - 4rem)"
          background="linear-gradient(180deg, rgba(76, 63, 143, 0.95) 62.76%, rgba(184, 169, 255, 0.95) 100%);"
          display="grid"
          gridTemplateColumns="repeat(3, auto)"
          gridTemplateRows="repeat(4, calc(25vh - 3rem))"
          gridGap="1rem"
          justify="center"
          align="center"
          padding="1rem 1rem 3rem 1rem"
        >
          {DrawerSubItems.map((item) => (
            <SubMenuItem href={item.href} key={item.alt}>
              <SubImage src={item.src} alt={item.alt} />
              {item.text}
            </SubMenuItem>
          ))}
        </Stack>
      </motion.div>
    </Flex>
  );
};
