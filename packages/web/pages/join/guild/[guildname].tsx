import { Flex, LoadingState, MetaHeading, useToast } from '@metafam/ds';
import { FlexContainer, PageContainer } from 'components/Container';
import { EditGuildFormInputs, GuildForm } from 'components/Guild/GuildForm';
import {
  GuildInfoInput,
  GuildType_ActionEnum,
  useGetGuildQuery,
  useUpdateGuildMutation,
} from 'graphql/autogen/types';
import { useRouter } from 'next/router';
import Page404 from 'pages/404';
import React, { useCallback } from 'react';
import { errorHandler } from 'utils/errorHandler';
import { uploadFile } from 'utils/uploadHelpers';

const SetupGuild: React.FC = () => {
  const router = useRouter();
  const guildname = router.query.guildname as string;
  const toast = useToast();

  const [updateGuildState, updateGuild] = useUpdateGuildMutation();
  const [res] = useGetGuildQuery({ variables: { guildname } });
  const guild = res.data?.guild[0];

  const onSubmit = useCallback(
    async (editGuildFormInputs: EditGuildFormInputs) => {
      if (!guild) return;

      const {
        type,
        discordAdminRoles: adminRoles,
        discordMembershipRoles: membershipRoles,
        logoFile,
        logoUrl,
        ...otherInputs
      } = editGuildFormInputs;

      let newLogoUrl = logoUrl;

      if (logoFile?.[0]) {
        try {
          const ipfsHash = await uploadFile(logoFile[0]);
          newLogoUrl = `ipfs://${ipfsHash}`;
        } catch (error) {
          toast({
            title: 'Error Saving Logo',
            description: (error as Error).message,
            status: 'warning',
            isClosable: true,
            duration: 8000,
          });
          errorHandler(error as Error);
          return;
        }
      }

      const payload: GuildInfoInput = {
        ...otherInputs,
        discordAdminRoles: adminRoles.map((o) => o.value),
        discordMembershipRoles: membershipRoles.map((o) => o.value),
        type: type as unknown as GuildType_ActionEnum,
        uuid: guild.id,
        logoUrl: newLogoUrl,
      };

      const response = await updateGuild({ guildInfo: payload });

      const saveGuildResponse = response.data?.saveGuildInformation;
      if (saveGuildResponse?.success) {
        toast({
          title: 'Guild information submitted',
          description: 'Thanks! Your guild will go live shortly 🚀',
          status: 'success',
          isClosable: true,
          duration: 5000,
        });
        setTimeout(() => {
          router.push('/dashboard');
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
    },
    [guild, router, toast, updateGuild],
  );

  if (res.fetching || res.data == null) {
    return <LoadingState />;
  }

  if (res.data.guild.length === 0 || guild == null) {
    return <Page404 />;
  }

  return (
    <PageContainer>
      <FlexContainer flex="1" justify="start" mt={5}>
        <MetaHeading textAlign="center" mb={10} size="md">
          Add guild information
        </MetaHeading>
        <Flex
          direction="column"
          bg="whiteAlpha.200"
          backdropFilter="blur(7px)"
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
