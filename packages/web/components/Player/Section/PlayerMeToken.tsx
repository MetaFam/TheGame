import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  MetaButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Wrap,
} from '@metafam/ds';
import { ProfileSection } from 'components/Section/ProfileSection';
import { ethers } from 'ethers';
import { Player } from 'graphql/autogen/types';
import { useWeb3 } from 'lib/hooks';
import React, { useEffect, useState } from 'react';
import { HiOutlineInformationCircle, HiSwitchVertical } from 'react-icons/hi';
import { BoxTypes } from 'utils/boxTypes';
import {
  approveMeTokens,
  burn,
  getMeToken,
  getMeTokenInfo,
  getTokenData,
  mint,
  nullMeToken,
  spendMeTokens,
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
  const [transactionType, toggleTransactionType] = useState<string>('');
  const [approved, setApproved] = useState<boolean>(true);
  const { provider } = useWeb3();

  const txData = {
    meToken: '0xA64fc17B157aaA50AC9a8341BAb72D4647d0f1A7',
    amount: '1000000',
    recipient: '',
    sender: '',
  };

  const handleSpendMeTokens = async () => {
    await spendMeTokens(txData.meToken, txData.amount, provider);
  };

  const approveMeTokenTx = async () => {
    await approveMeTokens(txData.meToken, txData.amount, provider).then((res) =>
      setApproved(true),
    );
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
    if (transactionType === 'mint') {
      await mint(
        '0xe79D5121A14a0f48cED6B1628D14F7D30AC3AF85',
        txData.amount,
        '0xc0163E58648b247c143023CFB26C2BAA42C9d9A9',
        provider,
      );
    } else {
      await burn(
        '0xe79D5121A14a0f48cED6B1628D14F7D30AC3AF85',
        txData.amount,
        '0xc0163E58648b247c143023CFB26C2BAA42C9d9A9',
        provider,
      );
    }
  };

  const roundNumber = (number: any) =>
    (Math.round(+ethers.utils.formatEther(number) * 100) / 100).toFixed(2);

  if (!collateralTokenData || !meTokenData) return <>Loading....</>;

  return (
    <Flex direction="column" gap="4">
      <Tabs align="center" size="md" variant="unstyled" w="100%">
        <TabList>
          <Tab _selected={{ color: 'teal.200' }}>Swap</Tab>
          <Tab _selected={{ color: 'teal.200' }}>Spend</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex direction="column" justifyItems="center">
              <Box width="sm" bg="white" borderRadius="lg">
                <Flex justify="space-between" align="center" p="2">
                  <Box>
                    <Text color="black">
                      {roundNumber(collateralTokenData.balance)}
                    </Text>
                    <Text color="grey">{roundNumber(meTokenData.balance)}</Text>
                  </Box>
                  {transactionType === 'mint' ? (
                    <Wrap align="center">
                      <Button
                        borderColor="black"
                        color="black"
                        variant="outline"
                        textTransform="uppercase"
                        borderRadius="full"
                        size="sm"
                      >
                        Max
                      </Button>
                      <Text color="black">{collateralTokenData.symbol}</Text>
                      <Text color="black">
                        {roundNumber(collateralTokenData.balance)}
                      </Text>
                    </Wrap>
                  ) : (
                    <Wrap align="center">
                      <Image
                        src={profilePicture}
                        height="36px"
                        width="36px"
                        borderRadius={50}
                        mx="auto"
                        alt="profile picture"
                      />
                      <Text color="black">{symbol}</Text>
                    </Wrap>
                  )}
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  bg="white"
                  p="0.18rem"
                  marginBottom="-1.5rem"
                >
                  <IconButton
                    aria-label="reverse transaction"
                    variant="outline"
                    backgroundColor="white"
                    _hover={{ bg: 'white' }}
                    colorScheme="gray"
                    onClick={changeTransactionType}
                    fontSize="20px"
                    borderRadius="full"
                    icon={<HiSwitchVertical color="black" />}
                  />
                </Flex>
                <hr />
                <Flex justify="space-between" align="center" p="2">
                  <Box>
                    <Text color="black">
                      {roundNumber(collateralTokenData.balance)}
                    </Text>
                    <Text color="grey">{roundNumber(meTokenData.balance)}</Text>
                  </Box>
                  {transactionType === 'burn' ? (
                    <Wrap align="center">
                      <Button
                        borderColor="black"
                        color="black"
                        variant="outline"
                        textTransform="uppercase"
                        borderRadius="full"
                        size="sm"
                      >
                        Max
                      </Button>
                      <Text color="black">{collateralTokenData.symbol}</Text>
                      <Text color="black">
                        {roundNumber(collateralTokenData.balance)}
                      </Text>
                    </Wrap>
                  ) : (
                    <Wrap align="center">
                      <Image
                        src={profilePicture}
                        height="36px"
                        width="36px"
                        borderRadius={50}
                        mx="auto"
                        alt="profile picture"
                      />
                      <Text color="black">{symbol}</Text>
                    </Wrap>
                  )}
                </Flex>
              </Box>
              <MetaButton mx="auto" mt="1rem" onClick={handleSubmit}>
                {approved
                  ? `Swap
                ${
                  transactionType === 'mint'
                    ? collateralTokenData.symbol
                    : symbol
                }
                for
                ${
                  transactionType === 'mint'
                    ? symbol
                    : collateralTokenData.symbol
                }`
                  : 'Approve meTokens'}
              </MetaButton>
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex direction="column" justifyItems="center">
              <Box width="sm" bg="white" borderRadius="lg">
                <Flex justify="space-between" align="center" p="2">
                  <Box>
                    <Text color="black">
                      {roundNumber(collateralTokenData.balance)}
                    </Text>
                    <Text color="grey">{roundNumber(meTokenData.balance)}</Text>
                  </Box>
                  <Wrap align="center">
                    <Image
                      src={profilePicture}
                      height="36px"
                      width="36px"
                      borderRadius={50}
                      mx="auto"
                      alt="profile picture"
                    />
                    <Text color="black">{symbol}</Text>
                  </Wrap>
                </Flex>
                <hr />
                <Flex justify="space-between" align="center" p="2">
                  <Text
                    display="flex"
                    alignItems="center"
                    gap="5px"
                    color="black"
                  >
                    meToken Value
                    <HiOutlineInformationCircle />
                  </Text>
                  <Text color="black">{roundNumber(meTokenData.balance)}</Text>
                </Flex>
              </Box>
              <MetaButton mx="auto" mt="1rem" onClick={handleSpendMeTokens}>
                Spend {symbol}
              </MetaButton>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

const MeTokenBlock: React.FC<BlockProps> = ({
  symbol,
  profilePicture,
  address,
  collateral,
}) => (
  <Flex alignItems="center">
    <Image
      src={profilePicture}
      height="50px"
      width="50px"
      borderRadius={50}
      mx="auto"
      alt="profile picture"
    />
    <Box p="4">
      <Text>{symbol}</Text>
      <Text>{address}</Text>
    </Box>
  </Flex>
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
              <>
                <MeTokenBlock
                  profilePicture={meTokenData?.profilePicture || ''}
                  address={meTokenData?.address || ''}
                  symbol={meTokenData?.symbol || ''}
                  collateral={meTokenData?.collateral || ''}
                />
                <MeTokenSwap
                  profilePicture={meTokenData?.profilePicture || ''}
                  address={meTokenData?.address || ''}
                  symbol={meTokenData?.symbol || ''}
                  collateral={meTokenData?.collateral || ''}
                />
              </>
            )}
          </>
        )}
      </Wrap>
    </ProfileSection>
  );
};
