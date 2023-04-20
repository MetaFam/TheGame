import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Input,
  LoadingState,
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
import { SwitchNetworkButton } from 'components/SwitchNetworkButton';
import { ethers } from 'ethers';
import { Player } from 'graphql/autogen/types';
import { useWeb3 } from 'lib/hooks';
import React, { useCallback, useEffect, useState } from 'react';
import { HiOutlineInformationCircle, HiSwitchVertical } from 'react-icons/hi';
import { BoxTypes } from 'utils/boxTypes';
import { humanizeNumber, roundNumber } from 'utils/mathHelper';
import {
  approveMeTokens,
  burn,
  checkMeTokenApproval,
  getCollateralData,
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

type LiveCollateralData = {
  image: string;
  currentPrice: string;
};

const MeTokenSwap: React.FC<SwapProps> = ({
  symbol,
  profilePicture,
  metokenAddress,
  collateral,
  owner,
  provider,
}) => {
  const [liveCollateralData, setLiveCollateralData] =
    useState<LiveCollateralData>();
  const [collateralTokenData, setCollateralTokenData] = useState<any>();
  const [meTokenData, setMeTokenData] = useState<any>();
  const [transactionType, toggleTransactionType] = useState<string>('mint');
  const [approved, setApproved] = useState<boolean>(false);
  const { chainId, address } = useWeb3();
  const [amount, setAmount] = useState<string>();
  const [previewAmount, setPreviewAmount] = useState<string>('0');
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  useEffect(() => {
    if (!collateral) return;
    const getLiveData = async () => {
      setLiveCollateralData(await getCollateralData(collateral));
    };
    getLiveData();
  }, [collateral]);

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
  }, [metokenAddress, collateral, owner]);

  const handlePreview = useCallback(async () => {
    if (!address && !amount) setPreviewAmount('0');
    if (address) {
      setPreviewAmount(
        await preview(
          metokenAddress,
          ethers.utils.parseEther(amount || '0'),
          address,
          transactionType,
        ),
      );
    }
  }, [address, amount, transactionType, metokenAddress]);

  useEffect(() => {
    if (!amount || !metokenAddress) return;
    handlePreview();
  }, [handlePreview, amount, metokenAddress]);

  const approveMeTokenTx = useCallback(async () => {
    const approvalToken =
      transactionType === 'mint' ? collateral : metokenAddress;
    await approveMeTokens(
      approvalToken,
      ethers.utils.parseEther(amount || '0'),
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
  }, [
    setLoading,
    transactionType,
    amount,
    toast,
    collateral,
    metokenAddress,
    provider,
  ]);

  const handleSpendMeTokens = useCallback(async () => {
    setLoading(true);
    if (!approved) {
      await approveMeTokenTx();
      return;
    }
    await spendMeTokens(
      metokenAddress,
      ethers.utils.parseEther(amount || '0'),
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
  }, [
    meTokenData,
    amount,
    toast,
    approved,
    setLoading,
    approveMeTokenTx,
    metokenAddress,
    provider,
    owner,
  ]);

  const clearAmounts = useCallback(() => {
    toggleTransactionType('burn');
    setAmount('0');
    setPreviewAmount('0');
  }, [setAmount, setPreviewAmount]);

  const changeTransactionType = useCallback(() => {
    clearAmounts();
    toggleTransactionType(transactionType === 'mint' ? 'burn' : 'mint');
  }, [clearAmounts, toggleTransactionType, transactionType]);

  const handleSubmit = useCallback(async () => {
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
        ethers.utils.parseEther(amount || '0'),
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
  }, [
    setLoading,
    metokenAddress,
    owner,
    provider,
    toast,
    amount,
    meTokenData,
    approveMeTokenTx,
    approved,
    transactionType,
  ]);

  const handleSetAmount = useCallback(
    async (swapAmount: string) => {
      if (swapAmount && !/^[0-9.]+$/.test(swapAmount)) return;
      if (
        transactionType === 'burn' &&
        +swapAmount > +humanizeNumber(meTokenData.balance)
      ) {
        setAmount(humanizeNumber(meTokenData.balance));
      } else {
        setAmount(swapAmount);
      }
      if (address && amount) {
        const approvalToken =
          transactionType === 'mint' ? collateral : metokenAddress;
        checkMeTokenApproval(approvalToken, swapAmount, address).then((res) =>
          setApproved(res),
        );
      }
    },
    [
      setAmount,
      transactionType,
      meTokenData,
      address,
      amount,
      metokenAddress,
      collateral,
    ],
  );

  const handleSetSpendAmount = useCallback(
    (spendAmount: string) => {
      if (transactionType === 'mint') {
        changeTransactionType();
        handleSetAmount(spendAmount);
      } else {
        handleSetAmount(spendAmount);
      }
    },
    [transactionType, handleSetAmount, changeTransactionType],
  );

  if (!collateralTokenData || !meTokenData) return <LoadingState />;

  return (
    <Tabs align="center" size="md" variant="unstyled">
      <TabList>
        <Tab _selected={{ color: 'teal.200' }}>Swap</Tab>
        <Tab _selected={{ color: 'teal.200' }} onClick={clearAmounts}>
          Spend
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel p={0}>
          <Flex direction="column" justifyItems="center">
            <Box
              width={{ base: '100%', lg: 'sm' }}
              bg="white"
              borderRadius="lg"
            >
              <Flex justify="space-between" align="center" pt={2} px={2}>
                <Box>
                  <Input
                    pl={2}
                    htmlSize={10}
                    width="auto"
                    variant="unstyled"
                    backgroundColor={'#fffff'}
                    color={'black'}
                    border={'none'}
                    value={amount}
                    placeholder="0"
                    type="text"
                    onChange={(e) => handleSetAmount(e.target.value)}
                    name="Amount"
                  />
                  <Text
                    color="gray"
                    fontSize={'12'}
                    textAlign={'left'}
                    ml={2.5}
                  >
                    {transactionType === 'mint'
                      ? roundNumber(collateralTokenData.balance)
                      : roundNumber(meTokenData.balance)}
                  </Text>
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
                        handleSetAmount(
                          humanizeNumber(collateralTokenData.balance),
                        )
                      }
                    >
                      Max
                    </Button>
                    <Image
                      src={liveCollateralData?.image}
                      height="36px"
                      width="36px"
                      borderRadius={50}
                      mx="auto"
                      alt="profile picture"
                    />
                    <Text color="black">{collateralTokenData.symbol}</Text>
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
                        handleSetAmount(humanizeNumber(meTokenData.balance))
                      }
                    >
                      Max
                    </Button>
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
                marginBottom="-1rem"
              >
                <IconButton
                  size="sm"
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
                  <Text color="gray" fontSize={'12'} textAlign={'left'} ml={1}>
                    {transactionType === 'mint'
                      ? roundNumber(meTokenData.balance)
                      : roundNumber(collateralTokenData.balance)}
                  </Text>
                </Box>
                {transactionType === 'burn' ? (
                  <Wrap align="center">
                    <Image
                      src={liveCollateralData?.image}
                      height="36px"
                      width="36px"
                      borderRadius={50}
                      mx="auto"
                      alt="profile picture"
                    />
                    <Text color="black">{collateralTokenData.symbol}</Text>
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
              <Wrap mx="auto" mt="1rem">
                <SwitchNetworkButton />
              </Wrap>
            )}
          </Flex>
        </TabPanel>
        <TabPanel p={0}>
          <Flex direction="column" justifyItems="center">
            <Box
              width={{ base: '100%', lg: 'sm' }}
              bg="white"
              borderRadius="lg"
            >
              <Flex justify="space-between" align="center" p="2">
                <Box>
                  <Input
                    htmlSize={10}
                    width="auto"
                    variant="unstyled"
                    backgroundColor={'#fffff'}
                    color={'black'}
                    border={'none'}
                    value={amount}
                    placeholder="0"
                    pl={2}
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
                  <Button
                    borderColor="black"
                    color="black"
                    variant="outline"
                    textTransform="uppercase"
                    borderRadius="full"
                    size="sm"
                    onClick={() =>
                      handleSetAmount(humanizeNumber(meTokenData.balance))
                    }
                  >
                    Max
                  </Button>
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
                {approved ? 'Spend meToken' : 'Approve Token'}
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
  );
};

const MeTokenBlock: React.FC<BlockProps> = ({
  symbol,
  profilePicture,
  address,
}) => (
  <Flex
    p={2}
    width="100%"
    flexDirection={{ base: 'column', lg: 'row' }}
    alignItems="center"
    gap={2}
  >
    <Image
      src={profilePicture}
      height="50px"
      width="50px"
      borderRadius={50}
      mx="auto"
      alt="profile picture"
    />
    <Box width="sm" textAlign={{ base: 'center', lg: 'left' }}>
      <Text>{symbol}</Text>
      <Text fontSize="sm">{address}</Text>
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
    if (!player) return;
    const getTokenByOwner = async () => {
      await getMeTokenFor(player?.ethereumAddress).then((r) => {
        setMeTokenAddress(r === nullMeToken ? 'Create meToken' : r);
      });
    };

    getTokenByOwner();
  }, [player]);

  useEffect(() => {
    if (
      !meTokenAddress ||
      meTokenAddress === 'Create meToken' ||
      !player.ethereumAddress
    )
      return;
    const getInfoByToken = async () => {
      await getMeTokenInfo(meTokenAddress, player?.ethereumAddress).then((r) =>
        setMeTokenData(r),
      );
    };

    getInfoByToken();
  }, [meTokenAddress, player?.ethereumAddress]);

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
            {meTokenData && player && provider ? (
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
            ) : (
              <LoadingState />
            )}
          </>
        )}
      </Wrap>
    </ProfileSection>
  );
};
