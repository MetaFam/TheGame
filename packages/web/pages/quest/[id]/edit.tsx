import { Flex, LoadingState, Heading, Stack } from '@metafam/ds';
import { MetaLink } from 'components/Link';
import { getQuest } from 'graphql/getQuest';
import {
  GetStaticPaths,
  GetStaticPropsContext,
} from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import { PageContainer } from '../../../components/Container';
import { getSsrClient } from '../../../graphql/client';
import { getGuilds } from '../../../graphql/getGuilds';
import { getSkills } from '../../../graphql/getSkills';
import { QuestFragmentFragment, GuildFragmentFragment, useUpdateQuestMutation, QuestRepetition_Enum } from '../../../graphql/autogen/types';
import { CategoryOption, parseSkills } from '../../../utils/skillHelpers';
import { CreateQuestFormInputs, QuestForm } from '../../../components/Quest/QuestForm';

type Props = {
  quest: QuestFragmentFragment;
  guilds: GuildFragmentFragment[];
  skillChoices: Array<CategoryOption>;
}
const EditQuestPage: React.FC<Props> = ({
                                          quest,
                                          skillChoices,
                                          guilds,
                                        }) => {
  const router = useRouter()
  const [updateQuestResult, updateQuest] = useUpdateQuestMutation();

  const onSubmit = (data: CreateQuestFormInputs) => {
    const updateQuestInput = {
      title: data.title,
      description: data.description,
      external_link: data.external_link,
      repetition: data.repetition,
      cooldown: data.repetition === QuestRepetition_Enum.Recurring ? data.cooldown : null,
      status: data.status,
    };
    updateQuest({
      id: quest.id,
      input: updateQuestInput,
    }).then((res) => {
      if(res.data?.update_quest_by_pk && !res.error) {
        router.push(`/quest/${quest.id}`);
      }
    });
  };

  const createQuestSuccess = !!updateQuestResult.data;
  const createQuestError = updateQuestResult.error?.message;

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
          <MetaLink
            as={`/quest/${quest.id}`}
            href="/quest/[id]"
          >
            Back to Quest
          </MetaLink>
          <Heading>Edit Quest</Heading>

          <QuestForm
            guilds={guilds}
            skillChoices={skillChoices}
            onSubmit={onSubmit}
            success={createQuestSuccess}
            fetching={updateQuestResult.fetching}
            error={createQuestError}
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
    }
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
