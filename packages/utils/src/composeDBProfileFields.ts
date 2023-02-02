import { Values } from './extendedProfileTypes';

export const composeDBProfileFieldName = 'name';
export const composeDBProfileFieldDescription = 'description';
export const composeDBProfileFieldFiveColorDisposition = 'fiveColorDisposition';
export const composeDBProfileFieldTimeZone = 'iana';

export type ComposeDBFieldValue = string | number;

export const ProfileMapping = {
  name: composeDBProfileFieldName,
  description: composeDBProfileFieldDescription,
  colorMask: composeDBProfileFieldFiveColorDisposition,
  timeZone: composeDBProfileFieldTimeZone,
} as const;

export type ComposeDBField = Values<typeof ProfileMapping>;

export type ComposeDBTimeZoneFullValue = {
  iana: string;
  utcOffset?: number;
  abbreviation?: string;
};

export type ComposeDBProfileFieldMutationValue = ComposeDBField &
  ComposeDBTimeZoneFullValue;
