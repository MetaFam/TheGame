import {
  ConfirmModal,
  Flex,
  HStack,
  MetaButton,
  MetaHeading,
  useToast,
} from '@metafam/ds';
import { FlexContainer, PageContainer } from 'components/Container';
import { EditGuildFormInputs, GuildForm } from 'components/Guild/GuildForm';
import {
  GuildFragmentFragment,
  GuildInfo,
  GuildType_ActionEnum,
  useUpdateGuildMutation,
} from 'graphql/autogen/types';
import { getGuild } from 'graphql/getGuild';
import { useGetGuildMetadata } from 'lib/hooks/guilds';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const SetupGuild: React.FC = () => {
  const router = useRouter();

  const [guild, setGuild] = useState<GuildFragmentFragment | undefined>();
  const [exitAlert, setExitAlert] = useState<boolean>(false);
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

  const { discordRoles } = useGetGuildMetadata(guild?.id);

  if (guild == null) {
    return <></>;
  }

  const onSubmit = async (data: EditGuildFormInputs) => {
    const { type, ...otherInputs } = data;
    const payload: GuildInfo = {
      ...otherInputs,
      type: (type as unknown) as GuildType_ActionEnum,
      uuid: guild.id,
    };

    const response = await updateGuild({ guildInfo: payload });

    const saveGuildResponse = response.data?.saveGuildInformation;
    if (saveGuildResponse?.success) {
      router.push('/');
      toast({
        title: 'Guild information submitted',
        description: 'Please allow a few days to review your guild information',
        status: 'success',
        isClosable: true,
        duration: 4000,
      });
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
            allDiscordRoles={discordRoles}
            onSubmit={onSubmit}
          >
            <HStack justify="space-between" mt={10} w="100%">
              <MetaButton
                isLoading={updateGuildState.fetching}
                loadingText="Submitting information..."
                type="submit"
                isDisabled={
                  !!updateGuildState.data?.saveGuildInformation?.success
                }
              >
                Submit guild information
              </MetaButton>
              <MetaButton
                variant="outline"
                onClick={() => setExitAlert(true)}
                isDisabled={
                  updateGuildState.fetching ||
                  !!updateGuildState.data?.saveGuildInformation?.success
                }
              >
                Cancel
              </MetaButton>
            </HStack>
          </GuildForm>
        </Flex>
      </FlexContainer>
      <ConfirmModal
        isOpen={exitAlert}
        onNope={() => setExitAlert(false)}
        onYep={() => setExitAlert(false)}
        header="Are you sure you want to leave ?"
      />
    </PageContainer>
  );
};

export default SetupGuild;
