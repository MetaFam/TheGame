import {
  Dashboard,
  Flex,
  HStack,
  LogOut,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MetaButton,
  Profile,
  Stack,
  Text,
} from '@metafam/ds';
import { MetaLink } from 'components/Link';
import { PlayerAvatar } from 'components/Player/PlayerAvatar';
import { useMounted, useProfileField, useUser, useWeb3 } from 'lib/hooks';
import React from 'react';
import { getPlayerName, getPlayerURL } from 'utils/playerHelpers';

import { XPSeedsBalance } from './XPSeedsBalance';

// Display player XP and Seed
export const MegaMenuFooter = () => {
  const { connecting, connected, connect, disconnect } = useWeb3();
  const { fetching, user } = useUser();
  const mounted = useMounted();
  const { name } = useProfileField({
    field: 'name',
    player: user,
    getter: getPlayerName,
  });

  return (
    <Flex
      align="center"
      display={{ base: 'flex', lg: 'none' }}
      pos="fixed"
      left={0}
      bottom={0}
      justify={user ? 'space-between' : 'center'}
      w="full"
      h={20}
      bg="rgba(0, 0, 0, 0.75)"
      borderColor="#2B2244"
      px={4}
      sx={{ backdropFilter: 'blur(10px)' }}
    >
      {connected && !!user && !fetching && !connecting ? (
        <>
          <Menu>
            <MenuButton
              bg="transparent"
              aria-label="Menu Options"
              transition="filter 2.75s"
              _focus={{ outline: 'none' }}
              _hover={{ filter: 'brightness(1.1)' }}
              _active={{ filter: 'hue-rotate(30deg)' }}
            >
              <Flex>
                <PlayerAvatar player={user} size="md" />
                <Stack my={2} ml={2} justify="center">
                  <Text
                    fontSize={user.rank ? 14 : 22}
                    fontWeight="semibold"
                    m={0}
                    p={0}
                    lineHeight={1}
                  >
                    {name}
                  </Text>
                  {user.rank && (
                    <Text fontSize={12} m={0} p={0} lineHeight={1}>
                      {user.rank}
                    </Text>
                  )}
                </Stack>
              </Flex>
            </MenuButton>
            <MenuList color="black">
              <MetaLink
                color="black"
                href={getPlayerURL(user) ?? '/'}
                _hover={{ textDecoration: 'none' }}
              >
                <MenuItem>
                  <Profile w={4} h={4} mr={4} /> View Profile
                </MenuItem>
              </MetaLink>
              <MetaLink
                color="black"
                href={'/profile/setup'}
                _hover={{ textDecoration: 'none' }}
              >
                <MenuItem>
                  <Profile w={4} h={4} mr={4} /> Profile Wizard
                </MenuItem>
              </MetaLink>
              <MetaLink
                color="black"
                href={'/dashboard'}
                _hover={{ textDecoration: 'none' }}
              >
                <MenuItem>
                  <Dashboard w={4} h={4} mr={4} color="red.500" />
                  Dashboard
                </MenuItem>
              </MetaLink>
              <MenuItem onClick={disconnect}>
                <LogOut w={4} h={4} mr={4} />
                Disconnect
              </MenuItem>
            </MenuList>
          </Menu>
          <HStack justify="flex-end">
            <XPSeedsBalance totalXP={user.totalXP} mobile />
          </HStack>
        </>
      ) : (
        <MetaButton
          mx={4}
          my={3.5}
          px={8}
          onClick={connect}
          isLoading={!mounted || connecting || fetching}
        >
          Connect Wallet
        </MetaButton>
      )}
    </Flex>
  );
};
