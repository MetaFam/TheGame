import { CSSReset } from '@chakra-ui/core';
import { Global } from '@emotion/core';
import React from 'react';

import ibmPlexMonoBoldWoff from './fonts/ibm-plex-mono-v5-latin-700.woff';
import ibmPlexMonoBoldWoff2 from './fonts/ibm-plex-mono-v5-latin-700.woff2';
import ibmPlexMonoWoff from './fonts/ibm-plex-mono-v5-latin-regular.woff';
import ibmPlexMonoWoff2 from './fonts/ibm-plex-mono-v5-latin-regular.woff2';
import ibmPlexSansBoldWoff from './fonts/ibm-plex-sans-v7-latin-700.woff';
import ibmPlexSansBoldWoff2 from './fonts/ibm-plex-sans-v7-latin-700.woff2';
import ibmPlexSansWoff from './fonts/ibm-plex-sans-v7-latin-regular.woff';
import ibmPlexSansWoff2 from './fonts/ibm-plex-sans-v7-latin-regular.woff2';
import pressStartFontWoff from './fonts/press-start-2p-regular.woff';
import pressStartFontWoff2 from './fonts/press-start-2p-regular.woff2';

export const GlobalStyle = () => (
  <>
    <CSSReset />
    <Global
      styles={`
        @font-face {
            font-family: 'Press Start 2P';
            font-style: normal;
            font-weight: 400;
            src: local('Press Start 2P Regular'), local('PressStart2P-Regular'),
                url(${pressStartFontWoff2}) format('woff2'),
                url(${pressStartFontWoff}) format('woff');
        }

        @font-face {
            font-family: 'IBM Plex Mono';
            font-style: normal;
            font-weight: 400;
            src: local('IBM Plex Mono'), local('IBMPlexMono'),
                url(${ibmPlexMonoWoff2}) format('woff2'), 
                url(${ibmPlexMonoWoff}) format('woff'); 
        }

        @font-face {
            font-family: 'IBM Plex Mono';
            font-style: normal;
            font-weight: 700;
            src: local('IBM Plex Mono Bold'), local('IBMPlexMono-Bold'),
                url(${ibmPlexMonoBoldWoff2}) format('woff2'), 
                url(${ibmPlexMonoBoldWoff}) format('woff'); 
        }

        @font-face {
            font-family: 'IBM Plex Sans';
            font-style: normal;
            font-weight: 400;
            src: local('IBM Plex Sans'), local('IBMPlexSans'),
                url(${ibmPlexSansWoff2}) format('woff2'),
                url(${ibmPlexSansWoff}) format('woff'); 
        }

        @font-face {
            font-family: 'IBM Plex Sans';
            font-style: normal;
            font-weight: 700;
            src: local('IBM Plex Sans Bold'), local('IBMPlexSans-Bold'),
                url(${ibmPlexSansBoldWoff2}) format('woff2'), 
                url(${ibmPlexSansBoldWoff}) format('woff'); 
        }
    `}
    />
  </>
);
