import { Maybe } from '@metafam/utils';
import { Player } from 'graphql/autogen/types';
import { useEffect, useState } from 'react';
import { errorHandler } from 'utils/errorHandler';
import { Collectible } from 'utils/openseaHelpers';

export const useOpenSeaCollectibles = ({
  player: { ethereumAddress: owner },
}: {
  player: Player;
}): {
  favorites: Array<Collectible>;
  data: Array<Collectible>;
  loading: boolean;
  error: Maybe<string>;
} => {
  const [favorites, setFavorites] = useState<Array<Collectible>>([]);
  const [data, setData] = useState<Array<Collectible>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Maybe<string>>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const allData = await fetchAllOpenSeaData(owner);
        setData(allData);
        setFavorites(allData.slice(0, 3));
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

  return { favorites, data, loading, error };
};

const fetchAllOpenSeaData = async (
  owner: string,
): Promise<Array<Collectible>> => {
  let offset = 0;
  let data: Array<Collectible> = [];
  let lastData: Array<Collectible> = [];
  const limit = 50;
  do {
    // eslint-disable-next-line no-await-in-loop
    lastData = await fetchOpenSeaData(owner, offset, limit);
    data = data.concat(lastData);
    offset += limit;
  } while (lastData.length > 0);
  return data;
};

const fetchOpenSeaData = async (
  owner: string,
  offset: number,
  limit: number,
): Promise<Array<Collectible>> => {
  const res = await fetch(
    `/api/opensea?owner=${owner}&offset=${offset}&limit=${limit}`,
  );
  const body = await res.text();
  const { assets, error } = JSON.parse(body);
  if (error) {
    console.error('error parsing opensea response', error);
    throw new Error(error);
  }
  if (!assets) throw new Error(`Received ${assets} assets`);
  return assets;
};
