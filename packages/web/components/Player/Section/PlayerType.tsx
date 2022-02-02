import { Text } from '@metafam/ds';
import { FlexContainer } from 'components/Container';
import { ProfileSection } from 'components/Profile/ProfileSection';
import { ExplorerType, Player } from 'graphql/autogen/types';
import { useProfileField } from 'lib/hooks';
import React from 'react';
import { BoxType } from 'utils/boxTypes';

type Props = {
  player: Player;
  isOwnProfile?: boolean;
  canEdit?: boolean;
};

export const PlayerType: React.FC<Props> = ({
  player,
  isOwnProfile,
  canEdit,
}) => {
  const { explorerType } = useProfileField<ExplorerType>({
    field: 'explorerType',
    player,
    owner: isOwnProfile,
  });

  return (
    <ProfileSection
      title="Player Type"
      {...{ isOwnProfile, canEdit }}
      boxType={BoxType.PLAYER_TYPE}
      withoutBG
    >
      {!explorerType ? (
        <Text fontStyle="italic" textAlign="center" mb={6}>
          Unspecified
        </Text>
      ) : (
        <FlexContainer
          align="stretch"
          transition="opacity 0.4s"
          // opacity={animation === 'fadeIn' ? 1 : 0}
        >
          <Text
            color="white"
            fontWeight="600"
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
        </FlexContainer>
      )}
    </ProfileSection>
  );
};
