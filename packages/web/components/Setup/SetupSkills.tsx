import {
  Button,
  MetaButton,
  MetaHeading,
  MetaTheme,
  ModalBody,
  ModalFooter,
  searchSelectStyles,
  SelectSearch,
  useToast,
} from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { useSetupFlow } from 'contexts/SetupContext';
import {
  Skill,
  SkillCategory_Enum,
  useUpdatePlayerSkillsMutation,
} from 'graphql/autogen/types';
import { getSkills } from 'graphql/queries/enums/getSkills';
import { SkillColors } from 'graphql/types';
import { useUser } from 'lib/hooks';
import React, { CSSProperties, useCallback, useEffect, useState } from 'react';
import { CategoryOption, parseSkills, SkillOption } from 'utils/skillHelpers';

export type SetupSkillsProps = {
  isEdit?: boolean;
  onClose?: () => void;
};

const styles: typeof searchSelectStyles = {
  ...searchSelectStyles,
  menuList: (s: CSSProperties) => ({
    ...s,
    minHeight: '75vh',
  }),
  multiValue: (s: CSSProperties, { data }: { data: Skill }) => ({
    ...s,
    background: SkillColors[data.category as SkillCategory_Enum],
    color: MetaTheme.colors.white,
  }),
  multiValueLabel: (s: CSSProperties, { data }: { data: Skill }) => ({
    ...s,
    background: SkillColors[data.category as SkillCategory_Enum],
    color: MetaTheme.colors.white,
  }),
  groupHeading: (
    s: CSSProperties,
    { children }: { children: SkillCategory_Enum },
  ) => ({
    ...s,
    ...searchSelectStyles.groupHeading?.(s, { children }),
    background: SkillColors[children],
  }),
  option: (
    s: CSSProperties,
    { isSelected, isFocused }: { isSelected: boolean; isFocused: boolean },
  ) => ({
    ...s,
    color:
      isSelected || isFocused ? MetaTheme.colors.black : MetaTheme.colors.white,
    ':hover': {
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
  const { user } = useUser({ requestPolicy: 'network-only' });
  const toast = useToast();
  const [skillChoices, setSkillChoices] = useState<Array<CategoryOption>>([]);
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
    const fetchSkills = async () => {
      const skills = await getSkills();
      setSkillChoices(parseSkills(skills));
    };

    fetchSkills();
  }, []);

  const save = useCallback(async () => {
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
  }, [user, playerSkills, toast, updateSkills]);

  const handleNextPress = useCallback(async () => {
    setLoading(true);
    await save();
    onNextPress();
  }, [save, onNextPress]);

  const setup = (
    <FlexContainer mb={8}>
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
  return isWizard ? (
    setup
  ) : (
    <>
      <ModalBody> {setup} </ModalBody>
      {isEdit && onClose && (
        <FlexContainer>
          <ModalFooter py={6}>
            <MetaButton
              mr={3}
              isLoading={loading}
              loadingText="Saving…"
              onClick={async () => {
                await save();
                onClose();
              }}
            >
              Save Changes
            </MetaButton>
            <Button
              variant="ghost"
              onClick={onClose}
              color="white"
              _hover={{ bg: '#FFFFFF11' }}
              _active={{ bg: '#FF000011' }}
              disabled={loading}
            >
              Close
            </Button>
          </ModalFooter>
        </FlexContainer>
      )}
    </>
  );
};
