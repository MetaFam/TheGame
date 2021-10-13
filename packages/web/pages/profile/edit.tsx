import { PageContainer } from 'components/Container';
import { EditProfileForm } from 'components/EditProfileForm';
import React from 'react';

import { useUser, useWeb3 } from '../../lib/hooks';

const EditProfile: React.FC = () => {
  const { address } = useWeb3();
  const { user } = useUser();

  if (user === null || user === undefined || address === null)
    return (
      <PageContainer>
        <h1>Loading...</h1>
      </PageContainer>
    );

  return (
    <PageContainer>
      <EditProfileForm user={user} address={address} />
    </PageContainer>
  );
};
export default EditProfile;
