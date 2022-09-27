/* eslint-disable max-classes-per-file */
import { Box } from '@metafam/ds';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

/** Rain - Matrix rain effect
 * Used for the onboarding game but can be used for other things
 * @param blur - blur effect strength
 * @param masked - adjust z-index if we use a mask effect
 * @param top - top position of the container (to account for any vertical spacing of the parent)
 * @param effectOpacity - opacity of the rain effect - so we can make it very subtle or fade it out
 * @param z - z-index of the rain effect
 */
export function Rain({
  blur,
  masked,
  top,
  effectOpacity,
  z,
}: {
  blur?: boolean;
  masked?: boolean;
  top?: number;
  effectOpacity?: number;
  z?: number;
}): JSX.Element {
  const rainRef = useRef<HTMLDivElement>(null);
  // const prefersReducedMotion = usePrefersReducedMotion();
  const [noMotion, setNoMotion] = useState(false);
  const root = typeof window !== 'undefined' ? document.body : null;

  const initCallback = useCallback(() => {
    if (rainRef.current) {
      makeRain(rainRef);
    }
  }, []);

  useEffect(() => {
    initCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    initCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noMotion]);

  useEffect(() => {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box
        ref={rainRef}
        data-id="rain"
        position="absolute"
        top={top ?? 0}
        left={0}
        right={0}
        bottom={0}
        width="100%"
        height="100%"
        zIndex={z ?? 0}
        opacity={effectOpacity ?? 0.5}
        pointerEvents="none"
      >
        {blur ? (
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            width="100%"
            height="100%"
            zIndex={z ? z + 2 : 2}
            backgroundColor="purpleTag30"
            backdropFilter="blur(7px)"
            pointerEvents="none"
          />
        ) : undefined}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          width="100%"
          height="100%"
          zIndex={z ? z + 5 : 5}
          pointerEvents="none"
          boxShadow="0 0 250px 100px black inset"
        />
        <Box
          as="canvas"
          data-id="rain-canvas"
          className="rain-canvas"
          position="absolute"
          zIndex={z ?? !masked ? 0 : 10}
          opacity={noMotion ? 0 : 1}
          transition="opacity 1s ease-in-out"
          pointerEvents="none"
          minH="100%"
          minW="100%"
        />
      </Box>
    </>
  );
}

class RainSymbol {
  characters: string;

  x: number;

  y: number;

  fontSize: number;

  text: string;

  canvasHeight: number;

  constructor(x: number, y: number, fontSize: number, canvasHeight: number) {
    const katakana =
      'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const ukranian = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
    const greek = 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ';
    const germanAndFrench =
      'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ';
    const futhark = 'ÆÐENØÞÞØÆ';
    const nums = '0123456789';
    const emojis = '🐙';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>/?`~';

    this.characters =
      katakana +
      latin +
      nums +
      ukranian +
      greek +
      futhark +
      germanAndFrench +
      emojis +
      symbols;
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.text = '';
    this.canvasHeight = canvasHeight;
    // this.canvasWidth = canvasHeight;
  }

  draw(context: CanvasRenderingContext2D): void {
    this.text = this.characters.charAt(
      Math.floor(Math.random() * this.characters.length),
    );
    context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
    if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
      this.y = 0;
    } else {
      this.y += 1;
    }
  }
}

class RainEffect {
  canvasWidth: number;

  canvasHeight: number;

  fontSize: number;

  columns: number;

  symbols: RainSymbol[];

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fontSize = 16;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.initialize();
  }

  private initialize(): void {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < this.columns; i++) {
      this.symbols[i] = new RainSymbol(i, 0, this.fontSize, this.canvasHeight);
    }
  }

  resize(width: number, height: number): void {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.initialize();
  }
}

export function makeRain(ref: RefObject<HTMLDivElement>): void {
  if (typeof window !== 'undefined') {
    if (ref.current === null) return;
    const canvas = ref.current.querySelector(
      '[data-id="rain-canvas"]',
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    const effect = new RainEffect(canvas.width, canvas.height);
    let lastTime = 0;
    const fps = 30;
    const nextFrame = 1000 / fps;
    let timer = 0;
    const gradient = ctx?.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height,
    );
    gradient?.addColorStop(0, '#FF00FF');
    gradient?.addColorStop(0.5, '#462080');
    gradient?.addColorStop(1, '#FF00FF');
    const fill = 'rgba(27, 13, 42, 0.05)';

    // eslint-disable-next-line no-inner-declarations
    function animate(timestamp: number): void {
      if (ctx !== null) {
        const deltaTime = timestamp - lastTime;

        lastTime = timestamp;
        if (timer > nextFrame) {
          ctx.fillStyle = fill;
          ctx.textAlign = 'center';

          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = gradient ?? 'transparent';
          ctx.font = `${effect.fontSize}px monospace`;
          effect.symbols.forEach((symbol) => {
            symbol.draw(ctx);
          });
          timer = 0;
        } else {
          timer += deltaTime;
        }
      }
      requestAnimationFrame(animate);
    }
    animate(0);

    window.addEventListener('resize', () => {
      canvas.height = window.innerHeight;
      canvas.width = window.innerWidth;
      effect.resize(canvas.width, canvas.height);
    });
  }
}
