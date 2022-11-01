import {
  Button,
  Collapse,
  Flex,
  Image,
  Link,
  MetaHeading,
  MetaMaskIcon,
  Stack,
  Text,
  useBoolean,
} from '@metafam/ds';
import LogoImage from 'assets/logo.png';
import { SwitchNetworkButton } from 'components/SwitchNetworkButton';
import { useUser, useWeb3 } from 'lib/hooks';
import React from 'react';

import { MetaLink } from './Link';

export const MetaGameLogo = () => (
  <Flex justify="center" align="center">
    <Image w="3.5rem" h="4rem" src={LogoImage.src} />
  </Flex>
);

export const ConnectToProgress: React.FC<{
  showNote?: boolean;
  showSwitchButton?: boolean;
  header?: string;
}> = ({
  showNote = false,
  showSwitchButton = true,
  header = 'Welcome to MetaGame!',
}) => {
  const { connect, connecting, connected, chainId } = useWeb3();
  const [open, { toggle }] = useBoolean();
  const { fetching } = useUser();

  if (connected && !fetching) {
    if (chainId !== '0x1' && showSwitchButton) {
      return (
        <Stack w="100%" align="center">
          <Stack color="white" spacing={8} w="100%" maxW="30rem">
            <MetaGameLogo />
            {header && <MetaHeading>{header}</MetaHeading>}
            <Text fontSize="md" w="100%" textAlign="center">
              Please switch to <SwitchNetworkButton chainId="0x1" /> to progress
            </Text>
          </Stack>
        </Stack>
      );
    }
    return null;
  }

  return (
    <Stack w="100%" align="center">
      <Stack color="white" spacing={8} w="100%" maxW="28rem">
        <MetaGameLogo />
        {header && <MetaHeading> {header} </MetaHeading>}
        {showNote && (
          <Stack spacing={4} align="flex-start" w="100%" px={2}>
            <Text>First things first, you should make yourself a profile.</Text>
            <Text>
              From there, you'll be able to show the world what you're about,
              what you're working on & more.
            </Text>
            <Text>
              Unlike profiles in the Web2 world, MyMeta profiles reside on a
              decentralized service; they are controlled & owned by you alone.
            </Text>
            <Text>
              Read more about MyMeta profiles{' '}
              <Link
                href="//wiki.metagame.wtf/docs/what-we-do/mymeta"
                isExternal
                color="pink.400"
                textDecor="underline"
                fontWeight="bold"
              >
                here
              </Link>
              .
            </Text>
          </Stack>
        )}
        <Stack w="100%" spacing={4} pt={2}>
          {showNote && (
            <Text textAlign="center">
              Connect your wallet on Ethereum Mainnet to start
            </Text>
          )}
          <Button
            w="100%"
            size="lg"
            textTransform="uppercase"
            fontWeight="600"
            onClick={connect}
            isLoading={connecting || fetching}
            colorScheme="pink"
            fontSize="1.25rem"
          >
            {showNote ? 'Connect Wallet' : 'Connect to continue'}
          </Button>
          {showNote && (
            <Link href="/dashboard" _hover={{}} w="100%">
              <Button
                w="100%"
                size="lg"
                fontSize="1.25rem"
                fontWeight="600"
                textTransform="uppercase"
                colorScheme="blackAlpha"
                color="whiteAlpha.700"
              >
                Explore First
              </Button>
            </Link>
          )}
        </Stack>
        {showNote && (
          <>
            <Text
              as="button"
              color="white"
              textDecor="underline"
              onClick={toggle}
            >
              Don't have a wallet yet?
            </Text>
            <Collapse in={open}>
              <Stack
                spacing={2}
                w="100%"
                maxW="30rem"
                textAlign="center"
                align="center"
              >
                <Text>
                  With an{' '}
                  <MetaLink
                    isExternal
                    href="https://wiki.metagame.wtf/docs/great-houses/house-of-ethereum"
                    color="pink.400"
                    textDecor="underline"
                  >
                    Ethereum
                  </MetaLink>{' '}
                  wallet you can be your own bank and control your digital
                  assets & ID. You will need one to play MetaGame as well as
                  engage in the wider ecosystem.
                </Text>
                <Text>
                  We recommend{' '}
                  <MetaLink
                    isExternal
                    href="https://metamask.io/download"
                    color="pink.400"
                    textDecor="underline"
                  >
                    <MetaMaskIcon /> MetaMask
                  </MetaLink>
                  .
                </Text>
              </Stack>
            </Collapse>
          </>
        )}
      </Stack>
    </Stack>
  );
};
