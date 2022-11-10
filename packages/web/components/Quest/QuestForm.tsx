import {
  Box,
  Button,
  Center,
  ConfirmModal,
  Flex,
  Image,
  Input,
  MetaButton,
  MetaTag,
  Select,
  Text,
  Textarea,
  VStack,
} from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { RepetitionColors } from 'components/Quest/QuestTags';
import { RolesSelect } from 'components/Quest/Roles';
import { SkillsSelect } from 'components/Quest/Skills';
import {
  GuildFragment,
  PlayerRole,
  QuestFragment,
  QuestRepetition_Enum,
  QuestStatus_Enum,
} from 'graphql/autogen/types';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useMemo, useState } from 'react';
import { Controller, FieldError, useForm } from 'react-hook-form';
import { QuestRepetitionHint, URIRegexp } from 'utils/questHelpers';
import { RoleOption } from 'utils/roleHelpers';
import { CategoryOption, SkillOption } from 'utils/skillHelpers';

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
    pattern: URIRegexp,
  },
  cooldown: {
    valueAsNumber: true,
    min: 1,
  },
};

export interface DefaultableFormValues {
  title: string;
  description: string;
  repetition: QuestRepetition_Enum;
  status: QuestStatus_Enum;
  guildId: string | null;
  externalLink?: string | null;
  cooldown?: number | null;
  skills: SkillOption[];
  roles: RoleOption[];
}
export interface CreateQuestFormInputs extends DefaultableFormValues {
  image: FileList;
}
const MetaFamGuildId = 'f94b7cd4-cf29-4251-baa5-eaacab98a719';

const getDefaultFormValues = (
  base: QuestFragment | undefined,
  guilds: GuildFragment[],
): DefaultableFormValues => ({
  title: base?.title || '',
  repetition: base?.repetition ?? QuestRepetition_Enum.Unique,
  description: base?.description ?? '',
  externalLink: base?.externalLink ?? '',
  guildId:
    base?.guildId ??
    guilds.find((g) => g.id === MetaFamGuildId)?.id ??
    guilds[0].id,
  status: base?.status || QuestStatus_Enum.Open,
  cooldown: base?.cooldown || null,
  skills: (base?.quest_skills ?? [])
    .map((s) => s.skill)
    .map((s) => ({
      value: s.id,
      label: s.name,
      ...s,
    })),
  roles: base
    ? base.quest_roles
        .map((s) => s.PlayerRole)
        .map(({ role, label }) => ({
          label,
          value: role,
        }))
    : [],
});

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
  guilds: GuildFragment[];
  editQuest?: QuestFragment;
  skillChoices: Array<CategoryOption>;
  roleChoices: Array<PlayerRole>;
  onSubmit: (data: CreateQuestFormInputs) => void;
  success?: boolean;
  fetching?: boolean;
  submitLabel: string;
  loadingLabel: string;
};

export const QuestForm: React.FC<Props> = ({
  guilds,
  skillChoices,
  roleChoices,
  onSubmit,
  success,
  fetching,
  submitLabel,
  loadingLabel,
  editQuest,
}) => {
  const defaultValues = useMemo(
    () => getDefaultFormValues(editQuest, guilds),
    [editQuest, guilds],
  );

  const {
    register,
    control,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<CreateQuestFormInputs>({
    defaultValues,
  });
  const router = useRouter();
  const [exitAlert, setExitAlert] = useState<boolean>(false);
  const [previewImg, setPreviewImage] = useState<string>('');
  const createQuestInput = watch();

  function showImagePreview(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target || !e.target.files || !e.target.files[0]) {
      setPreviewImage('');
    } else {
      const reader = new FileReader();
      const file = e.target.files[0];
      reader.onloadend = () => {
        if (reader.result) setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <Box w="100%" maxW="30rem">
      <VStack spacing={8} paddingY={6}>
        <Field label="Title" error={errors.title}>
          <Input
            placeholder="Buidl stuff…"
            {...register('title', {
              required: {
                value: true,
                message: 'This is a required field.',
              },
              minLength: {
                value: validations.title.minLength,
                message: `Must be at least ${validations.title.minLength} characters.`,
              },
              maxLength: {
                value: validations.title.maxLength,
                message: `Must be no more than ${validations.title.maxLength} characters.`,
              },
            })}
            isInvalid={!!errors.title}
            background="dark"
            autoFocus
          />
        </Field>

        <Field label="Description" error={errors.description}>
          <Controller
            name="description"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'A description is required.',
              },
              minLength: {
                value: 13,
                message: 'Too short…',
              },
            }}
            defaultValue={defaultValues.description}
            render={({ field: { onChange, value } }) => (
              <Textarea background={'dark'} {...{ value, onChange }} />
            )}
          />
        </Field>

        <Field label="Link" error={errors.externalLink}>
          <Input
            placeholder="External link"
            {...register('externalLink', {
              pattern: {
                value: URIRegexp,
                message: 'Supply a valid URL.',
              },
            })}
            isInvalid={!!errors.externalLink}
            background="dark"
          />
        </Field>

        <Field label="Repetition">
          <Select
            {...register('repetition', {
              required: {
                value: true,
                message: 'This is a required field.',
              },
            })}
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
            alignSelf="start"
          >
            {QuestRepetitionHint[createQuestInput.repetition]}
          </MetaTag>
        </Field>
        {createQuestInput.repetition === QuestRepetition_Enum.Recurring && (
          <Field label="Cooldown (hours)" error={errors.cooldown}>
            <Input
              placeholder="3600"
              type="number"
              {...register('cooldown', {
                valueAsNumber: true,
                required: {
                  value: true,
                  message: 'This is a required field.',
                },
                min: {
                  value: 1,
                  message: 'Cooldown must be at least one hour.',
                },
              })}
              isInvalid={!!errors.cooldown}
              background="dark"
            />
          </Field>
        )}

        <Field label="Guild">
          <Select
            {...register('guildId', {
              required: {
                value: true,
                message: 'This is a required field.',
              },
            })}
            isInvalid={!!errors.guildId}
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
              {...register('status', {
                required: {
                  value: true,
                  message: 'This is a required field.',
                },
              })}
              isInvalid={!!errors.status}
              bg="dark"
              color="white"
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
              {...{ control }}
              defaultValue={[]}
              render={({ field: { onChange, value } }) => (
                <SkillsSelect
                  {...{ skillChoices }}
                  skills={value}
                  setSkills={onChange}
                  placeHolder="Select Required Skills…"
                />
              )}
            />
          </FlexContainer>
        </Field>

        <Field label="Roles">
          <FlexContainer w="100%" align="stretch" maxW="50rem">
            <Controller
              name="roles"
              {...{ control }}
              defaultValue={[]}
              render={({ field: { onChange, value } }) => (
                <RolesSelect
                  {...{ roleChoices }}
                  roles={value}
                  setRoles={onChange}
                  placeHolder="Select required roles"
                />
              )}
            />
          </FlexContainer>
        </Field>

        <Field label="Quest Image" error={errors.image}>
          <Input
            {...register('image', {
              required: true,
            })}
            type={'file'}
            paddingTop={1}
            accept="image/*"
            onChange={(e) => showImagePreview(e)}
          />
          <Center
            boxSize="sm"
            rounded={'md'}
            border={'dashed'}
            borderWidth={6}
            borderColor={'whiteAlpha.500'}
            marginTop={2}
            height={'xs'}
            width={'full'}
            padding={2}
            overflow="clip"
            backgroundColor={'blackAlpha.600'}
            backdropFilter={'auto'}
            backdropBlur={'sm'}
          >
            {previewImg ? (
              <Image
                transition={'ease-in'}
                transitionDuration={'600'}
                src={previewImg}
                height={'full'}
                alt="Quest image"
              />
            ) : (
              <Text color={'whiteAlpha.800'}>
                Your image preview will show up here
              </Text>
            )}
          </Center>
        </Field>

        <Flex justify="space-between" mt={4} w="100%">
          <MetaButton
            disabled={guilds.length === 0}
            isLoading={fetching}
            loadingText={loadingLabel}
            onClick={handleSubmit(onSubmit)}
            isDisabled={success}
          >
            {submitLabel}
          </MetaButton>
          <Button
            variant="ghost"
            onClick={() => setExitAlert(true)}
            isDisabled={fetching || success}
            _hover={{ bg: '#FFFFFF11' }}
            _active={{ bg: '#FF000008' }}
            ml={5}
          >
            Cancel
          </Button>
        </Flex>
      </VStack>

      <ConfirmModal
        isOpen={exitAlert}
        onNope={() => setExitAlert(false)}
        onYep={() =>
          router.push(editQuest ? `/quest/${editQuest.id}` : '/quests')
        }
        header="Are you sure you want to leave?"
      />
    </Box>
  );
};
