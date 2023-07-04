import { Text, Wrap } from '@metafam/ds';
import { ProfileSection } from 'components/Section/ProfileSection';
import { Player } from 'graphql/autogen/types';
import React from 'react';

type Props = {
  player: Player;
  isOwnProfile?: boolean;
  editing?: boolean;
};

export const PlayerDework: React.FC<Props> = ({
  player,
  isOwnProfile,
  editing,
}) => (
  <ProfileSection title="MeToken" {...{ isOwnProfile, editing }}>
    <Wrap mb={4} justify="center">
      <Text>Dework Profile</Text>
    </Wrap>
  </ProfileSection>
);
