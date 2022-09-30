import { LoadingState } from '@metafam/ds';
import { ConnectToProgress } from 'components/ConnectToProgress';
import { PageContainer } from 'components/Container';
import {
  ALL_BOXES,
  DEFAULT_DASHBOARD_LAYOUT_DATA,
} from 'components/Dashboard/config';
import { DashboardSection } from 'components/Dashboard/DashboardSection';
import { EditableGridLayout } from 'components/EditableGridLayout';
import { HeadComponent } from 'components/Seo';
import {
  Player,
  useUpdatePlayerDashboardLayoutMutation as useUpdateLayout,
} from 'graphql/autogen/types';
import { useUser, useWeb3 } from 'lib/hooks';
import { useCallback, useMemo } from 'react';
import { LayoutData } from 'utils/boxTypes';

const DashboardPage: React.FC = () => {
  const { user: player, fetching } = useUser();
  const { connected } = useWeb3();

  return (
    <PageContainer>
      <HeadComponent title="MetaGame Dashboard" />
      {connected && fetching && <LoadingState />}
      {!connected && !fetching && !player && <ConnectToProgress />}
      {connected && !fetching && player && <Grid player={player} />}
    </PageContainer>
  );
};

export default DashboardPage;

type Props = { player: Player };

export const Grid: React.FC<Props> = ({ player }) => {
  const [{ fetching: persisting }, saveLayoutData] = useUpdateLayout();

  const savedLayoutData = useMemo<LayoutData>(
    () =>
      player.dashboardLayout
        ? JSON.parse(player.dashboardLayout)
        : DEFAULT_DASHBOARD_LAYOUT_DATA,
    [player.dashboardLayout],
  );

  const persistLayoutData = useCallback(
    async (layoutData: LayoutData) => {
      const { error } = await saveLayoutData({
        playerId: player.id,
        dashboardLayout: JSON.stringify(layoutData),
      });

      if (error) throw error;
    },
    [saveLayoutData, player],
  );

  return (
    <EditableGridLayout
      {...{
        player,
        defaultLayoutData: DEFAULT_DASHBOARD_LAYOUT_DATA,
        savedLayoutData,
        showEditButton: true,
        persistLayoutData,
        persisting,
        allBoxOptions: ALL_BOXES,
        displayComponent: DashboardSection,
      }}
    />
  );
};
