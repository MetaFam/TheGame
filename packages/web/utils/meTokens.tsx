import { Orbis } from '@orbisclub/orbis-sdk';
import erc20Abi from 'contracts/erc20.abi';
import FoundryFacetAbi from 'contracts/FoundryFacet.abi';
import HubFacetAbi from 'contracts/HubFacet.abi';
import MeTokensRegistryABI from 'contracts/meTokensRegistry.abi';
import { Contract, ethers } from 'ethers';

export const metokenRegistry = '0x8b91FcF2230ab04A46e2D83aaF062EC1B5AAAa5c';
export const metokenFactory = '0x8D4ee3599aF814bF3Aa884c161f0dE81d9e97225';
export const hubFacet = '0x4555cf6E984186F6C0dfeba1A26764b21553B39f';
export const foundryFacet = '0xA56AAF637b057a5EDf7b7252D0B7280042E71335';
export const metokenDiamond = '0x0B4ec400e8D10218D0869a5b0036eA4BCf92d905';
export const nullMeToken = '0x0000000000000000000000000000000000000000';

function getContractWithSigner(contractAddress: string, abi: any, signer: any) {
  const contract = new ethers.Contract(contractAddress, abi, signer);
  const contractWithSigner = contract.connect(signer);
  return contractWithSigner;
}

export const getMeTokenFor = async (address: string, provider: any) => {
  const registry = getContractWithSigner(
    metokenDiamond,
    MeTokensRegistryABI,
    provider.getSigner(),
  );
  const meTokenAddress = await registry.getOwnerMeToken(address);
  return meTokenAddress;
};

export const getErc20TokenData = async (
  tokenAddress: string,
  owner: string,
  provider: any,
) => {
  const erc20 = getContractWithSigner(
    tokenAddress,
    erc20Abi,
    provider.getSigner(),
  );

  return {
    symbol: `$${await erc20.symbol()}`,
    name: await erc20.name(),
    balance: await erc20.balanceOf(owner),
  };
};

export const getMeTokenInfo = async (
  tokenAddress: string,
  owner: string,
  provider: any,
) => {
  const orbis = new Orbis();
  const { data } = await orbis.getDids(owner);

  const erc20 = getContractWithSigner(
    tokenAddress,
    erc20Abi,
    provider.getSigner(),
  );
  const registry = getContractWithSigner(
    metokenDiamond,
    MeTokensRegistryABI,
    provider.getSigner(),
  );
  const hub = getContractWithSigner(
    metokenDiamond,
    HubFacetAbi,
    provider.getSigner(),
  );
  const tokenInfo = await registry.getMeTokenInfo(tokenAddress);

  const tokenData = {
    symbol: `$${await erc20.symbol()}`,
    profilePicture:
      data[0]?.details.profile.pfp || 'https://tinyurl.com/mr29vhmk',
    tokenAddress,
    collateral: await hub.getBasicHubInfo(tokenInfo?.hubId),
  };

  return { ...tokenData };
};

export const approveMeTokens = async (
  address: string,
  amount: string,
  provider: any,
) => {
  const erc20 = await new Contract(address, erc20Abi, provider.getSigner());
  const approve = await erc20.approve(foundryFacet, amount);
  return approve;
};

export const spendMeTokens = async (
  address: string,
  amount: string,
  owner: string,
  provider: any,
) => {
  const erc20 = await new Contract(address, erc20Abi, provider.getSigner());

  const transferTx = await erc20.transfer(owner, amount);
  return transferTx;
};

export const mint = async (
  meToken: string,
  amount: string,
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
  amount: string,
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
