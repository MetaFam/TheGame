import { PageContainer } from 'components/Container';
import { HeadComponent } from 'components/Seo';
import React from 'react';
import { descriptions } from 'utils/menuLinks';

const WikiPage: React.FC = () => (
  <PageContainer p={0} position="fixed">
    <HeadComponent
      title="MetaGame Wiki"
      description={descriptions.forum}
      url="https://wiki.metagame.wtf/docs/wtf-is-metagame/wtf-is-metagame"
    />
    <iframe
      title="MetaGame Wiki"
      src="https://wiki.metagame.wtf/docs/wtf-is-metagame/wtf-is-metagame"
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  </PageContainer>
);

export default WikiPage;
