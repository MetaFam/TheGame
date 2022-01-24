import { PlayerAchievements } from 'components/Player/Section/PlayerAchievements';
import { PlayerColorDisposition } from 'components/Player/Section/PlayerColorDisposition';
import { PlayerCompletedQuests } from 'components/Player/Section/PlayerCompletedQuests';
import { PlayerGallery } from 'components/Player/Section/PlayerGallery';
import { PlayerHero } from 'components/Player/Section/PlayerHero';
import { PlayerMemberships } from 'components/Player/Section/PlayerMemberships';
import { PlayerRoles } from 'components/Player/Section/PlayerRoles';
import { PlayerSkills } from 'components/Player/Section/PlayerSkills';
import { PlayerType } from 'components/Player/Section/PlayerType';
import { EmbeddedUrl } from 'components/Profile/EmbeddedUrlSection';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import { BoxMetadata, BoxType, getBoxKey } from 'utils/boxTypes';

type Props = {
  boxType: BoxType;
  boxMetadata: BoxMetadata;
  player: PlayerFragmentFragment;
  isOwnProfile?: boolean;
  canEdit?: boolean;
  removeBox?: (boxKey: string) => void;
};

export const PlayerSection: React.FC<Props> = ({
  boxMetadata,
  boxType,
  player,
  isOwnProfile,
  canEdit,
  removeBox,
}) => {
  const boxKey = getBoxKey(boxType, boxMetadata);
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
          onRemoveClick={() => removeBox?.(boxKey)}
        />
      );
    case BoxType.PLAYER_NFT_GALLERY:
      return (
        <PlayerGallery
          player={player}
          isOwnProfile={isOwnProfile}
          canEdit={canEdit}
          onRemoveClick={() => removeBox?.(boxKey)}
        />
      );
    case BoxType.PLAYER_DAO_MEMBERSHIPS:
      return (
        <PlayerMemberships
          player={player}
          isOwnProfile={isOwnProfile}
          canEdit={canEdit}
          onRemoveClick={() => removeBox?.(boxKey)}
        />
      );
    case BoxType.PLAYER_COLOR_DISPOSITION:
      return (
        <PlayerColorDisposition
          player={player}
          isOwnProfile={isOwnProfile}
          canEdit={canEdit}
          onRemoveClick={() => removeBox?.(boxKey)}
        />
      );
    case BoxType.PLAYER_TYPE:
      return (
        <PlayerType
          player={player}
          isOwnProfile={isOwnProfile}
          canEdit={canEdit}
          onRemoveClick={() => removeBox?.(boxKey)}
        />
      );
    case BoxType.PLAYER_ROLES:
      return (
        <PlayerRoles
          player={player}
          isOwnProfile={isOwnProfile}
          canEdit={canEdit}
          onRemoveClick={() => removeBox?.(boxKey)}
        />
      );
    case BoxType.PLAYER_ACHIEVEMENTS:
      return (
        <PlayerAchievements
          player={player}
          isOwnProfile={isOwnProfile}
          canEdit={canEdit}
          onRemoveClick={() => removeBox?.(boxKey)}
        />
      );
    case BoxType.PLAYER_COMPLETED_QUESTS:
      return (
        <PlayerCompletedQuests
          player={player}
          isOwnProfile={isOwnProfile}
          canEdit={canEdit}
          onRemoveClick={() => removeBox?.(boxKey)}
        />
      );
    case BoxType.EMBEDDED_URL: {
      const url = boxMetadata?.url as string;
      return url ? (
        <EmbeddedUrl
          address={url}
          canEdit={canEdit}
          onRemoveClick={() => removeBox?.(boxKey)}
        />
      ) : (
        <></>
      );
    }
    default:
      return <></>;
  }
};
