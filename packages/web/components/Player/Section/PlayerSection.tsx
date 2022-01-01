import { PlayerAchievements } from 'components/Player/Section/PlayerAchievements';
import { PlayerColorDisposition } from 'components/Player/Section/PlayerColorDisposition';
import { PlayerGallery } from 'components/Player/Section/PlayerGallery';
import { PlayerHero } from 'components/Player/Section/PlayerHero';
import { PlayerMemberships } from 'components/Player/Section/PlayerMemberships';
import { PlayerRoles } from 'components/Player/Section/PlayerRoles';
import { PlayerSkills } from 'components/Player/Section/PlayerSkills';
import { PlayerType } from 'components/Player/Section/PlayerType';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import { BoxType } from 'utils/boxTypes';

import { PlayerAddSection } from './PlayerAddSection';

type Props = {
  boxType: BoxType;
  player: PlayerFragmentFragment;
  availableBoxList: BoxType[];
  setNewBox: (arg0: BoxType) => void;
  isOwnProfile?: boolean;
  canEdit?: boolean;
  removeBox?: (boxType: BoxType) => void;
};

export const PlayerSection: React.FC<Props> = ({
  boxType,
  player,
  availableBoxList,
  setNewBox,
  isOwnProfile,
  canEdit,
  removeBox,
}) => {
  switch (boxType) {
    case BoxType.PLAYER_HERO:
      return (
        <PlayerHero
          player={player}
          isOwnProfile={isOwnProfile}
          canEdit={canEdit}
        />
      );
    case BoxType.PLAYER_SKILLS:
      return (
        <PlayerSkills
          player={player}
          isOwnProfile={isOwnProfile}
          canEdit={canEdit}
          onRemoveClick={() => removeBox?.(boxType)}
        />
      );
    case BoxType.PLAYER_NFT_GALLERY:
      return (
        <PlayerGallery
          player={player}
          isOwnProfile={isOwnProfile}
          canEdit={canEdit}
          onRemoveClick={() => removeBox?.(boxType)}
        />
      );
    case BoxType.PLAYER_DAO_MEMBERSHIPS:
      return (
        <PlayerMemberships
          player={player}
          isOwnProfile={isOwnProfile}
          canEdit={canEdit}
          onRemoveClick={() => removeBox?.(boxType)}
        />
      );
    case BoxType.PLAYER_COLOR_DISPOSITION:
      return (
        <PlayerColorDisposition
          player={player}
          isOwnProfile={isOwnProfile}
          canEdit={canEdit}
          onRemoveClick={() => removeBox?.(boxType)}
        />
      );
    case BoxType.PLAYER_TYPE:
      return (
        <PlayerType
          player={player}
          isOwnProfile={isOwnProfile}
          canEdit={canEdit}
          onRemoveClick={() => removeBox?.(boxType)}
        />
      );
    case BoxType.PLAYER_ROLES:
      return (
        <PlayerRoles
          player={player}
          isOwnProfile={isOwnProfile}
          canEdit={canEdit}
          onRemoveClick={() => removeBox?.(boxType)}
        />
      );
    case BoxType.PLAYER_ACHIEVEMENTS:
      return (
        <PlayerAchievements
          player={player}
          isOwnProfile={isOwnProfile}
          canEdit={canEdit}
          onRemoveClick={() => removeBox?.(boxType)}
        />
      );
    case BoxType.PLAYER_ADD_BOX:
      return (
        <PlayerAddSection boxList={availableBoxList} setNewBox={setNewBox} />
      );
    default:
      return <></>;
  }
};
