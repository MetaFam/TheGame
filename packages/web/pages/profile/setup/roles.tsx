import { SetupProfile } from 'components/Setup/SetupProfile';
import { RoleValue, SetupRoles } from 'components/Setup/SetupRoles';
import { SetupContextProvider } from 'contexts/SetupContext';
import { getPlayerRoles } from 'graphql/queries/enums/getRoles';
import { useUser } from 'lib/hooks';
import { InferGetStaticPropsType } from 'next';
import React, { useEffect, useState } from 'react';

export const getStaticProps = async () => {
  const roleChoices = await getPlayerRoles();

  return {
    props: {
      roleChoices: roleChoices.filter((r) => r.basic),
      hideTopMenu: true,
    },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PlayerRolesSetup: React.FC<Props> = (props) => {
  const { roleChoices } = props;
  const [roles, setRoles] = useState<Array<RoleValue>>([]);
  const [loadingRoles, setLoadingRoles] = useState<boolean>(true);
  const { user } = useUser({ requestPolicy: 'network-only' });

  const playerRoles = user?.player?.roles;

  useEffect(() => {
    if (playerRoles != null) {
      setRoles(playerRoles.map((r) => r.role));
      setLoadingRoles(false);
    }
  }, [playerRoles]);

  return (
    <SetupContextProvider>
      <SetupProfile>
        <SetupRoles
          roleChoices={roleChoices}
          roles={roles}
          fetchingExistingRoles={loadingRoles}
          setRoles={setRoles}
        />
      </SetupProfile>
    </SetupContextProvider>
  );
};
export default PlayerRolesSetup;
