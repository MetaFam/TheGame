import { PageContainer } from 'components/Container';
import { GuildJoin } from 'components/Guild/GuildJoin';
import { InferGetStaticPropsType } from 'next';
import React from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  return {
    props: {
      hideAppDrawer: false
    }
  };
};

const SetupGuild: React.FC<Props> = () => (
  <PageContainer>
    <GuildJoin />
  </PageContainer>
);

export default SetupGuild;
