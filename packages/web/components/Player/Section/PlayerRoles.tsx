import { BoxedNextImage, MetaTag, Text, Wrap } from '@metafam/ds';
import { ProfileSection } from 'components/Profile/ProfileSection';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import React from 'react';
import { BoxType } from 'utils/boxTypes';

type Props = {
  player: PlayerFragmentFragment;
  isOwnProfile?: boolean;
  canEdit?: boolean;
  onRemoveClick?: () => void;
};
export const PlayerRoles: React.FC<Props> = ({
  player,
  isOwnProfile,
  canEdit,
  onRemoveClick,
}) => (
  <ProfileSection
    title="Roles"
    boxType={BoxType.PLAYER_ROLES}
    {...{ onRemoveClick, isOwnProfile, canEdit }}
  >
    <Wrap>
      {player.roles &&
        player.roles
          .sort((a, b) => (a.rank > b.rank ? 1 : -1))
          .map(({ role, rank, PlayerRole }) => (
            <MetaTag key={role}>
              <BoxedNextImage
                src={`/assets/roles/${role.toLowerCase()}.svg`}
                alt={PlayerRole.label}
                h="4"
                w="4"
                mr={2}
              />
              <Text
                color={rank === 0 ? 'cyan.500' : 'white'}
                fontWeight="bold"
                casing="uppercase"
                my={{ base: 0, md: 2 }}
              >
                {PlayerRole.label}
              </Text>
            </MetaTag>
          ))}
    </Wrap>
  </ProfileSection>
);
