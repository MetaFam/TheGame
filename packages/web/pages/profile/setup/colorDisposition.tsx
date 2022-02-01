import { SetupColorDisposition } from 'components/Setup/SetupColorDisposition';
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

const ColorDispositionSetup: React.FC<DefaultSetupProps> = () => (
  <SetupContextProvider>
    <SetupProfile>
      <SetupColorDisposition />
    </SetupProfile>
  </SetupContextProvider>
);

export default ColorDispositionSetup;
