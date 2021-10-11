import { SetupPersonalityType } from 'components/Setup/SetupPersonalityType';
import { SetupProfile } from 'components/Setup/SetupProfile';
import { SetupContextProvider } from 'contexts/SetupContext';
import React from 'react';

const PersonalityTypeSetup: React.FC = () => (
  <SetupContextProvider>
    <SetupProfile>
      <SetupPersonalityType />
    </SetupProfile>
  </SetupContextProvider>
);
export default PersonalityTypeSetup;
