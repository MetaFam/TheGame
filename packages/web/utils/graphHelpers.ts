/* eslint-disable no-await-in-loop */

// eslint-disable-next-line import/no-extraneous-dependencies
import { Log, TransactionReceipt } from '@ethersproject/abstract-provider';
import { ethers } from 'ethers';

import { getGraphLatestBlock } from './graphHealth';

const UPDATE_INTERVAL = 10000;

const MAX_RETRIES = 6;

export const waitUntilBlock = async (
  chainId: string,
  block: number,
): Promise<boolean> => {
  let latestBlock = getGraphLatestBlock(chainId);
  let tries = 0;
  while (latestBlock < block && tries < MAX_RETRIES) {
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((r) => setTimeout(r, UPDATE_INTERVAL));
    tries += 1;
    latestBlock = getGraphLatestBlock(chainId);
  }
  return latestBlock >= block;
};

export const awaitQuestChainAddress = async (receipt: TransactionReceipt) => {
  if (!receipt || !receipt.logs) return '';
  const abi = new ethers.utils.Interface([
    'event QuestChainCreated(uint256 id, address questChain)',
  ]);
  const eventFragment = abi.events[Object.keys(abi.events)[0]];
  const eventTopic = abi.getEventTopic(eventFragment);
  const event = receipt.logs.find((e: Log) => e.topics[0] === eventTopic);
  if (event) {
    const decodedLog = abi.decodeEventLog(
      eventFragment,
      event.data,
      event.topics,
    );
    return decodedLog.questChain;
  }
  return '';
};
