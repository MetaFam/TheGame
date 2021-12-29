import { SetupProfile } from 'components/Setup/SetupProfile';
import { SetupTimeZone } from 'components/Setup/SetupTimeZone';
import { SetupContextProvider } from 'contexts/SetupContext';
import { InferGetStaticPropsType } from 'next';
import React from 'react';

export const getStaticProps = async () => ({
  props: {
    hideTopMenu: true,
  },
});

export type DefaultSetupProps = InferGetStaticPropsType<typeof getStaticProps>;

const TimeZoneSetup: React.FC<DefaultSetupProps> = () => (
  <SetupContextProvider>
    <SetupProfile>
      <SetupTimeZone />
    </SetupProfile>
  </SetupContextProvider>
);
export default TimeZoneSetup;
