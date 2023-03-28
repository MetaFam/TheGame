import { Image, Input, Text, Wrap } from '@metafam/ds';
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

type BlockProps = {
  symbol: string;
  profilePicture: string;
  address: string;
};

type SwapProps = {
  symbol: string;
  profilePicture: string;
  collateral: string;
  address: string;
};

const MeTokenSwap: React.FC<SwapProps> = ({
  symbol,
  profilePicture,
  address,
  collateral,
}) => (
  <Wrap>
    <Input
      bg="dark"
      w="100%"
      placeholder="Provide the URL of the content"
      _placeholder={{ color: 'whiteAlpha.500' }}
      value={''}
      onChange={() => {}}
      size="lg"
      borderRadius={0}
      borderColor="borderPurple"
      fontSize="md"
      borderWidth="2px"
    />
    <>{symbol + profilePicture + address + collateral}</>
  </Wrap>
);

const MeTokenBlock: React.FC<BlockProps> = ({
  symbol,
  profilePicture,
  address,
}) => (
  <Wrap>
    <Image
      src={profilePicture}
      height="70px"
      width="70px"
      borderRadius={50}
      mx="auto"
      alt="profile picture"
    />
    <Wrap>
      <Text>{symbol}</Text>
      <Text>{address}</Text>

      <MeTokenSwap
        profilePicture={profilePicture}
        address={address}
        symbol={symbol}
        collateral={''}
      />
    </Wrap>
  </Wrap>
);

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
      await getMeTokenInfo(meTokenAddress).then((r) => setMeTokenData(r));
    };

    getInfoByToken();
  }, [meTokenAddress]);

  return (
    <ProfileSection
      title="MeToken"
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
            {meTokenData && (
              <MeTokenBlock
                profilePicture={meTokenData?.profilePicture || ''}
                address={meTokenData?.address || ''}
                symbol={meTokenData?.symbol || ''}
              />
            )}
          </>
        )}
      </Wrap>
    </ProfileSection>
  );
};
