import { Flex, Heading, LoadingState, Stack, useToast } from '@metafam/ds';
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
  QuestRepetition_Enum,
  useUpdateQuestMutation,
} from '../../../graphql/autogen/types';
import { getSsrClient } from '../../../graphql/client';
import { getGuilds } from '../../../graphql/getGuilds';
import { getSkills } from '../../../graphql/getSkills';
import { CategoryOption, parseSkills } from '../../../utils/skillHelpers';

type Props = {
  quest: QuestFragmentFragment;
  guilds: GuildFragmentFragment[];
  skillChoices: Array<CategoryOption>;
};
const EditQuestPage: React.FC<Props> = ({ quest, skillChoices, guilds }) => {
  const router = useRouter();
  const toast = useToast();
  const [updateQuestResult, updateQuest] = useUpdateQuestMutation();

  const onSubmit = (data: CreateQuestFormInputs) => {
    const updateQuestInput = {
      title: data.title,
      description: data.description,
      external_link: data.external_link,
      repetition: data.repetition,
      cooldown:
        data.repetition === QuestRepetition_Enum.Recurring
          ? data.cooldown
          : null,
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
          description: `The quest details have been updated`,
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
    return <LoadingState />;
  }

  return (
    <PageContainer>
      <Stack
        spacing={6}
        align="center"
        direction={{ base: 'column', lg: 'row' }}
        alignItems="flex-start"
        maxWidth="7xl"
      >
        <Flex flex={1} d="column">
          <Heading>Edit Quest</Heading>

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
        </Flex>
      </Stack>
    </PageContainer>
  );
};

export default EditQuestPage;

type QueryParams = { id: string };

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

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
