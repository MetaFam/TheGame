import React from 'react';

import { PageContainer } from '../../components/Container';
import { SuccessPlayer } from '../../components/SuccessPlayer';
import BackgroundImage from '../../public/images/profile-background.png';

const Profile: React.FC = () => {
  return (
    <PageContainer backgroundImage={`url(${BackgroundImage})`}>
      <SuccessPlayer />
    </PageContainer>
  );
};

export default Profile;
