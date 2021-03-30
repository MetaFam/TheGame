import { PageContainer } from 'components/Container';
import { GuildJoinSetup } from 'components/Guild/GuildJoinSetup';
import { GuildStatus_Enum } from 'graphql/autogen/types';
import { getGuild } from 'graphql/getGuild';
import { getGuilds } from 'graphql/getGuilds';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import React from 'react';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const SetupGuild: React.FC<Props> = ({ legacyGuilds, guild }) => (
  <PageContainer>
    <GuildJoinSetup legacyGuilds={legacyGuilds} guild={guild} />
  </PageContainer>
);

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

  const legacyGuilds = await getGuilds(GuildStatus_Enum.Legacy);
  
  return {
    props: {
      guild,
      legacyGuilds,
    },
  };
};
