import { ColorHues, DefaultTheme, theme as chakraTheme } from '@chakra-ui/core';

interface MetaColors {
  transparent: string;
  current: string;
  black: string;
  white: string;
  whiteAlpha: ColorHues;
  blackAlpha: ColorHues;
  gray: ColorHues;
  red: ColorHues;
  orange: ColorHues;
  yellow: ColorHues;
  green: ColorHues;
  teal: ColorHues;
  blue: ColorHues;
  cyan: ColorHues;
  fauxblue: ColorHues;
  offwhite: ColorHues;
  purple: ColorHues;
  pink: ColorHues;
  linkedin: ColorHues;
  facebook: ColorHues;
  messenger: ColorHues;
  whatsapp: ColorHues;
  twitter: ColorHues;
  telegram: ColorHues;
}

interface MetaTheme {
  colors: MetaColors;
}
type Theme = DefaultTheme & MetaTheme;

export const theme: Theme = {
  ...chakraTheme,
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
    offwhite: {
      50: '#f0f3f5',
      100: '#d7dadc',
      200: '#bbc1c5',
      300: '#9eaab0',
      400: '#81929b',
      500: '#687882',
      600: '#515d64',
      700: '#3b4347',
      800: '#24282b',
      900: '#0a0e0f',
    },
    fauxblue: {
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
    heading: '"IBM Plex Mono", monospace',
    mono: '"Press Start 2P"',
  },
};
