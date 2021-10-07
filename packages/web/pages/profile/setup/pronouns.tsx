import { SetupProfile } from 'components/Setup/SetupProfile';
import { SetupPronouns } from 'components/Setup/SetupPronouns';
import { SetupContextProvider } from 'contexts/SetupContext';
import { useUser } from 'lib/hooks';
import { InferGetStaticPropsType } from 'next';
import React, { useState } from 'react';

export const getStaticProps = async () => ({
  props: {
    hideAppDrawer: true,
  },
});

export type DefaultSetupProps = InferGetStaticPropsType<typeof getStaticProps>;

const PronounsSetup: React.FC<DefaultSetupProps> = () => {
  const [pronouns, setPronouns] = useState<string>('');
  const { user } = useUser();

  if (user?.player) {
    const { player } = user;
    if (player.pronouns && pronouns === '') {
      setPronouns(player.pronouns);
    }
  }

  return (
    <SetupContextProvider>
      <SetupProfile>
        <SetupPronouns pronouns={pronouns} setPronouns={setPronouns} />
      </SetupProfile>
    </SetupContextProvider>
  );
};
export default PronounsSetup;
