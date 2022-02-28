import { Text } from '@metafam/ds';
import { ProfileSection } from 'components/Profile/ProfileSection';
import { ExplorerType, Player } from 'graphql/autogen/types';
import { useProfileField } from 'lib/hooks';
import React from 'react';
import { BoxTypes } from 'utils/boxTypes';

type Props = {
  player: Player;
  isOwnProfile?: boolean;
  editing?: boolean;
};

export const PlayerType: React.FC<Props> = ({ player, editing }) => {
  const { explorerType, owner: isOwnProfile } = useProfileField<ExplorerType>({
    field: 'explorerType',
    player,
  });

  return (
    <ProfileSection
      title="Player Type"
      {...{ isOwnProfile, editing }}
      type={BoxTypes.PLAYER_TYPE}
      withoutBG
    >
      {!explorerType ? (
        <Text fontStyle="italic" textAlign="center" mb={6}>
          Unspecified
        </Text>
      ) : (
        <>
          <Text
            color="white"
            fontWeight={600}
            casing="uppercase"
            fontSize={{ base: 'md', sm: 'lg' }}
          >
            {explorerType.title}
          </Text>
          <Text
            fontSize={{ base: 'sm', sm: 'md' }}
            color="blueLight"
            textAlign="justify"
          >
            {explorerType.description}
          </Text>
        </>
      )}
    </ProfileSection>
  );
};
