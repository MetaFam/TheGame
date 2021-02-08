import { SetupDone } from 'components/Setup/SetupDone';
import { SetupProfile } from 'components/Setup/SetupProfile';
import { SetupContextProvider } from 'contexts/SetupContext';
import { InferGetStaticPropsType } from 'next';
import React from 'react';

export const getStaticProps = async () => {
  return {
    props: {
      hideAppDrawer: true
    }
  };
};

export type DefaultSetupProps = InferGetStaticPropsType<typeof getStaticProps>;

const SetupComplete: React.FC<DefaultSetupProps> = () => {
  return (
    <SetupContextProvider>
      <SetupProfile>
        <SetupDone />
      </SetupProfile>
    </SetupContextProvider>
  );
};
export default SetupComplete;
