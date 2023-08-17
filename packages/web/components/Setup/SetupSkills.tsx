import {
  Center,
  Flex,
  LabeledOptions,
  MetaTheme,
  multiSelectStyles,
  SelectSearch,
  Spinner,
  Text,
} from '@metafam/ds';
import { Maybe } from '@metafam/utils';
import { useSetupFlow } from 'contexts/SetupContext';
import {
  Player,
  SkillCategory_Enum,
  useUpdatePlayerSkillsMutation,
} from 'graphql/autogen/types';
import { getSkills } from 'graphql/queries/enums/getSkills';
import { SkillColors } from 'graphql/types';
import { useMounted, useUser } from 'lib/hooks';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FormProvider,
  useForm,
  useFormContext,
  UseFormSetValue,
} from 'react-hook-form';
import { CategoryOption, parseSkills, SkillOption } from 'utils/skillHelpers';

import { MaybeModalProps, WizardPane } from './WizardPane';

export type EditSkillsProps = MaybeModalProps & {
  player: Maybe<Player>;
};

const styles: typeof multiSelectStyles = {
  ...multiSelectStyles,
  container: (s) => ({
    ...s,
    width: 'min(95vw, 40rem)',
  }),
  menuList: (s) => ({
    ...s,
    minHeight: 'min(15rem, 60vh)',
  }),
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
    ...multiSelectStyles.groupHeading?.(s, props),
    background: SkillColors[props.children as SkillCategory_Enum],
  }),
  option: (s, { isSelected, isFocused }) => ({
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

const field = 'skills';

export const SetupSkills: React.FC = () => {
  const { user } = useUser();

  return <EditSkills player={user} />;
};

export const EditSkills: React.FC<EditSkillsProps> = ({
  player: user,
  onComplete,
  buttonLabel,
  title = 'Skills',
}) => {
  const { onNextPress } = useSetupFlow();
  const modal = !!onComplete;
  const [, updateSkills] = useUpdatePlayerSkillsMutation();
  const [status, setStatus] = useState<string | undefined>();
  const [choices, setChoices] = useState<CategoryOption[]>();
  const skills = useMemo(
    () =>
      user?.skills?.map(
        (skill) =>
          ({
            ...skill.Skill,
            get label() {
              return this.name;
            },
            get value() {
              return this.id;
            },
          } as SkillOption),
      ),
    [user],
  );

  useEffect(() => {
    const fetchSkills = async () => {
      const skillChoices = await getSkills();
      setChoices(parseSkills(skillChoices));
    };

    fetchSkills();
  }, []);

  const onSubmit = useCallback(
    async (values: Record<string, SkillOption[]>) => {
      if (values.skills) {
        setStatus?.('Writing to Hasura…');

        const { error } = await updateSkills({
          skills: values.skills.map(({ id }) => ({
            skill_id: id,
          })),
        });

        if (error) {
          throw new Error(`Unable to update skills. Error: ${error}`);
        }
      } else {
        setStatus('No Change. Skipping Save…');
        await new Promise((resolve) => {
          setTimeout(resolve, 10);
        });
      }
      (onComplete ?? onNextPress)();
    },
    [onComplete, onNextPress, updateSkills],
  );

  const formMethods = useForm<{ [field]: SkillOption[] }>();
  const { setValue } = formMethods;

  return (
    <FormProvider {...formMethods}>
      <WizardPane<SkillOption[]>
        {...{ field, onSubmit, status, title, buttonLabel }}
        prompt="What are your super&#xAD;powers?"
      >
        <SetupSkillsInput {...{ user, skills, setValue, modal, choices }} />
      </WizardPane>
    </FormProvider>
  );
};

type SetupSkillInputProps = {
  user: Maybe<Player>;
  setValue: UseFormSetValue<{ skills: SkillOption[] }>;
  modal: boolean;
  choices?: CategoryOption[];
  skills?: SkillOption[];
};

const SetupSkillsInput: React.FC<SetupSkillInputProps> = ({
  user,
  skills,
  setValue,
  modal,
  choices,
}) => {
  const mounted = useMounted();
  const { watch } = useFormContext();

  const current = watch(field, skills);

  useEffect(() => {
    if (user && setValue && choices && !skills) {
      if (user.skills.length > 0) {
        const options = choices.map(({ options: opts }) => opts).flat();
        const selections = user.skills.map(({ Skill: { id: sid } }) =>
          options.find(({ id: cid }) => sid === cid),
        ) as SkillOption[];
        setValue(field, selections);
      }
    }
  }, [choices, setValue, user, skills]);

  if (user == null || choices == null || !mounted) {
    return (
      <Flex w="full" align="center" justify="center">
        <Spinner />
        <Text>Loading Skills…</Text>
      </Flex>
    );
  }

  return (
    <Center w="full" alignItems="stretch">
      <SelectSearch
        isMulti
        {...{ styles }}
        onChange={(newValue) => {
          if (setValue) {
            const values = newValue as unknown as Array<SkillOption>;
            setValue(field, values);
          }
        }}
        options={choices as LabeledOptions<string>[]}
        value={current}
        autoFocus
        closeMenuOnSelect={false}
        placeholder="Add your skills…"
        menuShouldScrollIntoView={true}
        menuPlacement={modal ? 'auto' : 'top'}
        // {...props}
      />
    </Center>
  );
};
