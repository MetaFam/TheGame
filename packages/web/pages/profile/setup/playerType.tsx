import { SetupPlayerType } from 'components/Setup/SetupPlayerType';
import { SetupProfile } from 'components/Setup/SetupProfile';
import { SetupContextProvider } from 'contexts/SetupContext';
import React from 'react';

const PlayerTypeSetup: React.FC = () => (
  <SetupContextProvider>
    <SetupProfile>
      <SetupPlayerType />
    </SetupProfile>
  </SetupContextProvider>
);

export default PlayerTypeSetup;
