import { PageContainer } from 'components/Container';
import { HeadComponent } from 'components/Seo';
import React from 'react';
import { descriptions } from 'utils/menuLinks';

const TheGreatHousesPage: React.FC = () => (
  <PageContainer p={0} position="fixed">
    <HeadComponent
      title="The Great Houses of MetaGame"
      description={descriptions.thegreathouses}
      url="https://wiki.metagame.wtf/docs/great-houses/house-of-daos/"
    />
    <iframe
      title="The Great Houses of MetaGame"
      src="https://wiki.metagame.wtf/docs/great-houses/house-of-daos/"
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  </PageContainer>
);

export default TheGreatHousesPage;
