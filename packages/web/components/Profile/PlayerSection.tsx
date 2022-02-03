import { Flex, IconButton } from '@metafam/ds';
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
import { Player } from 'graphql/autogen/types';
import { PersonalityInfo } from 'graphql/queries/enums/getPersonalityInfo';
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { BoxMetadata, BoxType, getBoxKey } from 'utils/boxTypes';

type Props = {
  boxType: BoxType;
  boxMetadata: BoxMetadata;
  player: Player;
  personalityInfo: PersonalityInfo;
  isOwnProfile?: boolean;
  canEdit?: boolean;
  onRemoveBox?: (boxKey: string) => void;
};

const PlayerSectionInner: React.FC<Props> = ({
  boxMetadata,
  boxType,
  player,
  isOwnProfile,
  personalityInfo,
  canEdit,
}) => {
  switch (boxType) {
    case BoxType.PLAYER_HERO:
      return <PlayerHero {...{ player, isOwnProfile, canEdit }} />;
    case BoxType.PLAYER_SKILLS:
      return <PlayerSkills {...{ player, isOwnProfile, canEdit }} />;
    case BoxType.PLAYER_NFT_GALLERY:
      return <PlayerGallery {...{ player, isOwnProfile, canEdit }} />;
    case BoxType.PLAYER_DAO_MEMBERSHIPS:
      return <PlayerMemberships {...{ player, isOwnProfile, canEdit }} />;
    case BoxType.PLAYER_COLOR_DISPOSITION:
      return (
        <PlayerColorDisposition
          {...{ player, isOwnProfile, canEdit, types: personalityInfo }}
        />
      );
    case BoxType.PLAYER_TYPE:
      return <PlayerType {...{ player, isOwnProfile, canEdit }} />;
    case BoxType.PLAYER_ROLES:
      return <PlayerRoles {...{ player, isOwnProfile, canEdit }} />;
    case BoxType.PLAYER_ACHIEVEMENTS:
      return <PlayerAchievements {...{ player, isOwnProfile, canEdit }} />;
    case BoxType.PLAYER_COMPLETED_QUESTS:
      return <PlayerCompletedQuests {...{ player, isOwnProfile, canEdit }} />;
    case BoxType.EMBEDDED_URL: {
      const url = boxMetadata?.url as string;
      return url ? <EmbeddedUrl {...{ url, canEdit }} /> : <></>;
    }
    default:
      return null;
  }
};

export const PlayerSection = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      boxMetadata,
      boxType,
      player,
      isOwnProfile,
      canEdit,
      onRemoveBox,
      personalityInfo,
    },
    ref,
  ) => {
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
          {...{
            boxMetadata,
            boxType,
            player,
            isOwnProfile,
            canEdit,
            personalityInfo,
          }}
        />
        {canEdit && (
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
        {canEdit && boxType && boxType !== BoxType.PLAYER_HERO && (
          <IconButton
            aria-label="Edit Profile Info"
            size="lg"
            pos="absolute"
            top={0}
            right={0}
            bg="transparent"
            color="pinkShadeOne"
            icon={<FaTimes />}
            _hover={{ color: 'white' }}
            onClick={() => onRemoveBox?.(boxKey)}
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
