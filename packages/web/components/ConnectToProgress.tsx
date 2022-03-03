import {
  Collapse,
  Flex,
  Image,
  MetaButton,
  MetaMaskIcon,
  Stack,
  Text,
  Tooltip,
  useBoolean,
} from '@metafam/ds';
import cursiveTitle from 'assets/cursive-title-small.png';
import discord from 'assets/discord.svg';
import { SwitchNetworkButton } from 'components/SwitchNetworkButton';
import { useUser, useWeb3 } from 'lib/hooks';

import { MetaLink } from './Link';

export const MetaGameLogo = () => (
  <Image w="100%" maxW="25rem" src={cursiveTitle} mb={8} />
);

export const HelpFooter = () => (
  <Flex justify="center">
    <Tooltip label="Join Our Discord" hasArrow>
      <MetaButton
        as="a"
        target="_blank"
        href="//discord.gg/metagame"
        p={3}
        mr={5}
        sx={{ filter: 'saturate(60%) hue-rotate(45deg)' }}
        leftIcon={<Image src={discord} boxSize={6} mr={1.5} />}
      >
        Get Help
      </MetaButton>
    </Tooltip>
    <Tooltip label="Read Our Wiki" hasArrow>
      <MetaButton
        as="a"
        target="_blank"
        href="//wiki.metagame.wtf"
        p={3}
        sx={{ filter: 'saturate(60%) hue-rotate(45deg)' }}
        leftIcon={
          <Text as="span" fontSize="150%">
            📚
          </Text>
        }
      >
        Learn More
      </MetaButton>
    </Tooltip>
  </Flex>
);

export const ConnectToProgress: React.FC<{
  showNote?: boolean;
  noSwitchButton?: boolean;
}> = ({ showNote = false, noSwitchButton = false }) => {
  const { connect, connecting, connected, chainId } = useWeb3();
  const [open, { toggle }] = useBoolean();
  const { fetching } = useUser();

  if (connected && !fetching && chainId === '0x1') return null;

  return (
    <Stack color="white" align="center" spacing={8}>
      <MetaGameLogo />
      {connecting || fetching || !connected || noSwitchButton ? (
        <Stack spacing={4} align="center">
          {showNote && (
            <Text>Connect your wallet on Ethereum Mainnet to start</Text>
          )}
          <MetaButton
            onClick={connect}
            px={[8, 12]}
            isLoading={connecting || fetching}
          >
            {showNote ? 'Connect Wallet' : 'Connect To Progress'}
          </MetaButton>
          {showNote && (
            <>
              <Text as="button" color="cyan.400" onClick={toggle}>
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
                    Your Ethereum Wallet is your digital ID and bank account.
                    You will need one to play the MetaGame.
                  </Text>
                  <Text>
                    We recommend <MetaMaskIcon /> MetaMask, download it{' '}
                    <MetaLink isExternal href="https://metamask.io/download">
                      here
                    </MetaLink>
                    .
                  </Text>
                </Stack>
              </Collapse>
            </>
          )}
        </Stack>
      ) : (
        <Text fontSize="xl">
          Please switch to <SwitchNetworkButton /> to progress
        </Text>
      )}
      <HelpFooter />
    </Stack>
  );
};
