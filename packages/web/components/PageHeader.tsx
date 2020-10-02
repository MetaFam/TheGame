import { Box, Button, Flex, Image, Stack } from '@metafam/ds';
import { MetaLink } from 'components/Link';
import { LoginButton } from 'components/LoginButton';
import MetaGameImage from 'assets/metagame.png';
import React from 'react';

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
    >
      <Button
        textDecoration="none"
        variant="link"
        p="1"
        fontFamily="mono"
        color="whiteAlpha.700"
        _hover={{ color: 'pink.500', textDecoration: 'none' }}
      >
        {children}
      </Button>
    </MetaLink>
  );
};

export const PageHeader: React.FC = () => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      color="offwhite"
      py="6"
      px="8"
    >
      <MetaLink href="/" display="block" mr="10">
        <Image src={MetaGameImage} alt="MetaGame" mt={-2} />
      </MetaLink>

      <Button
        variant="link"
        display={{ base: 'block', md: 'none' }}
        onClick={handleToggle}
      >
        <svg
          fill="white"
          width="1.5rem"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Button>

      <Box
        display={{ base: show ? 'block' : 'none', md: 'flex' }}
        width={{ base: 'full', md: 'auto' }}
        alignItems="center"
        flexGrow={1}
        my={{ base: 8, md: 0 }}
      >
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 4, md: 6, lg: 10 }}
        >
          <MenuItem href="/">Players</MenuItem>
          <MenuItem href="https://discord.gg/VYZPBnx" isExternal>
            Discord
          </MenuItem>
          <MenuItem href="https://wiki.metagame.wtf/" isExternal>
            Wiki
          </MenuItem>
          <MenuItem href="https://forum.metagame.wtf" isExternal>
            Forums
          </MenuItem>
          <MenuItem href="https://metagame.substack.com" isExternal>
            Blog
          </MenuItem>
        </Stack>
      </Box>

      <Box
        display={{ base: show ? 'flex' : 'none', md: 'block' }}
        justifyContent="center"
        width={{ base: 'full', md: 'auto' }}
      >
        <LoginButton />
      </Box>
    </Flex>
  );
};
