import { MetaButton, MetaHeading, SelectSearch } from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { SetupContext } from 'contexts/SetupContext';
import React, { useContext } from 'react';
import { SkillOption } from 'utils/skillHelpers';

export const SetupSkills: React.FC = () => {
  const {
    skillsList,
    skills,
    setSkills,
    onNextPress,
    nextButtonLabel,
  } = useContext(SetupContext);

  return (
    <FlexContainer>
      <MetaHeading mb={10} textAlign="center">
        What are your superpowers?
      </MetaHeading>
      <FlexContainer w="100%" align="stretch">
        <SelectSearch
          isMulti
          value={skills}
          onChange={(value) => setSkills(value as Array<SkillOption>)}
          options={skillsList}
          placeholder="ADD YOUR SKILLS"
        />
      </FlexContainer>
      <MetaButton onClick={onNextPress} mt={10}>
        {nextButtonLabel}
      </MetaButton>
    </FlexContainer>
  );
};
