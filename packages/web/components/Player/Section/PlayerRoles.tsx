import { BoxedNextImage, MetaTag, Text, Wrap, WrapItem } from '@metafam/ds';
import { ProfileSection } from 'components/Profile/ProfileSection';
import { Player } from 'graphql/autogen/types';
import React from 'react';
import { BoxTypes } from 'utils/boxTypes';

type Props = {
  player: Player;
  isOwnProfile?: boolean;
  editing?: boolean;
};
export const PlayerRoles: React.FC<Props> = ({
  player,
  isOwnProfile,
  editing,
}) => (
  <ProfileSection
    title="Roles"
    type={BoxTypes.PLAYER_ROLES}
    withoutBG
    {...{ isOwnProfile, editing }}
  >
    {player?.roles?.length === 0 && (
      <Text fontStyle="italic" textAlign="center" mb="1rem">
        No Roles found for {isOwnProfile ? 'you' : 'this player'}.
      </Text>
    )}
    <Wrap mb="1rem">
      {(player.roles ?? [])
        .sort((a, b) => (a.rank > b.rank ? 1 : -1))
        .map(({ role, rank, PlayerRole: { label } }) => (
          <WrapItem>
            <MetaTag key={role}>
              <BoxedNextImage
                src={`/assets/roles/${role.toLowerCase()}.svg`}
                alt={label}
                h={4}
                w={4}
                mr={2}
              />
              <Text
                color={rank === 0 ? 'cyan.500' : 'white'}
                fontWeight="bold"
                casing="uppercase"
                my={{ base: 0, md: 2 }}
              >
                {label}
              </Text>
            </MetaTag>
          </WrapItem>
        ))}
    </Wrap>
  </ProfileSection>
);
