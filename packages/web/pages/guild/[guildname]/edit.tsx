import { Flex, LoadingState, MetaHeading, useToast } from '@metafam/ds';
import { FlexContainer, PageContainer } from 'components/Container';
import { EditGuildFormInputs, GuildForm } from 'components/Guild/GuildForm';
import {
  GuildFragment,
  GuildInfoInput,
  GuildType_ActionEnum,
  useUpdateGuildMutation,
} from 'graphql/autogen/types';
import { getGuild } from 'graphql/queries/guild';
import { useRouter } from 'next/router';
import Page404 from 'pages/404';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

const EditGuild: React.FC = () => {
  const router = useRouter();

  const [guild, setGuild] = useState<GuildFragment | null>();
  const [updateGuildState, updateGuild] = useUpdateGuildMutation();
  const toast = useToast();

  const guildName = router.query.guildname as string;

  const { data: fetchedGuild, isValidating } = useSWR(guildName, getGuild);

  useEffect(() => {
    setGuild(fetchedGuild);
  }, [fetchedGuild, guildName]);

  if (
    isValidating ||
    fetchedGuild == null ||
    (fetchedGuild != null && guild == null)
  ) {
    return <LoadingState />;
  }

  if (guild == null) {
    return <Page404 />;
  }

  const onSubmit = async (editGuildFormInputs: EditGuildFormInputs) => {
    const {
      type,
      discordAdminRoles: adminRoles,
      discordMembershipRoles: membershipRoles,
      ...otherInputs
    } = editGuildFormInputs;

    const payload: GuildInfoInput = {
      ...otherInputs,
      discordAdminRoles: adminRoles.map((o) => o.value),
      discordMembershipRoles: membershipRoles.map((o) => o.value),
      type: type as unknown as GuildType_ActionEnum,
      uuid: guild.id,
    };

    const response = await updateGuild({ guildInfo: payload });

    const saveGuildResponse = response.data?.saveGuildInformation;
    if (saveGuildResponse?.success) {
      toast({
        title: 'Guild updated',
        status: 'success',
        isClosable: true,
        duration: 2000,
      });
      setTimeout(() => {
        router.push(`/guild/${guildName}`);
      }, 5000);
    } else {
      toast({
        title: 'Error while saving guild information',
        description:
          response.error?.message ||
          saveGuildResponse?.error ||
          'unknown error',
        status: 'error',
        isClosable: true,
        duration: 10000,
      });
    }
  };

  return (
    <PageContainer align="center">
      <FlexContainer justify="start" mt={5} pb={16} gap={8}>
        <MetaHeading textAlign="center" size="md">
          Edit guild information
        </MetaHeading>
        <Flex
          direction="column"
          bg="whiteAlpha.200"
          style={{ backdropFilter: 'blur(7px)' }}
          rounded="lg"
          p="6"
          w="max-content"
          align="center"
          justify="space-between"
        >
          <GuildForm
            workingGuild={guild}
            onSubmit={onSubmit}
            success={!!updateGuildState.data?.saveGuildInformation?.success}
            submitting={updateGuildState.fetching}
          />
        </Flex>
      </FlexContainer>
    </PageContainer>
  );
};

export default EditGuild;
