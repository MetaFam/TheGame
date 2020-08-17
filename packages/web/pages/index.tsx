import { Avatar, Box, Flex, Heading, MetaTag, Stack } from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { MetaLink } from 'components/Link';
import { getPlayers } from 'graphql/getPlayers';
import { InferGetStaticPropsType } from 'next';
import React from 'react';

import BackgroundImage from '../public/images/login-background.jpg';
import { getPlayerImage, getPlayerName } from '../utils/playerHelpers';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const players = await getPlayers();
  return {
    props: {
      players,
    },
  };
};

const Home: React.FC<Props> = ({ players }) => (
  <PageContainer backgroundImage={`url(${BackgroundImage})`}>
    <Stack direction="column" spacing="8">
      {players.map((p) => (
        <MetaLink
          as={`/player/${p.username}`}
          href="player/[username]"
          key={p.id}
          flex={1}
        >
          <Flex key={p.id} dir="row" align="center">
            <Avatar
              size="lg"
              src={getPlayerImage(p)}
              name={getPlayerName(p)}
              mr="6"
            />
            <Box>
              <Heading size="xs">{getPlayerName(p)}</Heading>
              <Box mt="4">
                <MetaTag
                  backgroundColor={p.rank?.toLowerCase()}
                  mr="3"
                  size="md"
                  color="dark60"
                >
                  {p.rank}
                </MetaTag>
                <MetaTag size="md">XP: {Math.floor(p.totalXp)}</MetaTag>
              </Box>
            </Box>
          </Flex>
        </MetaLink>
      ))}
    </Stack>
  </PageContainer>
);

export default Home;
