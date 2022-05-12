import { EmbedContainer } from 'components/Container';
import { descriptions } from 'utils/menuLinks';

const EventsPage: React.FC = () => (
  <EmbedContainer
    title="MetaGame Events"
    description={descriptions.events}
    url={`https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&showPrint=0&mode=AGENDA&showTitle=0&showNav=1&showTabs=0&showPrint=0&showCalendars=0&src=nih59ktgafmm64ed4qk6ue8vv4@group.calendar.google.com&color=%23F09300`}
  />
);

export default EventsPage;
