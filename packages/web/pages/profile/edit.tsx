import { PageContainer } from 'components/Container';
import { getPlayer } from 'graphql/getPlayer';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import React from 'react';

type QueryParams = { username: string };

type Props = InferGetStaticPropsType<typeof getStaticProps>;

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
      player: player || null, // must be serializable
    },
    revalidate: 1,
  };
};

const PatronsPage: React.FC<Props> = () => (
  <PageContainer>Edit page</PageContainer>
);

export default PatronsPage;
