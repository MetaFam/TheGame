import { EmbedContainer } from 'components/Container';
import React from 'react';
import { descriptions } from 'utils/menuLinks';

const WikiEmbedPage: React.FC = () => (
  <EmbedContainer
    title="MetaGame Wiki"
    description={descriptions.wiki}
    url="https://wiki.metagame.wtf?metaos=true"
  />
);

export default WikiEmbedPage;
