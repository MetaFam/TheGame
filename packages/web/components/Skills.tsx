import {
  MetaTag,
  MetaTheme,
  SelectSearch,
  selectStyles,
  Tooltip,
  Wrap,
  WrapItem,
} from '@metafam/ds';
import { Skill, SkillCategory_Enum } from 'graphql/autogen/types';
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
    groupHeading: (s, { children }) => ({
      ...s,
      ...(selectStyles.groupHeading &&
        selectStyles.groupHeading(s, { children })),
      background: SkillColors[children as SkillCategory_Enum],
    }),
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

interface SkillsProps {
  skills: Skill[];
  maxSkills?: number;
}
export const SkillsTags: React.FC<SkillsProps> = ({
  maxSkills = 4,
  skills,
}) => (
  <Wrap>
    {skills.slice(0, maxSkills).map((skill) => (
      <WrapItem key={skill.id}>
        <Tooltip label={skill.category}>
          <MetaTag
            size="md"
            fontWeight="normal"
            backgroundColor={SkillColors[skill.category]}
          >
            {skill.name}
          </MetaTag>
        </Tooltip>
      </WrapItem>
    ))}
    {skills.length > maxSkills && (
      <WrapItem>
        <MetaTag size="md" fontWeight="normal">
          {`+${skills.length - maxSkills}`}
        </MetaTag>
      </WrapItem>
    )}
  </Wrap>
);
