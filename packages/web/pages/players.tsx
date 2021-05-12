import { PageContainer } from 'components/Container';
import { PlayerList } from 'components/PlayerList';
import { getTopPlayers } from 'graphql/getPlayers';
import { InferGetStaticPropsType } from 'next';
import React from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const players = await getTopPlayers();
  return {
    props: {
      players,
    },
    revalidate: 1,
  };
};

const Players: React.FC<Props> = ({ players }) => (
  <PageContainer>
    <PlayerList players={players} />
  </PageContainer>
);

export default Players;
