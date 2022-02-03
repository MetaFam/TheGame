import { EmbedContainer } from 'components/Container';
import { descriptions } from 'utils/menuLinks';

const BuySeedsPage: React.FC = () => (
  <EmbedContainer
    title="MetaGame: Buy Seeds"
    description={descriptions.buyseeds}
    url="https://polygon.balancer.fi/#/trade"
  />
);

export default BuySeedsPage;
