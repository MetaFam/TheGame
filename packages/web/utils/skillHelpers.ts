import { PlayerSkillFragment } from '../graphql/autogen/types';

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
  });
  return Object.values(skillsMap);
};

export type TimeZoneOption = {
  value: string;
  label: string;
};
