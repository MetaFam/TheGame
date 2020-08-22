import React from 'react';

import { PageContainer } from '../../components/Container';
import { SuccessPlayer } from '../../components/SuccessPlayer';
import BackgroundImage from '../../public/images/profile-background.jpg';

export const getStaticProps = async () => {
  return {
    props: {
      hidePageHeader: true,
    },
  };
};

const Profile: React.FC = () => {
  return (
    <PageContainer backgroundImage={`url(${BackgroundImage})`}>
      <SuccessPlayer />
    </PageContainer>
  );
};

export default Profile;
