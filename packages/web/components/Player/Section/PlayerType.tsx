import { Text } from '@metafam/ds';
import { Maybe } from '@metafam/utils';
import { ProfileSection } from 'components/Profile/ProfileSection';
import { ExplorerType, Player } from 'graphql/autogen/types';
import { getExplorerTypes } from 'graphql/queries/enums/getExplorerTypes';
import { useProfileField } from 'lib/hooks';
import { useEffect, useState } from 'react';
import { BoxTypes } from 'utils/boxTypes';

type Props = {
  player: Player;
  isOwnProfile?: boolean;
  editing?: boolean;
};

export const PlayerType: React.FC<Props> = ({ player, editing }) => {
  const {
    explorerTypeTitle,
    owner: isOwnProfile,
    fetching,
  } = useProfileField<string>({
    field: 'explorerTypeTitle',
    player,
  });
  const [choices, setChoices] = useState<Maybe<Array<ExplorerType>>>(null);

  useEffect(() => {
    const fetchTypes = async () => {
      setChoices(await getExplorerTypes());
    };

    fetchTypes();
  }, [setChoices]);

  const explorerType = choices?.find(
    (choice) => choice.title === explorerTypeTitle,
  );

  return (
    <ProfileSection
      title="Player Type"
      {...{ isOwnProfile, editing }}
      type={BoxTypes.PLAYER_TYPE}
      withoutBG
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
