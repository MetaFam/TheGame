import { PageContainer } from 'components/Container';
import { GuildList } from 'components/Guild/GuildList';
import { HeadComponent } from 'components/Seo';
import { getGuilds } from 'graphql/queries/guild';
import { InferGetStaticPropsType } from 'next';
import React from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const guilds = await getGuilds();
  return {
    props: {
      guilds,
    },
    revalidate: 1,
  };
};

const GuildsPage: React.FC<Props> = ({ guilds }) => (
  <PageContainer>
    <HeadComponent
      title="Metagame's Guilds"
      description="Metagame is a Massive Online Coordination Game! Guilds participating in Metagame...."
      url="https://my.metagame.wtf/guilds"
    />
    <GuildList guilds={guilds} />
  </PageContainer>
);

export default GuildsPage;
