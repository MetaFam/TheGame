import { PageContainer } from 'components/Container';
import { HeadComponent } from 'components/Seo';
import React from 'react';
import { descriptions } from 'utils/menuLinks';

const PlaybooksPage: React.FC = () => (
  <PageContainer p={0} position="fixed">
    <HeadComponent
      title="MetaGame Playbooks"
      description={descriptions.playbooks}
      url="https://wiki.metagame.wtf/docs/playbooks/browse"
    />
    <iframe
      title="MetaGame Playbooks"
      src="https://wiki.metagame.wtf/docs/playbooks/browse"
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  </PageContainer>
);

export default PlaybooksPage;
