import { SetupProfile } from 'components/Setup/SetupProfile';
import { SetupRoles } from 'components/Setup/SetupRoles';
import { SetupContextProvider } from 'contexts/SetupContext';
import { getPlayerRoles } from 'graphql/queries/enums/getRoles';
import { InferGetStaticPropsType } from 'next';

export const getStaticProps = async () => {
  const roleChoices = await getPlayerRoles();

  return {
    props: {
      roleChoices: roleChoices.filter(({ basic }) => basic),
      hideTopMenu: true,
    },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PlayerRolesSetup: React.FC<Props> = ({ roleChoices }) => (
  <SetupContextProvider>
    <SetupProfile>
      <SetupRoles {...{ roleChoices }} />
    </SetupProfile>
  </SetupContextProvider>
);
export default PlayerRolesSetup;
