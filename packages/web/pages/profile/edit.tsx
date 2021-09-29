import { PageContainer } from 'components/Container';
import { TemporaryProfileEditor } from 'components/TemporaryProfileEditor';
import React from 'react';

import { useUser, useWeb3 } from '../../lib/hooks';

const EditProfile: React.FC = () => {
  const { address } = useWeb3();
  const { user } = useUser({ redirectTo: '/' });

  if (user === null || user === undefined || address === null)
    return (
      <PageContainer>
        <h1>Loading...</h1>
      </PageContainer>
    );

  return (
    <PageContainer>
      <TemporaryProfileEditor user={user} address={address} />
    </PageContainer>
  );
};
export default EditProfile;
