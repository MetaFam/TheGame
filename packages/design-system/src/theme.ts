import chakraTheme, { Theme as ChakraTheme } from '@chakra-ui/theme';

interface MetaColors {
  offwhite: string;
  blue02: string;
  dark: string;
  purpleBoxDark: string;
  purpleBoxLight: string;
  purpleTag: string;
  blueLight: string;
  cyanText: string;
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
      background: '#1b0d2a',
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
    offwhite: '#F6F8F9',
    blue02: 'rgba(79, 105, 205, 0.2)',
    dark: '#1B0D2A',
    purpleBoxDark: '#261943',
    purpleBoxLight: '#392373',
    purpleTag: '#40347C',
    blueLight: '#A5B9F6',
    cyanText: '#79F8FB',
  },
  fonts: {
    body: '"IBM Plex Sans", sans-serif',
    mono: '"IBM Plex Mono", monospace',
    heading: '"Press Start 2P", sans-serif',
  },
};
