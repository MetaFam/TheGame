import { maskFor } from './colorHelpers.js';
import { Values } from './extendedProfileTypes.js';

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

// these are sub-fields
export const composeDBProfileFieldAvatarImageURL = 'url';
export const composeDBProfileFieldBackgroundImageURL = 'url';

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
];

export const composeDBToHasuraProfile = (
  composeDBProfile: ComposeDBProfile,
) => {
  // todo we should be able to make this typesafe
  const hasuraProfile: Record<string, unknown> = {};
  // eslint-disable-next-line no-restricted-syntax
  Object.entries(composeDBProfile).forEach(([key, value]) => {
    const match = Object.entries(profileMapping).find(
      ([, composeDBKey]) => composeDBKey === key,
    ) as [keyof typeof profileMapping, ComposeDBField];

    const hasuraKey = match[0];

    // Some fields required custom translations
    let hasuraValue = value;
    if (value && key === composeDBProfileFieldFiveColorDisposition) {
      const maskNumber = maskFor(value as string);
      if (maskNumber != null) {
        hasuraValue = maskNumber;
      }
    } else if (value && composeDBImageFields.includes(key)) {
      hasuraValue = (value as ComposeDBImageMetadata).url;
    }
    hasuraProfile[hasuraKey] = hasuraValue;
  });
  return hasuraProfile;
};
