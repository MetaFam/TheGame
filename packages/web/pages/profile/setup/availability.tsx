import { SetupAvailability } from 'components/Setup/SetupAvailability';
import { SetupProfile } from 'components/Setup/SetupProfile';
import { SetupContextProvider } from 'contexts/SetupContext';
import { useUser } from 'lib/hooks';
import React, { useState } from 'react';
import { options as setupOptions } from 'utils/setupOptions';

const AvailabilitySetup: React.FC = () => {

  const [availability, setAvailability] = useState<string>('');
  const { user } = useUser({ redirectTo: '/' });

  if (user?.player) {
    const {player} = user;
    if (player.availability_hours && !availability) {
      setAvailability(player.availability_hours.toString());
    }
  }

  return (
    <SetupContextProvider options={setupOptions}>
      <SetupProfile>
        <SetupAvailability availability={availability} setAvailability={setAvailability} />
      </SetupProfile>
    </SetupContextProvider>
  );
};
export default AvailabilitySetup;
