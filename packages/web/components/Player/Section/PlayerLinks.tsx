import { ProfileSection } from '#components/Section/ProfileSection';
import { LinkType_Enum, Player } from '#graphql/autogen/hasura-sdk';
import { BoxTypes } from '#utils/boxTypes';

import { Links } from './Links';

type Props = {
  player: Player;
  isOwnProfile?: boolean;
  editing?: boolean;
  admin?: boolean;
  onClose?: () => void;
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
  onClose,
}) => (
  <ProfileSection
    title="Links"
    type={BoxTypes.PLAYER_LINKS}
    {...{ isOwnProfile, editing }}
  >
    <Links
      {...{
        player,
        admin,
        onClose,
      }}
    />
  </ProfileSection>
);
