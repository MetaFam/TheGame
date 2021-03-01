import {
  PersonalityParts, PersonalityTypes,
} from 'graphql/types';

export const getPersonalityParts = (
  () => Object.values(PersonalityParts)
);

export const getPersonalityTypes = (
  () => Object.values(PersonalityTypes)
);
