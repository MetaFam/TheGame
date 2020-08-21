import { Box, Button, Flex, Image, MetaButton, Stack } from '@metafam/ds';
import { MetaLink } from 'components/Link';
import React from 'react';

import MetaGameImage from '../public/images/metagame.png';

const MenuItem: React.FC = ({ children }) => (
  <Box>
    <Button variant="link" color="offwhite" p="2">
      {children}
    </Button>
  </Box>
);

type Props = {
  isHidden: boolean;
};

export const PageHeader: React.FC<Props> = ({ isHidden }) => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  if (isHidden) {
    return null;
  }

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
      <MetaLink as="/" href="/" display="block" mr="10">
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
        my={{ base: 4, md: 0 }}
      >
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 4, md: 6, lg: 10 }}
        >
          <MenuItem>Quests</MenuItem>
          <MenuItem>Raids</MenuItem>
          <MenuItem>Players</MenuItem>
          <MenuItem>Forum</MenuItem>
        </Stack>
      </Box>

      <Box display={{ base: show ? 'block' : 'none', md: 'block' }}>
        <MetaButton>Sign in</MetaButton>
      </Box>
    </Flex>
  );
};
