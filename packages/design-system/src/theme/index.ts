import { extendTheme, Theme as ChakraTheme } from '@chakra-ui/react';

import { colors, MetaColors } from './colors';
import { textStyles } from './texts';

type Theme = ChakraTheme & {
  colors: MetaColors;
};

export const theme: Theme = extendTheme({
  styles: {
    global: {
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
  },
  // fontSizes: {
  //   xs: '0.75rem',
  //   sm: '0.875rem',
  //   md: '1rem',
  //   lg: '1.125rem',
  //   xl: '1.25rem',
  //   '2xl': '1.5rem',
  //   '3xl': '1.875rem',
  //   '4xl': '2.25rem',
  //   '5xl': '3rem',
  //   '6xl': '3.75rem',
  //   '7xl': '4.5rem',
  //   '8xl': '6rem',
  //   '9xl': '8rem',
  // },
});
