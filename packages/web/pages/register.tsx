import { PageContainer } from 'components/Container';
import { RegisterPlayer } from 'components/Welcome/RegisterPlayer';
import { WelcomeHeader } from 'components/Welcome/WelcomeHeader';
import BackgroundImage from 'assets/login-background.jpg';
import React from 'react';

export const getStaticProps = async () => {
  return {
    props: {
      hidePageHeader: true,
    },
  };
};

const Register: React.FC = () => {
  return (
    <PageContainer backgroundImage={`url(${BackgroundImage})`}>
      <WelcomeHeader />
      <RegisterPlayer />
    </PageContainer>
  );
};

export default Register;
