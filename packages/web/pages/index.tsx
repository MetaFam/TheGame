import { PageContainer } from 'components/Container';
import { PlayerList } from 'components/PlayerList';
import { getPlayers } from 'graphql/getPlayers';
import { InferGetStaticPropsType } from 'next';
import React from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const players = await getPlayers();
  return {
    props: {
      players,
    },
    revalidate: 1,
  };
};

const Home: React.FC<Props> = ({ players }) => (
  <PageContainer>
    <PlayerList players={players} />
  </PageContainer>
);

export default Home;
