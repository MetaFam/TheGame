import { httpLink } from '@metafam/utils';
import { CONFIG } from 'config';
import { Contract, providers } from 'ethers';
import { errorHandler } from 'utils/errorHandler';

import ABI from '../../../contracts/BulkDisbursableNFTs.abi';

export const chievContractAddress =
  '0x85fCaAFc0dA050FCE685DcB8965F0C1Aa1Ba466b';
const { alchemyApiKey } = CONFIG;

export const chievId = BigInt(
  '0x480000000000000000000000000000000000000000000000000000000002',
);

export interface IChievMetadata {
  name: string;
  description: string;
  image: string;
  animation_url?: string;
}

/** function to get the token image url from the nft metadata */
export const getTokenImage = async (): Promise<IChievMetadata | void> => {
  try {
    const provider = new providers.AlchemyProvider('matic', alchemyApiKey);
    const token = new Contract(chievContractAddress, ABI, provider);
    const metadataURI = await token.uri(chievId);
    if (!metadataURI || metadataURI === '') {
      throw new Error(`No metadata for token ${chievId}.`);
    }
    const fetchLink = httpLink(metadataURI);
    if (fetchLink != null) {
      const response = await fetch(fetchLink);
      const metadata = await response.json();
      return metadata as IChievMetadata;
    }
  } catch (error) {
    errorHandler(error as Error);
    console.error('getTokenImageError', error);
  }
  return undefined;
};
