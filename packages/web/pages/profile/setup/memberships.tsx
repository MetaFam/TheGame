import { SetupMemberships } from 'components/Setup/SetupMemberships';
import { SetupProfile } from 'components/Setup/SetupProfile';
import { SetupContextProvider } from 'contexts/SetupContext';
import { getMemberships } from 'graphql/getMemberships';
import { Membership } from 'graphql/types';
import { useWeb3 } from 'lib/hooks';
import React, { useState } from 'react';
import { options as setupOptions } from 'utils/setupOptions';

const MembershipsSetup: React.FC = () => {

  const [memberships, setMemberships] = useState<
    Array<Membership> | null | undefined
  >();
  
  const { address } = useWeb3();
  getMemberships(address).then((data) => {
    setMemberships(data);
  });

  return (
    <SetupContextProvider options={setupOptions}>
      <SetupProfile>
        <SetupMemberships memberships={memberships} setMemberships={setMemberships} />
      </SetupProfile>
    </SetupContextProvider>
  );
};
export default MembershipsSetup;
