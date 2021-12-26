import { BasicProfile, ImageSources } from '@datamodels/identity-profile-basic';

export type Maybe<T> = T | null;
export type Values<T> = T[keyof T];

export { BasicProfile };

export const BasicProfileImages = {
  profileImageURL: 'image',
  bannerImageURL: 'background',
} as const;
export const BasicProfileStrings = {
  name: 'name',
  description: 'description',
  emoji: 'emoji',
  location: 'homeLocation',
  countryCode: 'residenceCountry',
  birthDate: 'birthDate',
  gender: 'gender',
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
  // B/c of the difficulty determining whether it is
  // daylight savings in a particular zone, only the
  // name is saved & the details are retrieved from
  // a library.
  timeZone: 'timeZone',
} as const;
export const ExtendedProfileObjects = {
  availableHours: 'availableHours',
  playerType: 'playerType',
  colorMask: 'colorDisposition',
} as const;
export const ExtendedProfileFields = {
  ...ExtendedProfileImages,
  ...ExtendedProfileStrings,
  ...ExtendedProfileObjects,
} as const;

export type HasuraBPImages = {
  -readonly [key in keyof typeof BasicProfileImages]?: string;
};
export type HasuraBPStrings = {
  -readonly [key in keyof typeof BasicProfileStrings]?: string;
};

export type HasuraEPImages = {
  -readonly [key in keyof typeof ExtendedProfileImages]?: string;
};
export type HasuraEPStrings = {
  -readonly [key in keyof typeof ExtendedProfileStrings]?: string;
};

export interface TitledDescription {
  title: string;
  description?: string;
}
export type EPObjects = {
  availableHours?: number;
  playerType?: TitledDescription;
};

export type HasuraEPObjects = {
  availableHours?: number;
  playerType?: TitledDescription;
  colorMask?: number;
};
export type CeramicEPObjects = EPObjects & {
  colorDisposition?: string;
};

export type HasuraProfileProps = HasuraBPImages &
  HasuraBPStrings &
  HasuraEPImages &
  HasuraEPStrings &
  HasuraEPObjects & { playerId?: string };

export type CeramicBPImages = {
  -readonly [key in Values<typeof BasicProfileImages>]?: ImageSources;
};
export type CeramicBPStrings = {
  -readonly [key in Values<typeof BasicProfileStrings>]?: string;
};
export type CeramicEPImages = {
  -readonly [key in Values<typeof ExtendedProfileImages>]?: ImageSources;
};
export type CeramicEPStrings = {
  -readonly [key in Values<typeof ExtendedProfileStrings>]?: string;
};

export type ExtendedProfile = CeramicEPImages &
  CeramicEPStrings &
  CeramicEPObjects;

export type ProfileProps = CeramicBPImages &
  HasuraBPImages &
  CeramicBPStrings &
  HasuraBPStrings &
  CeramicEPImages &
  HasuraEPImages &
  HasuraEPStrings &
  CeramicEPStrings &
  HasuraEPObjects &
  CeramicEPObjects & { playerId?: string };

export const Images = {
  ...BasicProfileImages,
  ...ExtendedProfileImages,
} as const;
export const Strings = {
  ...BasicProfileStrings,
  ...ExtendedProfileStrings,
} as const;
