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
  useToast,
  Wrap,
} from '@metafam/ds';
import { ProfileSection } from 'components/Section/ProfileSection';
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
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

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
    if (!amount || !metokenAddress) return;
    handlePreview();
  }, [transactionType, amount, metokenAddress]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSpendMeTokens = async () => {
    setLoading(true);
    await spendMeTokens(
      metokenAddress,
      ethers.utils.parseEther(amount),
      owner,
      provider,
    )
      .then(() => {
        toast({
          title: 'Success',
          description: `Successfully spent ${meTokenData.symbol} with Issuer.`,
          status: 'success',
          isClosable: true,
        });
        setLoading(false);
      })
      .catch(() => {
        toast({
          title: 'Error',
          description: `Could not spend ${meTokenData.symbol} tokens.`,
          status: 'error',
          isClosable: true,
        });
        setLoading(false);
      });
  };

  const approveMeTokenTx = async () => {
    const approvalToken =
      transactionType === 'mint' ? collateral : metokenAddress;
    await approveMeTokens(
      approvalToken,
      ethers.utils.parseEther(amount),
      provider,
    )
      .then(() => {
        toast({
          title: 'Success',
          description: `Tokens approved successfully.`,
          status: 'success',
          isClosable: true,
        });
        setApproved(true);
        setLoading(false);
      })
      .catch(() => {
        toast({
          title: 'Error',
          description: `Token Approval Failed`,
          status: 'error',
          isClosable: true,
        });
        setLoading(false);
      });
  };

  const clearAmounts = () => {
    setAmount('0');
    setPreviewAmount('0');
  };

  const changeTransactionType = () => {
    clearAmounts();
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
    else {
      setPreviewAmount('0');
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!approved) {
      await approveMeTokenTx();
      return;
    }
    if (transactionType === 'mint' && amount) {
      await mint(
        metokenAddress,
        ethers.utils.parseEther(amount),
        owner,
        provider,
      )
        .then(() => {
          toast({
            title: 'Success',
            description: `${meTokenData.symbol} minted successfully.`,
            status: 'success',
            isClosable: true,
          });
          setLoading(false);
        })
        .catch(() => {
          toast({
            title: 'Error',
            description: `${meTokenData.symbol} mint failed.`,
            status: 'error',
            isClosable: true,
          });
          setLoading(false);
        });
    } else {
      await burn(
        metokenAddress,
        ethers.utils.parseEther(amount),
        owner,
        provider,
      )
        .then(() => {
          toast({
            title: 'Success',
            description: `${meTokenData.symbol} burned successfully.`,
            status: 'success',
            isClosable: true,
          });
          setLoading(false);
        })
        .catch(() => {
          toast({
            title: 'Error',
            description: `${meTokenData.symbol} burn failed.`,
            status: 'error',
            isClosable: true,
          });
          setLoading(false);
        });
    }
  };

  const handleSetAmount = (swapAmount: string) => {
    if (swapAmount && !/^[0-9.]+$/.test(swapAmount)) return;
    if (
      transactionType === 'burn' &&
      +swapAmount > +humanizeNumber(meTokenData.balance)
    ) {
      setAmount(humanizeNumber(meTokenData.balance));
    } else {
      setAmount(swapAmount);
    }
  };

  const handleSetSpendAmount = (spendAmount: string) => {
    if (transactionType === 'mint') {
      changeTransactionType();
      handleSetAmount(spendAmount);
    } else {
      handleSetAmount(spendAmount);
    }
  };

  const handleSwitchToMainnet = async () => {
    await switchChainOnMetaMask('0x1');
  };

  const roundNumber = (number: string) =>
    (Math.round(+ethers.utils.formatEther(number) * 100) / 100).toFixed(2);

  const humanizeNumber = (number: number) =>
    `${+ethers.utils.formatEther(number)}`;

  if (!collateralTokenData || !meTokenData) return <>Loading....</>;

  return (
    <Flex direction="column" gap="1">
      <Tabs align="center" size="md" variant="unstyled" w="100%">
        <TabList>
          <Tab _selected={{ color: 'teal.200' }}>Swap</Tab>
          <Tab _selected={{ color: 'teal.200' }} onClick={clearAmounts}>
            Spend
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex direction="column" justifyItems="center">
              <Box width="sm" bg="white" borderRadius="lg">
                <Flex
                  justify="space-between"
                  align="center"
                  p="0.5"
                  pt="2"
                  pb="2"
                >
                  <Box>
                    <Input
                      p={2}
                      backgroundColor={'#fffff'}
                      color={'black'}
                      border={'none'}
                      value={amount}
                      type="text"
                      onChange={(e) => handleSetAmount(e.target.value)}
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
                          setAmount(humanizeNumber(collateralTokenData.balance))
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
                          setAmount(humanizeNumber(meTokenData.balance))
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
                <MetaButton
                  mx="auto"
                  mt="1rem"
                  onClick={handleSubmit}
                  disabled={loading}
                >
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
                    <Input
                      backgroundColor={'#fffff'}
                      color={'black'}
                      border={'none'}
                      value={amount}
                      p={2}
                      type="text"
                      onChange={(e) => handleSetSpendAmount(e.target.value)}
                      name="Amount"
                    />
                    <Text
                      color="gray"
                      fontSize={'12'}
                      textAlign={'left'}
                      ml={2.5}
                    >
                      {roundNumber(meTokenData.balance)}
                    </Text>
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
                  <Text color="black">$ {roundNumber(previewAmount)}</Text>
                </Flex>
              </Box>
              {chainId === '0x1' ? (
                <MetaButton
                  mx="auto"
                  mt="1rem"
                  onClick={handleSpendMeTokens}
                  disabled={loading}
                >
                  {loading ? 'Loading..' : `Spend ${symbol}`}
                </MetaButton>
              ) : (
                <MetaButton mx="auto" mt="1rem" onClick={handleSwitchToMainnet}>
                  Switch Chain
                </MetaButton>
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
      <Text fontSize={'14px'}>{address}</Text>
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
    if (!player?.ethereumAddress) return;
    const getTokenByOwner = async () => {
      await getMeTokenFor(player?.ethereumAddress).then((r) => {
        setMeTokenAddress(r === nullMeToken ? 'Create meToken' : r);
      });
    };

    getTokenByOwner();
  }, [player?.ethereumAddress]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (
      !meTokenAddress ||
      meTokenAddress === 'Create meToken' ||
      !player?.ethereumAddress
    )
      return;
    const getInfoByToken = async () => {
      await getMeTokenInfo(meTokenAddress, player?.ethereumAddress).then((r) =>
        setMeTokenData(r),
      );
    };

    getInfoByToken();
  }, [meTokenAddress, player?.ethereumAddress]); // eslint-disable-line react-hooks/exhaustive-deps

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
              <MetaButton mx="auto" mt="1rem">
                <Text>Create a me token</Text>
              </MetaButton>
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
