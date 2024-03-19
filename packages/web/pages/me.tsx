import { ConnectedPage } from 'components/ConnectedPage';
import { InferGetStaticPropsType } from 'next';
import { PlayerPage } from 'pages/player/[username]';

export const getStaticProps = async () => ({
  props: {},
  revalidate: 1,
});

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const CurrentUserPage: React.FC<Props> = () => (
  <ConnectedPage page={PlayerPage} label="your profile" />
);

export default CurrentUserPage;
