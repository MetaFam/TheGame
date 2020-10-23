import {
  Container,
  HStack,
  Image,
  MetaBox,
  MetaTag,
  P,
  SimpleGrid,
  Text,
  Wrap,
} from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { PlayerFeatures } from 'components/Player/PlayerFeatures';
import { PlayerHero } from 'components/Player/PlayerHero';
import { getPlayer } from 'graphql/getPlayer';
import { getPlayers } from 'graphql/getPlayers';
import { PersonalityTypes, SkillColors } from 'graphql/types';
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import Error from 'next/error';
import React from 'react';
import { getPlayerDescription } from 'utils/playerHelpers';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PlayerPage: React.FC<Props> = ({ player }) => {
  if (!player) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <PlayerHero player={player} />
      <PlayerFeatures player={player} />
      <Container maxW="xl">
        <SimpleGrid columns={[1, 1, 2, 3]} spacing="8" pt="12">
          <MetaBox title="About me">
            <P>{getPlayerDescription(player)}</P>
            {player.EnneagramType ? (
              <HStack p={6} spacing={4}>
                <Image
                  w="4rem"
                  src={PersonalityTypes[player.EnneagramType.name].image}
                  alt={player.EnneagramType.name}
                  style={{ mixBlendMode: 'color-dodge' }}
                />
                <FlexContainer align="stretch">
                  <Text color="white" fontWeight="bold">
                    {player.EnneagramType.name}
                  </Text>
                  <Text color="blueLight">
                    {player.EnneagramType.description}
                  </Text>
                </FlexContainer>
              </HStack>
            ) : null}
          </MetaBox>
          {player.Player_Skills.length ? (
            <MetaBox title="Skills">
              <Wrap>
                {player.Player_Skills.map(({ Skill }) => (
                  <MetaTag
                    key={Skill.id}
                    size="md"
                    fontWeight="normal"
                    backgroundColor={SkillColors[Skill.category]}
                  >
                    {Skill.name}
                  </MetaTag>
                ))}
              </Wrap>
            </MetaBox>
          ) : null}
          {player.daohausMemberships.length ? (
            <MetaBox title="Memberships">
              <Wrap>
                {player.daohausMemberships.map((member) => (
                  <MetaTag key={member.id} size="md" fontWeight="normal">
                    {member.moloch.title}
                  </MetaTag>
                ))}
              </Wrap>
            </MetaBox>
          ) : null}
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
    fallback: true,
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
    revalidate: 10,
  };
};
