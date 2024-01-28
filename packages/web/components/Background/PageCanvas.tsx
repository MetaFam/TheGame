import { useBreakpointValue } from "@metafam/ds";
import { Canvas } from "@react-three/fiber";
import { FC, PropsWithChildren, useRef } from "react";

export const PageCanvas: FC<PropsWithChildren> = ({ children }) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const canvas = useRef<HTMLCanvasElement>(null);

  return (
    <Canvas
      className="three-canvas"
      ref={canvas}
      shadows="soft"
      dpr={Math.min(2, isMobile && typeof window !== 'undefined' ? window.devicePixelRatio : 1)}
    >
      {children}
      {/* <Effect /> */}
      {/* <Environment preset="night" background={false} /> */}
    </Canvas>
  );
};

