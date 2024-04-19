import { ProfileSection } from 'components/Section/ProfileSection';
import { LinkType_Enum, Player } from 'graphql/autogen/types';
import { BoxTypes } from 'utils/boxTypes';

import { Attestations } from './Attestations';


type Props = {
  player: Player;
  isOwnProfile?: boolean;
  editing?: boolean;
  admin?: boolean;
  onClose?: () => void;
};

export interface PlayerEASInterface {
  name: string;
  url: string;
  type: LinkType_Enum;
}

export const PlayerEAS: React.FC<Props> = ({
  player,
  isOwnProfile,
  editing,
  admin,
  onClose,
}) => (
  <ProfileSection
    title="Attestations"
    type={BoxTypes.PLAYER_ATTESTATIONS}
    {...{ isOwnProfile, editing }}
  >
    {
      isOwnProfile ? <Attestations player={player} /> : <Attestations player={player} />
    }
  </ProfileSection>
);
