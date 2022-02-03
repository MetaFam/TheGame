import { EmbedContainer } from 'components/Container';
import { descriptions } from 'utils/menuLinks';

const TheGreatHousesPage: React.FC = () => (
  <EmbedContainer
    title="The Great Houses of MetaGame"
    description={descriptions.thegreathouses}
    url="https://wiki.metagame.wtf/docs/great-houses/house-of-daos/"
  />
);

export default TheGreatHousesPage;
