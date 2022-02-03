import { EmbedContainer } from 'components/Container';
import { descriptions } from 'utils/menuLinks';

const PlaybooksPage: React.FC = () => (
  <EmbedContainer
    title="MetaGame Playbooks"
    description={descriptions.playbooks}
    url="https://wiki.metagame.wtf/docs/playbooks/browse"
  />
);

export default PlaybooksPage;
