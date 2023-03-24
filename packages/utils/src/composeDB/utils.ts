import { maskFor } from '../colorHelpers.js';
import {
  ComposeDBField,
  composeDBImageFields,
  ComposeDBImageMetadata,
  ComposeDBPayloadValue,
  ComposeDBProfile,
  composeDBProfileFieldFiveColorDisposition,
  hasuraImageFields,
  profileMapping,
} from './fields.js';

// typesafe Array.includes, see https://fettblog.eu/typescript-array-includes/
function includes<T extends U, U>(coll: ReadonlyArray<T>, el: U): el is T {
  return coll.includes(el as T);
}

export function isComposeDBImageField(key: string) {
  return includes(composeDBImageFields, key);
}

export function isHasuraImageField(key: string) {
  return includes(hasuraImageFields, key);
}

export function isImageMetadata(value: ComposeDBPayloadValue) {
  const maybeImageMetadata = value as ComposeDBImageMetadata;
  return (
    maybeImageMetadata?.url != null && maybeImageMetadata?.mimeType != null
  );
}

export const composeDBToHasuraProfile = (
  composeDBProfile: ComposeDBProfile,
) => {
  // todo we should be able to make this typesafe
  const hasuraProfile: Record<string, unknown> = {};

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
    } else if (value && isComposeDBImageField(key)) {
      hasuraValue = (value as ComposeDBImageMetadata).url;
    }
    hasuraProfile[hasuraKey] = hasuraValue;
  });
  return hasuraProfile;
};
