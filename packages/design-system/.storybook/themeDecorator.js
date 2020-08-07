import React from 'react';
import { CSSReset, ChakraProvider, MetaTheme } from '../src';
import GoogleFontLoader from 'react-google-font-loader';

const ThemeDecorator = (storyFn) => (
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
    {storyFn()}
  </ChakraProvider>
);

export default ThemeDecorator;
