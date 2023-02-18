import {
  composeDBImageMetadataFields,
  isComposeDBImageField,
  profileMapping,
} from '@metafam/utils';

export const buildPlayerProfileQuery = (profileNodeId: string) => {
  const fields = Object.values(profileMapping).map((f) => {
    if (isComposeDBImageField(f)) {
      return `${f} {
        ${composeDBImageMetadataFields.join('\n')}
      }\n`;
    }
    return `${f}\n`;
  });
  return `
    query {
      node(id: "${profileNodeId}") {
        ... on Profile {
          ${fields}
        }
      }
    }
  `;
};
