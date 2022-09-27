import {
  Box,
  Button,
  Icon,
  Spinner,
  Text,
  Tooltip,
  useBreakpointValue,
  useToast,
  VStack,
} from '@metafam/ds';
import { MetaLink } from 'components/Link';
import { SwitchNetworkButton } from 'components/SwitchNetworkButton';
import { useWeb3 } from 'lib/hooks';
import { useEffect, useState } from 'react';
import { GoSignIn, GoSignOut } from 'react-icons/go';
import { polygon } from 'utils/networks';
import { formatAddress } from 'utils/playerHelpers';

export const LandingConnectButton = ({ isIconStyle = false, ...props }) => {
  const {
    connect,
    disconnect,
    connected,
    connecting,
    address,
    chainId,
    provider,
  } = useWeb3();
  const [wrongNetwork, setWrongNetwork] = useState(false);
  const spinnerSize = useBreakpointValue({ base: 'sm', '2xl': 'md' });
  const toast = useToast();

  useEffect(() => {
    if (connected && address && provider) {
      const networkName = provider.network.name;
      const shortAddress = formatAddress(address);

      if (chainId !== polygon) {
        setWrongNetwork(true);
        toast({
          title: `Wallet Connection`,
          description: (
            <VStack spacing={2} alignItems="baseline" justifyItems="start">
              <Text>
                <Box as="strong" textTransform="capitalize">
                  {networkName ?? ''} ({chainId})
                </Box>{' '}
                network is not supported. This area of the website requires{' '}
                <strong>Polygon</strong> network. Please switch networks.
              </Text>
              <Text>
                You can visit{' '}
                <MetaLink href="https://chainlist.org/chain/137" isExternal>
                  chainlist.org
                </MetaLink>{' '}
                to add Polygon to your wallet.
              </Text>
            </VStack>
          ),
          status: 'warning',
          isClosable: true,
          duration: 5000,
        });
      } else {
        setWrongNetwork(false);
        toast({
          title: 'Wallet Connection',
          description: `Successfully connected to ${networkName} with ${shortAddress}. 🥳`,
          status: 'success',
          isClosable: true,
          duration: 5000,
        });
      }
    }
  }, [connected, chainId, address, provider, toast]);

  useEffect(() => {
    if (!connected) {
      setWrongNetwork(false);
    }
  }, [connected]);

  // useEffect(() => {
  //   if (!connected) {
  //     toast({
  //       title: 'Wallet Connection',
  //       description: 'You are disconnected from the app. See you soon, Anon',
  //       status: 'success',
  //       isClosable: true,
  //       duration: 5000,
  //     });
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [connected]);

  return (
    <Tooltip
      label={
        connected && wrongNetwork
          ? 'Change to Polygon network 👆'
          : `${connected ? 'Disconnect' : 'Connect'} wallet`
      }
      hasArrow
      placement="bottom"
    >
      {!isIconStyle ? (
        <Button
          onClick={connected ? disconnect : connect}
          variant="ghost"
          aria-label="Connect to Web3 wallet"
          color={
            wrongNetwork
              ? 'brightIdOrange.600'
              : 'var(--chakra-colors-landing550)'
          }
          textShadow={
            wrongNetwork
              ? 'brightIdOrange.400'
              : 'var(--chakra-colors-landing500)'
          }
          isDisabled={connecting}
          size={'xl'}
        >
          {connecting && <Spinner size="sm" />}
          {!connecting && connected ? 'Connected' : 'Connect'}
        </Button>
      ) : (
        <Button
          onClick={connected ? disconnect : connect}
          variant="ghost"
          display="inline-flex"
          alignItems="center"
          fontWeight="normal"
          color={wrongNetwork ? 'brightIdOrange.600' : 'white'}
          // textShadow={`0 0 8px var(--chakra-colors-landing500)`}
          borderRadius="inherit inherit 0 0"
          opacity={0.3}
          px={{ base: 1, xl: 2 }}
          sx={{
            // svg: {
            //   filter: 'drop-shadow(0 0 10px var(--chakra-colors-diamond))',
            // },
            '&:hover': {
              backgroundColor: 'transparent',
              color: 'var(--chakra-colors-landing300)',
              opacity: 1,
              svg: {
                filter: 'drop-shadow(0 0 10px var(--chakra-colors-landing300))',
              },
            },
          }}
          {...props}
        >
          {connecting ? (
            <Spinner size={spinnerSize} />
          ) : (
            <Icon
              as={connected ? GoSignOut : GoSignIn}
              h={{ base: 6, '2xl': 8 }}
              w={{ base: 6, '2xl': 8 }}
            />
          )}
        </Button>
      )}
    </Tooltip>
  );
};
