import { Heading, LoadingState, useToast } from '@metafam/ds';
import { getQuest } from 'graphql/getQuest';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import { PageContainer } from '../../../components/Container';
import {
  CreateQuestFormInputs,
  QuestForm,
} from '../../../components/Quest/QuestForm';
import {
  GuildFragmentFragment,
  QuestFragmentFragment,
  useUpdateQuestMutation,
} from '../../../graphql/autogen/types';
import { getSsrClient } from '../../../graphql/client';
import { getGuilds } from '../../../graphql/getGuilds';
import { getSkills } from '../../../graphql/getSkills';
import { useUser } from '../../../lib/hooks';
import { transformCooldownForBackend } from '../../../utils/questHelpers';
import { CategoryOption, parseSkills } from '../../../utils/skillHelpers';

type Props = {
  quest: QuestFragmentFragment;
  guilds: GuildFragmentFragment[];
  skillChoices: Array<CategoryOption>;
};

const EditQuestPage: React.FC<Props> = ({ quest, skillChoices, guilds }) => {
  useUser({ redirectTo: '/quests' });
  const router = useRouter();
  const toast = useToast();
  const [updateQuestResult, updateQuest] = useUpdateQuestMutation();

  const onSubmit = (data: CreateQuestFormInputs) => {
    const updateQuestInput = {
      title: data.title,
      description: data.description,
      external_link: data.external_link,
      repetition: data.repetition,
      cooldown: transformCooldownForBackend(data.cooldown, data.repetition),
      status: data.status,
    };
    const skillsObjects = data.skills.map((s) => ({
      quest_id: quest.id,
      skill_id: s.id,
    }));
    updateQuest({
      id: quest.id,
      input: updateQuestInput,
      skills: skillsObjects,
    }).then((res) => {
      if (res.data?.update_quest_by_pk && !res.error) {
        router.push(`/quest/${quest.id}`);
        toast({
          title: 'Quest edited',
          description: 'The quest details have been updated',
          status: 'success',
          isClosable: true,
          duration: 4000,
        });
      } else {
        toast({
          title: 'Error while updating quest',
          description: res.error?.message || 'unknown error',
          status: 'error',
          isClosable: true,
          duration: 10000,
        });
      }
    });
  };

  if (router.isFallback) {
    return (
      <PageContainer>
        <LoadingState />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Heading mb={4}>Edit Quest</Heading>

      <QuestForm
        guilds={guilds}
        skillChoices={skillChoices}
        onSubmit={onSubmit}
        success={!!updateQuestResult.data}
        fetching={updateQuestResult.fetching}
        submitLabel="Edit Quest"
        loadingLabel="Editing quest..."
        editQuest={quest}
      />
    </PageContainer>
  );
};

export default EditQuestPage;

type QueryParams = { id: string };

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps = async (
  context: GetStaticPropsContext<QueryParams>,
) => {
  const [ssrClient] = getSsrClient();
  const id = context.params?.id;

  const quest = await getQuest(id, ssrClient);
  if (!quest) {
    return {
      notFound: true,
    };
  }

  const guilds = await getGuilds();
  const skills = await getSkills();
  const skillChoices = parseSkills(skills);

  return {
    props: {
      quest,
      guilds,
      skillChoices,
    },
    revalidate: 1,
  };
};
