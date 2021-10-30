import { SetupAvailability } from 'components/Setup/SetupAvailability';
import { SetupProfile } from 'components/Setup/SetupProfile';
import { SetupContextProvider } from 'contexts/SetupContext';
import { useUser } from 'lib/hooks';
import { InferGetStaticPropsType } from 'next';
import React, { useEffect, useState } from 'react';

export const getStaticProps = async () => ({
  props: {
    hideTopMenu: true,
  },
});

export type DefaultSetupProps = InferGetStaticPropsType<typeof getStaticProps>;

const AvailabilitySetup: React.FC<DefaultSetupProps> = () => {
  const [availability, setAvailability] = useState<string>('');
  const { user } = useUser({ redirectTo: '/' });

  useEffect(() => {
    if (user?.player) {
      const { player } = user;
      if (player.availability_hours && !availability) {
        setAvailability(player.availability_hours.toString());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SetupContextProvider>
      <SetupProfile>
        <SetupAvailability
          availability={availability}
          setAvailability={setAvailability}
        />
      </SetupProfile>
    </SetupContextProvider>
  );
};
export default AvailabilitySetup;
