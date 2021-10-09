import { MetaHeading, Text } from '@metafam/ds';
import { SetupPlayerType } from 'components/Setup/SetupPlayerType';
import { SetupProfile } from 'components/Setup/SetupProfile';
import { SetupContextProvider } from 'contexts/SetupContext';
import React from 'react';

const PlayerTypeSetup: React.FC = () => (
  <SetupContextProvider>
    <MetaHeading mb={5} textAlign="center">
      Player Type
    </MetaHeading>
    <Text mb={10}>
      Please read the features of each player type below. And select the one
      that suits you best.
    </Text>
    <SetupProfile>
      <SetupPlayerType />
    </SetupProfile>
  </SetupContextProvider>
);

export default PlayerTypeSetup;
