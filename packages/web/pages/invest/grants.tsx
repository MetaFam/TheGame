import { LoadingState } from '@metafam/ds';
import { PageContainer } from 'components/Container';
import { HeadComponent } from 'components/Seo';
import React, { useState } from 'react';

import { descriptions } from '../../utils/menuLinks';

const GrantsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <PageContainer p={0} position="fixed">
      {loading && <LoadingState position="absolute" />}
      <HeadComponent
        title={`Support Grants`}
        description={descriptions.grants}
        url="https://giveth.io/"
      />
      <iframe
        title="Support Grants"
        src="https://giveth.io/"
        onLoad={() => setLoading(false)}
        style={{
          width: `100%`,
          height: '100%',
        }}
      />
    </PageContainer>
  );
};

export default GrantsPage;
