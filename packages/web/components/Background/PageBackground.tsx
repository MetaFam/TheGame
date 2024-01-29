import { Box } from '@metafam/ds';
import { useMotionDetector } from 'lib/hooks/useMotionDetector';
import { useRouter } from 'next/router';
import { FC } from 'react';

import PageBackgroundSvg from './BackgroundSvg';
import { PageCanvas } from './PageCanvas';
import Starfield from './Starfield';


export const PageBackground: FC = () => {
  const { pathname } = useRouter();
  const isLandingPage = pathname === '/';
  const root = typeof window !== 'undefined' ? document.body : null;
  const noMotion = useMotionDetector(root)

  if (isLandingPage) return <div />;

  if (isLandingPage) return <div />;

  return (
    <>
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
          <Starfield animateStars={!noMotion} />
          </PageCanvas>
        <PageBackgroundSvg />
      </Box>
    </>
  );
};

