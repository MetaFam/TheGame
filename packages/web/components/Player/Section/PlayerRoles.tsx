import { Wrap } from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import React from 'react';

import { ProfileSection } from '../../ProfileSection';

type Props = {
  player: PlayerFragmentFragment;
  displayEditButton: boolean;
  onRemoveClick: () => void;
};
export const PlayerRoles: React.FC<Props> = ({
  player,
  displayEditButton,
  onRemoveClick,
}) => (
  <ProfileSection
    title="Roles"
    onRemoveClick={onRemoveClick}
    displayEditButton={displayEditButton}
  >
    <Wrap />
  </ProfileSection>
);
