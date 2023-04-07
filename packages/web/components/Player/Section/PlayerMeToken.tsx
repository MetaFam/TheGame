import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Input,
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
import { SwitchNetworkButton } from 'components/SwitchNetworkButton';
import { ethers } from 'ethers';
import { Player } from 'graphql/autogen/types';
import { useWeb3 } from 'lib/hooks';
import React, { useEffect, useState } from 'react';
import { HiOutlineInformationCircle, HiSwitchVertical } from 'react-icons/hi';
import { BoxTypes } from 'utils/boxTypes';
import { switchChainOnMetaMask } from 'utils/metamask';
import {
  approveMeTokens,
  burn,
  getErc20TokenData,
  getMeTokenFor,
  getMeTokenInfo,
  mint,
  nullMeToken,
  preview,
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
  const [transactionType, toggleTransactionType] = useState<string>('mint');
  const [approved, setApproved] = useState<boolean>(false);
  const { chainId, address } = useWeb3();
  const [amount, setAmount] = useState<string>('0');

  const handleSpendMeTokens = async () => {
    await spendMeTokens(
      metokenAddress,
      ethers.utils.parseEther(amount),
      owner,
      provider,
    );
  };

  const approveMeTokenTx = async () => {
    const approvalToken =
      transactionType === 'mint'
        ? '0x6B175474E89094C44Da98b954EedeAC495271d0F'
        : metokenAddress;
    await approveMeTokens(
      approvalToken,
      ethers.utils.parseEther(amount),
      provider,
    ).then((res) => setApproved(true));
  };

  const changeTransactionType = () => {
    if (transactionType === 'mint') {
      toggleTransactionType('burn');
    } else {
      toggleTransactionType('mint');
    }
  };

  const handlePreview = async () => {
    if (address)
      await preview(
        metokenAddress,
        ethers.utils.parseEther(amount),
        address,
        transactionType,
        provider,
      );
  };

  useEffect(() => {
    if (!metokenAddress || !collateral?.asset) return;
    const getInAndOutTokenData = async () => {
      await getErc20TokenData(collateral.asset, owner).then((res) => {
        setCollateralTokenData(res);
      });
      await getErc20TokenData(metokenAddress, owner).then((res) => {
        setMeTokenData(res);
      });
    };
    getInAndOutTokenData();
  }, [metokenAddress, collateral?.asset]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async () => {
    if (!approved) {
      await approveMeTokenTx().then((res) => {
        setApproved(true);
        handlePreview();
      });
    }
    if (transactionType === 'mint') {
      await mint(
        metokenAddress,
        ethers.utils.parseEther(amount),
        owner,
        provider,
      );
    } else {
      await burn(
        metokenAddress,
        ethers.utils.parseEther(amount),
        owner,
        provider,
      );
    }
  };

  const handleSwitchToMainnet = async () => {
    await switchChainOnMetaMask('0x1');
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
                    <Input
                      backgroundColor={'#fffff'}
                      color={'black'}
                      border={'none'}
                      value={amount}
                      type="text"
                      onChange={(e) => setAmount(e.target.value)}
                      name="Amount"
                    />
                    {roundNumber(collateralTokenData.balance)}
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
              {chainId === '0x1' ? (
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
                    : 'Approve Tokens'}
                </MetaButton>
              ) : (
                <MetaButton mx="auto" mt="1rem" onClick={handleSwitchToMainnet}>
                  Switch Chain
                </MetaButton>
              )}
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
              {chainId === '1' ? (
                <MetaButton mx="auto" mt="1rem" onClick={handleSpendMeTokens}>
                  Spend {symbol}
                </MetaButton>
              ) : (
                <Wrap mx="auto" mt="1rem">
                  <SwitchNetworkButton />
                </Wrap>
              )}
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
      await getMeTokenFor(player?.ethereumAddress).then((r) =>
        setMeTokenAddress(r === nullMeToken ? 'Create meToken' : r),
      );
    };

    getTokenByOwner();
  }, [player]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const getInfoByToken = async () => {
      await getMeTokenInfo(meTokenAddress, player?.ethereumAddress).then((r) =>
        setMeTokenData(r),
      );
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
