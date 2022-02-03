import { EmbedContainer } from 'components/Container';
import { descriptions } from 'utils/menuLinks';

const BecomeAPatronPage: React.FC = () => (
  <EmbedContainer
    title="MetaGame: Become a Patron"
    description={descriptions.becomeapatron}
    url="https://wiki.metagame.wtf/docs/enter-metagame/why-patron"
  />
);

export default BecomeAPatronPage;
