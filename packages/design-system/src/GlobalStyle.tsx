import { CSSReset } from '@chakra-ui/core';
import { Global } from '@emotion/core';
import React from 'react';

export const GlobalStyle: React.FC = () => (
  <>
    <CSSReset />
    <Global styles={{}} />
  </>
);
