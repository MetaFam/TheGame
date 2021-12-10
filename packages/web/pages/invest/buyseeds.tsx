import { LoadingState } from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { HeadComponent } from 'components/Seo';
import React, { useState } from 'react';

import { descriptions } from '../../utils/menuLinks';

const BuySeedsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <PageContainer p={0} position="fixed">
      {loading && <LoadingState position="absolute" />}
      <HeadComponent
        title={`Buy Seeds`}
        description={descriptions.buyseeds}
        url="https://polygon.balancer.fi/#/trade"
      />
      <iframe
        title="Buy Seeds"
        src="https://polygon.balancer.fi/#/trade"
        onLoad={() => setLoading(false)}
        style={{
          width: `100%`,
          height: '100%',
        }}
      />
    </PageContainer>
  );
};

export default BuySeedsPage;
