import { MetaButton, MetaHeading, Text } from '@metafam/ds';
import { ConnectToProgress, HelpFooter } from 'components/ConnectToProgress';
import { FlexContainer } from 'components/Container';
import { MetaLink } from 'components/Link';
import { useUser, useWeb3 } from 'lib/hooks';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

export const PlayerStart: React.FC = () => {
  const router = useRouter();
  const { connected } = useWeb3();
  const { user, fetching } = useUser();
  const newUser = useMemo(() => {
    if (connected && !fetching && !!user) {
      const timeSinceCreation =
        new Date().getTime() - Date.parse(user.createdAt);
      // user is new if player was created less than 5 min ago

      return (
        Number.isNaN(timeSinceCreation) || timeSinceCreation < 5 * 60 * 1000
      );
    }
    return true;
  }, [connected, user, fetching]);

  useEffect(() => {
    if (!newUser) {
      // redirect existing users to profile complete
      router.push('/profile/setup/complete');
    }
  }, [newUser, router]);

  return (
    <FlexContainer my="auto">
      {connected && !!user ? (
        <>
          <MetaHeading m={5}>Success!</MetaHeading>
          {newUser ? (
            <>
              <MetaButton mt={5} mb={8} as="a" href="/profile/setup">
                Set up your profile
              </MetaButton>
              <Text fontFamily="mono" color="offwhite">
                {"I'll do this later. "}
                <MetaLink href="/profile/setup/complete">
                  Start Playing
                </MetaLink>
              </Text>
            </>
          ) : (
            <Text> Redirecting… </Text>
          )}
          <HelpFooter />
        </>
      ) : (
        <ConnectToProgress showNote showSwitchButton={false} />
      )}
    </FlexContainer>
  );
};
