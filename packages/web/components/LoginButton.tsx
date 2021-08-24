import { useState } from 'react';
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
import Ceramic from '@ceramicnetwork/http-client';
import { MetaLink } from 'components/Link';
import React, { useCallback, useMemo } from 'react';
import { ThreeIdConnect,  EthereumAuthProvider } from '@3id/connect';
// import { providers } from 'ethers';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import { DID } from 'dids';

// import { authenticateWallet, getExistingAuth } from '../contexts/Web3Context';
import { useUser } from '../lib/hooks';
import { getPlayerImage, getPlayerName } from '../utils/playerHelpers';

export const LoginButton: React.FC = () => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState();
  const { user, fetching } = useUser();
  const ceramic = useMemo(() => new Ceramic(process.env.CERAMIC_URL), []);
  // TODO: Keep this logic within the Web3 Context
  // useEffect(() => {
  //   (async () => {
  //     const web3Provider = new providers.Web3Provider(window.ethereum)
  //     let token: string | null = await getExistingAuth(web3Provider)
  //     console.log(token);
  //     if (!token) {
  //       token = await authenticateWallet(web3Provider);
  //     }
  //   })()
  // }, [])
  const handleLoginClick = useCallback(async () => {
    const [addr] = await window.ethereum.enable()
    setAddress(addr)
    const threeIdConnect = new ThreeIdConnect()
    const authProvider = new EthereumAuthProvider(window.ethereum, addr)
    await threeIdConnect.connect(authProvider)
    ceramic.did = new DID({
      provider: threeIdConnect.getDidProvider(),
      resolver: ThreeIdResolver.getResolver(ceramic),
    })
    await ceramic.did.authenticate()
    setConnected(true)
  }, []);

  const handleLogoutClick = useCallback(async () => {
    await ceramic.close()
    setConnected(false)
  }, [ceramic])

  if (fetching) {
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
                onClick={handleLogoutClick}
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
    <MetaButton size="md" px={8} onClick={handleLoginClick}>
      Connect
    </MetaButton>
  );
};
