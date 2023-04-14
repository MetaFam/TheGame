import { Orbis } from '@orbisclub/orbis-sdk';
import { COINGECKO_API_URL, TOKEN_QUERY } from 'components/Dashboard/Seed';
import { CONFIG } from 'config';
import erc20Abi from 'contracts/erc20.abi';
import FoundryFacetAbi from 'contracts/FoundryFacet.abi';
import HubFacetAbi from 'contracts/HubFacet.abi';
import MeTokensRegistryABI from 'contracts/meTokensRegistry.abi';
import type { Signer } from 'ethers';
import { BigNumber, Contract, ethers } from 'ethers';

export const metokenRegistry = '0x8b91FcF2230ab04A46e2D83aaF062EC1B5AAAa5c';
export const metokenFactory = '0x8D4ee3599aF814bF3Aa884c161f0dE81d9e97225';
export const hubFacet = '0x4555cf6E984186F6C0dfeba1A26764b21553B39f';
export const foundryFacet = '0xA56AAF637b057a5EDf7b7252D0B7280042E71335';
export const metokenDiamond = '0x0B4ec400e8D10218D0869a5b0036eA4BCf92d905';
export const nullMeToken = '0x0000000000000000000000000000000000000000';
// Collateral token
export const DAIADDRESS = '0x6B175474E89094C44Da98b954EedeAC495271d0F';

export const getCollateralData = async (collateralTokenAddress: string) => {
  let id;
  // Metokens will have multiple options for collateral
  // When a new token can be used as collateral add a case to match token with ID for query.
  switch (collateralTokenAddress) {
    case DAIADDRESS:
      id = 'dai';
      break;
    default:
      id = 'dai';
  }
  const tokenResponse = await fetch(`${COINGECKO_API_URL}${id}${TOKEN_QUERY}`);
  const tokenJson = await tokenResponse.json();
  return {
    image: tokenJson.image.small,
    currentPrice: tokenJson.market_data.current_price.usd,
  };
};

const { mainnetRPC } = CONFIG;

// Use mainnet provider for reads, to ensure anyone can view the profile regardless of Netork.
const mainnetProvider = new ethers.providers.JsonRpcProvider(mainnetRPC);

// Keeping it clean
function getContractWithSigner(
  contractAddress: string,
  abi: any,
  signer: Signer,
) {
  const contract = new ethers.Contract(contractAddress, abi, signer);
  const contractWithSigner = contract.connect(signer);
  return contractWithSigner;
}

// Read
export const getMeTokenFor = async (ownerAddress: string) => {
  if (!ownerAddress) return '';
  const registry = getContractWithSigner(
    metokenDiamond,
    MeTokensRegistryABI,
    mainnetProvider.getSigner(ownerAddress),
  );
  const meTokenAddress = await registry.getOwnerMeToken(ownerAddress);

  return meTokenAddress;
};

export const getErc20TokenData = async (
  tokenAddress: string,
  owner: string,
) => {
  if (!owner) return '';
  const erc20 = getContractWithSigner(
    tokenAddress,
    erc20Abi,
    mainnetProvider.getSigner(owner),
  );

  const tokenData = {
    symbol: (await erc20.symbol()) || '',
    name: (await erc20.name()) || '',
    balance: (await erc20.balanceOf(owner)) || '',
  };

  return { ...tokenData };
};

export const getMeTokenInfo = async (tokenAddress: string, owner: string) => {
  if (!tokenAddress) return undefined;
  const orbis = new Orbis();
  const { data } = await orbis.getDids(owner);
  const signer = mainnetProvider.getSigner(owner);

  const erc20 = getContractWithSigner(tokenAddress, erc20Abi, signer);
  const registry = getContractWithSigner(
    metokenDiamond,
    MeTokensRegistryABI,
    signer,
  );
  const hub = getContractWithSigner(metokenDiamond, HubFacetAbi, signer);
  const tokenInfo = await registry.getMeTokenInfo(tokenAddress);

  const tokenData = {
    symbol: `$${await erc20.symbol()}`,
    profilePicture:
      data[0]?.details.profile.pfp || 'https://tinyurl.com/mr29vhmk',
    tokenAddress,
    collateral: await hub
      .getBasicHubInfo(tokenInfo?.hubId)
      .then((res: { asset: string }) => res.asset),
  };

  return { ...tokenData };
};

export const preview = async (
  meTokenAddress: string, // addr meToken
  amount: BigNumber, // eg, 10e18 (CBOB)
  senderAddress: string,
  type: string,
) => {
  if (!amount || !meTokenAddress) return BigNumber.from(0);
  const meTokenFoundry = await new Contract(
    metokenDiamond,
    FoundryFacetAbi,
    mainnetProvider.getSigner(senderAddress),
  );
  if (type === 'mint') {
    const tx = await meTokenFoundry
      .calculateMeTokensMinted(meTokenAddress, amount)
      .then((res: BigNumber) => res);
    return tx;
  }
  if (type === 'burn') {
    const tx = await meTokenFoundry
      .calculateAssetsReturned(meTokenAddress, amount, senderAddress)
      .then((res: BigNumber) => res);
    return tx;
  }
  return BigNumber.from(0);
};

// Write
export const approveMeTokens = async (
  tokenAddress: string,
  amount: BigNumber,
  provider: any,
) => {
  const erc20 = await new Contract(
    tokenAddress,
    erc20Abi,
    provider.getSigner(),
  );
  const approve = await erc20.approve(foundryFacet, amount);
  return approve;
};

// Spend meToken with issuer
export const spendMeTokens = async (
  tokenAddress: string,
  amount: BigNumber,
  owner: string,
  provider: any,
) => {
  const erc20 = await new Contract(
    tokenAddress,
    erc20Abi,
    provider.getSigner(),
  );

  const transferTx = await erc20.transfer(owner, amount);
  return transferTx;
};

export const mint = async (
  meToken: string,
  amount: BigNumber,
  recipient: string,
  provider: any,
) => {
  const meTokenFoundry = await new Contract(
    metokenDiamond,
    FoundryFacetAbi,
    provider.getSigner(),
  );

  const mintTx = await meTokenFoundry.mint(meToken, amount, recipient);
  return mintTx;
};

export const burn = async (
  meToken: string,
  amount: BigNumber,
  recipient: string,
  provider: any,
) => {
  const meTokenFoundry = await new Contract(
    metokenDiamond,
    FoundryFacetAbi,
    provider.getSigner(),
  );

  const mintTx = await meTokenFoundry.burn(meToken, amount, recipient);
  return mintTx;
};
