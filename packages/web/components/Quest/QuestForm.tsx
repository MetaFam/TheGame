import {
  Box,
  ConfirmModal,
  Flex,
  HStack,
  Input,
  MetaButton,
  MetaTag,
  Select,
  Text,
  VStack,
} from '@metafam/ds';
import { ContentState, convertFromHTML, EditorState } from 'draft-js';
import {
  GuildFragmentFragment,
  QuestFragmentFragment,
  QuestRepetition_Enum,
  QuestStatus_Enum,
} from 'graphql/autogen/types';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import { Controller, FieldError, useForm } from 'react-hook-form';

import { QuestRepetitionHint, UriRegexp } from '../../utils/questHelpers';
import { CategoryOption, SkillOption } from '../../utils/skillHelpers';
import { FlexContainer } from '../Container';
import { SkillsSelect } from '../Skills';
import { WYSIWYGEditor } from '../WYSIWYGEditor';
import { RepetitionColors } from './QuestTags';

const validations = {
  title: {
    required: true,
    minLength: 4,
    maxLength: 50,
  },
  description: {
    required: true,
    minLength: 4,
  },
  repetition: {
    required: true,
  },
  guild_id: {
    required: true,
  },
  external_link: {
    pattern: UriRegexp,
  },
  cooldown: {
    valueAsNumber: true,
    min: 1,
  },
};

export interface CreateQuestFormInputs {
  title: string;
  description: EditorState;
  repetition: QuestRepetition_Enum;
  status: QuestStatus_Enum;
  guild_id: string | null;
  external_link: string | undefined | null;
  cooldown: number | undefined | null;
  skills: SkillOption[];
}

const MetaFamGuildId = 'f94b7cd4-cf29-4251-baa5-eaacab98a719';

const getDefaultFormValues = (
  editQuest: QuestFragmentFragment | undefined,
  guilds: GuildFragmentFragment[],
): CreateQuestFormInputs => {
  let description = null;
  if (editQuest && editQuest.description) {
    const blocksFromHTML = convertFromHTML(editQuest.description);
    const contentState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    );
    description = EditorState.createWithContent(contentState);
  } else {
    description = EditorState.createEmpty();
  }

  const defaultValues = {
    title: editQuest?.title || '',
    repetition: editQuest?.repetition || QuestRepetition_Enum.Unique,
    description: description || EditorState.createEmpty(),
    external_link: editQuest?.external_link || '',
    guild_id:
      editQuest?.guild_id ||
      guilds.find((g) => g.id === MetaFamGuildId)?.id ||
      guilds[0].id,
    status: editQuest?.status || QuestStatus_Enum.Open,
    cooldown: editQuest?.cooldown || null,
    skills: editQuest
      ? editQuest.quest_skills
          .map((s) => s.skill)
          .map((s) => ({
            value: s.id,
            label: s.name,
            ...s,
          }))
      : [],
  };
  return defaultValues;
};

type FieldProps = {
  children: React.ReactNode;
  label: string;
  error?: FieldError;
};

const Field: React.FC<FieldProps> = ({ children, error, label }) => (
  <Flex mb={2} w="100%" align="center" direction="column">
    <Flex justify="space-between" w="100%" mb={2}>
      <Text textStyle="caption" textAlign="left" ml={4}>
        {label}
      </Text>

      <Text textStyle="caption" textAlign="left" color="red.400" mr={4}>
        {error?.type === 'required' && 'Required'}
        {error?.type === 'pattern' && 'Invalid URL'}
        {error?.type === 'minLength' && 'Too short'}
        {error?.type === 'maxLength' && 'Too long'}
        {error?.type === 'min' && 'Too small'}
      </Text>
    </Flex>

    {children}
  </Flex>
);

type Props = {
  guilds: GuildFragmentFragment[];
  editQuest?: QuestFragmentFragment;
  skillChoices: Array<CategoryOption>;
  onSubmit: (data: CreateQuestFormInputs) => void;
  success?: boolean;
  fetching?: boolean;
  submitLabel: string;
  loadingLabel: string;
};

export const QuestForm: React.FC<Props> = ({
  guilds,
  skillChoices,
  onSubmit,
  success,
  fetching,
  submitLabel,
  loadingLabel,
  editQuest,
}) => {
  const defaultValues = useMemo<CreateQuestFormInputs>(
    () => getDefaultFormValues(editQuest, guilds),
    [editQuest, guilds],
  );
  const {
    register,
    control,
    errors,
    watch,
    handleSubmit,
  } = useForm<CreateQuestFormInputs>({
    defaultValues,
  });
  const router = useRouter();
  const [exitAlert, setExitAlert] = useState<boolean>(false);
  const createQuestInput = watch();

  return (
    <Box w="100%" maxW="30rem">
      <VStack>
        <Field label="Title" error={errors.title}>
          <Input
            background="dark"
            placeholder="Buidl stuff"
            isRequired
            name="title"
            ref={register(validations.title)}
            isInvalid={!!errors.title}
            minLength={validations.title.minLength}
            maxLength={validations.title.maxLength}
          />
        </Field>

        <Field label="Description">
          <Controller
            name="description"
            control={control}
            render={({ onChange, value }) => (
              <WYSIWYGEditor
                editorState={value}
                onEditorStateChange={onChange}
              />
            )}
          />
        </Field>

        <Field label="Link" error={errors.external_link}>
          <Input
            background="dark"
            placeholder="External link"
            name="external_link"
            ref={register(validations.external_link)}
            isInvalid={!!errors.external_link}
          />
        </Field>

        <Field label="Repetition">
          <Select
            isRequired
            name="repetition"
            ref={register(validations.repetition)}
            isInvalid={!!errors.repetition}
            bg="dark"
            color="white"
          >
            {Object.entries(QuestRepetition_Enum).map(([key, value]) => (
              <option key={value} value={value}>
                {key}
              </option>
            ))}
          </Select>
          <MetaTag
            size="md"
            fontWeight="normal"
            p={2}
            mt={2}
            backgroundColor={RepetitionColors[createQuestInput.repetition]}
          >
            {QuestRepetitionHint[createQuestInput.repetition]}
          </MetaTag>
        </Field>
        {createQuestInput.repetition === QuestRepetition_Enum.Recurring && (
          <Field label="Cooldown (hours)" error={errors.cooldown}>
            <Input
              isRequired
              background="dark"
              placeholder="3600"
              name="cooldown"
              type="number"
              ref={register(validations.cooldown)}
              isInvalid={!!errors.cooldown}
            />
          </Field>
        )}

        <Field label="Guild">
          <Select
            isRequired
            name="guild_id"
            ref={register(validations.guild_id)}
            isInvalid={!!errors.guild_id}
            bg="dark"
            color="white"
          >
            {guilds.map((guild) => (
              <option key={guild.id} value={guild.id}>
                {guild.name}
              </option>
            ))}
          </Select>
        </Field>

        {editQuest && (
          <Field label="Status">
            <Select
              isRequired
              name="status"
              bg="dark"
              color="white"
              ref={register}
              isInvalid={!!errors.status}
            >
              {Object.entries(QuestStatus_Enum).map(([key, value]) => (
                <option key={value} value={value}>
                  {key}
                </option>
              ))}
            </Select>
          </Field>
        )}

        <Field label="Skills">
          <FlexContainer w="100%" align="stretch" maxW="50rem">
            <Controller
              name="skills"
              control={control}
              defaultValue={[]}
              render={({ onChange, value }) => (
                <SkillsSelect
                  skillChoices={skillChoices}
                  skills={value}
                  setSkills={onChange}
                  placeHolder="Select required skills"
                />
              )}
            />
          </FlexContainer>
        </Field>

        <HStack justify="space-between" mt={4} w="100%">
          <MetaButton
            variant="outline"
            colorScheme="pink"
            onClick={() => setExitAlert(true)}
            isDisabled={fetching || success}
          >
            Cancel
          </MetaButton>
          <MetaButton
            mt={10}
            isLoading={fetching}
            loadingText={loadingLabel}
            onClick={handleSubmit(onSubmit)}
            isDisabled={success}
          >
            {submitLabel}
          </MetaButton>
        </HStack>
      </VStack>

      <ConfirmModal
        isOpen={exitAlert}
        onNope={() => setExitAlert(false)}
        onYep={() =>
          router.push(editQuest ? `/quest/${editQuest.id}` : '/quests')
        }
        header="Are you sure you want to leave ?"
      />
    </Box>
  );
};
