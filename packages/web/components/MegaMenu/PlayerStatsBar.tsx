import {
  Dashboard,
  Flex,
  HStack,
  LogOut,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Profile,
  Stack,
  Text,
} from '@metafam/ds';
import { MetaLink } from 'components/Link';
import { LoginButton } from 'components/LoginButton';
import { PlayerAvatar } from 'components/Player/PlayerAvatar';
import { useUser, useWeb3 } from 'lib/hooks';
import React from 'react';
import { getPlayerName, getPlayerURL } from 'utils/playerHelpers';

import { XPSeedsBalance } from './XPSeedsBalance';

// Display player XP and Seed
export const PlayerStatsBar = () => {
  const { disconnect } = useWeb3();
  const { user } = useUser();
  const { player } = user ?? {};

  return (
    <Flex
      align="center"
      display={{ base: 'flex', lg: 'none' }}
      pos="fixed"
      left={0}
      bottom={0}
      justify={player ? 'space-between' : 'center'}
      w="100%"
      h="5rem"
      bg="rgba(0,0,0,0.75)"
      borderColor="#2B2244"
      px="1rem"
      sx={{ backdropFilter: 'blur(10px)' }}
    >
      {!player ? (
        <LoginButton />
      ) : (
        <>
          <Menu>
            <MenuButton
              bg="transparent"
              aria-label="menu options"
              _focus={{ outline: 'none', bg: 'transparent' }}
              _hover={{ bg: 'transparent' }}
              _active={{ bg: 'transparent' }}
            >
              <Flex>
                <PlayerAvatar {...{ player }} w={12} h={12} m={0} />
                <Stack my={2} ml={2} justify="center">
                  <Text
                    fontSize={player.rank ? 14 : 22}
                    fontWeight="semibold"
                    m={0}
                    p={0}
                    lineHeight={1}
                  >
                    {getPlayerName(player)}
                  </Text>
                  {player.rank && (
                    <Text fontSize={12} m={0} p={0} lineHeight={1}>
                      {player.rank}
                    </Text>
                  )}
                </Stack>
              </Flex>
            </MenuButton>
            <MenuList color="black">
              <MetaLink
                color="black"
                href={getPlayerURL(player) ?? '/'}
                _hover={{ textDecoration: 'none' }}
              >
                <MenuItem>
                  <Profile w={4} h={4} mr={4} /> View Profile
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
            <XPSeedsBalance totalXP={player.totalXP} />
          </HStack>
        </>
      )}
    </Flex>
  );
};
