import { Wrap } from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import React from 'react';

import { ProfileSection } from '../../ProfileSection';

type Props = {
  player: PlayerFragmentFragment;
  onRemoveClick?: () => void;
};
export const PlayerRoles: React.FC<Props> = ({ onRemoveClick }) => (
  <ProfileSection title="Roles" onRemoveClick={onRemoveClick}>
    <Wrap />
  </ProfileSection>
);
