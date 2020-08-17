import { Avatar, Box, Heading } from '@metafam/ds';
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import Error from 'next/error';
import React from 'react';

import { PageContainer } from '../../components/Container';
import { getPlayer } from '../../graphql/getPlayer';
import { getPlayers } from '../../graphql/getPlayers';
import { getPlayerImage, getPlayerName } from '../../utils/playerHelpers';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PlayerPage: React.FC<Props> = ({ player }) => {
  if (!player) {
    return <Error statusCode={404} />;
  }

  return (
    <PageContainer>
      <Box>
        <Heading size="md" textAlign="center">
          {player.username}
        </Heading>
        <Avatar
          size="xl"
          src={getPlayerImage(player)}
          name={getPlayerName(player)}
        />
      </Box>
    </PageContainer>
  );
};

export default PlayerPage;

type QueryParams = { username: string };

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const players = await getPlayers();

  return {
    paths: players.map(({ username }) => ({
      params: { username },
    })),
    fallback: false,
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<QueryParams>,
) => {
  const username = context.params?.username;
  const player = await getPlayer(username);

  return {
    props: {
      player,
    },
  };
};
