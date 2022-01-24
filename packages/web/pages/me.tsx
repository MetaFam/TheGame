import { Flex, MetaButton, Spinner, Text, Tooltip } from '@metafam/ds';
import { Maybe } from '@metafam/utils';
import { useUser, useWeb3 } from 'lib/hooks';
import { PlayerPage } from 'pages/player/[username]';

const CurrentUserPage = (): Maybe<React.ReactElement> => {
  const { connect, connecting, connected } = useWeb3();
  const { user, fetching } = useUser();

  if (!connecting && !connected) {
    return (
      <Text textAlign="center" mt="25vh">
        Please <MetaButton onClick={connect}>connect</MetaButton> to access your
        profile.
      </Text>
    );
  }

  if (connecting || fetching) {
    return (
      <Flex align="center" justify="center" h="100vh">
        <Tooltip hasArrow label={connecting ? 'Connecting…' : 'Fetching User…'}>
          <Spinner thickness="6px" color="whiteAlpha" size="xl" />
        </Tooltip>
      </Flex>
    );
  }

  if (user?.player) {
    return PlayerPage({ player: user.player });
  }

  return (
    <Text textAlign="center" mt="25vh">
      Not sure how we got here…
    </Text>
  );
};

export default CurrentUserPage;
