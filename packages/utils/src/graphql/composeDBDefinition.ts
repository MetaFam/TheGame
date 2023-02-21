/* eslint-disable */

// This is an auto-generated file, do not edit manually
import type { RuntimeCompositeDefinition } from '@composedb/types';
export const definition: RuntimeCompositeDefinition = {
  models: {
    Profile: {
      id: 'kjzl6hvfrbw6c5mo6czalm1f1tflwwwn7u8ktii9w30hcut5d53nfztpg0vvhy3',
      accountRelation: { type: 'single' },
    },
  },
  objects: {
    ProfileImageMetadata: {
      url: { type: 'string', required: true },
      size: { type: 'integer', required: false },
      width: { type: 'integer', required: false },
      height: { type: 'integer', required: false },
      mimeType: { type: 'string', required: true },
      aspectRatio: { type: 'float', required: false },
    },
    Profile: {
      name: { type: 'string', required: false },
      emoji: { type: 'string', required: false },
      avatar: {
        type: 'reference',
        refType: 'object',
        refName: 'ProfileImageMetadata',
        required: false,
      },
      pronouns: { type: 'string', required: false },
      timeZone: { type: 'string', required: false },
      username: { type: 'string', required: false },
      websiteURL: { type: 'string', required: false },
      description: { type: 'string', required: false },
      explorerType: { type: 'string', required: false },
      homeLocation: { type: 'string', required: false },
      backgroundImage: {
        type: 'reference',
        refType: 'object',
        refName: 'ProfileImageMetadata',
        required: false,
      },
      fiveColorDisposition: { type: 'string', required: false },
      availabilityHoursPerWeek: { type: 'integer', required: false },
    },
  },
  enums: {},
  accountData: { profile: { type: 'node', name: 'Profile' } },
};
