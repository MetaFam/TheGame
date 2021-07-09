import {
  ConfirmModal,
  Flex,
  HStack,
  MetaButton,
  MetaHeading,
} from '@metafam/ds';
import { FlexContainer, PageContainer } from 'components/Container';
import { EditGuildFormInputs, GuildForm } from 'components/Guild/GuildForm';
import { GuildFragmentFragment } from 'graphql/autogen/types';
import { getGuild } from 'graphql/getGuild';
import { useGetGuildMetadata } from 'lib/hooks/guilds';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const SetupGuild: React.FC = () => {
  const router = useRouter();

  const [guild, setGuild] = useState<GuildFragmentFragment | undefined>();
  const [exitAlert, setExitAlert] = useState<boolean>(false);

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

  const onSubmit = (data: EditGuildFormInputs) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  const success = false;
  const fetching = false;

  if (guild == null) {
    return <></>;
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
            <HStack justify="space-between" mt={4} w="100%">
              <MetaButton
                variant="outline"
                colorScheme="pink"
                onClick={() => setExitAlert(true)}
                isDisabled={fetching || success}
              >
                Cancel
              </MetaButton>
              <MetaButton
                mt={10}
                isLoading={fetching}
                loadingText="Submitting information..."
                type="submit"
                isDisabled={success}
              >
                Submit guild information
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
