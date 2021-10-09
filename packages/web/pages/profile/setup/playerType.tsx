import { SetupPlayerType } from 'components/Setup/SetupPlayerType';
import { SetupProfile } from 'components/Setup/SetupProfile';
import { SetupContextProvider } from 'contexts/SetupContext';
import { Player_Type } from 'graphql/autogen/types';
import { useUser } from 'lib/hooks';
import React, { useState } from 'react';

const PlayerTypeSetup: React.FC = () => {
  const [playerType, setPlayerType] = useState<Player_Type>();
  const { user } = useUser({ redirectTo: '/' });

  if (user?.player) {
    const { player } = user;
    if (player.type && !playerType) {
      setPlayerType(player.type);
    }
  }

  return (
    <SetupContextProvider>
      <SetupProfile>
        <SetupPlayerType
          playerType={playerType}
          setPlayerType={setPlayerType}
        />
      </SetupProfile>
    </SetupContextProvider>
  );
};
export default PlayerTypeSetup;
