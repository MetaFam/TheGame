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

type TokenData = {
  collateral: string;
  profilePicture: string;
  symbol: string;
  tokenAddress: string;
};

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
  const [previewAmount, setPreviewAmount] = useState<string>('0');

  useEffect(() => {
    if (!metokenAddress || !collateral) return;
    const getInAndOutTokenData = async () => {
      await getErc20TokenData(collateral, owner).then((res) => {
        setCollateralTokenData(res);
      });
      await getErc20TokenData(metokenAddress, owner).then((res) => {
        setMeTokenData(res);
      });
    };
    getInAndOutTokenData();
  }, [metokenAddress, collateral]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    handlePreview();
  }, [transactionType, amount, metokenAddress]); // eslint-disable-line react-hooks/exhaustive-deps

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
      transactionType === 'mint' ? collateral.asset : metokenAddress;
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
    if (address && amount)
      await preview(
        metokenAddress,
        ethers.utils.parseEther(amount),
        address,
        transactionType,
      ).then((res) => {
        setPreviewAmount(res);
      });
  };

  const handleSubmit = async () => {
    if (!approved) {
      await approveMeTokenTx().then((res) => {
        setApproved(true);
      });
    }
    if (transactionType === 'mint' && amount) {
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
                        onClick={() =>
                          setAmount(roundNumber(collateralTokenData.balance))
                        }
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
                      <Button
                        borderColor="black"
                        color="black"
                        variant="outline"
                        textTransform="uppercase"
                        borderRadius="full"
                        size="sm"
                        onClick={() =>
                          setAmount(roundNumber(meTokenData.balance))
                        }
                      >
                        Max
                      </Button>
                      <Text color="black">{symbol}</Text>
                      <Text color="black">
                        {roundNumber(meTokenData.balance)}
                      </Text>
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
                    <Text color="black">{roundNumber(previewAmount)}</Text>
                    <Text color="grey">{roundNumber(meTokenData.balance)}</Text>
                  </Box>
                  {transactionType === 'burn' ? (
                    <Wrap align="center">
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
  const [meTokenData, setMeTokenData] = useState<TokenData>();
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
