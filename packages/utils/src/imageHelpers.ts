import ImgixClient from 'imgix-core-js';

import { IMGIX_DOMAIN, IMGIX_TOKEN } from './constants.js';
import { Maybe } from './extendedProfileTypes.js';
import { httpLink } from './linkHelpers.js';

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

const client = new ImgixClient({
  domain: IMGIX_DOMAIN,
  secureURLToken: IMGIX_TOKEN,
});

export const imageLink = (
  url?: Maybe<string>,
  opts?: OptimizeImageParams,
): string | undefined => {
  if (url?.startsWith('data:')) return url;

  let http = httpLink(url);

  if (http?.endsWith('/')) http = http.slice(0, -1);

  if (!IMGIX_TOKEN || !http) return http;

  return client.buildURL(http, opts);
};

export type ImageDimensions = {
  width?: number;
  height?: number;
};

export const getImageDimensions = (elem: Maybe<HTMLImageElement>) => {
  const props: ImageDimensions = {};
  ['width', 'height'].forEach((prop) => {
    props[prop as 'width' | 'height'] = Math.max(
      elem?.[
        `natural${prop[0].toUpperCase()}${prop.slice(1)}` as
          | 'naturalWidth'
          | 'naturalHeight'
      ] ?? 0,
      elem?.[prop as 'width' | 'height'] ?? 0,
      1,
    );
  });
  return props;
};
