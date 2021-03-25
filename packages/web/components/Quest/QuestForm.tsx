import {
  Box,
  Input,
  MetaButton,
  Select,
  Text,
  HStack,
  VStack,
} from '@metafam/ds';
import { QuestStatus_Enum, QuestFragmentFragment, GuildFragmentFragment, QuestRepetition_Enum } from 'graphql/autogen/types';
import React, { useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { CategoryOption, SkillOption } from '../../utils/skillHelpers';
import { SkillsSelect } from '../SkillsSelect';
import { FlexContainer } from '../Container';

const UriRegexp = /\w+:(\/?\/?)[^\s]+/
const validations = {
  title: {
    required: true,
    minLength: 4,
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
    min: 0,
    // TODO is int > 0
  },
  status: {
    // TODO is int > 0
  },
}

export interface CreateQuestFormInputs {
  title: string;
  description: string | undefined | null;
  repetition: QuestRepetition_Enum;
  status: QuestStatus_Enum;
  guild_id: string;
  external_link: string | undefined | null;
  cooldown: number | undefined | null;
  skills: SkillOption[];
}

type Props = {
  guilds: GuildFragmentFragment[];
  editQuest?: QuestFragmentFragment;
  skillChoices: Array<CategoryOption>;
  onSubmit: (data: CreateQuestFormInputs) => void;
  success?: boolean;
  fetching?: boolean;
  submitLabel: string;
  loadingLabel: string;
}

// TODO redirect if user not logged in
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
  const defaultValues = useMemo<QuestFragmentFragment | undefined>(() =>
      editQuest ?
        {
          ...editQuest,
          skills: editQuest.quest_skills.map(s => s.skill).map(s => ({
            value: s.id,
            label: s.name,
            ...s,
          })),
        }
        : undefined,
    [editQuest],
  );
  const { register, control, errors, watch, handleSubmit } = useForm<CreateQuestFormInputs>({
    defaultValues,
  });
  const createQuestInput = watch();

  return (
    <Box>
      <VStack>

        <Text>Title</Text>
        <Input
          background="dark"
          placeholder="Buidl stuff"
          isRequired
          name="title"
          ref={register(validations.title)}
          isInvalid={!!errors.title}
        />
        {!!errors.title && <Text>Invalid</Text>}

        <Text>Description</Text>
        <Input
          background="dark"
          placeholder="Shill our guild"
          isRequired
          name="description"
          ref={register(validations.description)}
          isInvalid={!!errors.description}
        />
        {!!errors.description && <Text>Invalid</Text>}

        <Text>Link</Text>
        <Input
          background="dark"
          placeholder="External link"
          name="external_link"
          ref={register(validations.external_link)}
          isInvalid={!!errors.external_link}
        />
        {!!errors.external_link && <Text>Invalid</Text>}

        <Text>Repetition</Text>
        <Select
          isRequired
          name="repetition"
          ref={register(validations.repetition)}
          isInvalid={!!errors.repetition}
        >
          {Object.entries(QuestRepetition_Enum).map(([key, value]) => (
            <option key={value} value={value}>{key}</option>
          ))}
        </Select>

        {createQuestInput.repetition === QuestRepetition_Enum.Recurring &&
        <>
          <Text>Cooldown (seconds)</Text>
          <Input
            isRequired
            background="dark"
            placeholder="3600"
            name="cooldown"
            type="number"
            ref={register(validations.cooldown)}
            isInvalid={!!errors.cooldown}
          />
          {!!errors.cooldown && <Text>Invalid</Text>}
        </>
        }

        <Text>Guild</Text>
        <Select
          isRequired
          name="guild_id"
          ref={register(validations.guild_id)}
          isInvalid={!!errors.guild_id}
        >
          {guilds.map(guild => (
            <option key={guild.id} value={guild.id}>{guild.name}</option>
          ))}
        </Select>

        {editQuest &&
        <>
          <Text>Status</Text>
          <Select
            isRequired
            name="status"
            ref={register(validations.status)}
            isInvalid={!!errors.status}
          >
            {Object.entries(QuestStatus_Enum).map(([key, value]) => (
              <option key={value} value={value}>{key}</option>
            ))}
          </Select>
        </>
        }

        <FlexContainer w="100%" align="stretch" maxW="50rem">
          <Controller
            name="skills"
            control={control}
            defaultValue={[]}
            render={({ onChange, value }) =>
              <SkillsSelect
                skillChoices={skillChoices}
                skills={value}
                setSkills={onChange}
                placeHolder="Select required skills"
              />
            }
          />
        </FlexContainer>

        <HStack>
          <MetaButton
            as="a"
            href={editQuest ? `/quest/${editQuest.id}` : '/quests'}
            variant="outline"
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
    </Box>
  );
}
