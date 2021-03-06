import { SetupAvailability } from 'components/Setup/SetupAvailability';
import { SetupProfile } from 'components/Setup/SetupProfile';
import { SetupContextProvider } from 'contexts/SetupContext';
import { useUser } from 'lib/hooks';
import { InferGetStaticPropsType } from 'next';
import React, { useEffect, useState } from 'react';

export const getStaticProps = async () => {
  return {
    props: {
      hideAppDrawer: true,
    },
  };
};

export type DefaultSetupProps = (
  InferGetStaticPropsType<typeof getStaticProps>
);

const AvailabilitySetup: React.FC<DefaultSetupProps> = () => {
  const [availability, setAvailability] = (
    useState<string | undefined>()
  );
  const { user } = useUser({ redirectTo: '/' });

  useEffect(() => {
    if (user?.player) {
      const { player } = user;
      if (
        player.availability_hours != null
        && availability === undefined
      ) {
        setAvailability(player.availability_hours.toString());
      }
    }
  }, [user, availability])

  return (
    <SetupContextProvider>
      <SetupProfile>
        <SetupAvailability {...{ availability, setAvailability }} />
      </SetupProfile>
    </SetupContextProvider>
  );
};
export default AvailabilitySetup;
