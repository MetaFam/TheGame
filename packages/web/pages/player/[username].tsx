import {
  Container,
  MetaBox,
  MetaTag,
  MetaTheme,
  P,
  SimpleGrid,
  Wrap,
} from '@metafam/ds';
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
import { getPlayerDescription } from 'utils/playerHelpers';

import { SkillCategory_Enum } from '../../graphql/autogen/types';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SkillColors: Record<SkillCategory_Enum, string> = {
  [SkillCategory_Enum.Community]: MetaTheme.colors.green['700'],
  [SkillCategory_Enum.Design]: MetaTheme.colors.pink['700'],
  [SkillCategory_Enum.Dev]: MetaTheme.colors.cyan['700'],
  [SkillCategory_Enum.Engineering]: MetaTheme.colors.blue['700'],
  [SkillCategory_Enum.Technologies]: MetaTheme.colors.gray['600'],
  [SkillCategory_Enum.Strategy]: MetaTheme.colors.yellow['700'],
};

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
          </MetaBox>
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
          <MetaBox title="Memberships">
            <Wrap>
              {player.daohausMemberships.map((member) => (
                <MetaTag key={member.id} size="md" fontWeight="normal">
                  {member.moloch.title}
                </MetaTag>
              ))}
            </Wrap>
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
