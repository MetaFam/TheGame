import { SetupPlayerType } from 'components/Setup/SetupPlayerType';
import { SetupProfile } from 'components/Setup/SetupProfile';
import { SetupContextProvider } from 'contexts/SetupContext';
import { Player_Type } from 'graphql/autogen/types';
import { getPlayerTypes } from 'graphql/getPlayerTypes';
import { useUser } from 'lib/hooks';
import { InferGetStaticPropsType } from 'next';
import React, { useState } from 'react';

export const getStaticProps = async () => {
  const playerTypeChoices = await getPlayerTypes();

  return {
    props: {
      playerTypeChoices,
      hideAppDrawer: true
    }
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PlayerTypeSetup: React.FC<Props> = (props) => {
  const {playerTypeChoices} = props;
  const [playerType, setPlayerType] = useState<Player_Type>();
  const { user } = useUser({ redirectTo: '/' });
  
  if (user?.player) {
    const {player} = user;
    if (player.playerType && !playerType) {
      setPlayerType(player.playerType);
    }
  }

  return (
    <SetupContextProvider>
      <SetupProfile>
        <SetupPlayerType 
          playerTypeChoices={playerTypeChoices} 
          playerType={playerType} 
          setPlayerType={setPlayerType} />
      </SetupProfile>
    </SetupContextProvider>
  );
};
export default PlayerTypeSetup;
