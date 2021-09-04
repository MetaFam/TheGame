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
import React, { useCallback } from 'react';

import { useUser, useWeb3 } from '../lib/hooks';
import { getPlayerImage, getPlayerName } from '../utils/playerHelpers';

export const LoginButton: React.FC = () => {
  const {
    address,
    connectWeb3,
    disconnect,
    isConnected,
    isConnecting,
  } = useWeb3();

  const { user, fetching } = useUser();

  const handleLoginClick = useCallback(async () => {
    await connectWeb3();
  }, [connectWeb3]);

  if (fetching || isConnecting) {
    return <Spinner color="purple.500" size="sm" />;
  }

  if (isConnected) {
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
      style={{ width: '100%', margin: '14px 16px' }}
      maxWidth={{ sm: '480px' }}
      size="md"
      px={8}
      onClick={handleLoginClick}
    >
      Connect wallet
    </MetaButton>
  );
};
