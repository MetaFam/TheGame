import { Theme as ChakraTheme, theme as baseTheme } from '@chakra-ui/react';

type ColorHues = typeof baseTheme.colors.red;

export type MetaColors = ChakraTheme['colors'] & {
  offwhite: string;
  blue20: string;
  dark: string;
  purpleBoxDark: string;
  purpleBoxLight: string;
  purpleTag: string;
  purpleTag30: string;
  blueLight: string;
  cyanText: string;
  diamond: string;
  platinum: string;
  gold: string;
  silver: string;
  discord: string;
  discordDark: string;
  bronze: string;
  purple80: string;
  brightIdOrange: ColorHues;
};

export const colors: MetaColors = {
  ...baseTheme.colors,
  diamond: '#40e8ec',
  platinum: '#81b6e3',
  gold: '#d0a757',
  silver: '#b0b0b0',
  bronze: '#a97142',
  offwhite: '#F6F8F9',
  blue20: 'rgba(79, 105, 205, 0.2)',
  purple80: 'rgba(70, 20, 100, 0.8)',
  dark: '#1B0D2A',
  purpleBoxDark: '#261943',
  purpleBoxLight: '#392373',
  purpleTag: '#40347C',
  purpleTag30: 'rgba(64, 52, 124, 0.3)',
  blueLight: '#A5B9F6',
  cyanText: '#79F8FB',
  discord: '#7289da',
  discordDark: '#5d6eb3',
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
  brightIdOrange: {
    50: '#ffffff',
    100: '#ffffff',
    200: '#ffebdf',
    300: '#ffc7b1',
    400: '#fda382',
    500: '#fb8a61',
    600: '#f85a20',
    700: '#ae3204',
    800: '#4d1300',
    900: '#1f0400',
  },
};
