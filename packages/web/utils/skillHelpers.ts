import { Skill } from 'graphql/types';

export type SkillMap = {
  [category: string]: CategoryOption;
};

export type SkillOption = Skill & {
  value: string;
  label: string;
};

export type CategoryOption = {
  label: string;
  options: Array<SkillOption>;
};

export const parseSkills = (skills: Array<Skill>): Array<CategoryOption> => {
  const skillsMap: SkillMap = {};
  skills.map((skill) => {
    if (!(skill.category in skillsMap)) {
      skillsMap[skill.category] = {
        label: skill.category,
        options: [],
      };
    }
    return skillsMap[skill.category].options?.push({
      value: skill.id,
      label: skill.name,
      ...skill,
    });
  });
  return Object.values(skillsMap);
};
