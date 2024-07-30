import {
  LabeledOptions,
  MetaTag,
  MetaTheme,
  SelectSearch,
  selectStyles,
  Tooltip,
  Wrap,
  WrapItem,
} from '@metafam/ds';

import { Skill, SkillCategory_Enum } from '#graphql/autogen/hasura-sdk';
import { SkillColors } from '#graphql/types';
import type { CategoryOption, SkillOption } from '#utils/skillHelpers';

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
      background:
        SkillColors[(data as SkillOption).category as SkillCategory_Enum],
      color: MetaTheme.colors.white,
    }),
    multiValueLabel: (s, { data }) => ({
      ...s,
      background:
        SkillColors[(data as SkillOption).category as SkillCategory_Enum],
      color: MetaTheme.colors.white,
    }),
    groupHeading: (s, props) => ({
      ...s,
      ...selectStyles.groupHeading?.(s, props),
      background: SkillColors[props.children as SkillCategory_Enum],
    }),
  };

  return (
    <SelectSearch
      menuPlacement="top"
      isMulti
      {...{ styles }}
      value={skills}
      onChange={(value) => setSkills(value as Array<SkillOption>)}
      options={skillChoices as LabeledOptions<string>[]}
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
  maxSkills = 5,
  skills,
}) => {
  /**
   * If there are more skills than maxSkills, collect the
   * extra skills in a string to show in a tooltip
   * moreSkills will be an empty string if skills.length is not greater than maxSkills
   */
  const moreSkills: string = Array.from(skills.values())
    .slice(maxSkills)
    .map((skill) => skill.name)
    .join(', ');

  return (
    <Wrap>
      {/* Print a limited number of skills as tags/chips */}
      {skills.slice(0, maxSkills).map((skill) => (
        <WrapItem key={skill.id} zIndex={10}>
          {/* zIndex so the tooltip is lifted above the LinkOverlay that makes the whole tile a click target */}
          <Tooltip label={skill.category}>
            <MetaTag
              size="md"
              borderRadius={4}
              fontWeight="normal"
              backgroundColor={SkillColors[skill.category]}
            >
              {skill.name}
            </MetaTag>
          </Tooltip>
        </WrapItem>
      ))}
      {skills.length > maxSkills && (
        <>
          {/**
           * Print a tag/chip that shows how many more skills are associated with the quest, with a tooltip that shows those extra skill names on hover
           */}
          <WrapItem zIndex={10}>
            <Tooltip label={moreSkills}>
              <MetaTag size="md" fontWeight="normal" borderRadius={4}>
                {`+${skills.length - maxSkills}`}
              </MetaTag>
            </Tooltip>
          </WrapItem>
        </>
      )}
    </Wrap>
  );
};

export const SkillsTagsAll: React.FC<SkillsProps> = ({ skills }) => (
  <Wrap>
    {skills.map((skill) => (
      <WrapItem key={skill.id}>
        <Tooltip label={skill.category}>
          <MetaTag
            size="md"
            borderRadius={4}
            fontWeight="normal"
            backgroundColor={SkillColors[skill.category]}
          >
            {skill.name}
          </MetaTag>
        </Tooltip>
      </WrapItem>
    ))}
  </Wrap>
);
