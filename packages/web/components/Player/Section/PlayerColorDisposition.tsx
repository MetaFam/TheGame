import { Text } from '@metafam/ds';
import { ColorBar } from 'components/Player/ColorBar';
import { ProfileSection } from 'components/Profile/ProfileSection';
import { Player } from 'graphql/autogen/types';
import { PersonalityInfo } from 'graphql/queries/enums/getPersonalityInfo';
import { useProfileField } from 'lib/hooks';
import React from 'react';
import { BoxType } from 'utils/boxTypes';

export type ColorDispositionProps = {
  player: Player;
  types: PersonalityInfo;
  isOwnProfile?: boolean;
  canEdit?: boolean;
};

export const PlayerColorDisposition: React.FC<ColorDispositionProps> = ({
  player,
  types,
  isOwnProfile,
  canEdit,
}) => {
  const { value: mask } = useProfileField<number>({
    field: 'colorMask',
    player,
    owner: isOwnProfile,
  });

  return (
    <ProfileSection
      title="Color Disposition"
      boxType={BoxType.PLAYER_COLOR_DISPOSITION}
      withoutBG
      {...{ isOwnProfile, canEdit }}
    >
      {mask == null ? (
        <Text fontStyle="italic" textAlign="center" mb={6}>
          Unspecified
        </Text>
      ) : (
        <ColorBar {...{ mask, types }} />
      )}
    </ProfileSection>
  );
};
