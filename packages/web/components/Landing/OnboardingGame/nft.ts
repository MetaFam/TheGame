import { httpLink } from '@metafam/utils';
import { CONFIG } from 'config';
import { Contract, providers } from 'ethers';
import { errorHandler } from 'utils/errorHandler';

import ABI from '../../../contracts/BulkDisbursableNFTs.abi';

export const { alchemyAPIKey, chievAddress, chievTokenId } = CONFIG;

export interface IChievMetadata {
  name: string;
  description: string;
  image: string;
  animation_url?: string;
}

/** function to get the token image url from the nft metadata */
export const getTokenImage = async (): Promise<IChievMetadata | void> => {
  try {
    const provider = new providers.AlchemyProvider('matic', alchemyAPIKey);
    const token = new Contract(chievAddress, ABI, provider);
    const metadataURI = await token.uri(chievTokenId);
    if (!metadataURI || metadataURI === '') {
      throw new Error(
        `No metadata at ${chievAddress} for token ${chievTokenId}.`,
      );
    }
    const fetchLink = httpLink(metadataURI);
    if (fetchLink != null) {
      const response = await fetch(fetchLink);
      const metadata = await response.json();
      return metadata as IChievMetadata;
    }
  } catch (error) {
    errorHandler(error as Error);
    console.error({ getTokenImageError: error });
  }
  return undefined;
};
