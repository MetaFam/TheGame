import { PlayerStart } from 'components/Player/PlayerStart';
import React, { lazy } from 'react';

export const getStaticProps = async () => ({
  props: {
    hideTopMenu: true,
  },
});

const PageContainer = lazy(() => import('components/Container'));

const SetupComplete: React.FC = () => (
  <PageContainer>
    <PlayerStart />
  </PageContainer>
);
export default SetupComplete;
