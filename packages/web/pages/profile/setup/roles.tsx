import { InferGetStaticPropsType } from 'next';

import { SetupProfile } from '#components/Setup/SetupProfile';
import { SetupRoles } from '#components/Setup/SetupRoles';
import { SetupContextProvider } from '#contexts/SetupContext';
import { getPlayerRoles } from '#graphql/queries/enums/getRoles';

export const getStaticProps = async () => {
  const roleChoices = await getPlayerRoles();

  return {
    props: {
      choices: roleChoices.filter(({ basic }) => basic),
      hideTopMenu: true,
    },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PlayerRolesSetup: React.FC<Props> = ({ choices }) => (
  <SetupContextProvider>
    <SetupProfile>
      <SetupRoles {...{ choices }} />
    </SetupProfile>
  </SetupContextProvider>
);
export default PlayerRolesSetup;
