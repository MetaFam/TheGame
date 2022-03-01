import { MegaMenu } from 'components/MegaMenu';
import { SetupDone } from 'components/Setup/SetupDone';
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

const SetupComplete: React.FC<DefaultSetupProps> = () => (
  <SetupContextProvider>
    <MegaMenu>
      <SetupProfile>
        <SetupDone />
      </SetupProfile>
    </MegaMenu>
  </SetupContextProvider>
);
export default SetupComplete;
