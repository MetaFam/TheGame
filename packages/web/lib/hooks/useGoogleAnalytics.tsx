import { CONFIG } from 'config';
import React from 'react';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

const { gaId, appEnv } = CONFIG;

export const Analytics: React.FC = () => {
  if (!gaId || appEnv !== 'production') {
    return null;
  }
  React.useEffect(() => {
    // Load Google Analytics script dynamically
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    script.async = true;

    script.onload = () => {
      // Initialize Google Analytics
      window.dataLayer = window.dataLayer || [];
      function gtag(arg: string, arg2: any, arg3?: any) {
        window.dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', gaId, {
        page_path: window.location.pathname,
      });
    };
    // Append the script to the document body
    document.body.appendChild(script);

    // Cleanup: Remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, [gaId]);

  return <></>
};