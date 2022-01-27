import { LoadingState } from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { HeadComponent } from 'components/Seo';
import React, { useState } from 'react';
import { descriptions } from 'utils/menuLinks';

const PlantSeedsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <PageContainer p={0} position="fixed">
      {loading && <LoadingState position="absolute" />}
      <HeadComponent
        title="MetaGame: Plant Seeds"
        description={descriptions.plantseeds}
        url="https://polygon.balancer.fi/#/pool/0x8a8fcd351ed553fc75aecbc566a32f94471f302e000100000000000000000081/invest"
      />
      <iframe
        title="MetaGame: Plant Seeds"
        src="https://polygon.balancer.fi/#/pool/0x8a8fcd351ed553fc75aecbc566a32f94471f302e000100000000000000000081/invest"
        onLoad={() => setLoading(false)}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </PageContainer>
  );
};

export default PlantSeedsPage;
