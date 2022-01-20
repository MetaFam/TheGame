import { Flex, IconButton } from '@metafam/ds';
import { PlayerAchievements } from 'components/Player/Section/PlayerAchievements';
import { PlayerColorDisposition } from 'components/Player/Section/PlayerColorDisposition';
import { PlayerGallery } from 'components/Player/Section/PlayerGallery';
import { PlayerHero } from 'components/Player/Section/PlayerHero';
import { PlayerMemberships } from 'components/Player/Section/PlayerMemberships';
import { PlayerRoles } from 'components/Player/Section/PlayerRoles';
import { PlayerSkills } from 'components/Player/Section/PlayerSkills';
import { PlayerType } from 'components/Player/Section/PlayerType';
import { EmbeddedUrl } from 'components/Profile/EmbeddedUrlSection';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { BoxMetadata, BoxType, getBoxKey } from 'utils/boxTypes';

type Props = {
  boxType: BoxType;
  boxMetadata: BoxMetadata;
  player: PlayerFragmentFragment;
  isOwnProfile?: boolean;
  canEdit?: boolean;
  removeBox?: (boxKey: string) => void;
};

const PlayerSectionInner: React.FC<Props> = ({
  boxMetadata,
  boxType,
  player,
  isOwnProfile,
  canEdit,
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
        />
      );
    case BoxType.PLAYER_NFT_GALLERY:
      return (
        <PlayerGallery
          player={player}
          isOwnProfile={isOwnProfile}
          canEdit={canEdit}
        />
      );
    case BoxType.PLAYER_DAO_MEMBERSHIPS:
      return (
        <PlayerMemberships
          player={player}
          isOwnProfile={isOwnProfile}
          canEdit={canEdit}
        />
      );
    case BoxType.PLAYER_COLOR_DISPOSITION:
      return (
        <PlayerColorDisposition
          player={player}
          isOwnProfile={isOwnProfile}
          canEdit={canEdit}
        />
      );
    case BoxType.PLAYER_TYPE:
      return (
        <PlayerType
          player={player}
          isOwnProfile={isOwnProfile}
          canEdit={canEdit}
        />
      );
    case BoxType.PLAYER_ROLES:
      return (
        <PlayerRoles
          player={player}
          isOwnProfile={isOwnProfile}
          canEdit={canEdit}
        />
      );
    case BoxType.PLAYER_ACHIEVEMENTS:
      return (
        <PlayerAchievements
          player={player}
          isOwnProfile={isOwnProfile}
          canEdit={canEdit}
        />
      );
    case BoxType.EMBEDDED_URL: {
      const url = boxMetadata?.url as string;
      return url ? <EmbeddedUrl address={url} canEdit={canEdit} /> : <></>;
    }
    default:
      return <></>;
  }
};

export const PlayerSection = React.forwardRef<HTMLDivElement, Props>(
  ({ boxMetadata, boxType, player, isOwnProfile, canEdit, removeBox }, ref) => {
    const boxKey = getBoxKey(boxType, boxMetadata);

    return (
      <Flex
        w="100%"
        ref={ref}
        direction="column"
        h="auto"
        minH="100%"
        boxShadow="md"
        pos="relative"
      >
        <PlayerSectionInner
          boxType={boxType}
          boxMetadata={boxMetadata}
          player={player}
          isOwnProfile={isOwnProfile}
          canEdit={canEdit}
        />
        {canEdit && (
          <Flex
            className="gridItemOverlay"
            w="100%"
            h="100%"
            bg="purpleTag50"
            pos="absolute"
            top="0"
            left="0"
          />
        )}
        {canEdit && boxType && boxType !== BoxType.PLAYER_HERO ? (
          <IconButton
            aria-label="Edit Profile Info"
            size="lg"
            pos="absolute"
            top="0"
            right="0"
            background="transparent"
            color="pinkShadeOne"
            icon={<FaTimes />}
            _hover={{ color: 'white' }}
            onClick={() => removeBox?.(boxKey)}
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
        ) : null}
      </Flex>
    );
  },
);
