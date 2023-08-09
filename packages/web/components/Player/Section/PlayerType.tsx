import { Text } from '@metafam/ds';
import { Maybe } from '@metafam/utils';
import { ProfileSection } from 'components/Section/ProfileSection';
import { ExplorerType, Player } from 'graphql/autogen/types';
import { getExplorerTypes } from 'graphql/queries/enums/getExplorerTypes';
import React, { useEffect, useState } from 'react';
import { BoxTypes } from 'utils/boxTypes';

type Props = {
  player: Player;
  isOwnProfile?: boolean;
  editing?: boolean;
};

export const PlayerType: React.FC<Props> = ({
  player,
  isOwnProfile,
  editing = false,
}) => {
  const [choices, setChoices] = useState<Maybe<Array<ExplorerType>>>(null);

  useEffect(() => {
    const fetchTypes = async () => {
      setChoices(await getExplorerTypes());
    };

    fetchTypes();
  }, [setChoices]);

  const explorerType = choices?.find(
    (choice) => choice.title === player.profile?.explorerTypeTitle,
  );

  return (
    <ProfileSection
      title={explorerType?.title ?? 'Player Type'}
      modalTitle={'Player Type'}
      {...{ editing, isOwnProfile }}
      type={BoxTypes.PLAYER_TYPE}
    >
      {!choices && (
        <Text fontStyle="italic" textAlign="center" mb={6}>
          Loading Settings…
        </Text>
      )}
      {choices && !explorerType && (
        <Text fontStyle="italic" textAlign="center" mb={6}>
          Unspecified.
        </Text>
      )}
      {choices && explorerType && (
        <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          color="blueLight"
          textAlign="justify"
        >
          {explorerType.description}
        </Text>
      )}
    </ProfileSection>
  );
};
