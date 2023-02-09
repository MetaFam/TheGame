import { Values } from './extendedProfileTypes';

export const composeDBProfileFieldName = 'name';
export const composeDBProfileFieldDescription = 'description';
export const composeDBProfileFieldFiveColorDisposition = 'fiveColorDisposition';
export const composeDBProfileFieldTimeZone = 'iana';
export const composeDBProfileFieldAvailability = 'weeklyHours';
export const composeDBProfileFieldExplorerType = 'explorerType';
export const composeDBProfileFieldUsername = 'username';
export const composeDBProfileFieldPronouns = 'pronouns';
export const composeDBProfileFieldHomepageURL = 'url';
export const composeDBProfileFieldHomeLocation = 'homeLocation';
export const composeDBProfileFieldEmoji = 'emoji';

export const composeDBProfileFieldAvatarImageURL = 'url';
export const composeDBProfileFieldBackgroundImageURL = 'url';

// TODO use GraphQL tooling to auto-generate these types and more...

export type ComposeDBFieldValue = string | number;

// Hasura to ComposeDB field mapping
export const ProfileMapping = {
  name: composeDBProfileFieldName,
  description: composeDBProfileFieldDescription,
  location: composeDBProfileFieldHomeLocation,
  emoji: composeDBProfileFieldEmoji,
  profileImageURL: composeDBProfileFieldAvatarImageURL,
  website: composeDBProfileFieldHomepageURL,
  pronouns: composeDBProfileFieldPronouns,
  backgroundImageURL: composeDBProfileFieldBackgroundImageURL,
  username: composeDBProfileFieldUsername,
  availableHours: composeDBProfileFieldAvailability,
  timeZone: composeDBProfileFieldTimeZone,
  colorMask: composeDBProfileFieldFiveColorDisposition,
  explorerTypeTitle: composeDBProfileFieldExplorerType,
} as const;

export type ComposeDBField =
  | Values<typeof ProfileMapping>
  | keyof ComposeDBImageFullValue;

export type ComposeDBTimeZoneFullValue = {
  iana: string;
  utcOffset?: number;
  abbreviation?: string;
};

export type ComposeDBImageMetadata = {
  url: string;
  mimeType: string;
  size?: number;
  width?: number;
  height?: number;
  aspectRatio?: number;
};

export type ComposeDBImageFullValue = {
  original: ComposeDBImageMetadata;
  alternatives?: ComposeDBImageMetadata[];
};

export type ComposeDBPayload = {
  [composeDBProfileFieldName]?: string;
  [composeDBProfileFieldDescription]?: string;
  [composeDBProfileFieldHomeLocation]?: string;
  [composeDBProfileFieldEmoji]?: string;
  [composeDBProfileFieldAvatarImageURL]?: string;
  [composeDBProfileFieldPronouns]?: string;
  [composeDBProfileFieldFiveColorDisposition]?: string;
  [composeDBProfileFieldTimeZone]?: ComposeDBTimeZoneFullValue;
  [composeDBProfileFieldAvailability]?: number;
  [composeDBProfileFieldExplorerType]?: string;
};

export type ComposeDBPayloadValue = Values<ComposeDBPayload>;
