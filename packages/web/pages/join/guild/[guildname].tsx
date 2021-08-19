import { Flex, MetaHeading, useToast } from '@metafam/ds';
import { FlexContainer, PageContainer } from 'components/Container';
import { EditGuildFormInputs, GuildForm } from 'components/Guild/GuildForm';
import {
  GuildFragmentFragment,
  GuildInfo,
  GuildType_ActionEnum,
  useUpdateGuildMutation,
} from 'graphql/autogen/types';
import { getGuild } from 'graphql/getGuild';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const SetupGuild: React.FC = () => {
  const router = useRouter();

  const [guild, setGuild] = useState<GuildFragmentFragment | undefined>();
  const [updateGuildState, updateGuild] = useUpdateGuildMutation();
  const toast = useToast();

  const guildName = router.query.guildname as string;

  useEffect(() => {
    const fetchGuild = async () => {
      const guildResponse = await getGuild(guildName);
      if (guildResponse != null) {
        setGuild(guildResponse);
      }
    };
    fetchGuild();
  }, [guildName]);

  if (guild == null) {
    return <></>;
  }

  const onSubmit = async (data: EditGuildFormInputs) => {
    const { type, ...otherInputs } = data;
    const payload: GuildInfo = {
      ...otherInputs,
      discordAdminRoles: data.discordAdminRoles.map((o) => o.value),
      discordMembershipRoles: data.discordMembershipRoles.map((o) => o.value),
      type: (type as unknown) as GuildType_ActionEnum,
      uuid: guild.id,
    };

    const response = await updateGuild({ guildInfo: payload });

    const saveGuildResponse = response.data?.saveGuildInformation;
    if (saveGuildResponse?.success) {
      toast({
        title: 'Guild information submitted',
        description: 'Please allow a few days to review your guild information',
        status: 'success',
        isClosable: true,
        duration: 5000,
      });
      setTimeout(() => {
        router.push('/');
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
    <PageContainer>
      <FlexContainer flex="1" justify="start" mt={5}>
        <MetaHeading textAlign="center" mb={10} size="md">
          Add guild information
        </MetaHeading>
        <Flex
          direction="column"
          bg="whiteAlpha.200"
          style={{ backdropFilter: 'blur(7px)' }}
          rounded="lg"
          p="6"
          my="6"
          w="100%"
          align="stretch"
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

export default SetupGuild;
