import { Text } from '@metafam/ds';
import { ColorBar } from 'components/Player/ColorBar';
import { ProfileSection } from 'components/Section/ProfileSection';
import { Player } from 'graphql/autogen/types';
import {
  getPersonalityInfo,
  PersonalityInfo,
} from 'graphql/queries/enums/getPersonalityInfo';
import { useUser } from 'lib/hooks';
import React, { useEffect, useState } from 'react';
import { BoxTypes } from 'utils/boxTypes';

export type PersonalityTypeProps = {
  player: Player;
  editing?: boolean;
};

export const PlayerPersonalityType: React.FC<PersonalityTypeProps> = ({
  player,
  editing = false,
}) => {
  const { fetching, user } = useUser();

  const [types, setTypes] = useState<PersonalityInfo>(null);

  useEffect(() => {
    const getInfo = async () => {
      setTypes(await getPersonalityInfo());
    };
    getInfo();
  }, []);

  return (
    <ProfileSection
      title="Personality Type"
      type={BoxTypes.PLAYER_COLOR_DISPOSITION}
      isOwnProfile={user && user.id === player.id}
      {...{ editing }}
    >
      {player.profile?.colorMask == null ? (
        <Text fontStyle="italic" textAlign="center" mb={6}>
          Unspecified.
        </Text>
      ) : (
        <ColorBar
          {...{ types }}
          loading={fetching}
          mask={player.profile?.colorMask}
        />
      )}
    </ProfileSection>
  );
};
