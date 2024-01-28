import { useBreakpointValue } from '@metafam/ds';
import {
  PerspectiveCamera,
  Sparkles,
  SpotLight,
  useDepthBuffer
} from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import StarMaterial from 'assets/materials/star.png';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import * as THREE from 'three';

export interface SceneSectionProps {
  name: string;
  count: number;
  children: React.ReactNode;
  props?: any;
  config: Record<string, any>;
}

export function R3FSceneSection({
  name,
  count,
  config,
  children,
  ...props
}: SceneSectionProps) {
  const group = useRef(null);
  const { objectsDistance } = config;

  return (
    <group
      ref={group}
      name={name}
      position={[0, -objectsDistance * count, 0]}
      {...props}
    >
      {children}
    </group>
  );
}

function Starfield() {
  const scrollY = useRef(0);
  const sizes = useRef({ width: 0, height: 0 });
  const cursor = useRef({ x: 0, y: 0 });
  const mousePos = useRef(new THREE.Vector2());
  const camera = useRef<any>(null);
  const cameraGroup = useRef<any>(null);
  const clock = new THREE.Clock();
  let previousTime = 0;
  const currentSection = useRef(0);
  const scrollContainer =
  typeof document !== 'undefined'
    ? document.getElementById('scroll-container')
    : null;
  const pageContainer = scrollContainer ? scrollContainer.querySelector('.full-page-container') : null;
  const starCount = useBreakpointValue({ base: 400, lg: 600, '2xl': 800 })

  const starfieldConfig = useMemo(
    () => ({
      objectsDistance: 4,
      sparkles: {
        size: 10,
        opacity: 0.3,
        count: starCount,
        scale: new THREE.Vector3(30, 40, 40),
        positionY: 1,
        speed: 0.2,
        material: StarMaterial,
        color: new THREE.Color(0xf1f1f1),
      },
    }),
    [starCount],
  );
  const { objectsDistance, sparkles } = starfieldConfig;
  const depthBuffer = useDepthBuffer({ frames: 1 })

  const resizeHandler = useCallback(() => {
    if (!scrollContainer) return;
    const height = typeof window !== 'undefined' ? window.innerHeight : 1;

    sizes.current = {
      width: window.innerWidth,
      height
    }
  }, [scrollContainer]);

  const handleScroll = useCallback(() => {
    if (!pageContainer) return;
    const { scrollTop } = pageContainer;
    scrollY.current = scrollTop ?? window.scrollY;

    const newSection = Math.round(scrollY.current / sizes.current.height);
    if (newSection !== currentSection.current) {
      currentSection.current = newSection;
    }

  }, [pageContainer]);

  const mousemoveHandler = useCallback((event: MouseEvent) => {
    cursor.current.x = event.clientX / sizes.current.width - 0.3;
    cursor.current.y = -(event.clientY / sizes.current.height) - 0.3;

    mousePos.current.x = (event.clientX / sizes.current.width) * 2 - 1;
    mousePos.current.y = -(event.clientY / sizes.current.height) * 2 - 1;
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {

      // Set initial sizes based on the display
      sizes.current = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      // Set initial scroll position
      scrollY.current = pageContainer ? pageContainer.scrollTop : window.scrollY;

      pageContainer?.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', resizeHandler);
      window.addEventListener('mousemove', mousemoveHandler);
    }

    return () => {
      pageContainer?.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resizeHandler);
      window.removeEventListener('mousemove', mousemoveHandler);
    };
  }, [pageContainer, scrollContainer, handleScroll, resizeHandler, mousemoveHandler]);

  useFrame(() => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    const parallaxX = cursor.current.x * 0.1;
    const parallaxY = cursor.current.y * 0.1;

    if (camera.current && cameraGroup.current) {
      camera.current.position.y =
        (-scrollY.current / sizes.current.height) * objectsDistance;

      cameraGroup.current.position.x +=
        (parallaxX - cameraGroup.current.position.x) * 5 * deltaTime;
      cameraGroup.current.position.y +=
        (parallaxY - cameraGroup.current.position.y) * 5 * deltaTime;
    }
  });

  return (
    <>
      <group ref={cameraGroup}>
        <PerspectiveCamera
          ref={camera}
          makeDefault
          aspect={sizes.current.width / sizes.current.height}
          position={camera.current?.position}
          far={400}
          filmGauge={53}
        />
                <MovingSpot depthBuffer={depthBuffer} color="#500A7C" position={[3, 3, 0]} />
        <MovingSpot depthBuffer={depthBuffer} color="#2A0D7D" position={[1, 3, 0]} />
      </group>

      <R3FSceneSection name="SectionOne" config={starfieldConfig} count={0}>
        {/* <directionalLight position={[1, 2, 3]} intensity={1} /> */}
        <ambientLight intensity={0.5} />
        {/* <SpotLight
          distance={5}
          angle={0.15}
          attenuation={5}
          anglePower={5} // Diffuse-cone anglePower (default: 5)
        /> */}
        <fog attach="fog" args={['#202020', 5, 20]} />

        <Sparkles
          size={sparkles.size}
          count={sparkles.count}
          scale={sparkles.scale}
          position-y={sparkles.positionY}
          speed={sparkles.speed}
          color={sparkles.color}
          opacity={sparkles.opacity}
        />
      </R3FSceneSection>
    </>
  );
}
function MovingSpot({ vec = new THREE.Vector3(), ...props }) {
  const light = useRef()
  const viewport = useThree((state: any) => state.viewport)
  useFrame((state) => {
    if (light.current) {
      light.current.target.position.lerp(vec.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0), 0.1)
      light.current.target.updateMatrixWorld()
    }
  })
  return <SpotLight castShadow ref={light} penumbra={1} distance={6} angle={0.35} attenuation={5} anglePower={4} intensity={2} {...props} />
}

export default Starfield;
