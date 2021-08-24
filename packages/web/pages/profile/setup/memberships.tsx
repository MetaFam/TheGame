import { SetupMemberships } from 'components/Setup/SetupMemberships';
import { SetupProfile } from 'components/Setup/SetupProfile';
import { SetupContextProvider } from 'contexts/SetupContext';
import { getDaoMemberships } from 'graphql/getMemberships';
import { Membership } from 'graphql/types';
import { useWeb3 } from 'lib/hooks';
import { InferGetStaticPropsType } from 'next';
import React, { useState } from 'react';

export const getStaticProps = async () => ({
  props: {
    hideAppDrawer: true,
  },
});

export type DefaultSetupProps = InferGetStaticPropsType<typeof getStaticProps>;

const MembershipsSetup: React.FC<DefaultSetupProps> = () => {
  const [memberships, setMemberships] = useState<
    Array<Membership> | null | undefined
  >();

  const { address } = useWeb3();
  getDaoMemberships(address).then((data) => {
    setMemberships(data);
  });

  return (
    <SetupContextProvider>
      <SetupProfile>
        <SetupMemberships
          memberships={memberships}
          setMemberships={setMemberships}
        />
      </SetupProfile>
    </SetupContextProvider>
  );
};
export default MembershipsSetup;
