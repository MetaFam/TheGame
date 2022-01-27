import { PageContainer } from 'components/Container';
import { HeadComponent } from 'components/Seo';
import React from 'react';
import { descriptions } from 'utils/menuLinks';

const EventsPage: React.FC = () => (
  <PageContainer p={0} position="fixed">
    <HeadComponent
      title="MetaGame Events"
      description={descriptions.events}
      url={`https://wiki.metagame.wtf/docs/great-houses/house-of-daos`}
    />
    <iframe
      title="MetaGame Events"
      src="https://wiki.metagame.wtf/docs/great-houses/house-of-daos"
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  </PageContainer>
);

export default EventsPage;
