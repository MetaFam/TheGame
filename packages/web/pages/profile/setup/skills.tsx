import { SetupProfile } from 'components/Setup/SetupProfile';
import { SetupSkills } from 'components/Setup/SetupSkills';
import { SetupContextProvider } from 'contexts/SetupContext';
import React from 'react';

const SkillsSetup: React.FC = () => (
  <SetupContextProvider>
    <SetupProfile>
      <SetupSkills />
    </SetupProfile>
  </SetupContextProvider>
);

export default SkillsSetup;
