import { Container, MetaBox, SimpleGrid, Text } from '@metafam/ds';
import { PageHeader } from 'components/PageHeader';
import { PlayerFeatures } from 'components/Player/PlayerFeatures';
import { PlayerHero } from 'components/Player/PlayerHero';
import { getPlayer } from 'graphql/getPlayer';
import { getPlayers } from 'graphql/getPlayers';
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import Error from 'next/error';
import React from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PlayerPage: React.FC<Props> = ({ player }) => {
  if (!player) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <PageHeader />
      <PlayerHero player={player} />
      <PlayerFeatures player={player} />
      <Container maxW="xl">
        <SimpleGrid columns={[1, 1, 2, 3]} spacing="8" pt="12">
          <MetaBox title="About me">
            <Text fontFamily="body" fontSize="2xl" fontWeight="bold" mb={4}>
              Box 1
            </Text>
          </MetaBox>
          <MetaBox title="Skills">
            <Text fontFamily="body" fontSize="2xl" fontWeight="bold" mb={4}>
              Box 2
            </Text>
          </MetaBox>
          <MetaBox title="Memberships">
            <Text fontFamily="body" fontSize="2xl" fontWeight="bold" mb={4}>
              Box 3
            </Text>
          </MetaBox>
        </SimpleGrid>
      </Container>
    </>
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
