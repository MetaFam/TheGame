<<<<<<< HEAD
=======
import Ceramic from '@ceramicnetwork/http-client';
>>>>>>> basic profile form
import {
  Avatar,
  Box,
  Button,
  CloseIcon,
  HStack,
  MetaButton,
  SettingsIcon,
  Spinner,
  Text,
} from '@metafam/ds';
import { MetaLink } from 'components/Link';
<<<<<<< HEAD
import React, { useCallback } from 'react';
=======

import React, { useCallback, useMemo } from 'react';
>>>>>>> basic profile form

import { useUser, useWeb3 } from '../lib/hooks';
import { getPlayerImage, getPlayerName } from '../utils/playerHelpers';

export const LoginButton: React.FC = () => {
  const {
    address,
    connect,
    disconnect,
    connected,
    connecting,
  } = useWeb3();

  const { user, fetching } = useUser({ forLoginDisplay: true });

  const handleLoginClick = useCallback(async () => {
    await connect();
  }, [connect]);
<<<<<<< HEAD

  if (fetching || connecting) {
=======
  const handleLogoutClick = useCallback(async () => {
    disconnect();
    await ceramic.close();
  }, [ceramic, disconnect]);

  if (fetching) {
>>>>>>> basic profile form
    return <Spinner color="purple.500" size="sm" />;
  }

  if (connected) {
    if (!user?.player) return null;

    const hasEditedProfile = user.username && user.username !== address;

    return (
      <HStack>
        <Avatar
          src={getPlayerImage(user.player)}
          name={getPlayerName(user.player)}
          as={MetaLink}
          href={`/player/${user.username}`}
        />
        <Box>
          <MetaLink
            href={`/player/${user.username}`}
            fontFamily="body"
            color="whiteAlpha.700"
            pl={1}
          >
            {user.player ? getPlayerName(user.player) : 'Unknown'}
          </MetaLink>
          <Box
            d="flex"
            w="100%"
            alignItems="center"
            justifyContent="space-between"
            sx={{ '& > *': { d: 'inline-flex', px: 1 } }}
          >
            <MetaLink
              href="/profile/setup/username"
              title={hasEditedProfile ? 'Edit profile' : 'Setup profile'}
            >
              <Text display={{ base: 'none', xl: 'inline' }} color="cyan.400">
                Edit profile
              </Text>
              <SettingsIcon
                w={{ base: '20px', xl: 7 }}
                h={{ base: '20px', xl: 7 }}
                color="cyan.400"
                display={{ base: 'initial', xl: 'none' }}
              />
            </MetaLink>
            <Text color="cyan.400">|</Text>
            <Text>
              <Button
                onClick={disconnect}
                variant="link"
                fontWeight="normal"
                title="Disconnect"
                justifyContent="flex-start"
                ml={0}
                pl={0}
                sx={{
                  '&:hover': {
                    color: 'cyan.400',
                  },
                }}
              >
                <Text display={{ base: 'none', xl: 'inline' }} color="cyan.400">
                  Disconnect
                </Text>
                <CloseIcon
                  w={{ base: '18px', xl: 6 }}
                  h={{ base: '18px', xl: 6 }}
                  color="cyan.400"
                  display={{ base: 'initial', xl: 'none' }}
                />
              </Button>
            </Text>
          </Box>
        </Box>
      </HStack>
    );
  }
  return (
    <MetaButton
      w="100%"
      mx={4}
      my={3.5}
      fontFamily="exo2"
      maxWidth={{ sm: '480px' }}
      size="md"
      px={8}
      onClick={handleLoginClick}
    >
      Connect Wallet
    </MetaButton>
  );
};
