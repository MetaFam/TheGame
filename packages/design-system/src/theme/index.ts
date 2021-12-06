import { extendTheme, Theme as ChakraTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import { Styles } from 'react-select';

import { colors, MetaColors } from './colors';
import { textStyles } from './texts';

type Theme = ChakraTheme & {
  colors: MetaColors;
};

const breakpoints = createBreakpoints({
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
});
export const theme: Theme = extendTheme({
  breakpoints,
  styles: {
    global: {
      body: {
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

export const SelectStyles: Styles = {
  menu: (styles) => ({
    ...styles,
    background: theme.colors.dark,
  }),
  input: (styles) => ({
    ...styles,
    color: theme.colors.white,
  }),
  option: (styles) => ({
    ...styles,
    background: theme.colors.dark,
    color: theme.colors.whiteAlpha[700],
    '&:hover': {
      backgroundColor: theme.colors.purpleTag,
      color: theme.colors.white,
    },
  }),
  control: (styles) => ({
    ...styles,
    background: theme.colors.dark,
    border: theme.colors.dark,
  }),
  singleValue: (styles) => ({
    ...styles,
    color: theme.colors.white,
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    color: theme.colors.white,
    cursor: 'pointer',
    '&:hover': {
      color: theme.colors.blueLight,
    },
  }),
};
