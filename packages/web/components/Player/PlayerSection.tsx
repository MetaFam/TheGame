import { Flex, IconButton } from '@metafam/ds';
import { PlayerAchievements } from 'components/Player/Section/PlayerAchievements';
import { PlayerCompletedQuests } from 'components/Player/Section/PlayerCompletedQuests';
import { PlayerGallery } from 'components/Player/Section/PlayerGallery';
import { PlayerHero } from 'components/Player/Section/PlayerHero';
import { PlayerMemberships } from 'components/Player/Section/PlayerMemberships';
import { PlayerPersonalityType } from 'components/Player/Section/PlayerPersonalityType';
import { PlayerRoles } from 'components/Player/Section/PlayerRoles';
import { PlayerSkills } from 'components/Player/Section/PlayerSkills';
import { PlayerType } from 'components/Player/Section/PlayerType';
import { EmbeddedUrl } from 'components/Section/EmbeddedUrlSection';
import { Player } from 'graphql/autogen/types';
import { useUser } from 'lib/hooks';
import { forwardRef, useMemo } from 'react';
import { FaTimes } from 'react-icons/fa';
import { BoxMetadata, BoxType, BoxTypes, createBoxKey } from 'utils/boxTypes';

type Props = {
  type: BoxType;
  player?: Player;
  metadata?: BoxMetadata;
  editing?: boolean;
  onRemoveBox?: (boxKey: string) => void;
};

const PlayerSectionInner: React.FC<
  Props & {
    player: Player;
    isOwnProfile?: boolean;
  }
> = ({ metadata, type, player, isOwnProfile, editing }) => {
  switch (type) {
    case BoxTypes.PLAYER_HERO:
      return <PlayerHero {...{ player, editing }} />;
    case BoxTypes.PLAYER_SKILLS:
      return <PlayerSkills {...{ player, isOwnProfile, editing }} />;
    case BoxTypes.PLAYER_NFT_GALLERY:
      return <PlayerGallery {...{ player, isOwnProfile, editing }} />;
    case BoxTypes.PLAYER_DAO_MEMBERSHIPS:
      return <PlayerMemberships {...{ player, isOwnProfile, editing }} />;
    case BoxTypes.PLAYER_COLOR_DISPOSITION:
      return <PlayerPersonalityType {...{ player, editing }} />;
    case BoxTypes.PLAYER_TYPE:
      return <PlayerType {...{ player, editing }} />;
    case BoxTypes.PLAYER_ROLES:
      return <PlayerRoles {...{ player, isOwnProfile, editing }} />;
    case BoxTypes.PLAYER_ACHIEVEMENTS:
      return <PlayerAchievements {...{ player, isOwnProfile, editing }} />;
    case BoxTypes.PLAYER_COMPLETED_QUESTS:
      return <PlayerCompletedQuests {...{ player, isOwnProfile, editing }} />;
    case BoxTypes.EMBEDDED_URL: {
      const { url } = metadata ?? {};
      return url ? <EmbeddedUrl {...{ url, editing }} /> : null;
    }
    default:
      return null;
  }
};

export const PlayerSection = forwardRef<HTMLDivElement, Props>(
  ({ metadata, type, player, editing = false, onRemoveBox }, ref) => {
    const key = createBoxKey(type, metadata);
    const { user } = useUser();

    const isOwnProfile = useMemo(
      () => !!user && user.id === player?.id,
      [user, player?.id],
    );

    if (!player) return null;

    return (
      <Flex
        w="100%"
        {...{ ref }}
        direction="column"
        h="auto"
        minH="100%"
        boxShadow="md"
        pos="relative"
        pointerEvents={editing ? 'none' : 'initial'}
      >
        <PlayerSectionInner
          {...{
            metadata,
            type,
            player,
            isOwnProfile,
            editing,
          }}
        />
        {editing && (
          <Flex
            className="gridItemOverlay"
            w="100%"
            h="100%"
            bg="purpleTag50"
            pos="absolute"
            top={0}
            left={0}
          />
        )}
        {editing && type && type !== BoxTypes.PLAYER_HERO && (
          <IconButton
            aria-label="Remove Profile Section"
            size="lg"
            pos="absolute"
            top={0}
            right={0}
            bg="transparent"
            color="pinkShadeOne"
            icon={<FaTimes />}
            _hover={{ color: 'white' }}
            onClick={() => onRemoveBox?.(key)}
            _focus={{
              boxShadow: 'none',
              backgroundColor: 'transparent',
            }}
            _active={{
              transform: 'scale(0.8)',
              backgroundColor: 'transparent',
            }}
            isRound
          />
        )}
      </Flex>
    );
  },
);
