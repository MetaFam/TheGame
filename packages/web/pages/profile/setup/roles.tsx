import { SetupProfile } from 'components/Setup/SetupProfile';
import { RoleValue, SetupRoles } from 'components/Setup/SetupRoles';
import { SetupContextProvider } from 'contexts/SetupContext';
import { getPlayerRoles } from 'graphql/queries/enums/getRoles';
import { useUser } from 'lib/hooks';
import { InferGetStaticPropsType } from 'next';
import React, { useState } from 'react';

export const getStaticProps = async () => {
  const roleChoices = await getPlayerRoles();

  return {
    props: {
      roleChoices,
      hideAppDrawer: true,
    },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PlayerRolesSetup: React.FC<Props> = (props) => {
  const { roleChoices } = props;
  const [roles, setRoles] = useState<RoleValue[]>([]);
  const { user } = useUser({ redirectTo: '/' });

  if (user?.player) {
    const { player } = user;
    if (player.roles && player.roles.length > 0 && roleChoices.length > 0) {
      setRoles(player.roles.map((r) => r.role));
    }
  }

  return (
    <SetupContextProvider>
      <SetupProfile>
        <SetupRoles
          roleChoices={roleChoices}
          roles={roles}
          setRoles={setRoles}
        />
      </SetupProfile>
    </SetupContextProvider>
  );
};
export default PlayerRolesSetup;
