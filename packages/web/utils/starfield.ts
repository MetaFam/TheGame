import { StarfieldConfig } from 'components/Background/Starfield';
import {
  BloomEffect,
  EffectComposer,
  EffectPass,
  RenderPass,
} from 'postprocessing';
import * as THREE from 'three';
import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';
import { Group } from 'three/src/objects/Group';
import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer';
import { Scene } from 'three/src/scenes/Scene';

export const generateStars = (starConfig: StarfieldConfig) => {
  const { stars, objectsDistance } = starConfig;
  const floatNum = stars.count * 3;
  const positions = new Float32Array(floatNum);
  const colors = new Float32Array(floatNum);
  const particleSizes = new Float32Array(floatNum);

  const starfieldCreated = false;

  // Plot the star positions
  for (let i = 0; i < stars.count; i++) {
    const i3 = i * 3;
    const radius = Math.random() * stars.radius;
    positions[i3 + 0] = (Math.random() - 0.5) * 10;
    positions[i3 + 1] =
      objectsDistance * 0.4 - Math.random() * objectsDistance * 6;
    positions[i3 + 2] = (Math.random() - 0.5) * 10;
    particleSizes[i] = stars.size + Math.random() * 0.02;

    const mixedColor = stars.insideColor.clone();
    mixedColor.lerp(stars.outsideColor, (radius / stars.radius) * 1.1);

    colors[i3 + 0] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  // Add some geometry for the stars
  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3),
  );
  const textureLoader = new THREE.TextureLoader();

  // Apply the material/color
  const particlesMaterial = new THREE.PointsMaterial({
    // map: particleTexture,
    color: stars.insideColor,
    transparent: true,
    size: stars.size,
    depthWrite: false,
    vertexColors: true,
  });
  // particlesMaterial.alphaTest = 0.5;

  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  particles.geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3),
  );
  particles.geometry.setAttribute(
    'color',
    new THREE.BufferAttribute(colors, 3),
  );

  return particles;
};

export interface InitializeSceneReturn {
  scene?: Scene;
  camera?: PerspectiveCamera;
  cameraGroup?: Group;
  renderer?: WebGLRenderer;
  starfieldRef?: Group;
  // Optional: Include composer if you plan to use it for rendering
  composer?: EffectComposer;
}

/**
 * Initializes and configures the Three.js scene, camera, and renderer.
 *
 * @param width The width of the rendering viewport.
 * @param height The height of the rendering viewport.
 * @param mountRef The React ref where the renderer will attach its DOM element.
 */
export function initializeScene(
  width: number,
  height: number,
  mountRef: React.RefObject<HTMLDivElement>,
): InitializeSceneReturn {
  if (!mountRef.current) {
    return {};
  }
  const scene = new THREE.Scene();
  const starfieldRef = new THREE.Group(); // Placeholder for where you'd add your stars or other objects

  // Set up the camera
  const cameraGroup = new THREE.Group();
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.set(0, 0, 0);
  cameraGroup.add(camera);

  // Set up the renderer
  const renderer = new THREE.WebGLRenderer({
    powerPreference: 'high-performance',
    alpha: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);

  // set up composer
  const composer = new EffectComposer(renderer);

  // const bloomParams = {
  //   exposure: 5,
  //   bloomStrength: 5,
  //   bloomThreshold: 0.71,
  //   bloomRadius: 0.2,
  // };

  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(new EffectPass(camera, new BloomEffect()));
  scene.add(cameraGroup);
  scene.add(starfieldRef);

  mountRef.current.appendChild(renderer.domElement);

  const values = {
    scene,
    camera,
    cameraGroup,
    renderer,
    starfieldRef,
    composer,
  };
  return values;
}
