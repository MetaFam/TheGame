import { Text } from '@metafam/ds';
import { Maybe } from '@metafam/utils';
import { ProfileSection } from 'components/Section/ProfileSection';
import { usePlayerHydrationContext } from 'contexts/PlayerHydrationContext';
import { ExplorerType } from 'graphql/autogen/types';
import { getExplorerTypes } from 'graphql/queries/enums/getExplorerTypes';
import { useUser } from 'lib/hooks';
import React, { useEffect, useState } from 'react';
import { BoxTypes } from 'utils/boxTypes';

type Props = {
  editing?: boolean;
};

export const PlayerType: React.FC<Props> = ({ editing }) => {
  const { fetching, user } = useUser();
  const { hydratedPlayer: player } = usePlayerHydrationContext();
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
      isOwnProfile={user && user.id === player.id}
      {...{ editing }}
      type={BoxTypes.PLAYER_TYPE}
    >
      {(fetching || !choices) && (
        <Text fontStyle="italic" textAlign="center" mb={6}>
          Loading Settings…
        </Text>
      )}
      {!fetching && !!choices && !explorerType && (
        <Text fontStyle="italic" textAlign="center" mb={6}>
          Unspecified.
        </Text>
      )}
      {!fetching && !!choices && explorerType && (
        /* TODO this is still using client-side state, change to dynamically fetch from ComposeDB after the modal has closed  */
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
