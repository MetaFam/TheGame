import {
  composeDBImageFields,
  composeDBImageMetadataFields,
  profileMapping,
} from '@metafam/utils';

export const queryPlayerProfile = (profileNodeId: string) => {
  const fields = Object.values(profileMapping).map((f) => {
    if (composeDBImageFields.includes(f)) {
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
