import { Box, Container, Flex } from '@metafam/ds';
import BackgroundImage from 'assets/profile-background.jpg';
import { PlayerHero } from 'components/Player/Box/PlayerHero';
import { getPlayer } from 'graphql/getPlayer';
import { getPlayers } from 'graphql/getPlayers';
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import Error from 'next/error';
import React from 'react';

import { PlayerAchievements } from '../../components/Player/Box/PlayerAchievements';
import { PlayerAddBox } from '../../components/Player/Box/PlayerAddBox';
import { PlayerCollab } from '../../components/Player/Box/PlayerCollab';
import { PlayerContactButtons } from '../../components/Player/Box/PlayerContactButtons';
import { PlayerGallery } from '../../components/Player/Box/PlayerGallery';
import { PlayerMemberships } from '../../components/Player/Box/PlayerMemberships';
import { PlayerSkills } from '../../components/Player/Box/PlayerSkills';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PlayerPage: React.FC<Props> = ({ player }) => {
  // TODO Fake data should be saved in back-end
  const BOX_TYPE = {
    PLAYER_SKILLS: 'Skills',
    PLAYER_CONTACT_BUTTONS: 'Contact',
    PLAYER_GALLERY: 'Gallery',
    PLAYER_MEMBERSHIPS: 'Memberships',
    PLAYER_ACHIEVEMENTS: 'Achievements',
  };
  const [boxAvailableList, setBoxAvailableList] = React.useState<string[]>([]);
  const [fakeData, setFakeData] = React.useState([
    [BOX_TYPE.PLAYER_SKILLS, BOX_TYPE.PLAYER_CONTACT_BUTTONS],
    [BOX_TYPE.PLAYER_MEMBERSHIPS],
    [BOX_TYPE.PLAYER_GALLERY],
  ]);

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
            setRemoveBox={() => removeBox(column, name)}
          />
        );
      case BOX_TYPE.PLAYER_CONTACT_BUTTONS:
        return (
          <PlayerContactButtons
            player={player}
            setRemoveBox={() => removeBox(column, name)}
          />
        );
      case BOX_TYPE.PLAYER_GALLERY:
        return (
          <PlayerGallery
            player={player}
            setRemoveBox={() => removeBox(column, name)}
          />
        );
      case BOX_TYPE.PLAYER_MEMBERSHIPS:
        return (
          <PlayerMemberships
            player={player}
            setRemoveBox={() => removeBox(column, name)}
          />
        );
      default:
      case BOX_TYPE.PLAYER_ACHIEVEMENTS:
        return (
          <PlayerAchievements setRemoveBox={() => removeBox(column, name)} />
        );
    }
  };

  return (
    // TODO Should be a custom background and maybe on app level(with the header)
    <Container
      maxW="100%"
      bgImage={`url(${BackgroundImage})`}
      backgroundSize="cover"
      mt={4}
    >
      <Container maxW="xl">
        <Flex
          align="center"
          direction={['column', null, null, 'row']}
          alignItems="flex-start"
        >
          <Box width={['100%', null, null, '33%']} mr={[0, null, null, 4]}>
            <Box mb="6">
              <PlayerHero player={player} />
            </Box>
            {(fakeData || [[], [], []])[0].map((name) => (
              <Box mb="6" key={name}>
                {getBox(0, name)}
              </Box>
            ))}
            <Box mb="6">
              <PlayerAddBox
                boxList={boxAvailableList}
                setNewBox={(name) => addBox(0, name)}
              />
            </Box>
          </Box>
          <Box
            width={['100%', null, null, '66%']}
            ml={[0, null, null, 4]}
            mt="200px"
          >
            <Box width="100%">
              <Box mb="6">
                <PlayerCollab player={player} />
              </Box>
              <Flex
                align="center"
                direction={['column', null, null, 'row']}
                alignItems="flex-start"
              >
                <Box
                  width={['100%', null, null, '50%']}
                  mr={[0, null, null, 4]}
                >
                  {(fakeData || [[], [], []])[1].map((name) => (
                    <Box mb="6" key={name}>
                      {getBox(1, name)}
                    </Box>
                  ))}
                  <Box mb="6">
                    <PlayerAddBox
                      boxList={boxAvailableList}
                      setNewBox={(name) => addBox(1, name)}
                    />
                  </Box>
                </Box>
                <Box
                  width={['100%', null, null, '50%']}
                  ml={[0, null, null, 4]}
                >
                  {(fakeData || [[], [], []])[2].map((name) => (
                    <Box mb="6" key={name}>
                      {getBox(2, name)}
                    </Box>
                  ))}
                  <Box mb="6">
                    <PlayerAddBox
                      boxList={boxAvailableList}
                      setNewBox={(name) => addBox(2, name)}
                    />
                  </Box>
                </Box>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Container>
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
