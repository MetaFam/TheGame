import BackgroundImage from 'assets/login-background.jpg';
import { PageContainer } from 'components/Container';
import { WelcomeHeader } from 'components/Welcome/WelcomeHeader';
import { WelcomePlayer } from 'components/Welcome/WelcomePlayer';
import React from 'react';

export const getStaticProps = async () => {
  return {
    props: {
      hidePageHeader: true,
    },
  };
};

const Welcome: React.FC = () => {
  return (
    <PageContainer backgroundImage={`url(${BackgroundImage})`}>
      <WelcomeHeader />
      <WelcomePlayer />
    </PageContainer>
  );
};

export default Welcome;
