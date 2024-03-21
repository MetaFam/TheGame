import { httpLink, Maybe } from '@metafam/utils';
import { useEffect, useState } from 'react';
import { optimism } from 'viem/chains';
import { useReadContract } from 'wagmi';

import ABI from '../../../contracts/BulkDisbursableNFTs.abi';

export const chievContractAddress =
  '0xb77b8eDB779Cda90dBF651F8109857C97193CF9F';

export const chievId =
  0x480000000000000000000000000000000000000000000000000000000002n;

export type ChievMetadata = {
  name: string;
  description: string;
  image: string;
  animation_url?: string;
};

/** function to get the token image url from the nft metadata */
export const useMetadata = () => {
  const [data, setData] = useState<Maybe<ChievMetadata>>(null);
  const {
    data: uri,
    error,
    isLoading: loading,
  }: {
    data?: string;
    error: Maybe<Error>;
    isLoading: boolean;
  } = useReadContract({
    abi: ABI,
    address: chievContractAddress,
    functionName: 'uri',
    args: [`0x${chievId.toString(16)}`],
    chainId: optimism.id,
  });
  if (error) throw error;
  if (!loading && !uri) {
    throw new Error(`No metadata for token #0x${chievId.toString(16)} found.`);
  }

  useEffect(() => {
    const lookup = async () => {
      if (uri) {
        const link = httpLink(uri);
        const response = await fetch(link);
        setData(await response.json());
      }
    };
    lookup();
  }, [uri]);

  return data;
};
