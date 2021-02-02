import {
  Avatar,
  Box,
  Button,
  HStack,
  Link,
  Spinner,
  Text,
} from '@chakra-ui/react';
import React, { useCallback } from 'react';

import { MetaButton } from './MetaButton';

type UserInfo = {
  playerImage?: string;
  playerName?: string;
  username?: string;
  player?: any;
};

type LoginButtonProps = {
  connectWeb3: () => Promise<void>;
  disconnect: () => void;
  isConnected: boolean;
  user: UserInfo;
  fetching: boolean;
};

export const LoginButton: React.FC<LoginButtonProps> = ({
  connectWeb3,
  disconnect,
  isConnected,
  user,
  fetching,
}: LoginButtonProps) => {
  const handleLoginClick = useCallback(async () => {
    await connectWeb3();
  }, [connectWeb3]);

  if (isConnected) {
    if (fetching) {
      return <Spinner color="purple.500" size="sm" />;
    }
    if (!user?.player) return null;
    return (
      <HStack>
        <Avatar
          src={user.playerImage}
          name={user.playerName}
          as={Link}
          href={`/player/${user.username}`}
        />
        <Box>
          <Link
            href={`/player/${user.username}`}
            fontFamily="body"
            color="whiteAlpha.700"
          >
            {user.player ? user.playerName : 'Unknown'}
          </Link>
          <HStack spacing={2}>
            <Link color="cyan.400" href="/profile/setup">
              Setup profile
            </Link>
            <Text color="cyan.400">|</Text>
            <Button
              onClick={disconnect}
              fontFamily="body"
              color="cyan.400"
              variant="link"
              fontWeight="normal"
            >
              Disconnect
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
