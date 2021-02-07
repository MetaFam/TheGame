import { CloseIcon,SettingsIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Box,
  Button,
  HStack,
  MetaButton,
  Spinner,
  Text,
} from '@metafam/ds';
import { MetaLink } from 'components/Link';
import { Web3Context } from 'contexts/Web3Context';
import React, { useCallback, useContext } from 'react';

import { useUser, useWeb3 } from '../lib/hooks';
import { getPlayerImage, getPlayerName } from '../utils/playerHelpers';

export const LoginButton: React.FC = () => {
  const { connectWeb3, disconnect, isConnected } = useContext(Web3Context);

  const { address } = useWeb3();
  const { user, fetching } = useUser();

  const handleLoginClick = useCallback(async () => {
    await connectWeb3();
  }, [connectWeb3]);

  if (isConnected) {
    if (fetching) {
      return <Spinner color="purple.500" size="sm" />;
    }
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
          >
            {user.player ? getPlayerName(user.player) : 'Unknown'}
          </MetaLink>
          <HStack spacing={2}>
            <MetaLink href="/profile/setup/username">
              <Button
                variant="link"
                fontWeight="normal"
                title={hasEditedProfile ? 'Edit profile' : 'Setup profile'}
              >
                <SettingsIcon w={7} h={7} color="cyan.400"/>
              </Button>
            </MetaLink>
            <Text color="cyan.400">|</Text>
            <Button
              onClick={disconnect}
              variant="link"
              fontWeight="normal"
              title="Disconnect"
            >
              <CloseIcon w={6} h={6} color="cyan.400"/>
            </Button>
          </HStack>
        </Box>
      </HStack>
    );
  }
  return (
    <MetaButton size="md" px={8} onClick={handleLoginClick}>
      Connect
    </MetaButton>
  );
};
