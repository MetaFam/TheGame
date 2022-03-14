import {
  Button,
  Collapse,
  Flex,
  Image,
  Link,
  ListItem,
  MetaHeading,
  MetaMaskIcon,
  Stack,
  Text,
  Tooltip,
  UnorderedList,
  useBoolean,
} from '@metafam/ds';
import LogoImage from 'assets/logo-new.png';
import { SwitchNetworkButton } from 'components/SwitchNetworkButton';
import { useUser, useWeb3 } from 'lib/hooks';

import { MetaLink } from './Link';

export const MetaGameLogo = () => (
  <Flex justify="center">
    <Image w="fit-content" h="4rem" src={LogoImage} />
  </Flex>
);

export const ConnectToProgress: React.FC<{
  showNote?: boolean;
  showSwitchButton?: boolean;
}> = ({ showNote = false, showSwitchButton = true }) => {
  const { connect, connecting, connected, chainId } = useWeb3();
  const [open, { toggle }] = useBoolean();
  const { fetching } = useUser();

  if (connected && !fetching && (chainId === '0x1' || !showSwitchButton))
    return null;

  return (
    <Stack color="white" spacing={8} w="100%" maxW="28rem">
      <MetaGameLogo />
      <MetaHeading> Welcome to MetaGame! </MetaHeading>
      {showNote && (
        <Stack spacing={6} align="center" w="100%">
          <UnorderedList spacing={4} pl={2} pr={4} listStyleType="none">
            <ListItem>
              First things first, you should make yourself a profile.
            </ListItem>
            <ListItem>
              From your profile, you will be able to show other MetaGamers & the
              rest of the world what you are about, what you are working on as
              well as a bunch of other things.
            </ListItem>
            <ListItem>
              Unlike profiles in the Web2 world, MyMeta profiles are hosted on a
              decentralized service. They are customizable, controlled & owned
              only by you. Read more about MyMeta profiles{' '}
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
            </ListItem>
          </UnorderedList>
        </Stack>
      )}
      <Stack w="100%" spacing={4} pt={4}>
        {showNote && (
          <Text textAlign="center">
            Connect your wallet on Ethereum Mainnet to start
          </Text>
        )}
        {!connecting && !fetching && connected ? (
          <Text fontSize="md" w="100%" textAlign="center">
            Please switch to <SwitchNetworkButton chainId="0x1" />
          </Text>
        ) : (
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
            {showNote ? 'Connect Wallet' : 'Connect To Progress'}
          </Button>
        )}
        {showNote && (
          <Tooltip label="Read Our Wiki" hasArrow>
            <Link isExternal href="//wiki.metagame.wtf" _hover={{}} w="100%">
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
          </Tooltip>
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
                Your Ethereum Wallet is your digital ID and bank account. You
                will need one to play the MetaGame.
              </Text>
              <Text>
                We recommend{' '}
                <MetaLink
                  isExternal
                  href="https://metamask.io/download"
                  color="pink.400"
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
  );
};
