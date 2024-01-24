import { Stack } from '@metafam/ds';
import { MegaMenuFooter } from 'components/MegaMenu/MegaMenuFooter';
import { MegaMenuHeader } from 'components/MegaMenu/MegaMenuHeader';
import type { PropsWithChildren } from 'react';
import { PageBackground } from 'components/Background/PageBackground';
import React, { useEffect, useState } from 'react';

type Props = PropsWithChildren<{ hide?: boolean }>;

export const MegaMenu: React.FC<Props> = ({ hide = false, children }) => {
  const [noMotion, setNoMotion] = useState(false);

  useEffect(() => {
    const root = typeof window !== 'undefined' ? document.body : null;
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
  }, []);

  return (
    <Stack
      h="100vh"
      w="100%"
      spacing={0}
      overflow="hidden"
      pb={{ base: hide ? 0 : '5rem', lg: 0 }}
      // bgSize="cover"
      // bgAttachment="fixed"
      // bgImage={BackgroundImage.src}
    >
      {!hide && <MegaMenuHeader />}
      <Stack
        id="scroll-container" // needed for getting scroll position in landing page
        w="100%"
        h="100%"
        spacing={0}
        overflowY="auto"
        overflowX="hidden"
        zIndex={1}
        sx={{
          scrollSnapType: noMotion
            ? 'none'
            : { base: 'y proximity', xl: 'y mandatory' },
          scrollBehavior: noMotion ? 'auto' : 'smooth',
        }}
      >
        {children}
        <PageBackground />
      </Stack>
      {!hide && <MegaMenuFooter />}
    </Stack>
  );
};
