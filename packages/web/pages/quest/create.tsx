import {
  Box,
  Input,
  MetaButton,
  MetaHeading,
  Select,
  Text,
  VStack,
} from '@metafam/ds';
import { useRouter } from 'next/router'
import { QuestRepetition_Enum, CreateQuestInput, useCreateQuestMutation } from 'graphql/autogen/types';
import { InferGetStaticPropsType } from 'next';
import React from 'react';
import { useForm } from 'react-hook-form';

import { MetaLink } from '../../components/Link';
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
}

const CreateQuestPage: React.FC<Props> = ({ guilds }) => {
  const router = useRouter()
  const { register, errors, handleSubmit } = useForm<CreateQuestInput>();
  const [createQuestState, createQuest] = useCreateQuestMutation();

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
      <MetaLink href="/quests">Back to quests</MetaLink>
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

        <Text>Guild</Text>
        <Select
          isRequired
          name="guild_id"
          ref={register(validations.guild_id)}
          isInvalid={!!errors.guild_id}
        >
          {guilds.map(guild => (
            <option key={guild.id} value={guild.id}>{guild.guildname}</option>
          ))}
        </Select>

        <MetaButton
          mt={10}
          isLoading={createQuestState.fetching}
          loadingText="Creating quest..."
          onClick={onSubmit}
          isDisabled={createQuestSuccess}
        >
          Create Quest
        </MetaButton>

        {createQuestError &&
        <Box>
          Error while creating quest
          {createQuestError}
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
