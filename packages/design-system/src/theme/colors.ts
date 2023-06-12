import { Theme as ChakraTheme, theme as baseTheme } from '@chakra-ui/react';

type ColorHues = typeof baseTheme.colors.red;

export type MetaColors = ChakraTheme['colors'] & {
  pink: ColorHues;
  offwhite: string;
  blue20: string;
  blueProfileSection: string;
  dark: string;
  purpleModalDark: string;
  purpleBoxDark: string;
  purpleBoxLight: string;
  purpleTag: string;
  purpleTag30: string;
  purpleTag50: string;
  purpleTag70: string;
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
  purpleProfileSection: string;
  brightIdOrange: ColorHues;
  borderPurple: string;
  pinkShadeOne: string;
  secondaryBlue: ColorHues;
  landing50: string;
  landing100: string;
  landing150: string;
  landing200: string;
  landing250: string;
  landing300: string;
  landing350: string;
  landing400: string;
  landing450: string;
  landing500: string;
  landing550: string;
  landing600: string;
  landing650: string;
  landingDarkGlass: string;
  midnightBlue: string;
  royalBlue: string;
  deepMagenta: string;
  darkMagenta: string;
  plum: string;
  wine: string;
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
  blueProfileSection: 'rgba(42, 31, 71, 0.9)',
  purple80: 'rgba(70, 20, 100, 0.8)',
  purpleProfileSection: 'rgba(27, 13, 42, 0.9)',
  borderPurple: '#5946BC',
  pinkShadeOne: '#A426A4',
  dark: '#1B0D2A',
  purpleModalDark: '#110035',
  purpleBoxDark: '#261943',
  purpleBoxLight: '#392373',
  purpleTag: '#40347C',
  purpleTag30: 'rgba(64, 52, 124, 0.3)',
  purpleTag50: 'rgba(64, 52, 124, 0.5)',
  purpleTag70: 'rgba(64, 52, 124, 0.7)',
  blueLight: '#A5B9F6',
  cyanText: '#79F8FB',
  discord: '#7289da',
  discordDark: '#5d6eb3',
  midnightBlue: '#141838',
  royalBlue: '#214781',
  deepMagenta: '#2B1441',
  darkMagenta: '#2F1646',
  plum: '#3E1C5D',
  wine: '#410834',
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
  blue: {
    50: '#f1f4fe',
    100: '#d4defc',
    200: '#c0cefa',
    300: '#a3b8f8',
    400: '#91aaf7',
    500: '#7595f5',
    600: '#6a88df',
    700: '#536aae',
    800: '#405287',
    900: '#313f67',
  },
  pink: {
    50: '#ffe5fc',
    100: '#fbb8e8',
    200: '#f48cd6',
    300: '#ed5ec5',
    400: '#e731b4',
    500: '#ce189b',
    600: '#a11078',
    700: '#730857',
    800: '#480335',
    900: '#1d0015',
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
  secondaryBlue: {
    50: '#e7eeff',
    100: '#c1ccf3',
    200: '#9baae6',
    300: '#7389d9',
    400: '#4c67cc',
    500: '#334db3',
    600: '#263c8c',
    700: '#1a2b65',
    800: '#0d1a40',
    900: '#02091b',
  },
  gray: {
    50: '#F7FAFC',
    100: '#EDF2F7',
    200: '#E2E8F0',
    300: '#CBD5E0',
    400: '#A0AEC0',
    500: '#718096',
    600: '#4A5568',
    700: '#2D3748',
    800: '#1A202C',
    900: '#171923',
  },
  landing50: '#1A0340',
  landing100: '#240E74',
  landing150: '#462080',
  landing200: '#5A32E6',
  landing250: '#7241FF',
  landing300: '#7A52F0',
  landing350: '#79F8FB',
  landing400: '#A5B9F6',
  landing450: '#E839B7',
  landing500: '#FF00FF',
  landing550: '#DD5FED',
  landing600: '#DF9BFF',
  landing650: '#DFB9D7',
  landingDarkGlass: 'rgba(27, 13, 42, 0.9)',
};
