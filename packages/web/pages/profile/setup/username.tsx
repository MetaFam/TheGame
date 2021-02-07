import { SetupProfile } from 'components/Setup/SetupProfile';
import { SetupUsername } from 'components/Setup/SetupUsername';
import { SetupContextProvider } from 'contexts/SetupContext';
import { useUser, useWeb3 } from 'lib/hooks';
import React, { useState } from 'react';
import { options as setupOptions } from 'utils/setupOptions';

const UsernameSetup: React.FC = () => {

  const [username, setUsername] = useState<string>('');
  const { address } = useWeb3();
  const { user } = useUser({ redirectTo: '/' });

  if (user?.player) {
    const {player} = user;
    if (
      player.username &&
      player.username.toLowerCase() !== address?.toLowerCase() &&
      !username
    ) {
      setUsername(player.username);
    }
  }

  return (
    <SetupContextProvider options={setupOptions}>
      <SetupProfile>
        <SetupUsername username={username} setUsername={setUsername} />
      </SetupProfile>
    </SetupContextProvider>
  );
};
export default UsernameSetup;
