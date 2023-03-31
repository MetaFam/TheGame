import { Button, Image, Input, Text, Wrap } from '@metafam/ds';
import { ProfileSection } from 'components/Section/ProfileSection';
import { ethers } from 'ethers';
import { Player } from 'graphql/autogen/types';
import React, { useEffect, useState } from 'react';
import { BoxTypes } from 'utils/boxTypes';
import {
  approveMeTokens,
  burn,
  getMeToken,
  getMeTokenInfo,
  getTokenData,
  mint,
  nullMeToken,
} from 'utils/meTokens';

type Props = {
  player: Player;
  isOwnProfile?: boolean;
  editing?: boolean;
};

type BlockProps = {
  symbol: string;
  profilePicture: string;
  address: string;
  collateral: any;
};

type SwapProps = {
  symbol: string;
  profilePicture: string;
  collateral: any;
  address: string;
};

const MeTokenSwap: React.FC<SwapProps> = ({
  symbol,
  profilePicture,
  address,
  collateral,
}) => {
  const [collateralTokenData, setCollateralTokenData] = useState<any>();
  const [meTokenData, setMeTokenData] = useState<any>();
  const [transactionType, toggleTransactionType] = useState<string>('mint');
  const [approved, setApproved] = useState<boolean>(false);

  const txData = {
    meToken: '0xA64fc17B157aaA50AC9a8341BAb72D4647d0f1A7',
    amount: '1000000',
    recipient: '',
    sender: '',
  };

  const approveMeTokenTx = async () => {
    await approveMeTokens(txData.meToken, txData.amount);
  };

  const changeTransactionType = () => {
    if (transactionType === 'mint') {
      toggleTransactionType('burn');
    } else {
      toggleTransactionType('mint');
    }
  };

  useEffect(() => {
    if (!address || !collateral?.asset) return;
    const getInAndOutTokenData = async () => {
      await getTokenData(collateral.asset).then((res) => {
        setCollateralTokenData(res);
      });
      await getTokenData(address).then((res) => {
        setMeTokenData(res);
      });
    };
    getInAndOutTokenData();
  }, [address, collateral?.asset]);

  const handleSubmit = async () => {
    if (!approved) {
      await approveMeTokenTx().then((res) => setApproved(true));
    }
    approveMeTokenTx();
    if (transactionType === 'mint') {
      await mint;
    } else {
      await burn;
    }
  };

  if (!collateralTokenData || !meTokenData) return <>Loading....</>;

  return (
    <Wrap>
      {transactionType === 'mint' ? (
        <>
          <Text>{transactionType}</Text>
          <Wrap border={'2px solid white'}>
            <Text>Amount out</Text>
            <Text>{collateralTokenData.symbol}</Text>
            <Text>{ethers.utils.formatEther(collateralTokenData.balance)}</Text>
          </Wrap>
          <Button backgroundColor={'black'} onClick={changeTransactionType}>
            Reverse
          </Button>
          <Wrap border={'2px solid white'}>
            <Image
              src={profilePicture}
              height="70px"
              width="70px"
              borderRadius={50}
              mx="auto"
              alt="profile picture"
            />
            <Text>{symbol}</Text>
            <Input
              bg="dark"
              w="100%"
              placeholder="Amount to swap"
              _placeholder={{ color: 'whiteAlpha.500' }}
              value={''}
              onChange={() => {}}
              size="lg"
              borderRadius={0}
              borderColor="borderPurple"
              fontSize="md"
              borderWidth="2px"
            />
            <Text>
              Amount in: {ethers.utils.formatEther(meTokenData.balance)}
            </Text>
            <Button backgroundColor={'black'}>Max</Button>
          </Wrap>
        </>
      ) : (
        <>
          <Text>{transactionType}</Text>
          <Wrap border={'2px solid white'}>
            <Image
              src={profilePicture}
              height="70px"
              width="70px"
              borderRadius={50}
              mx="auto"
              alt="profile picture"
            />
            <Text>{symbol}</Text>
            <Input
              bg="dark"
              w="100%"
              placeholder="Amount to swap"
              _placeholder={{ color: 'whiteAlpha.500' }}
              value={''}
              onChange={() => {}}
              size="lg"
              borderRadius={0}
              borderColor="borderPurple"
              fontSize="md"
              borderWidth="2px"
            />
            <Text>
              Amount Out: {ethers.utils.formatEther(meTokenData.balance)}
            </Text>
            <Button backgroundColor={'black'}>Max</Button>
          </Wrap>
          <Button backgroundColor={'black'} onClick={changeTransactionType}>
            Reverse
          </Button>
          <Wrap border={'2px solid white'}>
            <Text>Amount In: </Text>
            <Text>{collateralTokenData.symbol}</Text>
            <Text>{ethers.utils.formatEther(collateralTokenData.balance)}</Text>
          </Wrap>
        </>
      )}
      <Button backgroundColor={'black'} onClick={handleSubmit}>
        {approved ? transactionType : 'Approve meTokens'}
      </Button>
    </Wrap>
  );
};

const MeTokenBlock: React.FC<BlockProps> = ({
  symbol,
  profilePicture,
  address,
  collateral,
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
      <Text>--------------</Text>
      <MeTokenSwap
        profilePicture={profilePicture}
        address={address}
        symbol={symbol}
        collateral={collateral}
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
                collateral={meTokenData?.collateral || ''}
              />
            )}
          </>
        )}
      </Wrap>
    </ProfileSection>
  );
};
