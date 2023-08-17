import { BoxedNextImage, MetaTag, Text, Wrap, WrapItem } from '@metafam/ds';
import { ProfileSection } from 'components/Section/ProfileSection';
import { Player } from 'graphql/autogen/types';
import React, { useMemo } from 'react';
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
}) => {
  const roles = useMemo(
    () =>
      (player.roles ?? [])
        .sort((a, b) => a.rank - b.rank)
        .map(({ role }) => role),
    [player.roles],
  );

  return (
    <ProfileSection
      title="Roles"
      type={BoxTypes.PLAYER_ROLES}
      {...{ isOwnProfile, editing }}
    >
      {roles?.length === 0 && (
        <Text fontStyle="italic" textAlign="center" mb="1rem">
          No roles assigned to {isOwnProfile ? 'you' : 'this player'}.
        </Text>
      )}
      <Wrap mb={4} justify="center">
        {(roles ?? []).map((role, rank) => (
          <WrapItem key={role}>
            <MetaTag>
              <BoxedNextImage
                src={`/assets/roles/${role.toLowerCase()}.svg`}
                alt={role}
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
                {role}
              </Text>
            </MetaTag>
          </WrapItem>
        ))}
      </Wrap>
    </ProfileSection>
  );
};
