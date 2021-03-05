import { Box, Flex, LoadingState } from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { PlayerAchievements } from 'components/Player/Section/PlayerAchievements';
import { PlayerAddSection } from 'components/Player/Section/PlayerAddSection';
import { PlayerGallery } from 'components/Player/Section/PlayerGallery';
import { PlayerHero } from 'components/Player/Section/PlayerHero';
import { PlayerMemberships } from 'components/Player/Section/PlayerMemberships';
import { PlayerSkills } from 'components/Player/Section/PlayerSkills';
import { PlayerFragmentFragment } from 'graphql/autogen/types'
import { getPlayer } from 'graphql/getPlayer';
import { getPlayers } from 'graphql/getPlayers';
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import Error from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PlayerPage: React.FC<Props> = (
  ({ player }: { player: PlayerFragmentFragment }) => {
    const router = useRouter();

    // TODO Fake data should be saved in back-end
    const BOX_TYPE = {
      SKILLS: 'Skills',
      GALLERY: 'Gallery',
      MEMBERSHIPS: 'Memberships',
      ACHIEVEMENTS: 'Achievements',
    };
    const [boxAvailableList, setBoxAvailableList] = (
      React.useState<string[]>([])
    );
    const [canEdit] = React.useState(false);

    const [fakeData, setFakeData] = React.useState([
      [],
      [BOX_TYPE.MEMBERSHIPS, BOX_TYPE.SKILLS],
      [BOX_TYPE.GALLERY],
    ]);

    if (router.isFallback) {
      return <LoadingState />;
    }

    if (!player) {
      return <Error statusCode={404} />;
    }

    const addBox = (column: number, name: string) => {
      setBoxAvailableList(
        boxAvailableList.filter(box => box !== name)
      );
      const updatedFakeData = [...fakeData];
      updatedFakeData[column].push(name);
      setFakeData(updatedFakeData);
    };

    const removeBox = (column: number, name: string) => {
      setBoxAvailableList([...boxAvailableList, name]);
      const updatedFakeData = [...fakeData];
      updatedFakeData[column] = updatedFakeData[column].filter(
        (box) => box !== name,
      );
      setFakeData(updatedFakeData);
    };

    const getBox = (column: number, name: string): React.ReactNode => {
      switch (name) {
        case BOX_TYPE.SKILLS:
          return (
            <PlayerSkills
              player={player}
              onRemoveClick={() => removeBox(column, name)}
            />
          );
        case BOX_TYPE.GALLERY:
          return (
            <PlayerGallery
              player={player}
              onRemoveClick={() => removeBox(column, name)}
            />
          );
        case BOX_TYPE.MEMBERSHIPS:
          return (
            <PlayerMemberships
              player={player}
              onRemoveClick={() => removeBox(column, name)}
            />
          );
        default:
        case BOX_TYPE.ACHIEVEMENTS:
          return (
            <PlayerAchievements onRemoveClick={() => removeBox(column, name)} />
          );
      }
    };

    return (
      <PageContainer>
        <Head><title>MetaGame: @{player.username}</title></Head>
        <Flex
          align="center"
          direction={{ base: 'column', lg: 'row' }}
          alignItems="flex-start"
          maxWidth="7xl"
        >
          <Box
            width={{ base: '100%', lg: '33%' }}
            mr={{ base: 0, lg: 4 }}
          >
            <Box mb={6}>
              <PlayerHero player={player} />
            </Box>
            {(fakeData || [[], [], []])[0].map((name) => (
              <Box mb={6} key={name}>
                {getBox(0, name)}
              </Box>
            ))}
            {canEdit && (
              <PlayerAddSection
                boxList={boxAvailableList}
                setNewBox={name => addBox(0, name)}
                mb={6}
              />
            )}
          </Box>
          <Box
            width={{ base: '100%', lg: '66%' }}
            ml={{ base: 0, lg: 4 }}
          >
            <Box width="100%">
              <Flex
                align="center"
                direction={{ base: 'column', lg: 'row' }}
                alignItems="flex-start"
              >
                <Box
                  width={{ base: '100%', lg: '50%' }}
                  mr={{ base: 0, lg: 4 }}
                >
                  {(fakeData || [[], [], []])[1].map((name) => (
                    <Box mb={6} key={name}>
                      {getBox(1, name)}
                    </Box>
                  ))}
                  {canEdit && (
                    <PlayerAddSection
                      boxList={boxAvailableList}
                      setNewBox={name => addBox(1, name)}
                      mb={6}
                    />
                  )}
                </Box>
                <Box
                  width={{ base: '100%', lg: '50%' }}
                  ml={{ base: 0, lg: 4 }}
                >
                  {(fakeData || [[], [], []])[2].map((name) => (
                    <Box mb={6} key={name}>
                      {getBox(2, name)}
                    </Box>
                  ))}
                  {canEdit && (
                    <PlayerAddSection
                      boxList={boxAvailableList}
                      setNewBox={name => addBox(2, name)}
                      mb={6}
                    />
                  )}
                </Box>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </PageContainer>
    );
  }
);

export default PlayerPage;

type QueryParams = { username: string };

export const getStaticPaths: GetStaticPaths<QueryParams> = (
  async () => {
    const players = await getPlayers();

    return {
      paths: players.map(({ username }) => ({
        params: { username },
      })),
      fallback: true,
    };
  }
);

export const getStaticProps = async (
  context: GetStaticPropsContext<QueryParams>,
) => {
  const username = context.params?.username;
  const player = await getPlayer(username);

  return {
    props: {
      // must be JSON serializable
      player: player === undefined ? null : player,
    },
    revalidate: 1,
  };
};
