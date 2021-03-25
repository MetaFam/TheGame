import {
  Box,
  MetaButton,
  MetaHeading,
  Text,
  HStack,
} from '@metafam/ds';
import { useRouter } from 'next/router'
import { useCreateQuestMutation } from 'graphql/autogen/types';
import { InferGetStaticPropsType } from 'next';
import React from 'react';

import { getGuilds } from '../../graphql/getGuilds';
import { getSkills } from '../../graphql/getSkills';
import { parseSkills } from '../../utils/skillHelpers';
import { QuestCreateForm, CreateQuestFormInputs } from '../../components/Quest/QuestCreateForm';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

// TODO redirect if user not logged in
const CreateQuestPage: React.FC<Props> = ({ guilds, skillChoices }) => {
  const router = useRouter()
  const [createQuestState, createQuest] = useCreateQuestMutation();

  const onSubmit = (data: CreateQuestFormInputs) => {
    const { skills, ...createQuestInputs } = data;
    const input = {
      ...createQuestInputs,
      skills_id: skills.map(s => s.id),
    };
    createQuest({
      input,
    }).then(response => {
      const createQuestResponse = response.data?.createQuest
      if(createQuestResponse && createQuestResponse.quest_id && !createQuestResponse.error) {
        router.push(`/quest/${createQuestResponse.quest_id}`);
      }
    });
  };

  const createQuestSuccess = !!createQuestState.data?.createQuest?.quest_id;
  const createQuestError = createQuestState.error?.message || createQuestState.data?.createQuest?.error;

  return (
    <Box>
      <MetaHeading>
        Create quest
      </MetaHeading>

      <QuestCreateForm
        guilds={guilds}
        skillChoices={skillChoices}
        onSubmit={onSubmit}
        success={createQuestSuccess}
        fetching={createQuestState.fetching}
        error={createQuestError}
        submitLabel="Create Quest"
        loadingLabel="Creating quest..."
      />

      {createQuestError &&
      <Box>
        <Text>Error while creating quest</Text>
        <Text>{createQuestError}</Text>
      </Box>}
    </Box>
  );
}

export const getStaticProps = async () => {
  const guilds = await getGuilds();
  const skills = await getSkills();
  const skillChoices = parseSkills(skills);

  return {
    props: {
      guilds,
      skillChoices,
    },
    revalidate: 1,
  };
};

export default CreateQuestPage
