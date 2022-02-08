import { SetupAvailability } from 'components/Setup/SetupAvailability';
import { SetupProfile } from 'components/Setup/SetupProfile';
import { SetupContextProvider } from 'contexts/SetupContext';
import { Maybe } from 'graphql/autogen/types';
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
  const [available, setAvailability] = useState<Maybe<number>>(
    user?.profile?.availableHours ?? null,
  );

  if (user) {
    if (user.profile?.availableHours != null && available === null) {
      setAvailability(user.profile.availableHours);
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
