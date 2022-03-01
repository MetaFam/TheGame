import { SetupDone } from 'components/Setup/SetupDone';
import { SetupProfile } from 'components/Setup/SetupProfile';
import { SetupContextProvider } from 'contexts/SetupContext';
import React from 'react';

const SetupComplete: React.FC = () => (
  <SetupContextProvider>
    <SetupProfile>
      <SetupDone />
    </SetupProfile>
  </SetupContextProvider>
);
export default SetupComplete;
