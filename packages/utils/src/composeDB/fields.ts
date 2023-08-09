import { Values } from '../extendedProfileTypes.js';

export const composeDBProfileFieldName = 'name';
export const composeDBProfileFieldDescription = 'description';
export const composeDBProfileFieldFiveColorDisposition = 'fiveColorDisposition';
export const composeDBProfileFieldTimeZone = 'timeZone';
export const composeDBProfileFieldAvailability = 'availabilityHoursPerWeek';
export const composeDBProfileFieldExplorerType = 'explorerType';
export const composeDBProfileFieldUsername = 'username';
export const composeDBProfileFieldPronouns = 'pronouns';
export const composeDBProfileFieldHomepageURL = 'websiteURL';
export const composeDBProfileFieldHomeLocation = 'homeLocation';
export const composeDBProfileFieldEmoji = 'emoji';

// these map to objects in ComposeDB
export const composeDBProfileFieldAvatar = 'avatar';
export const composeDBProfileFieldBackgroundImage = 'backgroundImage';

// TODO use GraphQL tooling to auto-generate these types and more...

export type ComposeDBFieldValue = string | number;

// Hasura to ComposeDB field mapping
export const profileMapping = {
  name: composeDBProfileFieldName,
  description: composeDBProfileFieldDescription,
  location: composeDBProfileFieldHomeLocation,
  emoji: composeDBProfileFieldEmoji,
  profileImageURL: composeDBProfileFieldAvatar,
  website: composeDBProfileFieldHomepageURL,
  pronouns: composeDBProfileFieldPronouns,
  backgroundImageURL: composeDBProfileFieldBackgroundImage,
  username: composeDBProfileFieldUsername,
  availableHours: composeDBProfileFieldAvailability,
  timeZone: composeDBProfileFieldTimeZone,
  colorMask: composeDBProfileFieldFiveColorDisposition,
  explorerTypeTitle: composeDBProfileFieldExplorerType,
} as const;

export type ComposeDBField = Values<typeof profileMapping>;

// export type ComposeDBTimeZoneFullValue = {
//   iana: string;
//   utcOffset?: number;
//   abbreviation?: string;
// };

export type ComposeDBImageMetadata = {
  url: string;
  mimeType: string;
  size?: number;
  width?: number;
  height?: number;
  aspectRatio?: number;
};
export const composeDBImageMetadataFields = [
  'url',
  'mimeType',
  'size',
  'width',
  'height',
  'aspectRatio',
];

// export type ComposeDBImageFullValue = {
//   original: ComposeDBImageMetadata;
//   alternatives?: ComposeDBImageMetadata[];
// };

export type ComposeDBProfile = {
  [composeDBProfileFieldName]?: string;
  [composeDBProfileFieldDescription]?: string;
  [composeDBProfileFieldFiveColorDisposition]?: string;
  [composeDBProfileFieldTimeZone]?: string;
  [composeDBProfileFieldAvailability]?: number;
  [composeDBProfileFieldExplorerType]?: string;
  [composeDBProfileFieldUsername]?: string;
  [composeDBProfileFieldPronouns]?: string;
  [composeDBProfileFieldHomepageURL]?: string;
  [composeDBProfileFieldHomeLocation]?: string;
  [composeDBProfileFieldEmoji]?: string;

  [composeDBProfileFieldAvatar]?: ComposeDBImageMetadata;
  [composeDBProfileFieldBackgroundImage]?: ComposeDBImageMetadata;
};

export type ComposeDBPayloadValue = Values<ComposeDBProfile>;

export const composeDBImageFields = [
  composeDBProfileFieldAvatar,
  composeDBProfileFieldBackgroundImage,
] as const;

export type ComposeDBImageFieldKeys = typeof composeDBImageFields[number];

export const hasuraImageFields = [
  'profileImageURL',
  'backgroundImageURL',
] as const;

export type HasuraImageFieldKey = typeof hasuraImageFields[number];
