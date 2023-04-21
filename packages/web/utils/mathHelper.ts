import { ethers } from 'ethers';

// true if the number is a power of 2
export const isPow2 = (int: number): boolean =>
  int > 0 && (int & (int - 1)) === 0;

// Round a WEI number to 2 decimal points
export const roundNumber = (number: string) =>
  (Math.round(+ethers.utils.formatEther(number) * 100) / 100).toFixed(2);

// Format a WEI number to normal number ex 1e18 = 1.0
export const humanizeNumber = (number: number) =>
  `${+ethers.utils.formatEther(number)}`;
