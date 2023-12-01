import { Heading, LoadingState, useToast } from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { CreateQuestFormInputs, QuestForm } from 'components/Quest/QuestForm';
import {
  GuildFragment,
  PlayerRole,
  QuestFragment,
  useUpdateQuestMutation,
} from 'graphql/autogen/types';
import { getSsrClient } from 'graphql/client';
import { getQuest } from 'graphql/getQuest';
import { getPlayerRoles } from 'graphql/queries/enums/getRoles';
import { getSkills } from 'graphql/queries/enums/getSkills';
import { getGuilds } from 'graphql/queries/guild';
import { useUser } from 'lib/hooks';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import DefaultQuestImage from 'public/assets/QuestsDefaultImage_900x900.jpg';
import React from 'react';
import { transformCooldownForBackend } from 'utils/questHelpers';
import { CategoryOption, parseSkills } from 'utils/skillHelpers';
import { uploadFile } from 'utils/uploadHelpers';

type Props = {
  image: string;
  quest: QuestFragment;
  guilds: GuildFragment[];
  skillChoices: Array<CategoryOption>;
  roleChoices: Array<PlayerRole>;
};

const EditQuestPage: React.FC<Props> = ({
  quest,
  skillChoices,
  roleChoices,
  guilds,
}) => {
  useUser({ redirectTo: '/quests' });
  const router = useRouter();
  const toast = useToast();
  const [updateQuestResult, updateQuest] = useUpdateQuestMutation();

  const onSubmit = async (data: CreateQuestFormInputs) => {
    let imageURL = DefaultQuestImage.src;

    if (data?.image?.[0]) {
      const ipfsHash = await uploadFile(data.image[0]);
      imageURL = `ipfs://${ipfsHash}`;
    }

    const updateQuestInput = {
      title: data.title,
      description: data.description,
      repetition: data.repetition,
      cooldown: transformCooldownForBackend(data.cooldown, data.repetition),
      status: data.status,
      image: imageURL,
    };

    const skillsObjects = data.skills.map((s) => ({
      questId: quest.id,
      skillId: s.id,
    }));

    const rolesObjects = data.roles.map(({ value }) => ({
      questId: quest.id,
      role: value,
    }));

    updateQuest({
      id: quest.id,
      input: updateQuestInput,
      skills: skillsObjects,
      roles: rolesObjects,
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
      <Heading
        as="h1"
        fontFamily="body"
        fontWeight="600"
        fontSize={{ base: '4xl', md: '6xl' }}
        mb={5}
      >
        Edit Quest
      </Heading>

      <QuestForm
        {...{ roleChoices, onSubmit, guilds, skillChoices }}
        success={!!updateQuestResult.data}
        fetching={updateQuestResult.fetching}
        submitLabel="Update Quest"
        loadingLabel="Saving Quest…"
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
  const roleChoices = await getPlayerRoles();

  return {
    props: {
      quest,
      guilds,
      skillChoices,
      roleChoices,
    },
    revalidate: 1,
  };
};
