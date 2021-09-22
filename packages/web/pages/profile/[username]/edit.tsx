import { PageContainer } from 'components/Container';
import { getPlayer } from 'graphql/getPlayer';
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import React from 'react';

import PlayerSkills from './Section/Skills';

type QueryParams = { username: string };

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps = async (
  context: GetStaticPropsContext<QueryParams>,
) => {
  const username = context.params?.username;

  if (username == null) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  let player = await getPlayer(username);
  if (player == null) {
    player = await getPlayer(username.toLowerCase());
    if (player != null) {
      return {
        redirect: {
          destination: `/profile/${username.toLowerCase()}/edit`,
          permanent: false,
        },
      };
    }
  }

  return {
    props: {
      player: player || null,
    },
    revalidate: 1,
  };
};

const EditPage: React.FC<Props> = ({ player }) => {
  console.log('player', player);

  return (
    <PageContainer>
      Main info:
      <br /> Username:
      <br /> {player.username} <br />
      <br /> Time zone:
      <br /> hours: {player.timezone} <br />
      <br /> Availability:
      <br /> hours: {player.availability_hours} <br />
      <br /> Residence:
      <br />
      <br /> Working hours:
      <br />
      <br />
      <br />
      Secondary info:
      <br /> Personality type:
      <br /> title: {player.type.title}
      <br /> description: {player.type.description} <br />
      <br /> Player type:
      <br /> title: {player.color_aspect.name}
      <br /> description: {player.color_aspect.description} <br />
      <br /> Top 3 skills:
      <PlayerSkills player={player} />
      <br />
    </PageContainer>
  );
};

export default EditPage;
