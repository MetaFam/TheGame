import { httpLink } from '@metafam/utils';
import { CONFIG } from 'config';
import { Contract, providers } from 'ethers';
import { errorHandler } from 'utils/errorHandler';

import ABI from '../../../contracts/BulkDisbursableNFTs.abi';

export const chievContractAddress =
  '0xb77b8eDB779Cda90dBF651F8109857C97193CF9F';
const { alchemyAPIKey } = CONFIG;

export const chievId = BigInt(
  '0x480000000000000000000000000000000000000000000000000000000002',
);

export interface ChievMetadata {
  name: string;
  description: string;
  image: string;
  animation_url?: string;
}

/** function to get the token image url from the nft metadata */
export const getTokenImage = async (): Promise<ChievMetadata | void> => {
  try {
    const provider = new providers.AlchemyProvider('matic', alchemyAPIKey);
    const token = new Contract(chievContractAddress, ABI, provider);
    const metadataURI = await token.uri(chievId);
    if (!metadataURI || metadataURI === '') {
      throw new Error(`No metadata for token ${chievId}.`);
    }
    const fetchLink = httpLink(metadataURI);
    if (fetchLink != null) {
      const response = await fetch(fetchLink);
      const metadata = await response.json();
      return metadata as ChievMetadata;
    }
  } catch (error) {
    errorHandler(error as Error);
    console.error({ getTokenImageError: error });
  }
  return undefined;
};
