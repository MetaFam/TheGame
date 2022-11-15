import { EmbedContainer } from 'components/Container';
import React from 'react';
import { descriptions } from 'utils/menuLinks';

const TheGreatHousesPage: React.FC = () => (
  <EmbedContainer
    title="The Great Houses of MetaGame"
    description={descriptions.thegreathouses}
    url="https://wiki.metagame.wtf/great-houses/house-of-daos/?metaos=true"
  />
);

export default TheGreatHousesPage;
