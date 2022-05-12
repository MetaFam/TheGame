import { EmbedContainer } from 'components/Container';
import { descriptions } from 'utils/menuLinks';

const EventsPage: React.FC = () => (
  <EmbedContainer
    title="MetaGame Events"
    description={descriptions.events}
    url={`https://wiki.metagame.wtf/docs/resources/calendar`}
  />
);

export default EventsPage;
