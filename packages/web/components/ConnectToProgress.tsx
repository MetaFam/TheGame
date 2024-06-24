import {
  Collapse,
  Flex,
  Image,
  MetaHeading,
  MetaMaskIcon,
  Stack,
  Text,
  useBoolean,
} from '@metafam/ds';
import LogoImage from 'assets/new_logo_svg.svg';
import { SwitchNetworkButton } from 'components/SwitchNetworkButton';
import { ConnectKitButton } from 'connectkit';
import { useUser } from 'lib/hooks';
import { useAccount } from 'wagmi';

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
  const { isConnected, chainId } = useAccount();
  const [open, { toggle }] = useBoolean();
  const { fetching } = useUser();

  if (isConnected && !fetching) {
    if (chainId !== 10 && showSwitchButton) {
      return (
        <Stack w="100%" align="center">
          <Stack color="white" spacing={8} w="100%" maxW="30rem">
            <MetaGameLogo />
            {header && <MetaHeading>{header}</MetaHeading>}
            <Text fontSize="md" w="100%" textAlign="center">
              Please switch to <SwitchNetworkButton chainId="0xa" /> to progress
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
            <Text>
              First things first, make yourself a profile. You’ll need it to
              present yourself & your work to the rest of the world. Unlike Web2
              profiles, MyMeta profiles are controlled & owned by you alone,
              residing on the{' '}
              <MetaLink href="https://ceramic.network/" target="_blank">
                Ceramic network.
              </MetaLink>
            </Text>
          </Stack>
        )}
        <Stack w="100%" spacing={4} pt={2}>
          <ConnectKitButton />
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
                    href="https://metagame.wtf/academy/wtf-is-ethereum"
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
