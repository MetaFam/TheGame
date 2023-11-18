import { ComposeDBImageMetadata, imageLink, Maybe } from '@metafam/utils';

export function optimizedImage(
  type: string,
  url: string,
  opts?: Record<string, unknown>,
): string;
export function optimizedImage(
  type: string,
  url?: null,
  opts?: Record<string, unknown>,
): undefined;
export function optimizedImage(
  type: string,
  url?: Maybe<string>,
  opts?: Record<string, unknown>,
): string | undefined;
export function optimizedImage(type: string, url?: Maybe<string>, opts = {}) {
  switch (type) {
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
}

export type ImageDimensions = {
  width?: number;
  height?: number;
};

export const getImageDimensions = (
  imageURL?: string,
): Promise<ImageDimensions> =>
  new Promise((resolve, reject) => {
    if (imageURL) {
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight,
        } as ImageDimensions);
      };
      img.onerror = reject;

      img.src = imageURL;
    } else {
      resolve({});
    }
  });

export const computeImageMetadata = async (
  httpURL: string,
  ipfsURL: string,
) => {
  const response = await fetch(httpURL, { method: 'HEAD' });
  const mimeType = response.headers.get('Content-Type');
  const metadata = {
    url: ipfsURL,
    mimeType: mimeType ?? 'image/*',
  } as ComposeDBImageMetadata;
  const size = response.headers.get('Content-Length');
  if (size) {
    const sizeNumber = parseInt(size, 10);
    if (Number.isInteger(sizeNumber)) {
      metadata.size = sizeNumber;
    }
  }
  const { width, height } = await getImageDimensions(httpURL);
  if (width && height) {
    metadata.width = width;
    metadata.height = height;
  }
  return metadata;
};
