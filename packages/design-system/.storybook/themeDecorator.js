import React from 'react';
import { GlobalStyle, ThemeProvider, theme } from '../src';
import GoogleFontLoader from 'react-google-font-loader';

const ThemeDecorator = storyFn => (
  <ThemeProvider theme={theme}>
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
    <GlobalStyle />
    {storyFn()}
  </ThemeProvider>
);

export default ThemeDecorator;
