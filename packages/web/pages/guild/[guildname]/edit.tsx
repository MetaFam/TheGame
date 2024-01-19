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
import { useWeb3 } from 'lib/hooks';
import { useRouter } from 'next/router';
import Page404 from 'pages/404';
import React, { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';
import { errorHandler } from 'utils/errorHandler';

const EditGuild: React.FC = () => {
  const router = useRouter();
  const [, addLink] = useAddGuildLinkMutation();
  const [guild, setGuild] = useState<GuildFragment | null>();
  const [{ fetching, data }, updateGuild] = useUpdateGuildMutation();
  const toast = useToast();

  const guildNameRouter = router.query.guildname as string;
  const { w3storage } = useWeb3();
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
        logoURL,
        daos,
        websiteURL,
        githubURL,
        twitterURL,
        description,
        guildname,
        name,
        discordInviteURL,
        joinURL,
      } = editGuildFormInputs;

      let newLogoURL = logoURL;

      if (logoFile?.[0]) {
        try {
          const ipfsHash = await w3storage?.uploadFile(logoFile[0]);
          newLogoURL = `ipfs://${ipfsHash}`;
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
        joinURL,
        daos,
        websiteURL,
        discordAdminRoles: adminRoles.map((o) => o.value),
        discordMembershipRoles: membershipRoles.map((o) => o.value),
        type: type as unknown as GuildType_ActionEnum,
        uuid: guild.id,
        logoURL: newLogoURL,
      };

      const twitterGuildLink = {
        guildId: guild.id,
        name: 'Find Us On Twitter',
        url: twitterURL || '',
        type: 'TWITTER' as LinkType_Enum,
      };
      await addLink(twitterGuildLink);

      const discordGuildLink = {
        guildId: guild.id,
        name: 'Join Us On Discord',
        url: discordInviteURL || '',
        type: 'DISCORD' as LinkType_Enum,
      };
      await addLink(discordGuildLink);

      const githubGuildLink = {
        guildId: guild.id,
        name: 'Find Us On Github',
        url: githubURL || '',
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
    [guild, router, toast, updateGuild, addLink, w3storage],
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
