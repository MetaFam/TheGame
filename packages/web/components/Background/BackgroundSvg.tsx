import { SVG } from '@metafam/ds';

const PageBackgroundSvg = () => (
    <SVG width="3090" height="2002" viewBox="0 0 3090 2002" fill="none" xmlns="http://www.w3.org/2000/svg" sx={{
      position: 'absolute',
      top: 0,
      left: { base: '50%', xl: 0 },
      transform: {base: 'translate3d(-50%, 0, 0)', xl: 'translate3d(0,0,0)'},
      width: {base: 'auto', xl: '100%'},
      maxWidth: { base: 'none', xl: '100%' },
      height: {base: '100vh', xl: 'auto'},
      zIndex: 0,
      'ellipse': {
        filter: 'blur(360px)',
      }
    }}>
      <rect width="3090" height="2002" fill="#383838" />
      <g clipPath="url(#clip0_9532_11889)">
        <rect width="3090" height="2002" fill="white" />
        <rect width="3452" height="2002" fill="#080219" />
        <ellipse cx="728.743" cy="1721.67" rx="1256.93" ry="762.285" transform="rotate(35.1067 728.743 1721.67)" fill="url(#paint0_linear_9532_11889)" />
        <ellipse cx="2823.32" cy="1592.88" rx="1348.31" ry="778.864" transform="rotate(25.075 2823.32 1592.88)" fill="url(#paint1_linear_9532_11889)" />
        <g filter="url(#filter0_b_9532_11889)">
          <rect width="3452" height="2002" fill="#080219" fillOpacity="0.6" />
        </g>
      </g>
      <defs>
        <filter id="filter0_b_9532_11889" x="-721.8" y="-721.8" width="4895.6" height="3445.6" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="360.9" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_9532_11889" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_9532_11889" result="shape" />
        </filter>
        <linearGradient id="paint0_linear_9532_11889" x1="778.951" y1="1353.71" x2="512.96" y2="598.088" gradientUnits="userSpaceOnUse">
          <stop stopColor="#500A7C" />
          <stop offset="1" stopColor="#500A7C" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="paint1_linear_9532_11889" x1="3001.34" y1="1165.32" x2="2255.01" y2="16.6449" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2A0D7D" />
          <stop offset="1" stopColor="#2A0D7D" stopOpacity="0" />
        </linearGradient>
        <clipPath id="clip0_9532_11889">
          <rect width="3090" height="2002" fill="white" />
        </clipPath>
      </defs>
    </SVG>

  )

export default PageBackgroundSvg;
