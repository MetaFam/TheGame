import { extendTheme, Theme as ChakraTheme } from '@chakra-ui/react';

import { colors, MetaColors } from './colors';
import { textStyles } from './texts';

type Theme = ChakraTheme & {
  colors: MetaColors;
};

export const theme: Theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: 'rgb(25, 14, 39)',
        '&.dashboard-edit': {
          overflow: { base: 'hidden', xl: 'initial' }, // Locks scrolling on the body when resizing or dragging the grid on mobile devices
        },
      },
      '#__next': {
        background: 'dark',
        color: 'white',
        minHeight: '100vh',
        option: {
          background: 'dark',
          color: 'white',
        },
      },
    },
  },
  sizes: {
    container: {
      xl: '85rem',
    },
  },
  colors,
  textStyles,
  fonts: {
    body: '"Exo 2", sans-serif',
    mono: '"Exo 2", sans-serif',
    heading: '"Press Start 2P", sans-serif',
    exo: '"Exo 2", sans-serif',
    exo2: '"Exo 2", sans-serif',
  },
  // reference scale
  // https://type-scale.com/?size=16&scale=1.200&text=A%20Visual%20Type%20Scale&font=Exo%202&fontweight=400&bodyfont=body_font_default&bodyfontweight=400&lineheight=1.6&backgroundcolor=%23330964&fontcolor=%23ffffff&preview=false
  fontSizes: {
    xs: '0.694rem',
    sm: '0.833rem',
    md: '1rem',
    lg: '1.2rem',
    xl: '1.25rem',
    '2xl': '1.44rem',
    '3xl': '1.728rem',
    '4xl': '2.074rem',
    '5xl': '2.488rem',
    '6xl': '2.986rem',
    '7xl': '3.583rem',
    '8xl': '4.3rem',
    '9xl': '5.16rem',
  },
});
