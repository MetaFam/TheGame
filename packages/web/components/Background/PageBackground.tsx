import { Box, Button, Tooltip, useBreakpointValue, useMediaQuery } from '@metafam/ds';
import { Stats } from '@react-three/drei';
import BackgroundImage from 'assets/page-bg.webp';
import BackgroundImageXl from 'assets/page-bg@2x.webp';
import BackgroundImage3Xl from 'assets/page-bg@3x.webp';
import BackgroundImageFallback from 'assets/page-bg-fallback.webp';
import BackgroundImageBase from 'assets/page-bg-mobile.webp';
import { CONFIG } from 'config';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { FaToggleOff, FaToggleOn } from 'react-icons/fa';

import { PageCanvas } from './PageCanvas';
import Starfield from './Starfield';

export const PageBackground: FC = () => {
  const [showBg, setShowBg] = useState<boolean>(true);
  const { pathname } = useRouter();
  const { appEnv } = CONFIG
  const responsiveImage = useBreakpointValue({
    base: BackgroundImageBase,
    xl: BackgroundImage,
    '2xl': BackgroundImageXl,
    '3xl': BackgroundImage3Xl,
  });
  const [prefersReducedMotion] = useMediaQuery(
    '(prefers-reduced-motion: reduce)',
  );
  const bgImage =
    prefersReducedMotion || !showBg || !responsiveImage
      ? BackgroundImageFallback.src
      : responsiveImage.src;

  const isLandingPage = pathname === '/';
  const showStats = appEnv === 'development';

  const showStarfield = !prefersReducedMotion && showBg;

  const handleBgToggle = () => {
    setShowBg(!showBg);
  };

  if (isLandingPage) return <div />;

  return (
    <>
      <Tooltip label={showBg ? 'Hide background' : 'Show background'} hasArrow>
      <Button
        className="toggle-bg"
        onClick={handleBgToggle}
        variant="ghost"
        position="absolute"
        pointerEvents="all"
        bottom={4}
        right={4}
        opacity={0.3}
        _hover={{
          opacity: 1,
        }}
        transition="all 0.2s ease-in-out"
        zIndex={100}
      >
        {showBg ? <FaToggleOn size={30} /> : <FaToggleOff size={30} />}
        </Button>
      </Tooltip>

      {showStats ? <Stats showPanel={0} className="stats" /> : null}

      <Box
        className="canvas-wrapper"
        position="fixed"
        top={0}
        left={0}
        w={{base: "calc(100% - 5px)", lg: "calc(100% - 12px)"}}
        overflowY="visible"
        h="100%"
        maxH="100%"
        zIndex={0}
        pointerEvents="none"
        bgColor="octo"
        sx={{
          '.three-canvas': {
            position: 'absolute',
            top: 0,
            left: 0,
            w: 'full',
            maxWidth: '100%',
            minH: '100vh',
            h: '100%',
            pointerEvents: 'none',
            bgColor: 'transparent',
            zIndex: 1,
          },
          img: {
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 0,
          }
        }}
      >
        {showStarfield ? (
          <PageCanvas>
            <Starfield />
          </PageCanvas>
        ) : null}
          <Image
            src={bgImage}
            alt="Background image"
            objectFit="cover"
            fill={true}
            objectPosition="center"
            quality={100}
            loading='lazy'
          />
      </Box>
    </>
  );
};
