import {
  MetaButton,
  MetaHeading,
  MetaTheme,
  SelectSearch,
  selectStyles,
  useToast,
} from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { useSetupFlow } from 'contexts/SetupContext';
import { SkillCategory_Enum, useUpdatePlayerSkillsMutation } from 'graphql/autogen/types';
import { SkillColors } from 'graphql/types';
import { useUser } from 'lib/hooks';
import React from 'react';
import { SkillOption } from 'utils/skillHelpers';

export const SetupSkills: React.FC = () => {
  const {
    skillsList,
    skills,
    setSkills,
    onNextPress,
    nextButtonLabel,
  } = useSetupFlow();
  const { user } = useUser({ redirectTo: '/' });
  const toast = useToast();
  
  const [updateSkillsRes, updateSkills] = useUpdatePlayerSkillsMutation();

  const handleNextPress = async () => {
    if (!user) return;

    const { error } = await updateSkills({
      skills: skills.map((s) => ({ skill_id: s.id })),
    });

    if (error) {
      toast({
        title: 'Error',
        description: 'Unable to update player skills. The octo is sad 😢',
        status: 'error',
        isClosable: true,
      });
      return;
    }

    onNextPress();
  };


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
    <FlexContainer>
      <MetaHeading mb={10} mt={-64} textAlign="center">
        What are your superpowers?
      </MetaHeading>
      <FlexContainer w="100%" align="stretch" maxW="50rem">
        <SelectSearch
          isMulti
          styles={styles}
          value={skills}
          onChange={(value) => setSkills(value as Array<SkillOption>)}
          options={skillsList}
          autoFocus
          closeMenuOnSelect={false}
          placeholder="ADD YOUR SKILLS"
        />
      </FlexContainer>
      <MetaButton 
        onClick={handleNextPress} 
        mt={10}
        isLoading={updateSkillsRes.fetching}
        loadingText="Saving"
      >
        {nextButtonLabel}
      </MetaButton>
    </FlexContainer>
  );
};
