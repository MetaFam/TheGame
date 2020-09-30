import { MetaHeading, SelectSearch } from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { SetupContext } from 'contexts/SetupContext';
import React, { useContext } from 'react';
import { SkillOption } from 'utils/skillHelpers';

export const SetupSkills: React.FC = () => {
  const { skillsList, skills, setSkills } = useContext(SetupContext);

  return (
    <FlexContainer mb={10} align="stretch">
      <MetaHeading mb={10}>What are your superpowers?</MetaHeading>
      <SelectSearch
        isMulti
        value={skills}
        onChange={(value) => setSkills(value as Array<SkillOption>)}
        options={skillsList}
        placeholder="ADD YOUR SKILLS"
      />
    </FlexContainer>
  );
};
