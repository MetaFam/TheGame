import { PageContainer } from 'components/Container';
import { SuccessPlayer } from 'components/SuccessPlayer';
import React from 'react';

export const getStaticProps = async () => ({
  props: {
    hideAppDrawer: true,
  },
});

const Profile: React.FC = () => (
  <PageContainer>
    <SuccessPlayer />
  </PageContainer>
);

export default Profile;
