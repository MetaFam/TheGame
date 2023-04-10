import { Orbis } from '@orbisclub/orbis-sdk';
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
  const erc20 = getContractWithSigner(
    tokenAddress,
    erc20Abi,
    mainnetProvider.getSigner(owner),
  );

  return {
    symbol: `$${await erc20.symbol()}`,
    name: await erc20.name(),
    balance: await erc20.balanceOf(owner),
  };
};

export const getMeTokenInfo = async (tokenAddress: string, owner: string) => {
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
