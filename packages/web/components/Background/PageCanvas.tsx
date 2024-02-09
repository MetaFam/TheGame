import { useBreakpointValue } from '@metafam/ds';
import { Canvas as R3FCanvas } from '@react-three/fiber';
import { FC, PropsWithChildren, useRef } from 'react';

export const PageCanvas: FC<PropsWithChildren> = ({ children }) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const canvas = useRef<HTMLCanvasElement>(null);

  return (
    <R3FCanvas
      className="three-canvas"
      ref={canvas}
      shadows="soft"
      dpr={Math.min(
        2,
        isMobile && typeof window !== 'undefined' ? window.devicePixelRatio : 1,
      )}
    >
      {children}
    </R3FCanvas>
  );
};
