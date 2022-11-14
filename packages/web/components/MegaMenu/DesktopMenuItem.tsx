import { Avatar, Box, Link, MenuItem, Text } from '@metafam/ds';
import { Values } from '@metafam/utils';
import React from 'react';
import { menuIcons } from 'utils/menuIcons';

type MenuItemProps = {
  title: string;
  url: string;
  explainerText: string;
  icon: Values<Record<string, string>>;
};

// Menu links (with icons and explanatory text) -- used in DesktopNavLinks below
export const DesktopMenuItem = ({
  title,
  url,
  explainerText,
  icon,
}: MenuItemProps) => (
  <MenuItem
    h="full"
    p={0}
    borderRadius="md"
    overflow="hidden"
    _active={{ bg: 'none' }}
    _focus={{ bg: 'none' }}
    _hover={{ bg: 'none' }}
  >
    <Link
      display="flex"
      role="group"
      href={url}
      w="full"
      h="full"
      p={4}
      transition="0.5s ease-in"
      alignItems="center"
      _hover={{
        backgroundColor: 'rgba(0,0,0,0.56)',
        textDecoration: 'none',
        transition: '0s',
      }}
      _focus={{ outline: 'none' }}
    >
      <Avatar
        src={menuIcons[icon]}
        w="3.75rem"
        h="3.75rem"
        p={3}
        mr={5}
        bg="linear-gradient(180deg, rgba(0, 0, 0, 0.36) 0%, rgba(0, 0, 0, 0.36) 100%);"
        boxShadow="0 0 0 2px rgba(0, 0, 0, 0.08)"
        _groupHover={{
          boxShadow: '0 0 1px 1px rgba(255, 255, 255, 0.1)',
          bg: 'linear-gradient(180deg, #170B23 0%, #350C58 100%);',
          transition: '0s',
        }}
        transition="0.3s ease-in"
      />
      <Box color="white">
        <Text fontSize="xl" fontWeight="bold">
          {title}
        </Text>
        <Text fontSize="sm">{explainerText}</Text>
      </Box>
    </Link>
  </MenuItem>
);
