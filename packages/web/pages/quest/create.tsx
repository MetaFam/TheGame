import {
  Box,
  Input,
  MetaButton,
  MetaHeading,
  Select,
  Text,
  HStack,
  VStack,
} from '@metafam/ds';
import { useRouter } from 'next/router'
import { QuestRepetition_Enum, QuestRepetition_ActionEnum, CreateQuestInput, useCreateQuestMutation } from 'graphql/autogen/types';
import { InferGetStaticPropsType } from 'next';
import React from 'react';
import { useForm } from 'react-hook-form';

import { getGuilds } from '../../graphql/getGuilds';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

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

// TODO redirect if user not logged in
const CreateQuestPage: React.FC<Props> = ({ guilds }) => {
  const router = useRouter()
  const { register, errors, watch, handleSubmit } = useForm<CreateQuestInput>();
  const [createQuestState, createQuest] = useCreateQuestMutation();
  const createQuestInput = watch();

  const onSubmit = handleSubmit((data) => {
    createQuest({
      input: data,
    }).then(response => {
      const createQuestResponse = response.data?.createQuest
      if(createQuestResponse && !createQuestResponse.error) {
        router.push(`/quest/${createQuestResponse.quest_id}`);
      }
    });
  });

  const createQuestSuccess = !!createQuestState.data?.createQuest?.quest_id;
  const createQuestError = createQuestState.data?.createQuest?.error;

  return (
    <Box>
      <MetaHeading>
        Create quest
      </MetaHeading>
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
            isLoading={createQuestState.fetching}
            loadingText="Creating quest..."
            onClick={onSubmit}
            isDisabled={createQuestSuccess}
          >
            Create Quest
          </MetaButton>
        </HStack>


        {createQuestError &&
        <Box>
          <Text>Error while creating quest</Text>
          <Text>{createQuestError}</Text>
        </Box>}
      </VStack>
    </Box>
  );
}

export const getStaticProps = async () => {
  const guilds = await getGuilds();
  return {
    props: {
      guilds,
    },
    revalidate: 1,
  };
};

export default CreateQuestPage
