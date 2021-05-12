import { PageContainer } from 'components/Container';
import { PlayerList } from 'components/PlayerList';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import { getPlayers } from 'graphql/getPlayers';
import { InferGetStaticPropsType } from 'next';
import React from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const LIMIT = 50;
const TOTAL_PLAYERS = 150;

export const getStaticProps = async () => {
  const promises: Promise<PlayerFragmentFragment[]>[] = new Array(
    TOTAL_PLAYERS / LIMIT,
  )
    .fill(false)
    .map((_, i) => getPlayers(LIMIT, i * LIMIT));
  const playersArr = await Promise.all(promises);
  const players = playersArr.reduce(
    (_total, _players) => [..._total, ..._players],
    [],
  );
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
