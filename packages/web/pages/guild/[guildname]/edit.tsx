import { Flex, LoadingState, MetaHeading, useToast } from '@metafam/ds';
import { FlexContainer, PageContainer } from 'components/Container';
import { EditGuildFormInputs, GuildForm } from 'components/Guild/GuildForm';
import {
  GuildFragment,
  GuildInfoInput,
  GuildType_ActionEnum,
  LinkType_Enum,
  useAddGuildLinkMutation,
  useUpdateGuildMutation,
} from 'graphql/autogen/types';
import { getGuild } from 'graphql/queries/guild';
import { useRouter } from 'next/router';
import Page404 from 'pages/404';
import React, { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';
import { errorHandler } from 'utils/errorHandler';
import { uploadFile } from 'utils/uploadHelpers';

const EditGuild: React.FC = () => {
  const router = useRouter();
  const [, addLink] = useAddGuildLinkMutation();
  const [guild, setGuild] = useState<GuildFragment | null>();
  const [{ fetching, data }, updateGuild] = useUpdateGuildMutation();
  const toast = useToast();

  const guildNameRouter = router.query.guildname as string;

  const { data: fetchedGuild, isValidating } = useSWR(
    guildNameRouter,
    getGuild,
    {
      revalidateOnFocus: false,
    },
  );

  useEffect(() => {
    setGuild(fetchedGuild);
  }, [fetchedGuild, guildNameRouter]);

  const onSubmit = useCallback(
    async (editGuildFormInputs: EditGuildFormInputs) => {
      if (!guild) return;

      const {
        type,
        discordAdminRoles: adminRoles,
        discordMembershipRoles: membershipRoles,
        logoFile,
        logoUrl,
        daos,
        websiteUrl,
        githubUrl,
        twitterUrl,
        description,
        guildname,
        name,
        discordInviteUrl,
        joinUrl,
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
        guildname,
        name,
        description,
        joinUrl,
        daos,
        websiteUrl,
        discordAdminRoles: adminRoles.map((o) => o.value),
        discordMembershipRoles: membershipRoles.map((o) => o.value),
        type: type as unknown as GuildType_ActionEnum,
        uuid: guild.id,
        logoUrl: newLogoUrl,
      };

      const twitterGuildLink = {
        guildId: guild.id,
        name: 'Find Us On Twitter',
        url: twitterUrl || '',
        type: 'TWITTER' as LinkType_Enum,
      };
      await addLink(twitterGuildLink);

      const discordGuildLink = {
        guildId: guild.id,
        name: 'Join Us On Discord',
        url: discordInviteUrl || '',
        type: 'DISCORD' as LinkType_Enum,
      };
      await addLink(discordGuildLink);

      const githubGuildLink = {
        guildId: guild.id,
        name: 'Find Us On Github',
        url: githubUrl || '',
        type: 'GITHUB' as LinkType_Enum,
      };
      await addLink(githubGuildLink);

      const response = await updateGuild({ guildInfo: payload });

      const saveGuildResponse = response.data?.saveGuildInformation;
      if (saveGuildResponse?.success) {
        toast({
          title: 'Guild updated',
          status: 'success',
          isClosable: true,
          duration: 5000,
        });
        setTimeout(() => {
          router.push(`/guild/${guildname}`);
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
    [guild, router, toast, updateGuild, addLink],
  );

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

  return (
    <PageContainer align="center">
      <FlexContainer justify="start" mt={5} pb={16} gap={8}>
        <MetaHeading textAlign="center" size="md">
          Edit guild information
        </MetaHeading>
        <Flex
          direction="column"
          bg="whiteAlpha.200"
          backdropFilter="blur(7px)"
          rounded="lg"
          p="6"
          w="max-content"
          align="center"
          justify="space-between"
        >
          <GuildForm
            workingGuild={guild}
            onSubmit={onSubmit}
            success={!!data?.saveGuildInformation?.success}
            submitting={fetching}
          />
        </Flex>
      </FlexContainer>
    </PageContainer>
  );
};

export default EditGuild;
