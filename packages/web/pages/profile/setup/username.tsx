import { SetupProfile } from 'components/Setup/SetupProfile';
import { SetupUsername } from 'components/Setup/SetupUsername';
import { SetupContextProvider } from 'contexts/SetupContext';
import { useUser, useWeb3 } from 'lib/hooks';
import { InferGetStaticPropsType } from 'next';
import React, { useState } from 'react';

export const getStaticProps = async () => ({
  props: {
    hideAppDrawer: true,
  },
});

export type DefaultSetupProps = InferGetStaticPropsType<typeof getStaticProps>;

const UsernameSetup: React.FC<DefaultSetupProps> = () => {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const { address } = useWeb3();
  const { user } = useUser({ redirectTo: '/' });

  if (user?.player) {
    const { player } = user;
    if (
      player.username &&
      player.username.toLowerCase() !== address?.toLowerCase() &&
      username === undefined
    ) {
      setUsername(player.username);
    }
  }

  return (
    <SetupContextProvider>
      <SetupProfile>
        <SetupUsername {...{ username, setUsername }} />
      </SetupProfile>
    </SetupContextProvider>
  );
};
export default UsernameSetup;
