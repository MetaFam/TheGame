import { PageContainer } from 'components/Container';
import { HeadComponent } from 'components/Seo';
import React from 'react';

import { descriptions } from '../../utils/menuLinks';

const ForumPage: React.FC = () => (
  <PageContainer p={0} position="fixed">
    <HeadComponent
      title={`Events`}
      description={descriptions.forum}
      url="https://wiki.metagame.wtf/docs/wtf-is-metagame/wtf-is-metagame"
    />
    <iframe
      title="MetaWiki"
      src="https://wiki.metagame.wtf/docs/wtf-is-metagame/wtf-is-metagame"
      style={{
        width: `100%`,
        height: '100%',
      }}
    />
  </PageContainer>
);

export default ForumPage;
