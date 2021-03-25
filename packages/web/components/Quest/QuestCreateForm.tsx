import {
  Box,
  Input,
  MetaButton,
  Select,
  Text,
  HStack,
  VStack,
} from '@metafam/ds';
import { GuildFragmentFragment, QuestRepetition_Enum, QuestRepetition_ActionEnum, CreateQuestInput, useCreateQuestMutation } from 'graphql/autogen/types';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import { CategoryOption, SkillOption } from '../../utils/skillHelpers';
import { SkillsSelect } from '../SkillsSelect';
import { FlexContainer } from '../Container';

const validations = {
  title: {
    required: true,
  },
  description: {
    required: true,
  },
  repetition: {
    required: true,
  },
  guild_id: {
    required: true,
  },
  external_link: {
    // TODO is URI
  },
  cooldown: {
    // TODO is int > 0
  },
}

interface CreateQuestFormCustomInputs {
  skills: SkillOption[];
}

export type CreateQuestFormInputs = CreateQuestInput & CreateQuestFormCustomInputs;

type Props = {
  guilds: GuildFragmentFragment[];
  skillChoices: Array<CategoryOption>;
  onSubmit: (data: CreateQuestFormInputs) => void;
  success?: boolean;
  fetching?: boolean;
  error: string | undefined | null;
  submitLabel: string;
  loadingLabel: string;
}

// TODO redirect if user not logged in
export const QuestCreateForm: React.FC<Props> = ({
                                                   guilds,
                                                   skillChoices,
                                                   onSubmit,
                                                   success,
                                                   fetching,
                                                   error,
                                                   submitLabel,
                                                   loadingLabel,
                                                 }) => {
  const { register, control, errors, watch, handleSubmit } = useForm<CreateQuestFormInputs>();
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

        <Text>Description</Text>
        <Input
          background="dark"
          placeholder="Shill our guild"
          isRequired
          name="description"
          ref={register(validations.description)}
          isInvalid={!!errors.description}
        />

        <Text>Link</Text>
        <Input
          background="dark"
          placeholder="External link"
          name="external_link"
          ref={register(validations.external_link)}
          isInvalid={!!errors.external_link}
        />

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

        {createQuestInput.repetition === QuestRepetition_ActionEnum.Recurring &&
        <>
          <Text>Cooldown (seconds)</Text>
          <Input
            background="dark"
            placeholder="3600"
            name="cooldown"
            type="number"
            ref={register(validations.cooldown)}
            isInvalid={!!errors.cooldown}
          />
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
            href="/quests"
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

        {error &&
        <Box>
          <Text>Error: {error}</Text>
        </Box>
        }
      </VStack>
    </Box>
  );
}
