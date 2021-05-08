import ImgixClient from 'imgix-core-js';

import { CONFIG } from '../config';

const client = new ImgixClient({
  domain: 'metafam.imgix.net',
  secureURLToken: CONFIG.imgixToken,
});

export type OptimizeImageParams = {
  ar?: string;
  fit?:
    | 'clamp'
    | 'clip'
    | 'crop'
    | 'facearea'
    | 'fill'
    | 'fillmax'
    | 'max'
    | 'min'
    | 'scale';
  height?: number;
  width?: number;
};

export const optimizeImage = (
  url: string,
  opts?: OptimizeImageParams,
): string => {
  if (!CONFIG.imgixToken) return url;

  return client.buildURL(url, { ...opts });
};
