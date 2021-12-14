import { BasicProfile, ImageSources } from '@datamodels/identity-profile-basic';
import { MutableRefObject } from 'react';

export type Values<T> = T[keyof T];

export { BasicProfile };

export const BasicProfileImages = {
  imageURL: 'image',
  bannerImageURL: 'background',
} as const;
export const BasicProfileStrings = {
  name: 'name',
  description: 'description',
  emoji: 'emoji',
  location: 'homeLocation',
  countryCode: 'residenceCountry',
  birthDate: 'birthDate',
  website: 'url',
} as const;
export const BasicProfileFields = {
  ...BasicProfileImages,
  ...BasicProfileStrings,
} as const;

export const ExtendedProfileImages = {
  backgroundImageURL: 'background',
} as const;
export const ExtendedProfileStrings = {
  username: 'username',
  pronouns: 'pronouns',
  magicDisposition: 'magicDisposition',
} as const;
export const ExtendedProfileObjects = {
  availableHours: 'availableHours',
  timeZone: 'timeZone',
  playerType: 'playerType',
} as const;
export const ExtendedProfileFields = {
  ...ExtendedProfileImages,
  ...ExtendedProfileStrings,
  ...ExtendedProfileObjects,
} as const;

export type HasuraBPImages = {
  -readonly [key in keyof typeof BasicProfileImages]?: string;
};
export type BPStrings = {
  -readonly [key in keyof typeof BasicProfileStrings]?: string;
};

export type HasuraEPImages = {
  -readonly [key in keyof typeof ExtendedProfileImages]?: string;
};
export type EPStrings = {
  -readonly [key in keyof typeof ExtendedProfileStrings]?: string;
};

export interface TimeZone {
  name?: string;
  abbreviation: string;
  location?: string;
  offset: number;
}
export interface TitledDescription {
  title: string;
  description?: string;
}
export type EPObjects = {
  availableHours?: number;
  timeZone?: TimeZone;
  playerType?: TitledDescription;
};

export type HasuraProfileProps = HasuraBPImages &
  BPStrings &
  HasuraEPImages &
  EPStrings &
  EPObjects;

export type CeramicBPImages = {
  -readonly [key in Values<typeof BasicProfileImages>]?: ImageSources;
};
export type CeramicEPImages = {
  -readonly [key in Values<typeof ExtendedProfileImages>]?: ImageSources;
};
export type ExtendedProfile = CeramicEPImages & EPStrings & EPObjects;

export type CeramicProfileProps = CeramicBPImages &
  BPStrings &
  CeramicEPImages &
  EPStrings &
  EPObjects;

export const Images = {
  ...BasicProfileImages,
  ...ExtendedProfileImages,
} as const;
export const Strings = {
  ...BasicProfileStrings,
  ...ExtendedProfileStrings,
} as const;

export type Endpoints = {
  -readonly [key in keyof typeof Images]?: {
    val: string;
    set: () => void;
    ref: MutableRefObject<HTMLImageElement>;
  };
};
