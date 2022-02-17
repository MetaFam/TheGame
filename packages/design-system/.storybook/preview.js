import React from 'react';
import { CSSReset, ChakraProvider, MetaTheme } from '../src';
import GoogleFontLoader from 'react-google-font-loader';
import { withPerformance } from 'storybook-addon-performance';

const withChakra = (StoryFn) => (
  <ChakraProvider theme={MetaTheme}>
    <GoogleFontLoader
      fonts={[
        {
          font: 'Exo+2',
          weights: [400, 600, 700],
        },
        {
          font: 'Press+Start+2P',
        },
        {
          font: 'Poppins',
          weights: [700],
        },
      ]}
    />
    <CSSReset />
    <StoryFn />
  </ChakraProvider>
);

export const decorators = [withChakra, withPerformance];
