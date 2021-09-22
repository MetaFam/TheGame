import { PageContainer } from 'components/Container';
import { getPlayer } from 'graphql/getPlayer';
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import React from 'react';

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
          destination: `/player/${username.toLowerCase()}`,
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

const EditPage: React.FC<Props> = ({ player }) => (
  <PageContainer>
    Edit page
    <br /> title: {player.type.title}
    <br /> description: {player.type.description}
  </PageContainer>
);

export default EditPage;
