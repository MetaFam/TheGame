import { SetupProfile } from 'components/Setup/SetupProfile';
import { SetupTimeZone } from 'components/Setup/SetupTimeZone';
import { SetupContextProvider } from 'contexts/SetupContext';
import { useUser } from 'lib/hooks';
import React, { useState } from 'react';
import { options as setupOptions } from 'utils/setupOptions';

const TimeZoneSetup: React.FC = () => {

  const [timeZone, setTimeZone] = useState<string>('');
  const { user } = useUser({ redirectTo: '/' });

  if (user?.player) {
    const {player} = user;
    if (player.timezone && !timeZone) {
      setTimeZone(player.timezone);
    }
  }

  return (
    <SetupContextProvider options={setupOptions}>
      <SetupProfile>
        <SetupTimeZone timeZone={timeZone} setTimeZone={setTimeZone} />
      </SetupProfile>
    </SetupContextProvider>
  );
};
export default TimeZoneSetup;
