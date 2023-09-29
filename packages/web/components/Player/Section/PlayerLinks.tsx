import { ProfileSection } from 'components/Section/ProfileSection';
import { LinkType_Enum, Player } from 'graphql/autogen/types';
import React from 'react';
import { BoxTypes } from 'utils/boxTypes';

import { Links } from './Links';

type Props = {
  player: Player;
  isOwnProfile?: boolean;
  editing?: boolean;
  admin?: boolean;
  switchToEdit?: any;
  onClose?: any;
};

export interface PlayerLinkFormInputs {
  name: string;
  url: string;
  type: LinkType_Enum;
}

export const PlayerLinks: React.FC<Props> = ({
  player,
  isOwnProfile,
  editing,
  admin,
  switchToEdit,
  onClose,
}) => (
  <ProfileSection
    title="Links"
    type={BoxTypes.PLAYER_LINKS}
    {...{ isOwnProfile, editing }}
  >
    <Links
      player={player}
      admin={admin}
      switchToEdit={switchToEdit}
      onClose={onClose}
    />
  </ProfileSection>
);
