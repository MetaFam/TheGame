import { Skill } from 'graphql/getSkills';

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
  for (const skill of skills) {
    if (!(skill.category in skillsMap)) {
      skillsMap[skill.category] = {
        label: skill.category,
        options: [],
      };
    }
    skillsMap[skill.category].options?.push({
      value: skill.id,
      label: skill.name,
      ...skill,
    });
  }
  return Object.values(skillsMap);
};
