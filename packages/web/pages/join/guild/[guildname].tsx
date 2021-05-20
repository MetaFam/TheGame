import { ConfirmModal, Flex, HStack, MetaButton, MetaHeading } from '@metafam/ds';
import { FlexContainer, PageContainer } from 'components/Container';
import { EditGuildFormInputs, GuildForm } from 'components/Guild/GuildForm';
import { GuildStatus_Enum } from 'graphql/autogen/types';
import { getGuild } from 'graphql/getGuild';
import { getGuildnames } from 'graphql/getGuilds';
import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import React, { useState } from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SetupGuild: React.FC<Props> = ({ guild }) => {
  const onSubmit = (data: EditGuildFormInputs) => {
    console.log(data);
  };

  const [exitAlert, setExitAlert] = useState<boolean>(false);

  const success = false;
  const fetching = false;

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

type QueryParams = { guildname: string };

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const guildnames = await getGuildnames(GuildStatus_Enum.Pending);

  return {
    paths: guildnames.map((guildname) => ({
      params: { guildname },
    })),
    fallback: true,
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<QueryParams>,
) => {
  const guildName = context.params?.guildname;
  const guild = await getGuild(guildName);

  console.log('guildname', guildName);

  if (guild == null) {
    return {
      redirect: {
        destination: '/join',
        permanent: false,
      },
    }
  }
  
  return {
    props: {
      guild,
    },
  };
};
