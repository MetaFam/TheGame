'use client';

import {
  Center,
  PerspectiveCamera,
  Sparkles,
  SpotLight,
  useDepthBuffer,
} from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
// import gsap from 'gsap';
// import LoadingOrError from './LoadingOrError';
import StarMaterial from 'assets/materials/star.png';
import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { Camera, Mesh } from 'three';
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
  const mesh = useRef<Mesh>(null);
  const sphereRef = useRef<Mesh>(null);
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  const scrollY = useRef(0);
  const sizes = useRef({ width: 0, height: 0 });
  const cursor = useRef({ x: 0, y: 0 });
  const mousePos = useRef(new THREE.Vector2());
  const mouse = new THREE.Vector2();
  const plant1 = useRef<Mesh>(null);
  const camera = useRef<THREE.PerspectiveCamera>(null);
  const cameraGroup = useRef<THREE.Group>(null);
  const clock = new THREE.Clock();
  let previousTime = 0;
  const currentSection = useRef(0);

  const experienceConfig = useMemo(
    () => ({
      objectsDistance: 4,
      sparkles: {
        size: 10,
        opacity: 0.3,
        count: 600,
        scale: new THREE.Vector3(30, 40, 40),
        positionY: 1,
        speed: 0.2,
        material: StarMaterial,
        color: new THREE.Color(0xf1f1f1),
      },
    }),
    [],
  );
  const { objectsDistance, sparkles } = experienceConfig;

  const resizeHandler = useCallback(() => {
    const scrollContainer = document.querySelector('.full-page-container > [class*="css"]');
    const height = scrollContainer ? scrollContainer.scrollHeight : window.innerHeight;

    sizes.current.width = window.innerWidth;
    sizes.current.height = height;
  }, []);

  const scrollHandler = useCallback(() => {
    const scrollContainer = document.querySelector('.full-page-container > [class*="css"]');
    scrollY.current = scrollContainer ? scrollContainer.scrollTop : window.scrollY;
    // console.log('scrollY', scrollY.current, scrollContainer);

    const newSection = Math.round(scrollY.current / sizes.current.height);
    if (newSection !== currentSection.current) {
      currentSection.current = newSection;
    }
  }, []);

  const mousemoveHandler = useCallback((event: MouseEvent) => {
    cursor.current.x = event.clientX / sizes.current.width - 0.3;
    cursor.current.y = -(event.clientY / sizes.current.height) - 0.3;

    mousePos.current.x = (event.clientX / sizes.current.width) * 2 - 1;
    mousePos.current.y = -(event.clientY / sizes.current.height) * 2 - 1;
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Set initial sizes based on the display
      // console.log(window.innerWidth, window.innerHeight);
      const scrollContainer = document.querySelector('.full-page-container > [class*="css"]');
      const height = scrollContainer ? scrollContainer.scrollHeight : window.innerHeight;

      sizes.current = {
        width: window.innerWidth,
        height,
      };

      // Set initial scroll position
      scrollY.current = scrollContainer ? scrollContainer.scrollTop : window.scrollY;
      // console.log(sizes.current, scrollY.current, scrollContainer);

      window.addEventListener('scroll', scrollHandler);
      window.addEventListener('resize', resizeHandler);
      window.addEventListener('mousemove', mousemoveHandler);
    }

    return () => {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', resizeHandler);
      window.removeEventListener('mousemove', mousemoveHandler);
    };
  }, [scrollHandler, resizeHandler, mousemoveHandler]);

  useFrame(() => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    const parallaxX = cursor.current.x * 0.1;
    const parallaxY = cursor.current.y * 0.1;

    if (camera.current && cameraGroup.current) {
      camera.current.position.y =
        (-scrollY.current / sizes.current.height) * objectsDistance;
      // console.log('camera pos:', scrollY.current, sizes.current, camera.current.position, cameraGroup.current.position);

      cameraGroup.current.position.x +=
        (parallaxX - cameraGroup.current.position.x) * 5 * deltaTime;
      cameraGroup.current.position.y +=
        (parallaxY - cameraGroup.current.position.y) * 5 * deltaTime;
    }
  });

  return (
    <>
      {/* <Suspense fallback={<LoadingOrError message="Loading atmosphere..." />}> */}
      <group ref={cameraGroup}>
        <PerspectiveCamera
          ref={camera}
          makeDefault
          aspect={sizes.current.width / sizes.current.height}
          position={camera.current?.position}
          far={400}
          filmGauge={53}
        />
      </group>

      <R3FSceneSection name="SectionOne" config={experienceConfig} count={0}>
        <directionalLight position={[1, 2, 3]} intensity={1} />
        <ambientLight intensity={0.5} />
        <SpotLight
          distance={5}
          angle={0.15}
          attenuation={5}
          anglePower={5} // Diffuse-cone anglePower (default: 5)
        />
        {/* <BlurSpotlight /> */}
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
      {/* </Suspense> */}
    </>
  );
}

export default Starfield;
