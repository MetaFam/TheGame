import { SetupProfile } from 'components/Setup/SetupProfile';
import { SetupTimeZone } from 'components/Setup/SetupTimeZone';
import { SetupContextProvider } from 'contexts/SetupContext';
import { useUser } from 'lib/hooks';
import { InferGetStaticPropsType } from 'next';
import React, { useState } from 'react';

export const getStaticProps = async () => {
  return {
    props: {
      hideAppDrawer: true
    }
  };
};

export type DefaultSetupProps = InferGetStaticPropsType<typeof getStaticProps>;

const TimeZoneSetup: React.FC<DefaultSetupProps> = () => {

  const [timeZone, setTimeZone] = useState<string>('');
  const { user } = useUser({ redirectTo: '/' });

  if (user?.player) {
    const {player} = user;
    if (player.timezone && !timeZone) {
      setTimeZone(player.timezone);
    }
  }

  return (
    <SetupContextProvider>
      <SetupProfile>
        <SetupTimeZone timeZone={timeZone} setTimeZone={setTimeZone} />
      </SetupProfile>
    </SetupContextProvider>
  );
};
export default TimeZoneSetup;
