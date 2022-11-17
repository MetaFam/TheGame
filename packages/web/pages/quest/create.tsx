import { MetaHeading, useToast } from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { CreateQuestFormInputs, QuestForm } from 'components/Quest/QuestForm';
import { HeadComponent } from 'components/Seo';
import {
  QuestRepetition_ActionEnum,
  useCreateQuestMutation,
} from 'graphql/autogen/types';
import { getPlayerRoles } from 'graphql/queries/enums/getRoles';
import { getSkills } from 'graphql/queries/enums/getSkills';
import { getGuilds } from 'graphql/queries/guild';
import { useUser } from 'lib/hooks';
import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { transformCooldownForBackend } from 'utils/questHelpers';
import { parseSkills } from 'utils/skillHelpers';
import { uploadFile } from 'utils/uploadHelpers';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const CreateQuestPage: React.FC<Props> = ({
  guilds,
  skillChoices,
  roleChoices,
}) => {
  useUser({ redirectTo: '/quests', redirectIfNotFound: true });
  const router = useRouter();
  const toast = useToast();
  const [createQuestState, createQuest] = useCreateQuestMutation();

  const onSubmit = async (data: CreateQuestFormInputs) => {
    const {
      skills,
      roles,
      repetition,
      cooldown,
      status,
      ...createQuestInputs
    } = data;

    const ipfsHash = await uploadFile(data.image[0]);
    const imageURL = `ipfs://${ipfsHash}`;

    const input = {
      ...createQuestInputs,
      image: imageURL,
      repetition: data.repetition as unknown as QuestRepetition_ActionEnum,
      cooldown: transformCooldownForBackend(cooldown, repetition),
      skillIds: skills.map(({ id }) => id),
      roleIds: roles.map(({ value }) => value),
    };

    createQuest({
      input,
    }).then((response) => {
      const createQuestResponse = response.data?.createQuest;
      if (createQuestResponse?.success) {
        router.push(`/quest/${createQuestResponse.quest_id}`);
        toast({
          title: 'Quest Created',
          description: 'Your quest is now live!',
          status: 'success',
          isClosable: true,
          duration: 4000,
        });
      } else {
        toast({
          title: 'Error Creating Quest',
          description:
            response.error?.message ||
            createQuestResponse?.error ||
            'Unknown Error',
          status: 'error',
          isClosable: true,
          duration: 10000,
        });
      }
    });
  };

  return (
    <PageContainer>
      <HeadComponent
        title="New Quest | MetaGame"
        description="Create a Quest for MetaGame."
        url="https://metagame.wtf/quest/create"
      />
      <MetaHeading mb={4}>Create a Quest</MetaHeading>

      <QuestForm
        {...{ guilds, skillChoices, onSubmit, roleChoices }}
        success={!!createQuestState.data?.createQuest?.success}
        fetching={createQuestState.fetching}
        submitLabel="Create Quest"
        loadingLabel="Creating Quest…"
      />
    </PageContainer>
  );
};

export const getStaticProps = async () => {
  const roleChoices = await getPlayerRoles();
  const guilds = await getGuilds();
  const skills = await getSkills();
  const skillChoices = parseSkills(skills);

  return {
    props: {
      guilds,
      skillChoices,
      roleChoices,
    },
    revalidate: 1,
  };
};

export default CreateQuestPage;
