import { PlayerSkillFragmentFragment } from 'graphql/autogen/types';

export type SkillMap = {
  [category: string]: CategoryOption;
};

export type SkillOption = PlayerSkillFragmentFragment & {
  value: string;
  label: string;
};

export type CategoryOption = {
  label: string;
  options: Array<SkillOption>;
};

export const parseSkills = (
  skills: Array<PlayerSkillFragmentFragment>,
): Array<CategoryOption> => {
  const skillsMap: SkillMap = {};
  skills.forEach((skill) => {
    skillsMap[skill.category] ??= {
      label: skill.category,
      options: [],
    };
    skillsMap[skill.category].options?.push({
      get value() {
        return this.id;
      },
      get label() {
        return this.name;
      },
      ...skill,
    });
  });
  return Object.values(skillsMap);
};
