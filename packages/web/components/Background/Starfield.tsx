import { Box } from '@metafam/ds';
import StarMaterial from 'assets/materials/9.png';
import {
  useAnimationFrame,
  useMousePosition,
  useScrollPosition,
  useWindowSize,
} from 'lib/hooks/background';
import { StaticImageData } from 'next/image';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { generateStars, initializeScene } from 'utils/starfield';

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
  const groupRef = useRef(null);
  const { objectsDistance } = config;

  return <></>;
}

interface StarfieldProps {
  animateStars?: boolean;
}

export type StarfieldConfig = {
  objectsDistance: number;
  animate: boolean;
  stars: {
    size: number;
    opacity: number;
    count: number;
    scale: any;
    positionY: number;
    speed: number;
    material: StaticImageData;
    insideColor: any;
    outsideColor: any;
    radius: number;
  };
};

type SizesProps = {
  width: number;
  height: number;
};
function Starfield({ animateStars = true }: StarfieldProps) {
  const mountRef = useRef<any>(null);
  const { scrollYRef: scrollY } = useScrollPosition('scroll-container');
  const sizes = useWindowSize();
  const { cursor } = useMousePosition();
  const particlesRef = useRef<any>(null);
  const clock = useRef<any>(new THREE.Clock());
  const previousTime = useRef<any>(0);
  const sceneRef = useRef<any>(null);

  useEffect(() => {
    if (!mountRef.current) {
      return;
    }
    const { scene, camera, cameraGroup, renderer, starfieldRef, composer } =
      initializeScene(sizes.current.width, sizes.current.height, mountRef);
    sceneRef.current = {
      scene,
      camera,
      cameraGroup,
      renderer,
      starfieldRef,
      composer,
    };
    const mountCtx = mountRef.current;
    // eslint-disable-next-line consistent-return
    return () => {
      if (sceneRef.current.renderer) {
        sceneRef.current.renderer.dispose();
      }
      if (mountCtx) {
        mountCtx.removeChild(sceneRef.current.renderer.domElement);
      }
    };
  }, [sizes]);

  const starfieldConfig = useMemo(
    (): StarfieldConfig => ({
      objectsDistance: 4,
      animate: animateStars,
      stars: {
        size: 0.01,
        opacity: 0.3,
        count: 600,
        scale: new THREE.Vector3(30, 40, 40),
        positionY: 1,
        speed: animateStars ? 0.02 : 0,
        material: StarMaterial,
        insideColor: new THREE.Color('#f472b676'),
        outsideColor: new THREE.Color('#38bdf876'),
        radius: 1000,
      },
    }),
    [animateStars],
  );
  const { objectsDistance, stars, animate } = starfieldConfig;

  // Update scene based on window resize
  useEffect(() => {
    if (sceneRef.current.renderer && sceneRef.current.camera) {
      sceneRef.current.renderer.setSize(
        sizes.current.width,
        sizes.current.height,
      );
      sceneRef.current.camera.aspect =
        sizes.current.width / sizes.current.height;
      sceneRef.current.camera.updateProjectionMatrix();
    }
  }, [sizes]);

  // Generate stars once on component mount
  useEffect(() => {
    if (sceneRef.current.scene && sceneRef.current.starfieldRef) {
      particlesRef.current = generateStars(starfieldConfig);
      sceneRef.current.starfieldRef.add(particlesRef.current);
      sceneRef.current.scene.add(sceneRef.current.starfieldRef);
    }
  }, [starfieldConfig]);

  const frameId = useRef<any>(null);
  const directionScale = 1;
  const tick = useCallback(() => {
    if (
      !animate ||
      !sceneRef.current.renderer ||
      !sceneRef.current.scene ||
      !sceneRef.current.camera
    )
      return;

    frameId.current = requestAnimationFrame(tick);
    const elapsedTime = clock.current.getElapsedTime();
    const deltaTime = elapsedTime - previousTime.current;
    previousTime.current = elapsedTime;

    const parallaxX = cursor.current.x * 0.1;
    const parallaxY = cursor.current.y * 0.1;
    const animatePositions =
      particlesRef.current.geometry.attributes.position.array;

    if (sceneRef.current.camera && sceneRef.current.cameraGroup) {
      sceneRef.current.camera.position.y =
        (-scrollY.current / sizes.current.height) * objectsDistance;

      sceneRef.current.cameraGroup.position.x +=
        (parallaxX - sceneRef.current.cameraGroup.position.x) * 5 * deltaTime;
      sceneRef.current.cameraGroup.position.y +=
        (parallaxY - sceneRef.current.cameraGroup.position.y) * 5 * deltaTime;
    }

    for (let i = 0; i < animatePositions.length; i += 3) {
      const { speed } = stars;
      animatePositions[i] +=
        (Math.random() - directionScale) * speed * deltaTime * 0.8; // X
      animatePositions[i + 1] -=
        (Math.random() - directionScale) * speed * deltaTime * 0.8; // Y
      animatePositions[i + 2] +=
        (Math.random() - directionScale) * speed * deltaTime; // Z
    }
    sceneRef.current.starfieldRef.position.y = -scrollY.current * 0.000005;
    particlesRef.current.geometry.attributes.position.needsUpdate = true;

    if (sceneRef.current.composer && sceneRef.current.camera) {
      sceneRef.current.renderer.clearColor();
      sceneRef.current.composer.render();
    } else {
      sceneRef.current.renderer.render(
        sceneRef.current.scene,
        sceneRef.current.camera,
      );
    }
  }, [animate, cursor, objectsDistance, scrollY, sizes, stars]);

  useAnimationFrame(tick);

  return (
    <Box
      ref={mountRef}
      className="webgl-wrapper"
      style={{ width: '100%', height: '100%' }}
      bgColor="transparent"
    />
  );
}

export default Starfield;
