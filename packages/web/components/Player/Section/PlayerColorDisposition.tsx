import { Text } from '@metafam/ds';
import { ColorBar } from 'components/Player/ColorBar';
import { ProfileSection } from 'components/Profile/ProfileSection';
import { Player } from 'graphql/autogen/types';
import {
  getPersonalityInfo,
  PersonalityInfo,
} from 'graphql/queries/enums/getPersonalityInfo';
import { useProfileField } from 'lib/hooks';
import React, { useEffect, useState } from 'react';
import { BoxTypes } from 'utils/boxTypes';

export type ColorDispositionProps = {
  player: Player;
  editing?: boolean;
};

export const PlayerColorDisposition: React.FC<ColorDispositionProps> = ({
  player,
  editing = false,
}) => {
  const {
    value: mask,
    owner: isOwnProfile,
    fetching,
  } = useProfileField<number>({
    field: 'colorMask',
    player,
  });
  const [types, setTypes] = useState<PersonalityInfo>(null);

  useEffect(() => {
    const getInfo = async () => {
      setTypes(await getPersonalityInfo());
    };
    getInfo();
  }, []);

  return (
    <ProfileSection
      title="Color Disposition"
      type={BoxTypes.PLAYER_COLOR_DISPOSITION}
      withoutBG
      modalTitle={false}
      {...{ isOwnProfile, editing }}
    >
      {mask == null ? (
        <Text fontStyle="italic" textAlign="center" mb={6}>
          Unspecified.
        </Text>
      ) : (
        <ColorBar {...{ mask, types }} loading={fetching} />
      )}
    </ProfileSection>
  );
};
