import { Button, Text } from '@metafam/ds';
import { useUser, useWeb3 } from 'lib/hooks';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export const JoinButton: React.FC<{ text: string }> = ({
  text = 'Join Us',
}) => {
  const { connected, connecting, connect } = useWeb3();
  const { fetching, user } = useUser();
  const router = useRouter();

  const postConnect = useCallback(() => {
    const timeSinceCreation =
      new Date().getTime() - Date.parse(user?.createdAt);

    if (Number.isNaN(timeSinceCreation) || timeSinceCreation < 300000) {
      // created less than 5 min ago
      router.push('/join');
    } else {
      router.push('/dashboard');
    }
  }, [user, router]);

  const onClick = useCallback(async () => {
    try {
      if (!connected) {
        await connect();
      }
      postConnect();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error in connecting', error);
    }
  }, [connected, connect, postConnect]);

  return (
    <Button
      className="border-grad"
      colorScheme="white"
      rounded="md"
      size="lg"
      isLoading={connecting || fetching}
      onClick={onClick}
    >
      <Text as="span">{text}</Text>
    </Button>
  );
};
