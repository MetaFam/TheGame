import { PlayerSkillFragment } from 'graphql/autogen/types';

export type SkillMap = {
  [category: string]: CategoryOption;
};

export type SkillOption = PlayerSkillFragment & {
  value: string;
  label: string;
};

export type CategoryOption = {
  label: string;
  options: Array<SkillOption>;
};

export const parseSkills = (
  skills: Array<PlayerSkillFragment>,
): Array<CategoryOption> => {
  const skillsMap: SkillMap = {};

  skills.forEach((skill) => {
    const { category } = skill;
    const categoryOptions = skillsMap[category] || {
      label: category,
      options: [],
    };

    categoryOptions.options?.push({
      ...skill,
      value: skill.id,
      label: skill.name,
    });

    skillsMap[category] = categoryOptions;
  });

  return Object.values(skillsMap);
};
