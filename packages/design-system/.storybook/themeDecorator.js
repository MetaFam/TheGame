import React from 'react';
import { GlobalStyle, ThemeProvider, theme } from '../src';

const ThemeDecorator = (storyFn) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {storyFn()}
  </ThemeProvider>
);

export default ThemeDecorator;
