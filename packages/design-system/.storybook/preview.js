import React from 'react';
import { CSSReset, ChakraProvider, MetaTheme } from '../src';
import GoogleFontLoader from 'react-google-font-loader';
import { withPerformance } from 'storybook-addon-performance';

const withChakra = (StoryFn) => (
  <ChakraProvider theme={MetaTheme}>
    <GoogleFontLoader
      fonts={[
        {
          font: 'IBM+Plex+Mono',
          weights: [400, 700],
        },
        {
          font: 'IBM+Plex+Sans',
          weights: [400, 700],
        },
        {
          font: 'Press+Start+2P',
        },
      ]}
    />
    <CSSReset />
    <StoryFn />
  </ChakraProvider>
);

export const decorators = [withChakra, withPerformance];
