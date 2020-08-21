import {
  Avatar,
  Box,
  Flex,
  MetaBox,
  MetaTag,
  SimpleGrid,
  Text,
} from '@metafam/ds';
import { MaxWidthContainer } from 'components/Container';
import { PageHeader } from 'components/PageHeader';
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import Error from 'next/error';
import React from 'react';

import { getPlayer } from '../../graphql/getPlayer';
import { getPlayers } from '../../graphql/getPlayers';
import BackgroundImage from '../../public/images/login-background.jpg';
import { getPlayerImage, getPlayerName } from '../../utils/playerHelpers';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PlayerPage: React.FC<Props> = ({ player }) => {
  if (!player) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <PageHeader />
      <Box bgImage={`url(${BackgroundImage})`} h="230px" mb="1.5rem">
        <MaxWidthContainer>
          <Flex pos="relative" top="4.5rem" align="center">
            <Avatar
              size="3xl"
              w="12.5rem"
              h="12.5rem"
              src={getPlayerImage(player)}
              name={getPlayerName(player)}
            />

            <Box pl="2.5rem" mt="-2rem">
              <Text fontSize="xl" fontFamily="heading" mb="0.25rem">
                {getPlayerName(player)}
              </Text>
              <Text fontFamily="body" fontSize="md" textTransform="uppercase">
                Personality type
              </Text>
              <Box mt="4">
                <MetaTag
                  backgroundColor={player.rank?.toLowerCase()}
                  mr="3"
                  size="md"
                  color="blackAlpha.600"
                >
                  {player.rank}
                </MetaTag>
                <MetaTag size="md">XP: {Math.floor(player.totalXp)}</MetaTag>
              </Box>
            </Box>
          </Flex>
        </MaxWidthContainer>
      </Box>
      <MaxWidthContainer>
        <SimpleGrid columns={[1, 1, 2, 3]} spacing="2rem" pt="3rem">
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
      </MaxWidthContainer>
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
