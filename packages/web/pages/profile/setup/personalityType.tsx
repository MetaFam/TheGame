import { SetupPersonalityType } from 'components/Setup/SetupPersonalityType';
import { SetupProfile } from 'components/Setup/SetupProfile';
import { SetupContextProvider } from 'contexts/SetupContext';
import { InferGetStaticPropsType } from 'next';
import React from 'react';

export const getStaticProps = async () => ({
  props: {
    hideTopMenu: true,
  },
});

export type DefaultSetupProps = InferGetStaticPropsType<typeof getStaticProps>;

const PersonalityTypeSetup: React.FC<DefaultSetupProps> = () => (
  <SetupContextProvider>
    <SetupProfile>
      <SetupPersonalityType />
    </SetupProfile>
  </SetupContextProvider>
);

export default PersonalityTypeSetup;
