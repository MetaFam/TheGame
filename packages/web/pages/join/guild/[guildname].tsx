import { ConfirmModal, Flex, HStack, MetaButton, MetaHeading } from '@metafam/ds';
import { FlexContainer, PageContainer } from 'components/Container';
import { EditGuildFormInputs, GuildForm } from 'components/Guild/GuildForm';
import { getGuild } from 'graphql/getGuild';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import React, { useState } from 'react';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

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

export const getServerSideProps = async (
  context: GetServerSidePropsContext<QueryParams>,
) => {
  const guildName = context.params?.guildname;
  const guild = await getGuild(guildName);

  if (guild == null) {
    return {
      redirect: {
        destination: '/',
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
