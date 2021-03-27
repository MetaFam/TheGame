import { LoadingState } from '@metafam/ds';
import { PageContainer } from 'components/Container';
import React from 'react';

export const getStaticProps = () => {
  return {
    redirect: {
      destination: '/players',
    },
  }
};

const Home: React.FC = () => (
  <PageContainer>
    <LoadingState />
  </PageContainer>
);

export default Home;
