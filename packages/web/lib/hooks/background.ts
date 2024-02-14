import { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export function useWindowSize() {
  const sizes = useRef<any>(null);
  sizes.current = { width: window.innerWidth, height: window.innerHeight };
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const resizeHandler = () => {
      sizes.current = { width: window.innerWidth, height: window.innerHeight };
    };

    window.addEventListener('resize', resizeHandler);

    // eslint-disable-next-line consistent-return
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  return sizes;
}

export function useScrollPosition(scrollContainerId: string) {
  const scrollYRef = useRef(0);
  const currentSection = useRef(0);
  const sizes = useRef({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const scrollContainer = document.getElementById(scrollContainerId);
    if (!scrollContainer) return;

    const handleScroll = () => {
      scrollYRef.current = scrollContainer.scrollTop ?? window.scrollY;
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    const newSection = Math.round(scrollYRef.current / sizes.current.height);
    if (newSection !== currentSection.current) {
      currentSection.current = newSection;
    }

    // eslint-disable-next-line consistent-return
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [scrollContainerId]);

  return {
    scrollYRef,
    currentSection,
  };
}

export function useMousePosition() {
  const cursor = useRef<any>({ x: 0, y: 0 });
  const mousePos = useRef<any>(null);
  mousePos.current = new THREE.Vector2();
  const sizes = useWindowSize();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursor.current.x = e.clientX / sizes.current.width - 0.3;
      cursor.current.y = -(e.clientY / sizes.current.height) - 0.3;

      mousePos.current.x = (e.clientX / sizes.current.width) * 2 - 1;
      mousePos.current.y = -(e.clientY / sizes.current.height) * 2 - 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [sizes]);

  return {
    cursor,
    mousePos,
  };
}

export const useAnimationFrame = (callback: (deltaTime: number) => void) => {
  const requestRef = useRef<any>(null);
  const previousTimeRef = useRef<any>(null);

  const animate = useCallback(
    (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        callback(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    },
    [callback],
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef?.current ?? false);
  });
};
