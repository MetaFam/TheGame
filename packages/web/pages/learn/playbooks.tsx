import { PageContainer } from 'components/Container';
import { HeadComponent } from 'components/Seo';
import React from 'react';

import { descriptions } from '../../utils/menuLinks';

const PlaybooksPage: React.FC = () => (
  <PageContainer p={0} position="fixed">
    <HeadComponent
      title={`Playbooks`}
      description={descriptions.playbooks}
      url="https://wiki.metagame.wtf/docs/playbooks/browse"
    />
    <iframe
      title="MetaWiki"
      src="https://wiki.metagame.wtf/docs/playbooks/browse"
      style={{
        width: `100%`,
        height: '100%',
      }}
    />
  </PageContainer>
);

export default PlaybooksPage;
