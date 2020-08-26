import { Skill } from 'graphql/getSkills';

export type CategoryMap = {
  [key: string]: Skill[];
};

export const parseSkills = (skills: Skill[]): CategoryMap => {
  const categoriesMap: CategoryMap = {};
  for (const skill of skills) {
    if (!(skill.category in categoriesMap)) {
      categoriesMap[skill.category] = [];
    }
    categoriesMap[skill.category].push(skill);
  }
  return categoriesMap;
};

