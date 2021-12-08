import { PageContainer } from 'components/Container';
import { HeadComponent } from 'components/Seo';
import React, { useEffect, useState } from 'react';

import { descriptions } from '../../utils/menuLinks';

const BecomeAPatronPage: React.FC = () => {
  // need to ensure that the menu height is calculated on client
  const [isComponentMounted, setIsComponentMounted] = useState(false);
  useEffect(() => setIsComponentMounted(true), []);
  if (!isComponentMounted) {
    return null;
  }

  const megamenuHeight =
    document.getElementById('MegaMenu')?.offsetHeight || 81; // ugly solution, but i couldn't find a better way to set the right height of the iframe

  return (
    <PageContainer p={0} position="fixed">
      <HeadComponent
        title={`Become a Patron`}
        description={descriptions.becomeapatron}
        url="https://wiki.metagame.wtf/docs/enter-metagame/why-patron"
      />
      <iframe
        title="MetaWiki"
        src="https://wiki.metagame.wtf/docs/enter-metagame/why-patron"
        style={{
          height: window.innerHeight - megamenuHeight,
          width: `100%`,
        }}
      />
    </PageContainer>
  );
};

export default BecomeAPatronPage;
