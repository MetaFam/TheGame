import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import {
  Box,
  Button,
  chakra,
  Flex,
  FormLabel,
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
import { Maybe } from '@metafam/utils';
import { ProfileSection } from 'components/Section/ProfileSection';
import { SwitchNetworkButton } from 'components/SwitchNetworkButton';
import { BigNumber } from 'ethers';
import { Player } from 'graphql/autogen/types';
import { useWeb3 } from 'lib/hooks';
import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { HiOutlineInformationCircle, HiSwitchVertical } from 'react-icons/hi';
import { ethToWei, weiToEth } from 'utils/mathHelper';
import {
  approveTokens,
  burn,
  getCollateralData,
  getERC20TokenData,
  getMeTokenFor,
  getMeTokenInfo,
  isApproved,
  mint,
  nullToken,
  preview,
  spendTokens,
} from 'utils/meTokens';

type TokenData = {
  collateralAddress: string;
  profilePicture: string;
  symbol: string;
  tokenAddress: string;
};

type ERC20Info = {
  symbol: string;
  name: string;
  balance?: BigNumber;
};

type Props = {
  player: Player;
  isOwnProfile?: boolean;
  editing?: boolean;
};

type BlockProps = {
  symbol: string;
  profilePicture: string;
  tokenAddress: string;
  owner: string;
};

type SwapProps = {
  symbol: string;
  profilePicture: string;
  collateralAddress: string;
  meTokenAddress: string;
  owner: string;
  provider?: JsonRpcProvider;
};

type LiveCollateralData = {
  image: string;
  currentPrice: string;
};

type ContractError = Error & { reason?: string };

const MeTokenSwap: React.FC<SwapProps> = ({
  symbol,
  profilePicture,
  meTokenAddress,
  collateralAddress,
  owner,
  provider,
}) => {
  const [liveCollateralData, setLiveCollateralData] =
    useState<LiveCollateralData>();
  const [collateralTokenData, setCollateralTokenData] = useState<ERC20Info>();
  const [meTokenData, setMeTokenData] = useState<ERC20Info>();
  const [txType, setTxType] = useState<'mint' | 'burn'>('mint');
  const [approved, setApproved] = useState<boolean>(true);
  const { chainId, address: userAddress } = useWeb3();
  const [amount, setAmount] = useState<BigNumber>(BigNumber.from(0));
  const [displayAmount, setDisplayAmount] = useState<string>('0');
  const [previewAmount, setPreviewAmount] = useState<string>('0');
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast({
    isClosable: true,
    duration: 13.5 * 1000,
  });

  useEffect(() => {
    if (!collateralAddress) return;
    const getLiveData = async () => {
      setLiveCollateralData(await getCollateralData(collateralAddress));
    };
    getLiveData();
  }, [collateralAddress]);

  const getTokenData = useCallback(async () => {
    if (meTokenAddress && collateralAddress) {
      await Promise.all([
        getERC20TokenData(meTokenAddress, owner).then(setMeTokenData),
        getERC20TokenData(collateralAddress, owner).then(
          setCollateralTokenData,
        ),
      ]);
    }
  }, [collateralAddress, meTokenAddress, owner]);

  useEffect(() => {
    if (owner) {
      getTokenData();
    }
  }, [getTokenData, owner]);

  const handlePreview = useCallback(async () => {
    if (!userAddress) {
      setPreviewAmount('0');
    } else {
      setPreviewAmount(
        await preview(meTokenAddress, amount, userAddress, txType),
      );
    }
  }, [userAddress, amount, txType, meTokenAddress]);

  useEffect(() => {
    if (!amount || !meTokenAddress) return;
    handlePreview();
  }, [handlePreview, amount, meTokenAddress]);

  const approveToken = useCallback(async () => {
    const approvalToken =
      txType === 'mint' ? collateralAddress : meTokenAddress;
    try {
      const tx = await approveTokens(approvalToken, amount, provider);
      await tx.wait();
      toast({
        title: 'Success',
        description: `Tokens approved successfully.`,
        status: 'success',
      });
      setApproved(true);
    } catch (err) {
      const error = err as ContractError;
      toast({
        title: 'Token Approval Failed',
        description: error.reason ?? error.message,
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, [
    setLoading,
    txType,
    amount,
    toast,
    collateralAddress,
    meTokenAddress,
    provider,
  ]);

  const handleSpendMeTokens = useCallback(
    async (evt: FormEvent) => {
      evt.preventDefault();

      try {
        if (!meTokenData)
          throw new Error('No `meTokenData` in `handleSpendMeTokens`.');

        setLoading(true);
        if (!approved) {
          await approveToken();
          return;
        }
        const tx = await spendTokens(meTokenAddress, amount, owner, provider);
        const reciept = await tx.wait();
        toast({
          title: 'Success',
          description: (
            <>
              Successfully spent {meTokenData.symbol} with Issuer.
              <chakra.a
                href={`https://etherscan.io/tx/${reciept.transactionHash}`}
                target="_blank"
                rel="noreferrer"
              >
                View on Etherscan.
              </chakra.a>
            </>
          ),
          status: 'success',
        });
      } catch (err) {
        const error = err as ContractError;
        toast({
          title: `Error Spending ${meTokenData?.symbol ?? '$𝑼𝒏𝒌𝒏𝒐𝒘𝒏'}`,
          description: error.reason ?? error.message,
          status: 'error',
        });
      } finally {
        setLoading(false);
      }
    },
    [
      meTokenData,
      amount,
      toast,
      approved,
      approveToken,
      meTokenAddress,
      provider,
      owner,
    ],
  );

  const clearAmounts = useCallback(() => {
    setAmount(BigNumber.from(0));
    setDisplayAmount('0');
    setPreviewAmount('0');
  }, []);

  const toggleTxType = useCallback(() => {
    clearAmounts();
    setTxType((type) => (type === 'mint' ? 'burn' : 'mint'));
  }, [clearAmounts]);

  const handleSubmit = useCallback(
    async (evt: FormEvent) => {
      evt.preventDefault();

      try {
        if (!meTokenData)
          throw new Error('No `meTokenData` in `handleSubmit`.');

        setLoading(true);
        if (!approved) {
          await approveToken();
          return;
        }

        if (amount.eq(0)) {
          throw new Error('Amount is 0.');
        }

        const actions = { mint, burn };

        const tx = await actions[txType](
          meTokenAddress,
          amount,
          owner,
          provider,
        );

        const confirmCount = 3;

        let reciept;
        for (let i = 1; i <= confirmCount; i++) {
          toast({
            title: `Waiting On ${i}/${confirmCount} Confirmations`,
            description: `${meTokenData.symbol} ${txType} begun.`,
            status: 'info',
          });
          // eslint-disable-next-line no-await-in-loop
          reciept = await tx.wait(i);
          toast.closeAll();
        }

        await getTokenData();

        toast({
          title: 'Success',
          description: (
            <>
              {meTokenData.symbol} {txType}ed successfully.{' '}
              {reciept?.transactionHash && (
                <chakra.a
                  href={`https://etherscan.io/tx/${reciept.transactionHash}`}
                  target="_blank"
                  rel="noreferrer"
                  textDecoration="underline"
                >
                  View the transaction.
                </chakra.a>
              )}
            </>
          ),
          status: 'success',
          duration: 20 * 1000,
        });
      } catch (err) {
        const error = err as ContractError;
        toast({
          title: (
            <chakra.span textTransform="capitalize">{txType} Error</chakra.span>
          ),
          description: error.reason ?? error.message,
          status: 'error',
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    },
    [
      meTokenData,
      approved,
      txType,
      amount,
      approveToken,
      meTokenAddress,
      owner,
      provider,
      getTokenData,
      toast,
    ],
  );

  const handleSetAmount = useCallback(
    async (quantity: string | number) => {
      if (!meTokenData?.balance) throw new Error('No meToken balance found.');

      let swapEth = quantity
        .toString()
        .replace(/[^0-9.]/g, '')
        .replace(
          /^(?:0*)([1-9]?\d*)(\.?\d*)$/,
          (_, whole, decimals) =>
            `${whole.length > 0 ? whole : '0'}${decimals.slice(0, 19)}`,
        );
      let swapWei = ethToWei(swapEth);

      if (txType === 'burn' && swapWei.gt(meTokenData.balance)) {
        swapWei = meTokenData.balance;
        swapEth = weiToEth(swapWei).toFixed(8);
      }

      setAmount(swapWei);
      setDisplayAmount(swapEth);

      if (userAddress && swapWei.gt(0)) {
        const tokenAddress =
          txType === 'mint' ? collateralAddress : meTokenAddress;
        isApproved(tokenAddress, swapWei, userAddress).then(setApproved);
      }
    },
    [
      setAmount,
      txType,
      meTokenData,
      userAddress,
      meTokenAddress,
      collateralAddress,
    ],
  );

  const handleSetSpendAmount = useCallback(
    (spendAmount: string) => {
      setTxType('burn');
      handleSetAmount(spendAmount);
    },
    [handleSetAmount],
  );

  if (!collateralTokenData || !meTokenData) {
    return <LoadingState />;
  }

  const datums = [collateralTokenData, meTokenData];
  if (txType === 'burn') {
    datums.reverse();
  }
  const [srcTkn, dstTkn] = datums;

  return (
    <Tabs align="center" size="md" variant="unstyled">
      <TabList>
        <Tab _selected={{ color: 'teal.200' }}>Swap</Tab>
        <Tab _selected={{ color: 'teal.200' }} onClick={clearAmounts}>
          Spend
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel p={0} as="form" onSubmit={handleSubmit}>
          <Flex direction="column" justifyItems="center">
            <Box
              width={{ base: '100%', lg: 'sm' }}
              bg="white"
              borderRadius="lg"
            >
              <Flex justify="space-between" align="center" pt={2} px={2}>
                <Box flexGrow={1}>
                  <Input
                    id="swap-amount"
                    pl={2}
                    htmlSize={10}
                    width="100%"
                    variant="unstyled"
                    backgroundColor="#FFF"
                    color="#000"
                    border="none"
                    value={displayAmount}
                    type="number"
                    pattern="\d+\.?\d*"
                    step="any"
                    min={0}
                    autoComplete="off"
                    onChange={({ target: { value } }) => {
                      handleSetAmount(value);
                    }}
                  />
                  <Text color="gray" fontSize={12} textAlign={'left'} ml={2.5}>
                    {weiToEth(srcTkn.balance).toFixed(4)}
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
                      handleSetAmount(weiToEth(srcTkn.balance).toFixed(8))
                    }
                  >
                    Max
                  </Button>
                  <FormLabel
                    htmlFor="swap-amount"
                    display="flex"
                    alignItems="center"
                    gap={1}
                  >
                    <Image
                      src={
                        txType === 'mint'
                          ? liveCollateralData?.image
                          : profilePicture
                      }
                      height="36px"
                      width="36px"
                      borderRadius={50}
                      mx="auto"
                      alt="profile picture"
                    />
                    <Text color="black">{srcTkn.symbol}</Text>
                  </FormLabel>
                </Wrap>
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
                  onClick={toggleTxType}
                  fontSize="20px"
                  borderRadius="full"
                  icon={<HiSwitchVertical color="black" />}
                />
              </Flex>
              <hr />
              <Flex justify="space-between" align="center" p={2}>
                <Box>
                  <Text color="black">
                    {weiToEth(previewAmount).toFixed(2)}
                  </Text>
                  <Text color="gray" fontSize={12} textAlign="left" ml={1}>
                    {weiToEth(dstTkn.balance).toFixed(2)}
                  </Text>
                </Box>
                <Wrap align="center">
                  <Image
                    src={
                      txType === 'mint'
                        ? profilePicture
                        : liveCollateralData?.image
                    }
                    height="36px"
                    width="36px"
                    borderRadius={50}
                    mx="auto"
                    alt="profile picture"
                  />
                  <Text color="black">{dstTkn.symbol}</Text>
                </Wrap>
              </Flex>
            </Box>
            {chainId !== '0x1' ? (
              <Wrap mx="auto" mt="1rem">
                <SwitchNetworkButton />
              </Wrap>
            ) : (
              <MetaButton mx="auto" mt="1rem" type="submit" disabled={loading}>
                {approved
                  ? `Swap ${srcTkn.symbol} for ${dstTkn.symbol}`
                  : 'Approve Tokens'}
              </MetaButton>
            )}
          </Flex>
        </TabPanel>
        <TabPanel p={0} as="form" onSubmit={handleSpendMeTokens}>
          <Flex direction="column" justifyItems="center">
            <Box
              width={{ base: '100%', lg: 'sm' }}
              bg="white"
              borderRadius="lg"
            >
              <Flex justify="space-between" align="center" p="2">
                <Box flexGrow={1}>
                  <Input
                    htmlSize={0}
                    width="auto"
                    variant="unstyled"
                    backgroundColor="#FFF"
                    color="#000"
                    border="none"
                    value={displayAmount}
                    pl={2}
                    type="number"
                    inputMode="numeric"
                    step="any"
                    onChange={({ target: { value } }) =>
                      handleSetSpendAmount(value)
                    }
                  />
                  <Text
                    color="gray"
                    fontSize={'12'}
                    textAlign={'left'}
                    ml={2.5}
                  >
                    {weiToEth(meTokenData.balance).toFixed(2)}
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
                      handleSetAmount(weiToEth(meTokenData.balance))
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
              <Flex justify="space-between" align="center" p={2}>
                <Text
                  display="flex"
                  alignItems="center"
                  gap="5px"
                  color="black"
                >
                  meToken Value
                  <HiOutlineInformationCircle />
                </Text>
                <Text color="black">
                  $ {weiToEth(previewAmount).toFixed(2)}
                </Text>
              </Flex>
            </Box>
            {chainId === '0x1' ? (
              <MetaButton mx="auto" mt="1rem" type="submit" disabled={loading}>
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
  tokenAddress,
  owner,
}) => (
  <a
    href={`https://metokens.com/profile/${owner}`}
    target="_blank"
    rel="noreferrer"
  >
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
        <Text fontSize="sm">{tokenAddress}</Text>
      </Box>
    </Flex>
  </a>
);

export const PlayerMeTokens: React.FC<Props> = ({
  player,
  isOwnProfile,
  editing,
}) => {
  const [meTokenAddress, setMeTokenAddress] = useState<Maybe<string>>(null);
  const [meTokenData, setMeTokenData] = useState<TokenData>();
  const { provider } = useWeb3();

  useEffect(() => {
    if (!player) return;
    getMeTokenFor(player?.ethereumAddress).then((r) => {
      setMeTokenAddress(r === nullToken ? null : r);
    });
  }, [player]);

  useEffect(() => {
    if (!meTokenAddress || meTokenAddress === null || !player.ethereumAddress) {
      return;
    }
    getMeTokenInfo(meTokenAddress, player.ethereumAddress).then(setMeTokenData);
  }, [meTokenAddress, player?.ethereumAddress]);

  return (
    <ProfileSection title="MeToken" {...{ isOwnProfile, editing }}>
      <Wrap mb={4} justify="center">
        {/* eslint-disable-next-line no-nested-ternary */}
        {meTokenAddress === null ? (
          <a
            href="https://metokens.com/create-token"
            target="_blank"
            rel="noreferrer"
          >
            <MetaButton mx="auto" mt="1rem">
              <Text>Create a meToken</Text>
            </MetaButton>
          </a>
        ) : !meTokenData || !player ? (
          <LoadingState />
        ) : (
          <>
            <MeTokenBlock
              profilePicture={meTokenData.profilePicture}
              tokenAddress={meTokenData.tokenAddress}
              symbol={meTokenData.symbol}
              owner={player.ethereumAddress}
            />
            <MeTokenSwap
              profilePicture={meTokenData.profilePicture}
              meTokenAddress={meTokenData.tokenAddress}
              symbol={meTokenData.symbol}
              collateralAddress={meTokenData.collateralAddress}
              owner={player.ethereumAddress}
              provider={(provider as JsonRpcProvider)}
            />
          </>
        )}
      </Wrap>
    </ProfileSection>
  );
};

