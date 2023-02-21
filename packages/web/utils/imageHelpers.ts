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

export type ImageDimensions = {
  width?: number;
  height?: number;
  dataURL: string;
};

export const getImageDimensions = (imageFile: File): Promise<ImageDimensions> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    const imgURL = URL.createObjectURL(imageFile);
    img.src = imgURL;
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
        dataURL: imgURL,
      } as ImageDimensions);
    };
    img.onerror = reject;
  });
