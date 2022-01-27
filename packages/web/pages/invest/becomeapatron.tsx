import { PageContainer } from 'components/Container';
import { HeadComponent } from 'components/Seo';
import React from 'react';
import { descriptions } from 'utils/menuLinks';

const BecomeAPatronPage: React.FC = () => (
  <PageContainer p={0} position="fixed">
    <HeadComponent
      title="MetaGame: Become a Patron"
      description={descriptions.becomeapatron}
      url="https://wiki.metagame.wtf/docs/enter-metagame/why-patron"
    />
    <iframe
      title="MetaGame: Become a Patron"
      src="https://wiki.metagame.wtf/docs/enter-metagame/why-patron"
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  </PageContainer>
);

export default BecomeAPatronPage;
