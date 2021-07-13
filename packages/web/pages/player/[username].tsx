import { Box, Flex, LoadingState } from '@metafam/ds';
import { PlayerHero } from 'components/Player/Section/PlayerHero';
import { getPlayer } from 'graphql/getPlayer';
import { getTopPlayerUsernames } from 'graphql/getPlayers';
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import Error from 'next/error';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { PageContainer } from '../../components/Container';
import { PlayerAchievements } from '../../components/Player/Section/PlayerAchievements';
import { PlayerAddSection } from '../../components/Player/Section/PlayerAddSection';
import { PlayerGallery } from '../../components/Player/Section/PlayerGallery';
import { PlayerMemberships } from '../../components/Player/Section/PlayerMemberships';
import { PlayerSkills } from '../../components/Player/Section/PlayerSkills';
import { HeadComponent } from '../../components/Seo';
import {
  getPlayerDescription,
  getPlayerImage,
} from '../../utils/playerHelpers';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PlayerPage: React.FC<Props> = ({ player }) => {
  const router = useRouter();

  // TODO Fake data should be saved in back-end
  const BOX_TYPE = {
    PLAYER_SKILLS: 'Skills',
    PLAYER_GALLERY: 'Gallery',
    PLAYER_MEMBERSHIPS: 'Memberships',
    PLAYER_ACHIEVEMENTS: 'Achievements',
  };
  const [boxAvailableList, setBoxAvailableList] = useState<string[]>([]);
  const [canEdit] = useState(false);

  const [fakeData, setFakeData] = useState([
    [],
    [BOX_TYPE.PLAYER_MEMBERSHIPS, BOX_TYPE.PLAYER_SKILLS],
    [BOX_TYPE.PLAYER_GALLERY],
  ]);

  if (router.isFallback) {
    return (
      <PageContainer>
        <LoadingState />
      </PageContainer>
    );
  }

  if (!player) {
    return <Error statusCode={404} />;
  }

  const addBox = (column: number, name: string) => {
    setBoxAvailableList(boxAvailableList.filter((box) => box !== name));
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
      case BOX_TYPE.PLAYER_SKILLS:
        return (
          <PlayerSkills
            player={player}
            onRemoveClick={() => removeBox(column, name)}
          />
        );
      case BOX_TYPE.PLAYER_GALLERY:
        return (
          <PlayerGallery
            player={player}
            onRemoveClick={() => removeBox(column, name)}
          />
        );
      case BOX_TYPE.PLAYER_MEMBERSHIPS:
        return (
          <PlayerMemberships
            player={player}
            onRemoveClick={() => removeBox(column, name)}
          />
        );
      default:
      case BOX_TYPE.PLAYER_ACHIEVEMENTS:
        return (
          <PlayerAchievements onRemoveClick={() => removeBox(column, name)} />
        );
    }
  };

  return (
    <PageContainer p={[8, null, null, 12]}>
      <HeadComponent
        title={`Metagame profile for ${player.username}`}
        description={getPlayerDescription(player).replace('\n', ' ')}
        url={`https://my.metagame.wtf/player/${player.username}`}
        img={getPlayerImage(player)}
      />
      <Flex
        align="center"
        direction={{ base: 'column', md: 'row' }}
        alignItems="flex-start"
        maxWidth="7xl"
      >
        <Box
          width={{ base: '100%', md: '50%', lg: '33%' }}
          mr={{ base: 0, md: 4 }}
        >
          <Box mb="6">
            <PlayerHero player={player} />
          </Box>
          {(fakeData || [[], [], []])[0].map((name) => (
            <Box mb="6" key={name}>
              {getBox(0, name)}
            </Box>
          ))}
          {canEdit ? (
            <PlayerAddSection
              boxList={boxAvailableList}
              setNewBox={(name) => addBox(0, name)}
              mb={6}
              display={{ base: 'none', md: 'flex' }}
            />
          ) : null}
        </Box>
        <Box
          width={{ base: '100%', md: '50%', lg: '66%' }}
          ml={{ base: 0, md: 4 }}
        >
          <Box width="100%">
            <Flex
              align="center"
              direction={{ base: 'column', lg: 'row' }}
              alignItems="flex-start"
            >
              <Box width={{ base: '100%', lg: '50%' }} mr={{ base: 0, lg: 4 }}>
                {(fakeData || [[], [], []])[1].map((name) => (
                  <Box mb="6" key={name}>
                    {getBox(1, name)}
                  </Box>
                ))}
                {canEdit ? (
                  <PlayerAddSection
                    boxList={boxAvailableList}
                    setNewBox={(name) => addBox(1, name)}
                    mb={6}
                    display={{ base: 'none', lg: 'flex' }}
                  />
                ) : null}
              </Box>
              <Box width={{ base: '100%', lg: '50%' }} ml={{ base: 0, lg: 4 }}>
                {(fakeData || [[], [], []])[2].map((name) => (
                  <Box mb="6" key={name}>
                    {getBox(2, name)}
                  </Box>
                ))}
                {canEdit ? (
                  <PlayerAddSection
                    boxList={boxAvailableList}
                    setNewBox={(name) => addBox(2, name)}
                    mb={6}
                  />
                ) : null}
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </PageContainer>
  );
};

export default PlayerPage;

type QueryParams = { username: string };

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const playerUsernames = await getTopPlayerUsernames();

  return {
    paths: playerUsernames.map((username) => ({
      params: { username },
    })),
    fallback: true,
  };
};

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
