import { CONFIG } from 'config';
import React from 'react';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

const { gaId, nodeEnv } = CONFIG;

export const Analytics: React.FC = () => {
 
  React.useEffect(() => {
    if (!gaId || nodeEnv !== 'production') {
      return; // Explicitly return here
    }
    // Load Google Analytics script dynamically
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    script.async = true;

    script.onload = () => {
      // Initialize Google Analytics
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any) {
        window.dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', gaId, {
        page_path: window.location.pathname,
      });
    };
    // Append the script to the document body
    document.body.appendChild(script);
  }, []);

  return <></>
};