import { Values } from './extendedProfileTypes';

export const composeDBProfileFieldName = 'name';
export const composeDBProfileFieldDescription = 'description';
export const composeDBProfileFieldFiveColorDisposition = 'fiveColorDisposition';
export const composeDBProfileFieldTimeZone = 'iana';
export const composeDBProfileFieldAvailability = 'weeklyHours';
export const composeDBProfileFieldExplorerType = 'explorerType';

export type ComposeDBFieldValue = string | number;

// Hasura to ComposeDB field mapping
export const ProfileMapping = {
  name: composeDBProfileFieldName,
  description: composeDBProfileFieldDescription,
  colorMask: composeDBProfileFieldFiveColorDisposition,
  timeZone: composeDBProfileFieldTimeZone,
  availableHours: composeDBProfileFieldAvailability,
  explorerType: composeDBProfileFieldExplorerType,
} as const;

export type ComposeDBField = Values<typeof ProfileMapping>;

export type ComposeDBTimeZoneFullValue = {
  iana: string;
  utcOffset?: number;
  abbreviation?: string;
};

export type ComposeDBPayload = {
  [composeDBProfileFieldName]?: string;
  [composeDBProfileFieldDescription]?: string;
  [composeDBProfileFieldFiveColorDisposition]?: string;
  [composeDBProfileFieldTimeZone]?: ComposeDBTimeZoneFullValue;
  [composeDBProfileFieldAvailability]?: number;
  [composeDBProfileFieldExplorerType]?: string;
};

export type ComposeDBPayloadValue = Values<ComposeDBPayload>;
