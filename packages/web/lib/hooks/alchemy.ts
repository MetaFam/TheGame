import { Maybe } from '@metafam/utils';
import { Player } from 'graphql/autogen/types';
import { useEffect, useState } from 'react';
import { errorHandler } from 'utils/errorHandler';

export const useNFTCollectibles = ({
  player: { ethereumAddress: owner },
}: {
  player: Player;
}): {
  data: any;
  loading: boolean;
  error: Maybe<string>;
} => {
  const [data, setData] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Maybe<string>>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const allData = await fetchAlchemyAllData(owner);
        setData(allData);
      } catch (err) {
        errorHandler(err as Error);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    if (owner) {
      load();
    }

  }, [owner]);

  return { data, loading, error };
};

const fetchAlchemyAllData = async (
  owner: string,
): Promise<Array<any>> => {
  let offset = 0;
  let data: Array<any> = [];
  let lastData: Array<any> = [];
  const limit = 50;
  do {
    // eslint-disable-next-line no-await-in-loop
    lastData = await fetchAlchemyData(owner);
    data = data.concat(lastData);
    offset += limit;
  } while (lastData.length > 0);
  return data;
};

const fetchAlchemyData = async (
  owner: string,
): Promise<Array<any>> => {
  const res = await fetch(
    `/api/alchemy?owner=${owner}`,
  );
  const body = await res.text();
  const NFTs = JSON.parse(body);
  if (!NFTs) throw new Error(`Received ${NFTs} assets`);
  return NFTs;
};
