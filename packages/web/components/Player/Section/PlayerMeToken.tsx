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
  getErc20TokenData,
  getMeTokenFor,
  getMeTokenInfo,
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
  metokenAddress: string;
  owner: string;
  provider: any;
};

/* type TxData = {
  meToken: string,
  amount: string,
  recipient: string,
  sender: string,
} */

const MeTokenSwap: React.FC<SwapProps> = ({
  symbol,
  profilePicture,
  metokenAddress,
  collateral,
  owner,
  provider,
}) => {
  const [collateralTokenData, setCollateralTokenData] = useState<any>();
  const [meTokenData, setMeTokenData] = useState<any>();
  const [transactionType, toggleTransactionType] = useState<string>('');
  const [approved, setApproved] = useState<boolean>(true);
  // const [tx, setTx] = useState<TxData>();

  const txData = {
    meToken: '0xA64fc17B157aaA50AC9a8341BAb72D4647d0f1A7',
    amount: '1000000',
    recipient: '',
    sender: '',
  };

  const handleSpendMeTokens = async () => {
    await spendMeTokens(metokenAddress, txData.amount, owner, provider);
  };

  const approveMeTokenTx = async () => {
    await approveMeTokens(metokenAddress, txData.amount, provider).then((res) =>
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
    if (!metokenAddress || !collateral?.asset) return;
    const getInAndOutTokenData = async () => {
      await getErc20TokenData(collateral.asset, owner, provider).then((res) => {
        setCollateralTokenData(res);
      });
      await getErc20TokenData(metokenAddress, owner, provider).then((res) => {
        setMeTokenData(res);
      });
    };
    getInAndOutTokenData();
  }, [metokenAddress, collateral?.asset]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async () => {
    if (!approved) {
      await approveMeTokenTx().then((res) => setApproved(true));
    }
    if (transactionType === 'mint') {
      await mint(metokenAddress, txData.amount, owner, provider);
    } else {
      await burn(metokenAddress, txData.amount, owner, provider);
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
  const { provider } = useWeb3();

  useEffect(() => {
    const getTokenByOwner = async () => {
      await getMeTokenFor(player?.ethereumAddress, provider).then((r) =>
        setMeTokenAddress(r === nullMeToken ? 'Create meToken' : r),
      );
    };

    getTokenByOwner();
  }, [player]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const getInfoByToken = async () => {
      await getMeTokenInfo(
        meTokenAddress,
        player?.ethereumAddress,
        provider,
      ).then((r) => setMeTokenData(r));
    };

    getInfoByToken();
  }, [meTokenAddress]); // eslint-disable-line react-hooks/exhaustive-deps

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
                  address={meTokenData?.tokenAddress || ''}
                  symbol={meTokenData?.symbol || ''}
                  collateral={meTokenData?.collateral || ''}
                />
                <MeTokenSwap
                  profilePicture={meTokenData?.profilePicture || ''}
                  metokenAddress={meTokenData?.tokenAddress || ''}
                  symbol={meTokenData?.symbol || ''}
                  collateral={meTokenData?.collateral || ''}
                  owner={player.ethereumAddress}
                  provider={provider}
                />
              </>
            )}
          </>
        )}
      </Wrap>
    </ProfileSection>
  );
};
