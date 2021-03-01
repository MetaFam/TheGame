import { PersonalityParts } from 'graphql/types';

export const getPersonalityParts = (
  () => Object.values(PersonalityParts)
);
