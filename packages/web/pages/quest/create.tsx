import {
  Box,
  Input,
  MetaButton,
  MetaHeading,
  Select,
  Text,
  VStack,
} from '@metafam/ds';
import { Quest_Insert_Input, QuestRepetition_Enum } from 'graphql/autogen/types';
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
  const { register, errors, handleSubmit } = useForm<Quest_Insert_Input>();
  const onSubmit = handleSubmit((data) => console.log(data));

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
          loadingText="Creating quest..."
          onClick={onSubmit}
        >
          Create Quest
        </MetaButton>
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
