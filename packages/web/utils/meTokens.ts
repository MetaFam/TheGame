import { JsonRpcProvider, TransactionResponse } from '@ethersproject/providers';
import { Orbis } from '@orbisclub/orbis-sdk';
import { COINGECKO_API_URL, TOKEN_QUERY } from 'components/Dashboard/Seed';
import { CONFIG } from 'config';
import erc20ABI from 'contracts/erc20.abi';
import FoundryFacetABI from 'contracts/FoundryFacet.abi';
import HubFacetABI from 'contracts/HubFacet.abi';
import MeTokensRegistryABI from 'contracts/meTokensRegistry.abi';
import {
  type BigNumberish,
  type Signer,
  BigNumber,
  Contract,
  ethers,
} from 'ethers';

export const meTokenRegistry = '0x8b91FcF2230ab04A46e2D83aaF062EC1B5AAAa5c';
export const meTokenFactory = '0x8D4ee3599aF814bF3Aa884c161f0dE81d9e97225';
export const hubFacet = '0x4555cf6E984186F6C0dfeba1A26764b21553B39f';
export const foundryFacet = '0xA56AAF637b057a5EDf7b7252D0B7280042E71335';
export const meTokenDiamond = '0x0B4ec400e8D10218D0869a5b0036eA4BCf92d905';
export const nullToken = `0x${'0'.repeat(40)}`;
export const daiAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F';

export const getCollateralData = async (collateralTokenAddress: string) => {
  let id;
  // Metokens will have multiple options for collateral
  // When a new token can be used as collateral add a case to match token with ID for query.
  switch (collateralTokenAddress) {
    case daiAddress:
      id = 'dai';
      break;
    default:
      throw new Error('Only DAI is supported as collateral currently.');
  }

  const tokenURL = `${COINGECKO_API_URL}${id}${TOKEN_QUERY}`;
  const tokenResponse = await fetch(tokenURL);
  const tokenInfo = await tokenResponse.json();
  return {
    image: tokenInfo.image.small,
    currentPrice: tokenInfo.market_data.current_price.usd,
  };
};

const { mainnetRPC } = CONFIG;

// Use mainnet provider for reads, to ensure anyone can view the profile regardless of Network.
const mainnetProvider = new ethers.providers.JsonRpcProvider(mainnetRPC);

export const getContractWithSigner = (
  contractAddress: string,
  abi: ethers.ContractInterface,
  signer: Signer,
) => {
  const contract = new ethers.Contract(contractAddress, abi, signer);
  return contract.connect(signer);
};

export const getMeTokenFor = async (ownerAddress: string) => {
  if (!ownerAddress) throw new Error('Owner required for `getMeTokenFor`.');

  const registry = getContractWithSigner(
    meTokenDiamond,
    MeTokensRegistryABI,
    mainnetProvider.getSigner(ownerAddress),
  );
  return registry.getOwnerMeToken(ownerAddress);
};

export const getERC20TokenData = async (address: string, owner: string) => {
  if (!address) throw new Error('`address` required for `getERC20TokenData`.');
  if (!owner) throw new Error('`owner` required for `getERC20TokenData`.');

  const erc20 = getContractWithSigner(
    address,
    erc20ABI,
    mainnetProvider.getSigner(owner),
  );

  const [symbol, name, balance] = await Promise.all([
    erc20.symbol(),
    erc20.name(),
    erc20.balanceOf(owner),
  ]);

  return { symbol, name, balance, address };
};

export const getMeTokenInfo = async (tokenAddress: string, owner: string) => {
  if (!tokenAddress)
    throw new Error('Token address required for `getMeTokenInfo`.');

  const orbis = new Orbis();
  const { data: dids } = await orbis.getDids(owner);
  const signer = mainnetProvider.getSigner(owner);

  const erc20 = getContractWithSigner(tokenAddress, erc20ABI, signer);
  const registry = getContractWithSigner(
    meTokenDiamond,
    MeTokensRegistryABI,
    signer,
  );
  const hub = getContractWithSigner(meTokenDiamond, HubFacetABI, signer);
  const tokenInfo = await registry.getMeTokenInfo(tokenAddress);

  return {
    symbol: `$${await erc20.symbol()}`,
    profilePicture:
      dids?.[0]?.details.profile?.pfp || 'https://tinyurl.com/mr29vhmk',
    tokenAddress,
    collateralAddress: await hub
      .getBasicHubInfo(tokenInfo?.hubId)
      .then(({ asset }: { asset: string }) => asset),
  };
};

export const preview = async (
  meTokenAddress: string,
  amount: BigNumber,
  senderAddress: string,
  type: string,
) => {
  if (!amount || !meTokenAddress) return BigNumber.from(0);

  const meTokenFoundry = await new Contract(
    meTokenDiamond,
    FoundryFacetABI,
    mainnetProvider.getSigner(senderAddress),
  );
  if (type === 'mint') {
    return meTokenFoundry.calculateMeTokensMinted(meTokenAddress, amount);
  }
  if (type === 'burn') {
    return meTokenFoundry.calculateAssetsReturned(
      meTokenAddress,
      amount,
      senderAddress,
    );
  }
  return BigNumber.from(0);
};

export const isApproved = async (
  tokenAddress: string,
  amount: BigNumberish,
  owner: string,
) => {
  const erc20 = await new Contract(
    tokenAddress,
    erc20ABI,
    mainnetProvider.getSigner(owner),
  );
  const approvalAmount = await erc20.allowance(owner, foundryFacet);
  return approvalAmount.gt(amount);
};

export const approveTokens = async (
  tokenAddress: string,
  amount: BigNumber,
  provider: JsonRpcProvider,
): Promise<TransactionResponse> => {
  const erc20 = await new Contract(
    tokenAddress,
    erc20ABI,
    provider.getSigner(),
  );
  return erc20.approve(foundryFacet, amount);
};

export const spendTokens = async (
  tokenAddress: string,
  amount: BigNumber,
  owner: string,
  provider: JsonRpcProvider,
): Promise<TransactionResponse> => {
  const erc20 = await new Contract(
    tokenAddress,
    erc20ABI,
    provider.getSigner(),
  );
  return erc20.transfer(owner, amount);
};

export const mint = (
  meToken: string,
  amount: BigNumber,
  recipient: string,
  provider: JsonRpcProvider,
): Promise<TransactionResponse> => {
  const meTokenFoundry = new Contract(
    meTokenDiamond,
    FoundryFacetABI,
    provider.getSigner(),
  );
  return meTokenFoundry.mint(meToken, amount, recipient);
};

export const burn = (
  meToken: string,
  amount: BigNumber,
  sender: string,
  provider: JsonRpcProvider,
): Promise<TransactionResponse> => {
  const meTokenFoundry = new Contract(
    meTokenDiamond,
    FoundryFacetABI,
    provider.getSigner(),
  );
  return meTokenFoundry.burn(meToken, amount, sender);
};
