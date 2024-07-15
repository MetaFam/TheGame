import { InferGetStaticPropsType } from 'next';
import { PlayerPage } from 'pages/player/[username]';

import { ConnectedPage } from '#components/ConnectedPage';

export const getStaticProps = async () => ({
  props: {},
  revalidate: 1,
});

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const CurrentUserPage: React.FC<Props> = () => (
  <ConnectedPage page={PlayerPage} label="your profile" />
);

export default CurrentUserPage;
