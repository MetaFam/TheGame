import { Wrap } from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import React from 'react';

import { ProfileSection } from '../../ProfileSection';

type Props = {
  player: PlayerFragmentFragment;
  isOwnProfile: boolean;
  onRemoveClick: () => void;
};
export const PlayerRoles: React.FC<Props> = ({
  isOwnProfile,
  onRemoveClick,
}) => (
  <ProfileSection
    title="Roles"
    onRemoveClick={onRemoveClick}
    isOwnProfile={isOwnProfile}
  >
    <Wrap />
  </ProfileSection>
);
