/* eslint-disable no-nested-ternary */
import {
  Box,
  Button,
  ButtonGroup,
  Text,
  Tooltip,
  usePrefersReducedMotion,
  VStack,
} from '@metafam/ds';
import { httpLink } from '@metafam/utils';
import { animated, useSpring } from '@react-spring/web';
import OctoBg from 'assets/baby_octo.png';
import { LandingConnectButton } from 'components/Landing/LandingConnectButton';
import { MetaLink } from 'components/Link';
import { CONFIG } from 'config';
import { useGame } from 'contexts/GameContext';
import { Contract, providers } from 'ethers';
import { useWeb3 } from 'lib/hooks';
import { get } from 'lib/store';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { formatAddress } from 'utils/playerHelpers';

import ABI from '../../../contracts/BulkDisbursableNFTs.abi';

export interface IChievMetadata {
  name: string;
  description: string;
  image: string;
  animation_url?: string;
}

export const Chiev = ({
  won,
  setWon,
}: {
  won: boolean;
  setWon: Dispatch<SetStateAction<boolean>>;
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [noMotion, setNoMotion] = useState(false);
  const root = typeof window !== 'undefined' ? document.body : null;
  const { mintChiev, txLoading } = useGame();
  const [claiming, setClaiming] = useState(false);
  const { address: account, chainId, connected } = useWeb3();
  const [wrongNetwork, setWrongNetwork] = useState(false);
  const { alchemyApiKey, chievContractAddress: contractAddress } = CONFIG;
  const claimed = get('ChievClaimed') === 'true' ?? false;
  const chievId = BigInt(
    '0x480000000000000000000000000000000000000000000000000000000002',
  );
  const [chievData, setChievData] = useState<IChievMetadata>();
  // const [claimed, setClaimed] = useState(false);
  // const toast = useToast();
  const springProps = useSpring({
    config: {
      tension: 150,
      friction: 10,
      mass: 1,
    },
    // opacity: won ? 1 : 0,
    transform: won ? 'translateY(0)' : 'translateY(-100%)',
    scale: won ? 1 : 0.5,
    display: won ? 'flex' : 'none',
    loop: false,
    immediate: noMotion,
  });

  const octoSpringProps = useSpring({
    config: {
      tension: 50,
      friction: 10,
      mass: 1,
      delay: 750,
    },
    scale: won ? 1 : 0.7,
    transformOrigin: 'center',
    transform: won
      ? 'translate3d(0, 0, 0) rotate(45deg)'
      : 'translate3d(-100%, 100%, 0) rotate(40deg)',
    immediate: noMotion,
  });

  const handleMinting = useCallback(async () => {
    try {
      setClaiming(true);
      const tx = await mintChiev(chievId);
      if (tx) {
        console.log('receipt', tx);
      }
      setClaiming(false);
    } catch (error: any) {
      console.log('handleMintingError', error);
    }
  }, [chievId, mintChiev]);

  /** function to get the token image url from the nft metadata */
  const getTokenImage =
    useCallback(async (): Promise<IChievMetadata | void> => {
      try {
        const provider = new providers.AlchemyProvider('matic', alchemyApiKey);
        const token = new Contract(contractAddress, ABI, provider);
        console.log('token', token, provider, alchemyApiKey);
        const metadataURI = await token.uri(chievId);
        console.log('metadataURI', metadataURI);
        if (!metadataURI || metadataURI === '') {
          throw new Error(`No metadata for token ${chievId}.`);
        }
        const response = await fetch(httpLink(metadataURI)!);
        const metadata = await response.json();
        return metadata as IChievMetadata;
      } catch (error: any) {
        console.log('getTokenImageError', error);
        return undefined;
      }
    }, [chievId, contractAddress, alchemyApiKey]);

  useEffect(() => {
    getTokenImage().then((res) => {
      console.log('res', res);
      if (res) {
        const metadata = {
          name: res.name ?? '',
          description: res.description ?? '',
          image: httpLink(res.image) ?? '',
          animation_url: httpLink(res.animation_url) ?? '',
        };
        setChievData(metadata);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (chievData) {
      console.log('chievData', chievData);
    }
  }, [chievData]);

  useEffect(() => {
    if (connected && chainId !== '0x89') {
      console.log('wrong network');
      setWrongNetwork(true);
      // throw new Error('Wrong network');
    } else if (connected && chainId === '0x89') {
      setWrongNetwork(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, chainId]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia !== undefined) {
      if (prefersReducedMotion && !root?.classList.contains('no-motion')) {
        setNoMotion(true);
      } else if (
        !prefersReducedMotion &&
        root?.classList.contains('no-motion')
      ) {
        setNoMotion(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion]);

  useEffect(() => {
    const mut = new MutationObserver(() => {
      if (root && root.classList.contains('no-motion')) {
        setNoMotion(true);
      } else {
        setNoMotion(false);
      }
    });
    if (typeof window !== 'undefined' && window.matchMedia !== undefined) {
      if (root) {
        mut.observe(root, {
          attributes: true,
        });
      }
    }

    return () => {
      mut.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <animated.div
      style={{
        ...springProps,
        position: 'static',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        left: 0,
        top: 0,
        transform: 'translateY(0)',
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 400,
      }}
    >
      <Box
        position="relative"
        display="flex"
        height={{ base: '50vh', xl: '50vh' }}
        width={{ base: '95%', xl: '33vw' }}
        border="2px solid var(--chakra-colors-landing600)"
        boxShadow="0 0 50px black"
        overflow="hidden"
        borderRadius="2xl"
        pointerEvents="auto"
        fontSize={{ base: 'sm', '2xl': 'md' }}
        fontFamily="body"
        textAlign="center"
        p={10}
      >
        <VStack
          spacing={{ base: 3, '2xl': 5 }}
          width="full"
          backdropFilter="none"
          zIndex={25}
          sx={{
            button: {
              px: 4,
              py: 2,
              '&:hover': {
                color: 'var(--chakra-colors-landing300)',
                backgroundColor: 'transparent',
              },
            },
          }}
        >
          <Text
            as="h3"
            fontSize={{ base: 'md', '2xl': 'xl' }}
            fontWeight="black"
            textTransform="uppercase"
            color="var(--chakra-colors-landing600)"
          >
            Onboarding Progress
          </Text>
          <Text>🎉 You've won a ’Chievemint! 🎉</Text>
          <Text
            className="gradient-text"
            fontSize={{ base: 'lg', '2xl': '3xl' }}
          >
            Nice work Anon.
          </Text>
          <Text>
            You&apos;re now able to claim a free NFT by clicking the{' '}
            {connected ? 'Claim' : 'Connect'} button below.{' '}
            {!connected
              ? "You will need a Web3 wallet if you don't already have one"
              : undefined}
          </Text>
          {!connected ? (
            <Text>
              If you don&apos;t already have a wallet, a good place to start is{' '}
              <MetaLink href="https://metamask.io/" isExternal>
                MetaMask
              </MetaLink>
              . Here's a helpful video to lead you through the process of{' '}
              <MetaLink href="https://youtu.be/-HTubEJ61zU" isExternal>
                setting up MetaMask
              </MetaLink>
              .
            </Text>
          ) : undefined}
          <ButtonGroup spacing={5}>
            {!account ? (
              <LandingConnectButton />
            ) : (
              <Tooltip label={`Wallet: ${formatAddress(account)}`} hasArrow>
                <Button
                  onClick={handleMinting}
                  isDisabled={txLoading || claiming || claimed || wrongNetwork}
                  variant="white"
                  color={
                    account
                      ? wrongNetwork
                        ? 'brightIdOrange.600'
                        : 'green'
                      : 'var(--chakra-colors-landing550)'
                  }
                  textShadow="var(--chakra-colors-landing500)"
                  size={'xl'}
                >
                  {txLoading || claiming
                    ? 'Claiming...'
                    : claimed
                    ? 'Claimed'
                    : 'Claim'}
                </Button>
              </Tooltip>
            )}

            <Button
              onClick={() => setWon(false)}
              variant="ghost"
              color="diamond"
              size={'xl'}
            >
              Close
            </Button>
          </ButtonGroup>
          {wrongNetwork && (
            <Text
              fontSize={{ base: 'sm', xl: 'md' }}
              color="brightIdOrange.600"
            >
              Change network to <strong>Polygon (0x89)</strong>
            </Text>
          )}
        </VStack>
        <Box
          position="absolute"
          top="-2.5%"
          left="-2.5%"
          bottom="-2.5%"
          right="-2.5%"
          width="105%"
          height="105%"
          backgroundColor="rgba(0 0 0 / 70%)"
          backdropFilter={`blur(10px)`}
          backgroundClip="border-box"
          dropShadow="0 0 100px 30px black inset"
          zIndex={1}
        />
        <animated.div
          style={{
            ...octoSpringProps,
            backgroundImage: `url(${OctoBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.8,
            position: 'absolute',
            left: '-12%',
            bottom: '-10%',
            width: '50%',
            height: '50%',
            zIndex: 20,
            pointerEvents: 'auto',
            // transform: props.xys.to(trans)
          }}
        />
        <Box
          position="absolute"
          inset={0}
          opacity={0.3}
          backgroundImage={chievData?.image}
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          width="100%"
          height="100%"
          zIndex={1}
        />

        <Box
          position="absolute"
          bottom={{ base: 3, xl: '-10%' }}
          left={'-12%'}
          width={'350px'}
          height={'350px'}
          borderRadius="full"
          backgroundColor="var(--chakra-colors-landing200)"
          filter={`blur(100px)`}
          pointerEvents="none"
          zIndex={0}
        />
        <Box
          position="absolute"
          top={{ base: 3, xl: '-10%' }}
          right={'-22%'}
          width={'500px'}
          height={'500px'}
          borderRadius="full"
          backgroundColor="var(--chakra-colors-landing500)"
          filter={`blur(100px)`}
          opacity={0.7}
          pointerEvents="none"
          zIndex={0}
        />
        <Box
          position="absolute"
          top={{ base: 3, xl: '-10%' }}
          left={'-22%'}
          width={'500px'}
          height={'500px'}
          borderRadius="full"
          backgroundColor="rgba(255 255 255 / 1%)"
          opacity={0.7}
          pointerEvents="none"
          zIndex={10}
        />
        <Box
          position="absolute"
          top={{ base: 3, xl: '35%' }}
          right={'5%'}
          width={'50px'}
          height={'50px'}
          borderRadius="full"
          backgroundColor="rgba(255 255 255 / 3%)"
          opacity={0.7}
          pointerEvents="none"
          zIndex={10}
        />
        <Box
          position="absolute"
          top={{ base: 3, xl: '25%' }}
          right={'25%'}
          width={'75px'}
          height={'75px'}
          borderRadius="full"
          backgroundColor="rgba(255 255 255 / 3%)"
          opacity={0.4}
          zIndex={10}
          pointerEvents="none"
        />
      </Box>
    </animated.div>
  );
};
