import {
  MetaTheme,
  SelectSearch,
  selectStyles,
} from '@metafam/ds';
import {
  SkillCategory_Enum,
} from 'graphql/autogen/types';
import { SkillColors } from 'graphql/types';
import React from 'react';
import { CategoryOption, SkillOption } from 'utils/skillHelpers';

export type SetupSkillsProps = {
  skillChoices: Array<CategoryOption>;
  skills: Array<SkillOption>;
  setSkills: React.Dispatch<React.SetStateAction<Array<SkillOption>>>;
  placeHolder: string;
  id?: string;
};

export const SkillsSelect: React.FC<SetupSkillsProps> = ({
                                                           skillChoices,
                                                           skills,
                                                           setSkills,
                                                           placeHolder,
                                                           id,
                                                         }) => {

  const styles: typeof selectStyles = {
    ...selectStyles,
    multiValue: (s, { data }) => ({
      ...s,
      background: SkillColors[data.category as SkillCategory_Enum],
      color: MetaTheme.colors.white,
    }),
    multiValueLabel: (s, { data }) => ({
      ...s,
      background: SkillColors[data.category as SkillCategory_Enum],
      color: MetaTheme.colors.white,
    }),
    groupHeading: (s, { children }) => {
      return {
        ...s,
        ...(selectStyles.groupHeading &&
          selectStyles.groupHeading(s, { children })),
        background: SkillColors[children as SkillCategory_Enum],
      };
    },
  };

  return (
    <SelectSearch
      isMulti
      styles={styles}
      value={skills}
      onChange={(value) => setSkills(value as Array<SkillOption>)}
      options={skillChoices}
      autoFocus
      closeMenuOnSelect={false}
      placeholder={placeHolder}
      id={`skills-select-container-${id || ''}`}
      inputId={`skills-select-input-${id || ''}`}
    />
  );
};
