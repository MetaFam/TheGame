import chakraTheme, { Theme as ChakraTheme } from '@chakra-ui/theme';

interface MetaColors {
  offwhite: string;
  blue02: string;
}

interface MetaTheme {
  colors: ChakraTheme['colors'] & MetaColors;
}

type Theme = ChakraTheme & MetaTheme;

export const theme: Theme = {
  ...chakraTheme,
  styles: {
    ...chakraTheme.styles,
    global: {
      ...chakraTheme.styles.global,
      background: 'black',
      color: 'white',
    },
  },
  colors: {
    ...chakraTheme.colors,
    cyan: {
      50: '#dbffff',
      100: '#b1fcfe',
      200: '#83f9fb',
      300: '#57f6fa',
      400: '#34f2f7',
      500: '#26d9de',
      600: '#15a9ad',
      700: '#04797c',
      800: '#00494b',
      900: '#001a1b',
    },
    offwhite: '#F6F8F9',
    blue02: 'rgba(79, 105, 205, 0.2)',
    purple: {
      50: '#eee7ff',
      100: '#c8bafc',
      200: '#a48df3',
      300: '#7f60ed',
      400: '#5a32e6',
      500: '#4119cd',
      600: '#3112a0',
      700: '#230d74',
      800: '#150747',
      900: '#07021d',
    },
  },
  fonts: {
    body: '"IBM Plex Sans", sans-serif',
    mono: '"IBM Plex Mono", monospace',
    heading: '"Press Start 2P", sans-serif',
  }
};
