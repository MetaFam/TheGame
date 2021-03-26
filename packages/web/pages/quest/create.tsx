import { MetaHeading, useToast } from '@metafam/ds';
import {
  QuestRepetition_ActionEnum,
  QuestRepetition_Enum,
  useCreateQuestMutation,
} from 'graphql/autogen/types';
import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import { PageContainer } from '../../components/Container';
import {
  CreateQuestFormInputs,
  QuestForm,
} from '../../components/Quest/QuestForm';
import { getGuilds } from '../../graphql/getGuilds';
import { getSkills } from '../../graphql/getSkills';
import { parseSkills } from '../../utils/skillHelpers';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

// TODO redirect if user not logged in
const CreateQuestPage: React.FC<Props> = ({ guilds, skillChoices }) => {
  const router = useRouter();
  const toast = useToast();
  const [createQuestState, createQuest] = useCreateQuestMutation();

  const onSubmit = (data: CreateQuestFormInputs) => {
    const { skills, repetition, cooldown, ...createQuestInputs } = data;
    const input = {
      ...createQuestInputs,
      repetition: (data.repetition as unknown) as QuestRepetition_ActionEnum,
      cooldown: repetition === QuestRepetition_Enum.Recurring ? cooldown : null,
      skills_id: skills.map((s) => s.id),
    };
    createQuest({
      input,
    }).then((response) => {
      const createQuestResponse = response.data?.createQuest;
      if (createQuestResponse?.success) {
        router.push(`/quest/${createQuestResponse.quest_id}`);
        toast({
          title: 'Quest created',
          description: `Your quest is now live!`,
          status: 'success',
          isClosable: true,
          duration: 4000,
        });
      } else {
        toast({
          title: 'Error while creating quest',
          description:
            response.error?.message ||
            createQuestResponse?.error ||
            'unknown error',
          status: 'error',
          isClosable: true,
          duration: 10000,
        });
      }
    });
  };

  return (
    <PageContainer>
      <MetaHeading>Create quest</MetaHeading>

      <QuestForm
        guilds={guilds}
        skillChoices={skillChoices}
        onSubmit={onSubmit}
        success={!!createQuestState.data}
        fetching={createQuestState.fetching}
        submitLabel="Create Quest"
        loadingLabel="Creating quest..."
      />
    </PageContainer>
  );
};

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

export default CreateQuestPage;
