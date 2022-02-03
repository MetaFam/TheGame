import { EmbedContainer } from 'components/Container';
import { descriptions } from 'utils/menuLinks';

const PlantSeedsPage: React.FC = () => (
  <EmbedContainer
    title="MetaGame: Plant Seeds"
    description={descriptions.plantseeds}
    url="https://polygon.balancer.fi/#/pool/0x8a8fcd351ed553fc75aecbc566a32f94471f302e000100000000000000000081/invest"
  />
);

export default PlantSeedsPage;
