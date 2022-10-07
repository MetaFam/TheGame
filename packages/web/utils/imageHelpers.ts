import { imageLink, Maybe } from '@metafam/utils';

export const optimizedImage = (key: string, url?: Maybe<string>, opts = {}) => {
  switch (key) {
    case 'logoURL':
    case 'profileImageURL': {
      return imageLink(url, { ar: '1:1', height: 200, ...opts }) ?? undefined;
    }
    case 'backgroundImageURL':
    case 'bannerImageURL': {
      return imageLink(url, { height: 300, ...opts }) ?? undefined;
    }
    default: {
      return imageLink(url, opts) ?? undefined;
    }
  }
};
