import { Text, Wrap } from '@metafam/ds';
import { ProfileSection } from 'components/Section/ProfileSection';
import { Player } from 'graphql/autogen/types';
import React, { useEffect, useState } from 'react';
import { BoxTypes } from 'utils/boxTypes';
import { getMeToken, getMeTokenInfo, nullMeToken } from 'utils/meTokens';

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
  const [meTokenAddress, setMeTokenAddress] = useState<string>('');
  const [meTokenData, setMeTokenData] = useState<any>('');

  useEffect(() => {
    const getTokenByOwner = async () => {
      await getMeToken(player?.ethereumAddress).then((r) =>
        setMeTokenAddress(r === nullMeToken ? 'Create meToken' : r),
      );
    };

    getTokenByOwner();
  }, [player]);

  useEffect(() => {
    const getInfoByToken = async () => {
      setMeTokenData(
        await getMeTokenInfo(meTokenAddress).then((r) => setMeTokenData(r)),
      );
    };

    getInfoByToken();
  }, [meTokenAddress]);

  return (
    <ProfileSection
      title="Me Token"
      type={BoxTypes.PLAYER_ROLES}
      {...{ isOwnProfile, editing }}
    >
      <Wrap mb={4} justify="center">
        {meTokenAddress === 'Create meToken' ? (
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
          <>
            <>{meTokenData.symbol}</>
            <>{meTokenData.address}</>
          </>
        )}
      </Wrap>
    </ProfileSection>
  );
};
