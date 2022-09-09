import Ajv from 'ajv';

import schema from './schema.json';

const ajv = new Ajv({ allowUnionTypes: true });
const validate = ajv.compile(schema);

export type Metadata = {
  name: string;
  description: string;
  image_url?: string;
  animation_url?: string;
  external_url?: string;
  attributes?: {
    trait_type?: string;
    value: string | number;
    display_type?: 'number' | 'boost_number' | 'boost_percentage';
  }[];
};

export const validateSchema = (metadata: Metadata): boolean =>
  validate(metadata);
