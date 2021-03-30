import { PageContainer } from 'components/Container';
import { GuildList } from 'components/GuildList';
import { GuildStatus_Enum } from 'graphql/autogen/types';
import { getGuilds } from 'graphql/getGuilds';
import { InferGetStaticPropsType } from 'next';
import React from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const guilds = await getGuilds([GuildStatus_Enum.Legacy, GuildStatus_Enum.Active]);
  return {
    props: {
      guilds,
    },
    revalidate: 1,
  };
};

const GuildsPage: React.FC<Props> = ({ guilds }) => (
  <PageContainer>
    <GuildList guilds={guilds} />
  </PageContainer>
);

export default GuildsPage;
