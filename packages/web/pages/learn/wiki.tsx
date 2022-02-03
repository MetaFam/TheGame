import { EmbedContainer } from 'components/Container';
import { descriptions } from 'utils/menuLinks';

const WikiEmbedPage: React.FC = () => (
  <EmbedContainer
    title="MetaGame Wiki"
    description={descriptions.wiki}
    url="https://wiki.metagame.wtf/docs/wtf-is-metagame/wtf-is-metagame"
  />
);

export default WikiEmbedPage;
