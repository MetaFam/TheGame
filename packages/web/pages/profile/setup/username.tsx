import { SetupProfile } from 'components/Setup/SetupProfile';
import { SetupUsername } from 'components/Setup/SetupUsername';
import { SetupContextProvider } from 'contexts/SetupContext';
import { useUser, useWeb3 } from 'lib/hooks';
import { InferGetStaticPropsType } from 'next';
import React, { useState } from 'react';

export const getStaticProps = async () => ({
  props: {
    hideTopMenu: true,
  },
});

export type DefaultSetupProps = InferGetStaticPropsType<typeof getStaticProps>;

const UsernameSetup: React.FC<DefaultSetupProps> = () => {
  const [username, setUsername] = useState<string>();
  const { address } = useWeb3();
  const { user } = useUser();
  const { username: name } = user?.profile ?? {};

  if (
    name &&
    name.toLowerCase() !== address?.toLowerCase() &&
    username === undefined
  ) {
    setUsername(name);
  }

  return (
    <SetupContextProvider>
      <SetupProfile>
        <SetupUsername {...{ username, setUsername }} />
      </SetupProfile>
    </SetupContextProvider>
  );
};
export default UsernameSetup;
