import { theme as chakraTheme } from '@chakra-ui/core';

export const theme: typeof chakraTheme = {
  ...chakraTheme,
  colors: {
    ...chakraTheme.colors,
  },
  fonts: {
    body: '"IBM Plex Sans", sans-serif',
    heading: '"IBM Plex Mono", monospace',
    mono: '"Press Start 2P"',
  },
};
