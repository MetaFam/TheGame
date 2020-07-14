import { theme } from '@chakra-ui/core';

export const metaTheme = {
  ...theme,
  colors: {
    ...theme.colors,
  },
  fonts: {
    body: '"IBM Plex Sans", sans-serif',
    heading: '"IBM Plex Sans", sans-serif',
    mono: '"IBM Plex Mono", monospace',
    meta: '"Press Start 2P"',
  },
};
