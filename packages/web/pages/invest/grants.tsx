import { EmbedContainer } from 'components/Container';
import { descriptions } from 'utils/menuLinks';

const GrantsPage: React.FC = () => (
  <EmbedContainer
    title="MetaGame: Support Grants"
    description={descriptions.grants}
    url="https://giveth.io/"
  />
);

export default GrantsPage;
