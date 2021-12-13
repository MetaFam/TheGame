import {
  Button,
  MetaButton,
  MetaHeading,
  MetaTheme,
  ModalFooter,
  searchSelectStyles,
  SelectSearch,
  useToast,
} from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { useSetupFlow } from 'contexts/SetupContext';
import {
  SkillCategory_Enum,
  useUpdatePlayerSkillsMutation,
} from 'graphql/autogen/types';
import { getSkills } from 'graphql/queries/enums/getSkills';
import { SkillColors } from 'graphql/types';
import { useUser } from 'lib/hooks';
import React, { useEffect, useState } from 'react';
import { CategoryOption, parseSkills, SkillOption } from 'utils/skillHelpers';

export type SetupSkillsProps = {
  isEdit?: boolean;
  onClose?: () => void;
};

const styles: typeof searchSelectStyles = {
  ...searchSelectStyles,
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
    ...searchSelectStyles.groupHeading?.(s, { children }),
    background: SkillColors[children as SkillCategory_Enum],
  }),
  option: (s, { isSelected, isFocused }) => ({
    ...s,
    color:
      isSelected || isFocused ? MetaTheme.colors.black : MetaTheme.colors.white,
    '&:hover': {
      background: MetaTheme.colors.green[50],
      color: MetaTheme.colors.black,
    },
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
  const { player } = user ?? {};

  useEffect(() => {
    if (player) {
      if (
        player.skills &&
        player.skills.length > 0 &&
        playerSkills.length === 0
      ) {
        setPlayerSkills(
          player.skills.map(({ Skill: skill }) => ({
            value: skill.id,
            label: skill.name,
            ...skill,
          })),
        );
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const fetchMyAPI = async () => {
      const skills = await getSkills();
      setSkillChoices(parseSkills(skills));
    };

    fetchMyAPI();
  }, []);

  const handleNextPress = async () => {
    setLoading(true);
    await save();
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
        title: 'Update Error',
        description: `Unable to update skills. Error: ${error}`,
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
          placeholder="Add Your Skills…"
        />
      </FlexContainer>
      {isEdit && onClose && (
        <ModalFooter mt={6}>
          <MetaButton
            mr={3}
            onClick={() => {
              save();
              onClose();
            }}
          >
            Save Changes
          </MetaButton>
          <Button
            variant="ghost"
            onClick={onClose}
            color="white"
            _hover={{
              bg: '#FFFFFF11',
            }}
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
          loadingText="Saving…"
        >
          {nextButtonLabel}
        </MetaButton>
      )}
    </FlexContainer>
  );
};
