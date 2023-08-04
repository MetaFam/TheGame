import { PageContainer } from 'components/Container';
import {
  ALL_BOXES,
  DEFAULT_DASHBOARD_LAYOUT_DATA,
} from 'components/Dashboard/config';
import { DashboardSection } from 'components/Dashboard/DashboardSection';
import { EditableGridLayout } from 'components/EditableGridLayout';
import {
  Player,
  useUpdatePlayerDashboardLayoutMutation as useUpdateLayout,
} from 'graphql/autogen/types';
import { useUser } from 'lib/hooks';
import React, { useCallback, useMemo } from 'react';
import { DisplayOutput, LayoutData } from 'utils/boxTypes';

const DashboardPage: React.FC = () => {
  const [{ fetching: persisting }, saveLayoutData] = useUpdateLayout();
  const { user: player } = useUser();
  const savedLayoutData = useMemo<LayoutData>(
    () =>
      player?.dashboardLayout
        ? JSON.parse(player?.dashboardLayout)
        : DEFAULT_DASHBOARD_LAYOUT_DATA,
    [player?.dashboardLayout],
  );

  const persistLayoutData = useCallback(
    async (layoutData: LayoutData) => {
      if (player) {
        const { error } = await saveLayoutData({
          playerId: player.id,
          dashboardLayout: JSON.stringify(layoutData),
        });

        if (error) throw error;
      }
    },
    [saveLayoutData, player],
  );

  return (
    <PageContainer>
      <EditableGridLayout
        {...{
          player: player as Player,
          defaultLayoutData: DEFAULT_DASHBOARD_LAYOUT_DATA,
          savedLayoutData,
          showEditButton: true,
          persistLayoutData,
          persisting,
          allBoxOptions: ALL_BOXES,
          displayComponent: DashboardSection as DisplayOutput,
        }}
      />
    </PageContainer>
  );
};

export default DashboardPage;
