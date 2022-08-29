/* eslint-disable no-nested-ternary */
import {
  Box,
  Button,
  ButtonGroup,
  Spinner,
  Text,
  usePrefersReducedMotion,
  VStack,
} from '@metafam/ds';
import { animated, useSpring } from '@react-spring/web';
import OctoBg from 'assets/baby_octo.png';
import { useGame } from 'contexts/GameContext';
import { BigNumber } from 'ethers';
import { useWeb3 } from 'lib/hooks';
import { get } from 'lib/store';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

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
  const { address: account, connect, connecting } = useWeb3();
  const claimed = get('ChievClaimed') === 'true' ?? false;
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
      const chievId = BigNumber.from(0);

      const tx = await mintChiev(chievId);
      if (tx) {
        // setClaimed(true);
        console.log('receipt', tx);
        setClaiming(false);

        // if (tx.hash) {
        //   setClaimed(true);
        // }
      }
      setClaiming(false);
    } catch (error: any) {
      console.log('handleMintingError', error);
    }
  }, [mintChiev]);

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
        fontSize={{ base: 'sm', xl: 'lg' }}
        fontFamily="body"
        textAlign="center"
        p={10}
      >
        <VStack
          spacing={8}
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
            fontSize={{ base: 'md', xl: 'xl' }}
            fontWeight="black"
            textTransform="uppercase"
            color="var(--chakra-colors-landing600)"
          >
            Wow, you burrowed deep!
          </Text>
          <Text>🎉 You've won the deep burrower ChieveMint! 🎉</Text>
          <Text className="gradient-text" fontSize={{ base: 'lg', xl: '3xl' }}>
            Nice work Anon.
          </Text>
          <Text>Mint your free NFT here...</Text>
          <ButtonGroup spacing={5}>
            {!account ? (
              <Button
                onClick={connect}
                variant="ghost"
                aria-label="Connect to Web3 wallet"
                color={'var(--chakra-colors-landing550)'}
                textShadow="var(--chakra-colors-landing500)"
                isDisabled={connecting}
                size={'xl'}
              >
                {connecting ? <Spinner size="sm" /> : 'Connect'}
              </Button>
            ) : (
              <Button
                onClick={handleMinting}
                isDisabled={txLoading || claiming || claimed}
                variant="white"
                color={account ? 'green' : 'var(--chakra-colors-landing550)'}
                textShadow="var(--chakra-colors-landing500)"
                size={'xl'}
              >
                {txLoading || claiming
                  ? 'Claiming...'
                  : claimed
                  ? 'Claimed'
                  : 'Claim'}
              </Button>
            )}
            {/* <Button
              onClick={handleMinting}
              variant="ghost"
              color={'var(--chakra-colors-landing550)'}
              textShadow="var(--chakra-colors-landing500)"
              size={'xl'}
            >
              {txLoading ? 'Claiming...' : 'Claim'}
            </Button> */}
            <Button
              onClick={() => setWon(false)}
              variant="ghost"
              color="diamond"
              size={'xl'}
            >
              Close
            </Button>
          </ButtonGroup>
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
          // onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
          // onMouseLeave={() => set({ xys: [0, 0, 1] })}
          // eslint-disable-next-line no-param-reassign
          // onMouseOver={(event) => console.log(props.xys)}
          style={{
            ...octoSpringProps,
            backgroundImage: `url(${OctoBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.5,
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
          backgroundColor="rgba(255 255 255 / 1%)"
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
          backgroundColor="rgba(255 255 255 / 1%)"
          opacity={0.4}
          zIndex={10}
          pointerEvents="none"
        />
      </Box>
    </animated.div>
  );
};
