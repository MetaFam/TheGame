import { Box, chakra, keyframes } from '@metafam/ds';

const wave = keyframes`
  0% {
    d: path("M 0 100 Q 250 50 400 200 Q 550 350 800 300 L 800 0 L 0 0 L 0 100 Z");
  }
  50% {
    d: path("M 0 100 Q 200 150 400 200 Q 600 250 800 300 L 800 0 L 0 0 L 0 100 Z");
  }
  100% {
    d: path("M 0 100 Q 150 350 400 200 Q 650 50 800 300 L 800 0 L 0 0 L 0 100 Z");
  }
`;

const upDown = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(30px);
  }
`;

const upDownShort = keyframes`
  from { transform: translateY(-15px) }
  to { transform: translateY(5px) }
`;

const waveAnimation = (length: string) =>
  `${wave} ${length} linear infinite alternate`;

// sx={{ position: `absolute`, width: `130%`, left: 0, top: `50px`, height: `full`, svg: { width: `100%`, height: [`150px`,`150px`,`200px`], transform: `scale(-1, -1)`, zIndex: 50}, zIndex: 50 }}
const InnerWaveA = chakra('div', {
  baseStyle: {
    path: {
      animation: `${waveAnimation('5s')}`,
      // animationPlayState: 'paused',
    },
  },
});

//  sx={{ position: `absolute`, width: `130%`, right: 0, top: `30px`, height: `full`, svg: { width: `100%`, height: [`150px`,`150px`,`150px`,`200px`], zIndex: 30 }, transform: `scale(1, -1)`, zIndex: 30 }}
const InnerWaveB = chakra('div', {
  baseStyle: {
    path: {
      animation: `${waveAnimation('10s')}`,
      // animationPlayState: 'paused',
    },
  },
});

const InnerWaveC = chakra('div', {
  baseStyle: {
    path: {
      animation: `${waveAnimation('8s')}`,
      // animationPlayState: 'paused',
    },
  },
});

export const wavesAnimation = `${wave} 10s ease-in-out infinite alternate`;
export const upDownAnimation = `${upDown} 10s ease-in-out infinite alternate`;
export const upDownShortAnimation = `${upDownShort} 10s ease-in-out infinite alternate`;
export const upDownAnimationLong = `${upDown} 20s cubic-bezier(.29,.25,.38,.69) infinite alternate`;

const LandingSVG = chakra('svg');

export const AnimatedWaves = ({ animationName = '', playing = false }) => (
  <Box
    sx={{
      animation: animationName,
      animationPlayState: 'paused',
      position: 'absolute',
      width: '100%',
      height: '20vh',
      bottom: { base: -5, '2xl': -10 },
      left: 0,
      right: 0,
      zIndex: 300,
      pointerEvents: 'none',
      overflowX: 'hidden',
      overflowY: 'hidden',
    }}
  >
    <InnerWaveA
      className="waveA"
      sx={{
        position: 'absolute',
        width: '200%',
        left: 0,
        top: { base: 0, '2xl': '50px' },
        height: 'full',
        svg: {
          width: '100%',
          height: ['150px', '150px', '200px'],
          transform: 'scale(-1, -1)',
          zIndex: 50,
        },
        zIndex: 50,
        'svg > path': {
          // boxShadow: '0 0 35px rgba(0,0,0,1)',
          animationPlayState: playing ? 'running' : 'paused',
        },
      }}
    >
      <LandingSVG
        xmlns="http://www.w3.org/2000/svg"
        id="contact-wave-1"
        viewBox="0 0 800 338.05"
        fill="landing450"
        preserveAspectRatio="none"
      >
        <path opacity={0.1}>
          <animate
            attributeName="d"
            values="M 0 100 Q 250 50 400 200 Q 550 350 800 300 L 800 0 L 0 0 L 0 100 Z;M 0 100 Q 200 150 400 200 Q 600 250 800 300 L 800 0 L 0 0 L 0 100 Z;M 0 100 Q 150 350 400 200 Q 650 50 800 300 L 800 0 L 0 0 L 0 70 Z"
            repeatCount="indefinite"
          />
        </path>
      </LandingSVG>
    </InnerWaveA>
    <InnerWaveB
      className="waveB"
      sx={{
        position: 'absolute',
        width: '180%',
        right: 0,
        top: { base: '40px', '2xl': '30px' },
        height: 'full',
        svg: {
          width: '100%',
          height: ['150px', '150px', '150px', '200px'],
          zIndex: 30,
        },
        transform: 'scale(1, -1)',
        zIndex: 300,
        'svg > path': {
          // boxShadow: '0 0 35px rgba(0,0,0,1)',
          animationPlayState: playing ? 'running' : 'paused',
        },
      }}
    >
      <LandingSVG
        xmlns="http://www.w3.org/2000/svg"
        id="contact-wave-2"
        viewBox="0 0 800 338.05"
        fill="landing500"
        preserveAspectRatio="none"
      >
        <path opacity={0.1}>
          <animate
            attributeName="d"
            values="M 0 100 Q 250 50 400 200 Q 550 350 800 300 L 800 0 L 0 0 L 0 100 Z;M 0 100 Q 200 150 400 200 Q 600 250 800 300 L 800 0 L 0 0 L 0 100 Z;M 0 100 Q 150 350 400 200 Q 650 50 800 300 L 800 0 L 0 0 L 0 70 Z"
            repeatCount="indefinite"
          />
        </path>
      </LandingSVG>
    </InnerWaveB>
    <InnerWaveC
      className="waveC"
      sx={{
        position: 'absolute',
        width: '160%',
        left: 0,
        top: { base: 3, '2xl': '50px' },
        height: 'full',
        svg: {
          width: '100%',
          height: ['150px', '150px', '200px'],
          transform: 'scale(-1, -1)',
          zIndex: 50,
        },
        zIndex: 50,
        'svg > path': {
          // boxShadow: '0 0 35px rgba(0,0,0,1)',
          animationPlayState: playing ? 'running' : 'paused',
        },
      }}
    >
      <LandingSVG
        xmlns="http://www.w3.org/2000/svg"
        id="contact-wave-1"
        viewBox="0 0 800 338.05"
        fill="landing250"
        preserveAspectRatio="none"
      >
        <path opacity={0.1}>
          <animate
            attributeName="d"
            values="M 0 100 Q 250 50 400 200 Q 550 350 800 300 L 800 0 L 0 0 L 0 100 Z;M 0 100 Q 200 150 400 200 Q 600 250 800 300 L 800 0 L 0 0 L 0 100 Z;M 0 100 Q 150 350 400 200 Q 650 50 800 300 L 800 0 L 0 0 L 0 70 Z"
            repeatCount="indefinite"
          />
        </path>
      </LandingSVG>
    </InnerWaveC>
  </Box>
);
