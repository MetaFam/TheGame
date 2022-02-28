import {
  Center,
  Flex,
  MetaTheme,
  multiSelectStyles,
  SelectSearch,
  Spinner,
  Text,
} from '@metafam/ds';
import {
  Skill,
  SkillCategory_Enum,
  useUpdatePlayerSkillsMutation,
} from 'graphql/autogen/types';
import { getSkills } from 'graphql/queries/enums/getSkills';
import { SkillColors } from 'graphql/types';
import { useMounted, useOverridableField, useUser } from 'lib/hooks';
import React, { CSSProperties, useEffect, useMemo, useState } from 'react';
import { CategoryOption, parseSkills, SkillOption } from 'utils/skillHelpers';

import {
  MaybeModalProps,
  WizardPane,
  WizardPaneCallbackProps,
} from './WizardPane';

export type SetupSkillsProps = {
  isEdit?: boolean;
  onClose?: () => void;
};

const styles: typeof multiSelectStyles = {
  ...multiSelectStyles,
  container: (s: CSSProperties) => ({
    ...s,
    width: 'min(95vw, 40rem)',
  }),
  menuList: (s: CSSProperties) => ({
    ...s,
    minHeight: 'min(15rem, 60vh)',
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
    ...multiSelectStyles.groupHeading?.(s, { children }),
    background: SkillColors[children],
  }),
  option: (
    s: CSSProperties,
    { isSelected, isFocused }: { isSelected: boolean; isFocused: boolean },
  ) => ({
    ...s,
    color:
      isSelected || isFocused ? MetaTheme.colors.black : MetaTheme.colors.white,
    background:
      isSelected || isFocused
        ? MetaTheme.colors.blue[50]
        : MetaTheme.colors.dark,
    ':hover, :focus, :active': {
      background: MetaTheme.colors.green[50],
      color: MetaTheme.colors.black,
    },
  }),
};

export const SetupSkills: React.FC<MaybeModalProps> = ({
  onClose,
  buttonLabel,
}) => {
  const field = 'skills';
  const mounted = useMounted();
  const [choices, setChoices] = useState<Array<CategoryOption>>();
  const { user } = useUser();
  const { value: strippedSkills, setter: setValue } = useOverridableField<
    Array<SkillOption>
  >({
    field: 'skills',
    loaded: !!user,
  });
  const modal = !!onClose;
  const [, updateSkills] = useUpdatePlayerSkillsMutation();
  const skills = useMemo(
    () =>
      strippedSkills?.map(
        (skill) =>
          ({
            ...skill,
            get label() {
              return this.name;
            },
            get value() {
              return this.id;
            },
          } as SkillOption),
      ),
    [strippedSkills],
  );

  useEffect(() => {
    if (user && setValue && choices && !skills) {
      if (user.skills.length > 0) {
        const options = choices.map(({ options: opts }) => opts).flat();
        setValue(
          user.skills.map(({ Skill: { id: sid } }) =>
            options.find(({ id: cid }) => sid === cid),
          ),
        );
      }
    }
  }, [choices, setValue, user, skills]);

  useEffect(() => {
    const fetchSkills = async () => {
      const skillChoices = await getSkills();
      setChoices(parseSkills(skillChoices));
    };

    fetchSkills();
  }, []);

  const onSave = async ({
    values: { skills: skillList },
    setStatus,
  }: {
    values: Record<string, unknown>;
    setStatus?: (msg: string) => void;
  }) => {
    setStatus?.('Writing to Hasura…');

    const { error } = await updateSkills({
      skills: (skillList as Array<SkillOption>).map(({ id }) => ({
        skill_id: id,
      })),
    });

    if (error) {
      throw new Error(`Unable to update skills. Error: ${error}`);
    }

    if (setValue) {
      setStatus?.('Setting Local State…');
      setValue(skillList);
    }
  };

  return (
    <WizardPane<Array<SkillOption>>
      {...{ field, onClose, onSave, buttonLabel }}
      title="Skills"
      prompt="What are your super&#xAD;powers?"
      fetching={!user}
      value={skills}
    >
      {({
        register,
        setter,
        current,
      }: WizardPaneCallbackProps<Array<SkillOption>>) => {
        const { ref: registerRef, onChange, ...props } = register(field, {});

        if (choices == null || !mounted) {
          return (
            <Flex>
              <Spinner />
              <Text>Loading Options…</Text>
            </Flex>
          );
        }

        return (
          <Center w="full" align="stretch">
            <SelectSearch
              isMulti
              {...{ styles }}
              onChange={(newValue) => {
                const values = (newValue as unknown) as Array<SkillOption>;
                setter(values);
              }}
              options={choices}
              value={current}
              autoFocus
              closeMenuOnSelect={false}
              placeholder="Add your skills…"
              menuShouldScrollIntoView={true}
              menuPlacement={modal ? 'auto' : 'top'}
              {...props}
            />
          </Center>
        );
      }}
    </WizardPane>
  );
};
