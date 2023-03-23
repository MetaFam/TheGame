import { Text, Wrap } from '@metafam/ds';
import { ProfileSection } from 'components/Section/ProfileSection';
import { Player } from 'graphql/autogen/types';
import React, { useEffect, useState } from 'react';
import { BoxTypes } from 'utils/boxTypes';
import { getMeToken } from 'utils/meTokens';

type Props = {
  player: Player;
  isOwnProfile?: boolean;
  editing?: boolean;
};
export const PlayerMeTokens: React.FC<Props> = ({
  player,
  isOwnProfile,
  editing,
}) => {
  const [meTokenData, setMeTokenData] = useState<string>('');

  useEffect(() => {
    const getData = async () => {
      await getMeToken(player?.ethereumAddress).then((r) =>
        r === -1 ? setMeTokenData('Create a Me Token') : '',
      );
    };

    getData();
  }, [player]);

  return (
    <ProfileSection
      title="Me Token"
      type={BoxTypes.PLAYER_ROLES}
      {...{ isOwnProfile, editing }}
    >
      <Wrap mb={4} justify="center">
        {meTokenData === 'Create a Me Token' ? (
          <>
            <a
              href="https://metokens.com/create-token"
              target="_blank"
              rel={'noreferrer'}
            >
              <Text>Create a me token</Text>
            </a>
          </>
        ) : (
          <>{meTokenData}</>
        )}
      </Wrap>
    </ProfileSection>
  );
};
