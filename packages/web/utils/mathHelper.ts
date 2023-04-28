import { BigNumberish, ethers } from 'ethers';

export const isPow2 = (int: number): boolean =>
  int > 0 && (int & (int - 1)) === 0;

export const weiToEth = (amount?: BigNumberish) => {
  if (amount === undefined) {
    throw new Error('`amount` is `undefined` in `weiToEth`.');
  }
  return Number(ethers.utils.formatEther(amount || 0));
};

export const ethToWei = (amount?: BigNumberish) => {
  if (amount === undefined) {
    throw new Error('`amount` is `undefined` in `ethToWei`.');
  }
  return ethers.utils.parseEther((amount || 0).toString());
};
