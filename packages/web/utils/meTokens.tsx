import { Orbis } from '@orbisclub/orbis-sdk';
import { CONFIG } from 'config';
import erc20Abi from 'contracts/erc20.abi';
import HubFacetAbi from 'contracts/HubFacet.abi';
import MeTokensRegistryABI from 'contracts/meTokensRegistry.abi';
import { Contract, ethers } from 'ethers';

export const metokenRegistry = '0x8b91FcF2230ab04A46e2D83aaF062EC1B5AAAa5c';
export const metokenFactory = '0x8D4ee3599aF814bF3Aa884c161f0dE81d9e97225';
export const hubFacet = '0x4555cf6E984186F6C0dfeba1A26764b21553B39f';
export const foundryFacet = '0xA56AAF637b057a5EDf7b7252D0B7280042E71335';
export const metokenDiamond = '0x0B4ec400e8D10218D0869a5b0036eA4BCf92d905';
export const nullMeToken = '0x0000000000000000000000000000000000000000';

const { mainnetRPC } = CONFIG;

const mainnetProvider = new ethers.providers.JsonRpcProvider(mainnetRPC);

export const getMeToken = async (address: string) => {
  const registry = await new Contract(
    metokenDiamond,
    MeTokensRegistryABI,
    mainnetProvider.getSigner(address),
  );
  const data = await registry.getOwnerMeToken(
    '0xA64fc17B157aaA50AC9a8341BAb72D4647d0f1A7',
  );
  return data;
};

export const getTokenData = async (address: string) => {
  const tokenData = {
    symbol: '',
    name: '',
    balance: '',
  };

  const signer = await mainnetProvider.getSigner(
    '0xc0163E58648b247c143023CFB26C2BAA42C9d9A9',
  );

  const erc20 = await new Contract(address, erc20Abi, signer);

  tokenData.symbol = `$${await erc20.symbol()}`;
  tokenData.name = await erc20.name();
  tokenData.balance = await erc20.balanceOf(
    '0xc0163E58648b247c143023CFB26C2BAA42C9d9A9',
  );

  return tokenData;
};

export const getMeTokenInfo = async (address: string) => {
  const orbis = new Orbis();
  const { data } = await orbis.getDids(
    '0xA64fc17B157aaA50AC9a8341BAb72D4647d0f1A7',
  );

  const info = {
    symbol: '',
    profilePicture: '',
    collateral: '',
    address,
  };

  const signer = await mainnetProvider.getSigner(
    '0xc0163E58648b247c143023CFB26C2BAA42C9d9A9',
  );

  const erc20 = await new Contract(address, erc20Abi, signer);

  const registry = await new Contract(
    metokenDiamond,
    MeTokensRegistryABI,
    signer,
  );

  const hub = await new Contract(metokenDiamond, HubFacetAbi, signer);
  const tokenInfo = await registry.getMeTokenInfo(address);
  const collateral = await hub.getBasicHubInfo(tokenInfo?.hubId);
  info.profilePicture = data[0].details.profile.pfp;
  info.symbol = `$${await erc20.symbol()}`;
  info.collateral = collateral;
  return info;
};

export const approveMeTokens = async (address: string, amount: string) => {
  const signer = await mainnetProvider.getSigner(
    '0xc0163E58648b247c143023CFB26C2BAA42C9d9A9',
  );

  const erc20 = await new Contract(address, erc20Abi, signer);

  const approveTx = await erc20.Approval(
    '0xc0163E58648b247c143023CFB26C2BAA42C9d9A9',
    foundryFacet,
    amount,
  );
  return approveTx;
};

export const mint = async () => 1;

export const burn = async () => 0;
