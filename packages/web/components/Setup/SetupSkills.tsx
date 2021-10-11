import {
  Button,
  MetaButton,
  MetaHeading,
  MetaTheme,
  ModalFooter,
  SelectSearch,
  selectStyles,
  useToast,
} from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { useSetupFlow } from 'contexts/SetupContext';
import {
  SkillCategory_Enum,
  useUpdatePlayerSkillsMutation,
} from 'graphql/autogen/types';
import { getSkills } from 'graphql/getSkills';
import { SkillColors } from 'graphql/types';
import { useUser } from 'lib/hooks';
import React, { useEffect, useState } from 'react';
import { CategoryOption, parseSkills, SkillOption } from 'utils/skillHelpers';

export type SetupSkillsProps = {
  isEdit?: boolean;
  onClose?: () => void;
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
  groupHeading: (s, { children }) => ({
    ...s,
    ...(selectStyles.groupHeading &&
      selectStyles.groupHeading(s, { children })),
    background: SkillColors[children as SkillCategory_Enum],
  }),
};

export const SetupSkills: React.FC<SetupSkillsProps> = ({
  isEdit,
  onClose,
}) => {
  const { onNextPress, nextButtonLabel } = useSetupFlow();
  const { user } = useUser();
  const toast = useToast();
  const [skillChoices, setSkillChoices] = useState<CategoryOption[]>([]);
  const [updateSkillsRes, updateSkills] = useUpdatePlayerSkillsMutation();
  const [loading, setLoading] = useState(false);
  const [playerSkills, setPlayerSkills] = useState<Array<SkillOption>>([]);
  const isWizard = !isEdit;

  if (user?.player) {
    const { player } = user;
    if (
      player.skills &&
      player.skills.length > 0 &&
      playerSkills.length === 0
    ) {
      setPlayerSkills(
        player.skills.map((s) => ({
          value: s.Skill.id,
          label: s.Skill.name,
          ...s.Skill,
        })),
      );
    }
  }

  useEffect(() => {
    async function fetchMyAPI() {
      const skills = await getSkills();
      setSkillChoices(parseSkills(skills));
    }

    fetchMyAPI();
  }, []);

  const handleNextPress = async () => {
    setLoading(true);

    save();

    onNextPress();
  };

  const save = async () => {
    if (!user) return;

    setLoading(true);
    const { error } = await updateSkills({
      skills: playerSkills.map((s) => ({ skill_id: s.id })),
    });

    if (error) {
      console.warn(error); // eslint-disable-line no-console
      toast({
        title: 'Error',
        description: 'Unable to update player skills. The octo is sad 😢',
        status: 'error',
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <FlexContainer>
      {isWizard && (
        <MetaHeading mb={5} textAlign="center">
          What are your super&#xAD;powers?
        </MetaHeading>
      )}
      <FlexContainer w="100%" align="stretch" maxW="50rem">
        <SelectSearch
          isMulti
          styles={styles}
          value={playerSkills}
          onChange={(value) => setPlayerSkills(value as Array<SkillOption>)}
          options={skillChoices}
          autoFocus
          closeMenuOnSelect={false}
          placeholder="ADD YOUR SKILLS"
        />
      </FlexContainer>
      {isEdit && (
        <ModalFooter mt={6}>
          <Button colorScheme="blue" mr={3} onClick={save}>
            Save Changes
          </Button>
          <Button
            variant="ghost"
            onClick={onClose}
            color="white"
            _hover={{ bg: 'none' }}
          >
            Close
          </Button>
        </ModalFooter>
      )}

      {isWizard && (
        <MetaButton
          onClick={handleNextPress}
          mt={10}
          isLoading={updateSkillsRes.fetching || loading}
          loadingText="Saving"
        >
          {nextButtonLabel}
        </MetaButton>
      )}
    </FlexContainer>
  );
};
