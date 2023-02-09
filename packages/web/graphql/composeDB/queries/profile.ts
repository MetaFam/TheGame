import {
  composeDBProfileFieldAvailability,
  composeDBProfileFieldDescription,
  composeDBProfileFieldEmoji,
  composeDBProfileFieldFiveColorDisposition,
  composeDBProfileFieldHomeLocation,
  composeDBProfileFieldHomepageURL,
  composeDBProfileFieldName,
  composeDBProfileFieldPronouns,
  composeDBProfileFieldTimeZone,
  composeDBProfileFieldUsername,
} from '@metafam/utils';

export const composeDBDocumentProfileName = 'profileNameIndex';
export const composeDBDocumentProfileDescription = 'profileDescriptionIndex';
export const composeDBDocumentProfileDisposition = 'profileDispositionIndex';
export const composeDBDocumentProfileTimeZone = 'profileTimeZoneIndex';
export const composeDBDocumentProfileAvailability = 'profileAvailabilityIndex';

export const composeDBDocumentProfileEmoji = 'profileEmojiIndex';
export const composeDBDocumentProfileAvatar = 'profileAvatarIndex';
export const composeDBDocumentProfileBackground = 'profileBackgroundIndex';
export const composeDBDocumentProfileGenderIdentity =
  'profileGenderIdentityIndex';
export const composeDBDocumentProfileHomepage = 'profileHomepageIndex';
export const composeDBDocumentProfileHomeLocation = 'profileHomeLocationIndex';
export const composeDBDocumentProfileUsername = 'profileUsernameIndex';

// Note that the composeDB client will have a session associated with it
// corresponding to the current user, so this queries the index for that
// user's data

const buildSingleFieldQueryFragment = (model: string, field: string) => {
  return `
    ${model}(first: 1) {
      edges {
        node {
          ${field}
        }
      }
    }`;
};

const buildImageQueryFragment = (model: string) => {
  return `
    ${model}(first:1) {
      edges {
        node {
          original {
            url
            size
            width
            height
            mimeType
            aspectRatio
          }
        }
      }
    }`;
};

export const queryLatestFieldFromModel = (model: string, field: string) => {
  return `
    query {
      ${buildSingleFieldQueryFragment(model, field)}
    }`;
};

export const queryPlayerProfile = `
  query {
    ${buildImageQueryFragment(composeDBDocumentProfileAvatar)}
    ${buildImageQueryFragment(composeDBDocumentProfileBackground)}

    ${buildSingleFieldQueryFragment(
      composeDBDocumentProfileName,
      composeDBProfileFieldName,
    )}
    ${buildSingleFieldQueryFragment(
      composeDBDocumentProfileUsername,
      composeDBProfileFieldUsername,
    )}
    ${buildSingleFieldQueryFragment(
      composeDBDocumentProfileDescription,
      composeDBProfileFieldDescription,
    )}
    ${buildSingleFieldQueryFragment(
      composeDBDocumentProfileTimeZone,
      composeDBProfileFieldTimeZone,
    )}
    ${buildSingleFieldQueryFragment(
      composeDBDocumentProfileAvailability,
      composeDBProfileFieldAvailability,
    )}
    ${buildSingleFieldQueryFragment(
      composeDBDocumentProfileGenderIdentity,
      composeDBProfileFieldPronouns,
    )}
    ${buildSingleFieldQueryFragment(
      composeDBDocumentProfileHomepage,
      composeDBProfileFieldHomepageURL,
    )}
    ${buildSingleFieldQueryFragment(
      composeDBDocumentProfileHomeLocation,
      composeDBProfileFieldHomeLocation,
    )}
    ${buildSingleFieldQueryFragment(
      composeDBDocumentProfileEmoji,
      composeDBProfileFieldEmoji,
    )}

    ${buildSingleFieldQueryFragment(
      composeDBDocumentProfileDisposition,
      composeDBProfileFieldFiveColorDisposition,
    )}
  }
`;
