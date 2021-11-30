import { SetupAvailability } from 'components/Setup/SetupAvailability';
import { SetupProfile } from 'components/Setup/SetupProfile';
import { SetupContextProvider } from 'contexts/SetupContext';
import { useUser } from 'lib/hooks';
import { InferGetStaticPropsType } from 'next';
import React, { useState } from 'react';

export const getStaticProps = async () => ({
  props: {
    hideTopMenu: true,
  },
});

export type DefaultSetupProps = InferGetStaticPropsType<typeof getStaticProps>;

const AvailabilitySetup: React.FC<DefaultSetupProps> = () => {
  const { user } = useUser();
  const [available, setAvailability] = useState<number | null>(
    user?.player?.availableHours ?? null,
  );

  if (user?.player) {
    const { player } = user;
    if (player.availableHours != null && available === null) {
      setAvailability(player.availableHours);
    }
  }

  return (
    <SetupContextProvider>
      <SetupProfile>
        <SetupAvailability {...{ available, setAvailability }} />
      </SetupProfile>
    </SetupContextProvider>
  );
};

export default AvailabilitySetup;
