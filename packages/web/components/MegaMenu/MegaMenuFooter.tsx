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
import { usePlayerHydrationContext } from 'contexts/PlayerHydrationContext';
import { useMounted, useUser, useWeb3 } from 'lib/hooks';
import React, { useEffect, useState } from 'react';
import { getPlayerName, getPlayerURL } from 'utils/playerHelpers';

import { XPSeedsBalance } from './XPSeedsBalance';

// Display player XP and Seed
export const MegaMenuFooter = () => {
  const [linkURL, setLinkURL] = useState<string>();
  const [name, setName] = useState('');

  const { connecting, connected, connect, disconnect } = useWeb3();
  const { fetching, user } = useUser();
  const { hydratedPlayer: player } = usePlayerHydrationContext();
  const mounted = useMounted();

  useEffect(() => {
    const getPlayer = async () => {
      setLinkURL(await getPlayerURL(user));
      setName(await getPlayerName(user));
    };
    getPlayer();
  }, [user]);

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
      backdropFilter="blur(10px)"
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
                <PlayerAvatar player={player} size="md" />
                <Stack my={2} ml={2} justify="center">
                  <Text
                    fontSize={player.rank ? 14 : 22}
                    fontWeight="semibold"
                    m={0}
                    p={0}
                    lineHeight={1}
                  >
                    {name}
                  </Text>
                  {player.rank && (
                    <Text fontSize={12} m={0} p={0} lineHeight={1}>
                      {player.rank}
                    </Text>
                  )}
                </Stack>
              </Flex>
            </MenuButton>
            <MenuList
              color="white"
              boxShadow="2xl"
              bg="rgba(0, 0, 0, 0.75)"
              borderRadius="md"
              border={0}
              px={2}
              position="relative"
              transform="translateY(-7px)!important"
            >
              <MetaLink
                color="white"
                href={linkURL || '/'}
                _hover={{ textDecoration: 'none' }}
              >
                <MenuItem
                  sx={{
                    '&:hover, &:active, &:focus': {
                      bg: 'rgba(0,0,0,0.56)',
                      color: 'white',
                      borderRadius: 'md',
                    },
                  }}
                >
                  <Profile w={4} h={4} mr={4} /> View Profile
                </MenuItem>
              </MetaLink>
              <MetaLink
                color="white"
                href={'/profile/setup'}
                _hover={{ textDecoration: 'none' }}
              >
                <MenuItem
                  sx={{
                    '&:hover, &:active, &:focus': {
                      bg: 'rgba(0,0,0,0.56)',
                      color: 'white',
                      borderRadius: 'md',
                    },
                  }}
                >
                  <Profile w={4} h={4} mr={4} /> Profile Wizard
                </MenuItem>
              </MetaLink>
              <MetaLink
                color="white"
                href={'/dashboard'}
                _hover={{ textDecoration: 'none' }}
              >
                <MenuItem
                  sx={{
                    '&:hover, &:active, &:focus': {
                      bg: 'rgba(0,0,0,0.56)',
                      color: 'white',
                      borderRadius: 'md',
                    },
                  }}
                >
                  <Dashboard w={4} h={4} mr={4} fill="white" color="red.500" />
                  Dashboard
                </MenuItem>
              </MetaLink>
              <MenuItem
                onClick={disconnect}
                sx={{
                  '&:hover, &:active, &:focus': {
                    bg: 'rgba(0,0,0,0.56)',
                    color: 'white',
                    borderRadius: 'md',
                  },
                }}
              >
                <LogOut w={4} h={4} mr={4} fill="white" />
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
