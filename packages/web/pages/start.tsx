import { PageContainer } from 'components/Container';
import { PlayerStart } from 'components/Player/PlayerStart';
import React from 'react';

export const getStaticProps = async () => ({
  props: {
    hideTopMenu: true,
  },
});

const SetupComplete: React.FC = () => (
  <PageContainer>
    <PlayerStart />
  </PageContainer>
);
export default SetupComplete;
