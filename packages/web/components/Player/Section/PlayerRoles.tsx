import { BoxedNextImage, MetaTag, Text, Wrap } from '@metafam/ds';
import { ProfileSection } from 'components/Profile/ProfileSection';
import { Player } from 'graphql/autogen/types';
import React from 'react';
import { BoxType } from 'utils/boxTypes';

type Props = {
  player: Player;
  isOwnProfile?: boolean;
  canEdit?: boolean;
};
export const PlayerRoles: React.FC<Props> = ({
  player,
  isOwnProfile,
  canEdit,
}) => (
  <ProfileSection
    title="Roles"
    boxType={BoxType.PLAYER_ROLES}
    withoutBG
    {...{ isOwnProfile, canEdit }}
  >
    {!player.roles ||
      (player.roles.length === 0 && (
        <Text fontStyle="italic" textAlign="center" mb="1rem">
          No Roles found for {isOwnProfile ? 'you' : 'this player'}.
        </Text>
      ))}
    <Wrap mb="1rem">
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
