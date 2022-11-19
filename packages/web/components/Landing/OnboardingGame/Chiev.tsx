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
import { useGame } from 'contexts/GameContext';
import { useWeb3 } from 'lib/hooks';
import { useMotionDetector } from 'lib/hooks/useMotionDetector';
import { get } from 'lib/store';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { errorHandler } from 'utils/errorHandler';
import { POLYGON } from 'utils/networks';
import { formatAddress } from 'utils/playerHelpers';

import { chievId, getTokenImage, IChievMetadata } from './nft';

export const Chiev = ({
  won,
  setWon,
}: {
  won: boolean;
  setWon: Dispatch<SetStateAction<boolean>>;
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const root = typeof window !== 'undefined' ? document.body : null;
  const motionDisabled = useMotionDetector(root);
  const [noMotion, setNoMotion] = useState(motionDisabled);
  const { mintChiev, txLoading } = useGame();
  const [claiming, setClaiming] = useState(false);
  const { address: account, chainId, connected } = useWeb3();
  const [wrongNetwork, setWrongNetwork] = useState(false);
  const claimed = get('ChievClaimed') === 'true' ?? false;
  const [chievData, setChievData] = useState<IChievMetadata>();

  const springProps = useSpring({
    config: {
      tension: 150,
      friction: 10,
      mass: 1,
    },
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
      await mintChiev(chievId);
    } catch (error) {
      errorHandler(error as Error);
      console.error('handleMintingError', error);
    } finally {
      setClaiming(false);
    }
  }, [mintChiev]);

  useEffect(() => {
    getTokenImage().then((res) => {
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
  }, []);

  useEffect(() => {
    if (connected && chainId !== POLYGON) {
      setWrongNetwork(true);
    } else if (connected && chainId === POLYGON) {
      setWrongNetwork(false);
    }
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
  }, [prefersReducedMotion, root?.classList]);

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
        borderWidth={2}
        borderStyle="solid"
        borderColor="landing600"
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
                color: 'landing300',
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
            color="landing600"
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
          <Text>
            You will need a tiny amount of MATIC to claim your NFT. If you don't
            have any, you can claim a small amount using{' '}
            <MetaLink
              href="https://stakely.io/en/faucet/polygon-matic"
              isExternal
            >
              this faucet
            </MetaLink>{' '}
            and return here later.
          </Text>
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
                      : 'landing550'
                  }
                  textShadow="landing500"
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
          backgroundColor="landing200"
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
          backgroundColor="landing500"
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
