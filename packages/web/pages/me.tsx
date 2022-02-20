import { Flex, Link, MetaButton, Spinner, Text, Tooltip } from '@metafam/ds';
import { useMounted, useUser, useWeb3 } from 'lib/hooks';
import { InferGetStaticPropsType } from 'next';
import { PlayerPage } from 'pages/player/[username]';

export const getStaticProps = async () => ({
  props: {},
  revalidate: 1,
});

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const CurrentUserPage: React.FC<Props> = () => {
  const { connect, connecting, connected } = useWeb3();
  const { user, fetching, error } = useUser();
  const mounted = useMounted();

  if (!mounted || (!connecting && !connected)) {
    return (
      <Text textAlign="center" mt="25vh">
        Please <MetaButton onClick={connect}>connect</MetaButton> to access your
        profile.
      </Text>
    );
  }

  if (mounted && (connecting || fetching)) {
    return (
      <Flex align="center" justify="center" h="100vh">
        <Tooltip hasArrow label={connecting ? 'Connecting…' : 'Fetching User…'}>
          <Spinner thickness="6px" color="whiteAlpha" size="xl" />
        </Tooltip>
      </Flex>
    );
  }

  if (user) {
    return <PlayerPage player={user} />;
  }

  if (error) {
    return (
      <Text textAlign="center" mt="25vh">
        Error Loading User: <q>{error.message}</q>
      </Text>
    );
  }

  return (
    <Text textAlign="center" mt="25vh">
      Not sure how we got here… Something is decidedly amiss. Please{' '}
      <Link href="https://github.com/MetaFam/TheGame/issues">
        submit an issue
      </Link>
      .
    </Text>
  );
};

export default CurrentUserPage;
