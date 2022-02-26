import { BoxedNextImage, MetaTag, Text, Wrap, WrapItem } from '@metafam/ds';
import { ProfileSection } from 'components/Profile/ProfileSection';
import { Player } from 'graphql/autogen/types';
import { useOverridableField } from 'lib/hooks';
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
}) => {
  const field = 'roles';
  const { value: roles } = useOverridableField({
    field,
    defaultValue: (player.roles ?? [])
      .sort((a, b) => a.rank - b.rank)
      .map(({ role }) => role),
  });

  return (
    <ProfileSection
      title="Roles"
      modalTitle={false}
      type={BoxTypes.PLAYER_ROLES}
      withoutBG
      {...{ isOwnProfile, editing }}
    >
      {roles?.length === 0 && (
        <Text fontStyle="italic" textAlign="center" mb="1rem">
          No Roles found for {isOwnProfile ? 'you' : 'this player'}.
        </Text>
      )}
      <Wrap mb={4}>
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
