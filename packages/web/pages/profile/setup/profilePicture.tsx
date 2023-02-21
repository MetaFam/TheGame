import { SetupProfile } from 'components/Setup/SetupProfile';
import { SetupProfilePicture } from 'components/Setup/SetupProfilePicture';
import { SetupContextProvider } from 'contexts/SetupContext';
import { InferGetStaticPropsType } from 'next';
import React from 'react';

export const getStaticProps = async () => ({
  props: {
    hideTopMenu: true,
  },
});

export type DefaultSetupProps = InferGetStaticPropsType<typeof getStaticProps>;

const DescriptionSetup: React.FC<DefaultSetupProps> = () => (
  <SetupContextProvider>
    <SetupProfile>
      <SetupProfilePicture />
    </SetupProfile>
  </SetupContextProvider>
);

export default DescriptionSetup;
