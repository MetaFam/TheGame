import { SetupProfile } from 'components/Setup/SetupProfile';
import { SetupPronouns } from 'components/Setup/SetupPronouns';
import { SetupContextProvider } from 'contexts/SetupContext';
import { InferGetStaticPropsType } from 'next';
import React from 'react';

export const getStaticProps = async () => ({
  props: {
    hideTopMenu: true,
  },
});

export type DefaultSetupProps = InferGetStaticPropsType<typeof getStaticProps>;

const PronounsSetup: React.FC<DefaultSetupProps> = () => (
  <SetupContextProvider>
    <SetupProfile>
      <SetupPronouns />
    </SetupProfile>
  </SetupContextProvider>
);

export default PronounsSetup;
