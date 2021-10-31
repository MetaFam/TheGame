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
  const { user } = useUser({ redirectTo: '/' });
  const [availability, setAvailability] = useState<string>(
    user?.player?.availability_hours?.toString() || '',
  );

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
