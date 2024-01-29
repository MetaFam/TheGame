import { Box, Button, Icon, Tooltip  } from '@metafam/ds';
import { Stats } from '@react-three/drei';
import { CONFIG } from 'config';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { FaToggleOff, FaToggleOn } from 'react-icons/fa';

import PageBackgroundSvg from './BackgroundSvg';
import { PageCanvas } from './PageCanvas';
import Starfield from './Starfield';

export const PageBackground: FC = () => {
  const [animateCanvas, setAnimateCanvas] = useState<boolean>(true);
  const { pathname } = useRouter();
  const isLandingPage = pathname === '/';
  const { appEnv } = CONFIG
  const showStats = appEnv === 'development';

  const toggleAnimation = () => {
    setAnimateCanvas(!animateCanvas);
  };
  const toggleIcon = animateCanvas ? FaToggleOn : FaToggleOff;
  if (isLandingPage) return <div />;

  return (
    <>
      <Tooltip label={animateCanvas ? 'Background Effects: Off' : 'Background Effects: On'} hasArrow>
      <Button
        className="toggle-bg"
        onClick={toggleAnimation}
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
        <Icon as={toggleIcon}  h={{ base: 8, '2xl': 10 }} w="auto" />
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
          'img': {
            position: 'absolute',
            top: 0,
            left: 0,
            maxWidth: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            zIndex: 0,
          }
        }}
      >
          <PageCanvas>
          <Starfield animateStars={animateCanvas} />
          </PageCanvas>
        <PageBackgroundSvg />
      </Box>
    </>
  );
};

