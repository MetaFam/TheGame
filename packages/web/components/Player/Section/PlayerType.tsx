import { Wrap } from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import React from 'react';

import { ProfileSection } from '../../ProfileSection';

type Props = {
  player: PlayerFragmentFragment;
  displayEditButton: boolean;
  onRemoveClick: () => void;
};
export const PlayerType: React.FC<Props> = ({
  player,
  displayEditButton,
  onRemoveClick,
}) => (
  <ProfileSection
    title="Color Disposition"
    onRemoveClick={onRemoveClick}
    displayEditButton={displayEditButton}
  >
    <Wrap />
  </ProfileSection>
);
