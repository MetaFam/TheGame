import {
  Box,
  Button,
  Center,
  ConfirmModal,
  Field,
  Flex,
  Input,
  MetaButton,
  MetaTag,
  Select,
  Spinner,
  Text,
  Textarea,
  VStack,
} from '@metafam/ds';
import { httpLink, Maybe } from '@metafam/utils';
import { FlexContainer } from 'components/Container';
import { RepetitionColors } from 'components/Quest/QuestTags';
import { RolesSelect } from 'components/Quest/Roles';
import { SkillsSelect } from 'components/Quest/Skills';
import { SquareImage } from 'components/SquareImage';
import {
  GuildFragment,
  PlayerRole,
  QuestFragment,
  QuestRepetition_Enum,
  QuestStatus_Enum,
} from 'graphql/autogen/types';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
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
} as const;

export interface CreateQuestFormInputs {
  title: string;
  description: string;
  repetition: QuestRepetition_Enum;
  status: QuestStatus_Enum;
  guildId: Maybe<string>;
  externalLink?: Maybe<string>;
  cooldown?: Maybe<number>;
  skills: Array<SkillOption>;
  roles: Array<RoleOption>;
  image: Maybe<FileList>;
}
const MetaFamGuildId = 'f94b7cd4-cf29-4251-baa5-eaacab98a719';

const getDefaultFormValues = (
  base: QuestFragment | undefined,
  guilds: GuildFragment[],
): CreateQuestFormInputs => ({
  title: base?.title || '',
  repetition: base?.repetition ?? QuestRepetition_Enum.Unique,
  description: base?.description ?? '',
  externalLink: base?.externalLink ?? '',
  guildId:
    base?.guildId ??
    guilds.find((g) => g.id === MetaFamGuildId)?.id ??
    guilds[0].id ??
    null,
  status: base?.status || QuestStatus_Enum.Open,
  // cooldown is stored as seconds, but form input/edit is expected to be in hours
  cooldown:
    base?.cooldown !== undefined && base?.cooldown !== null
      ? Math.floor(base.cooldown / 3600)
      : null,
  skills: (base?.quest_skills ?? [])
    .map(({ skill }) => skill)
    .map((s) => ({
      value: s.id,
      label: s.name,
      ...s,
    })),
  roles: base
    ? base.quest_roles
        .map(({ PlayerRole: role }) => role)
        .map(({ role: value, label }) => ({
          label,
          value,
        }))
    : [],
  image: null,
});

type Props = {
  guilds: Array<GuildFragment>;
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
    formState: { errors, isSubmitting: submitting },
    watch,
    handleSubmit,
  } = useForm<CreateQuestFormInputs>({
    defaultValues,
  });
  const router = useRouter();
  const [exitAlert, setExitAlert] = useState<boolean>(false);
  const prevImage = httpLink(editQuest?.image) ?? null;
  const [previewImg, setPreviewImage] = useState<Maybe<string>>(prevImage);
  const createQuestInput = watch();

  function showImagePreview(e: ChangeEvent<HTMLInputElement>) {
    const file = e?.target?.files?.[0];
    if (!file) {
      setPreviewImage(prevImage);
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setPreviewImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <Box w="100%" maxW="30rem">
      <VStack spacing={8} py={6} as="form" onSubmit={handleSubmit(onSubmit)}>
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
            bg="dark"
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
                value: 7,
                message: 'Too short…',
              },
            }}
            defaultValue={defaultValues.description}
            render={({ field: { onChange, value } }) => (
              <Textarea bg="dark" {...{ value, onChange }} />
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
            bg="dark"
          />
        </Field>

        <Field label="Repetition" error={errors.repetition}>
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
              <option key={value} {...{ value }}>
                {key}
              </option>
            ))}
          </Select>
          <MetaTag
            size="md"
            fontWeight="normal"
            p={2}
            mt={2}
            bgColor={RepetitionColors[createQuestInput.repetition]}
            alignSelf="start"
          >
            {QuestRepetitionHint[createQuestInput.repetition]}
          </MetaTag>
        </Field>
        {createQuestInput.repetition === QuestRepetition_Enum.Recurring && (
          <Field label="Cooldown (hours)" error={errors.cooldown}>
            <Input
              placeholder="168 = 24 ⨯ 7"
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
              bg="dark"
            />
          </Field>
        )}

        <Field label="Guild" error={errors.guildId}>
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
          <Field label="Status" error={errors.status}>
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
          <FlexContainer w="full" align="stretch" maxW="50rem">
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
          <FlexContainer w="full" align="stretch" maxW="50rem">
            <Controller
              name="roles"
              {...{ control }}
              defaultValue={[]}
              render={({ field: { onChange, value } }) => (
                <RolesSelect
                  {...{ roleChoices }}
                  roles={value}
                  setRoles={onChange}
                  placeHolder="Select Required Roles…"
                />
              )}
            />
          </FlexContainer>
        </Field>

        <Field label="Image" error={errors.image}>
          <Input
            {...register('image')}
            type="file"
            paddingTop={1}
            accept="image/*"
            onChange={(e) => showImagePreview(e)}
          />
          <Center
            as="div"
            boxSize="sm"
            rounded="md"
            border="dashed"
            borderWidth={6}
            borderColor="whiteAlpha.500"
            marginTop={2}
            width={'full'}
            overflow="clip"
            bgColor="blackAlpha.600"
            backdropFilter="auto"
            backdropBlur="sm"
          >
            {previewImg ? (
              <Box width={350} padding={2}>
                <SquareImage src={previewImg} overflow="hidden" />
              </Box>
            ) : (
              <Text color="whiteAlpha.800">
                See how your image will look on a quest
              </Text>
            )}
          </Center>
        </Field>

        <Flex justify="space-around" mt={4} w="full">
          <MetaButton
            type="submit"
            disabled={guilds.length === 0}
            isLoading={fetching}
            loadingText={loadingLabel}
            isDisabled={success}
          >
            {submitting ? <Spinner /> : submitLabel}
          </MetaButton>
          <Button
            variant="ghost"
            onClick={() => setExitAlert(true)}
            _hover={{ bg: 'alphaWhite.400' }}
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
