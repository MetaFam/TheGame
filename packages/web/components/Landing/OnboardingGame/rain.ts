/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */

import { RefObject } from 'react';

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

export function rain(ref: RefObject<HTMLDivElement>, isPaused: boolean): void {
  if (typeof window !== 'undefined') {
    console.log('rain', isPaused);
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
          // console.log(lastTime);
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
      // console.log(ctx);
    }
    animate(0);

    window.addEventListener('resize', () => {
      canvas.height = window.innerHeight;
      canvas.width = window.innerWidth;
      effect.resize(canvas.width, canvas.height);
    });
  }
}
