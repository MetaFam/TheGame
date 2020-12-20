import { Button, Flex, Image, Stack } from '@metafam/ds';
import MetaGameLogo from 'assets/logo.png';
import { MetaLink } from 'components/Link';
import NextImage from 'next/dist/client/image';
import MetaBoxButton from 'public/assets/drawer/box.button.bg.png';
import React from 'react';

import {
  DrawerItemsLeft,
  DrawerItemsRight,
  DrawerSubItems,
} from '../utils/DrawerItems';

const MenuItem: React.FC<React.ComponentProps<typeof MetaLink>> = ({
  children,
  href,
  isExternal,
}) => {
  return (
    <MetaLink zIndex="2" href={href} isExternal={isExternal}>
      <Button
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="20vw"
        height="5rem"
        textDecoration="none"
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
      margin="0 !important"
      width="7rem"
      height="7rem"
    >
      <Button
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="6rem"
        height="6rem"
        textDecoration="none"
        variant="link"
        margin="0.5rem"
        padding="0.5rem"
        backgroundImage={`url(${MetaBoxButton})`}
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
  return <Image src={src} alt={alt} height="85%" />;
};

export const MobileFooter: React.FC = () => {
  const [show, setShow] = React.useState(true);
  const handleToggle = () => setShow(!show);

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
      height="5rem"
      zIndex="11"
      background="linear-gradient(180deg, #40347C 58.55%, #A751BD 100%)"
    >
      {DrawerItemsLeft.map((item) => (
        <MenuItem href={item.href} isExternal={item.isExternal}>
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
        width="20vw"
        height="5rem"
        top={show ? '0rem' : '-3rem'}
        style={{ filter: show ? 'none' : 'drop-shadow(0 0 15px #a5b9f680)' }}
        onClick={handleToggle}
      >
        <Image // TODO use NextImage component once images are without text
          src={MetaGameLogo}
          alt="MetaGameLogo"
          height="6rem"
          position="relative"
          top="0.5rem"
        />
      </Button>

      {DrawerItemsRight.map((item) => (
        <MenuItem href={item.href} isExternal={item.isExternal}>
          <NextImage src={item.src} alt={item.alt} width={35} height={35} />
          {item.text}
        </MenuItem>
      ))}

      <Stack
        position="fixed"
        left="0"
        top="0"
        width="100vw"
        height="calc(100vh - 5rem)"
        background="linear-gradient(180deg, rgba(76, 63, 143, 0.5) 62.76%, rgba(184, 169, 255, 0.5) 100%);"
        display="grid"
        gridTemplateColumns="auto auto auto"
        justify="center"
        align="center"
        padding="1rem 1rem 6rem 1rem"
        transition="opacity 0.8s cubic-bezier(0.65, 0, 0.35, 1)"
        opacity={show ? 0 : 1}
        pointerEvents={show ? 'none' : 'inherit'}
      >
        {DrawerSubItems.map((item) => {
          return (
            <SubMenuItem href={item.href} key={item.alt}>
              <SubImage src={item.src} alt={item.alt} />
            </SubMenuItem>
          );
        })}
      </Stack>
    </Flex>
  );
};
