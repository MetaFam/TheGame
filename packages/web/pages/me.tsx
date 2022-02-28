import { Center, Link, MetaButton, Spinner, Stack, Text } from '@metafam/ds';
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

  if (connecting || fetching) {
    return (
      <Center h="100vh">
        <Stack align="center">
          <Text fontSize="xl">
            {connecting ? 'Connecting…' : 'Fetching User…'}
          </Text>
          <Spinner thickness="6px" color="whiteAlpha" size="xl" />
        </Stack>
      </Center>
    );
  }

  if (user) {
    return <PlayerPage player={user} />;
  }

  if (error) {
    return (
      <Center h="100vh">
        <Stack align="center">
          <Text>
            Error Loading User: <q>{error.message}</q>
          </Text>
          <MetaButton onClick={connect}>Try Again</MetaButton>
        </Stack>
      </Center>
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
