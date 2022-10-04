import { BasicProfile, ImageSources } from '@datamodels/identity-profile-basic';

export type Maybe<T> = T | null;
export type Values<T> = T[keyof T];
export type Optional<T> = T | undefined;

export { BasicProfile };

// The format of these object literals is:
// <hasura key>: <ceramic key>
//
// Adding a new profile field would consist of
// adding a new entry to the appropriate one of
// these types, and then adding the appropriate
// field to packages/utils/schema/extended-profile.json5.
//
// The script packages/utils/bin/create-model.mjs
// would need to be updated to update the document
// type rather than overwrite it, or existing profile
// definitions would get lost.
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
  // B/c of the difficulty determining whether it is
  // daylight savings in a particular zone, only the
  // name is saved & the details are retrieved from
  // a library.
  timeZone: 'timeZone',
  explorerTypeTitle: 'explorerType',
  meetWithWalletDomain: 'meetWithWalletDomain',
} as const;
// Objects are handled specially in the save function.
// There is a switch on the key and specific code for
// setting each value.
export const ExtendedProfileObjects = {
  availableHours: 'availableHours',
  colorMask: 'magicDisposition',
} as const;
export const ExtendedProfileFields = {
  ...ExtendedProfileImages,
  ...ExtendedProfileStrings,
  ...ExtendedProfileObjects,
} as const;

export const StringProfileFields = {
  ...BasicProfileStrings,
  ...ExtendedProfileStrings,
} as const;

export const AllProfileFields = {
  ...BasicProfileFields,
  ...ExtendedProfileFields,
} as const;

export const ReversedProfileFields = Object.fromEntries(
  Object.entries(AllProfileFields).map(([k, v]) => [v, k]),
);

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

export type PlayerAccount = {
  identifier: string;
  playerId: string;
  type: string;
};

export type EPObjects = {
  availableHours?: Maybe<number>;
  playerType?: Maybe<TitledDescription>;
  accounts?: Maybe<PlayerAccount>;
};

export type HasuraEPObjects = EPObjects & {
  colorMask?: Maybe<number>;
};
export type CeramicEPObjects = EPObjects & {
  magicDisposition?: Maybe<string>;
};

export type HasuraStringProps = HasuraBPStrings & HasuraEPStrings;
export type HasuraImageSourcedProps = {
  -readonly [key in keyof typeof BasicProfileImages]?: Maybe<ImageSources>;
} & {
  -readonly [key in keyof typeof ExtendedProfileImages]?: Maybe<ImageSources>;
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

export type CeramicProfileProps = BasicProfile & ExtendedProfile;

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
