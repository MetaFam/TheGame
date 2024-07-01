// This is an auto-generated file, do not edit manually
import type { RuntimeCompositeDefinition } from '@composedb/types';

export const definition: RuntimeCompositeDefinition = {
  models: {
    Profile: {
      interface: false,
      implements: [],
      id: 'kjzl6hvfrbw6ca1wht224t9yd4383ipvpmownby69gx7bvwhya9ojnewswteyo6',
      accountRelation: { type: 'single' },
    },
  },
  objects: {
    Profile: {
      mbti: { type: 'string', required: false, immutable: false },
      name: { type: 'string', required: false, immutable: false },
      emoji: { type: 'string', required: false, immutable: false },
      avatar: {
        type: 'reference',
        refType: 'object',
        refName: 'ProfileImageMetadata',
        required: false,
        immutable: false,
      },
      pronouns: { type: 'string', required: false, immutable: false },
      timeZone: { type: 'string', required: false, immutable: false },
      username: { type: 'string', required: false, immutable: false },
      enneagram: { type: 'string', required: false, immutable: false },
      websiteURL: { type: 'string', required: false, immutable: false },
      description: { type: 'string', required: false, immutable: false },
      explorerType: { type: 'string', required: false, immutable: false },
      homeLocation: { type: 'string', required: false, immutable: false },
      backgroundImage: {
        type: 'reference',
        refType: 'object',
        refName: 'ProfileImageMetadata',
        required: false,
        immutable: false,
      },
      fiveColorDisposition: {
        type: 'string',
        required: false,
        immutable: false,
      },
      availabilityHoursPerWeek: {
        type: 'integer',
        required: false,
        immutable: false,
      },
    },
    ProfileImageMetadata: {
      url: { type: 'string', required: true, immutable: false },
      size: { type: 'integer', required: false, immutable: false },
      width: { type: 'integer', required: false, immutable: false },
      height: { type: 'integer', required: false, immutable: false },
      mimeType: { type: 'string', required: true, immutable: false },
      aspectRatio: { type: 'float', required: false, immutable: false },
    },
  },
  enums: {},
  accountData: { profile: { type: 'node', name: 'Profile' } },
};
