import BackgroundImage from 'assets/profile-background.jpg';
import { PageContainer } from 'components/Container';
import { SuccessPlayer } from 'components/SuccessPlayer';
import React from 'react';

export const getStaticProps = async () => {
  return {
    props: {
      hideAppDrawer: true,
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
