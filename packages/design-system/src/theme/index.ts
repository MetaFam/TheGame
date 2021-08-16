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
    body: '"IBM Plex Sans", sans-serif',
    mono: '"IBM Plex Mono", monospace',
    heading: '"Press Start 2P", sans-serif',
    exo: '"Exo", sans-serif',
  },
});
