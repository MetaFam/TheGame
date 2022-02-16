import { Player } from 'graphql/autogen/types';
import { useEffect, useState } from 'react';
import { Collectible } from 'utils/openseaHelpers';

export const useOpenSeaCollectibles = ({
  player,
}: {
  player: Player;
}): {
  favorites: Array<Collectible>;
  data: Array<Collectible>;
  loading: boolean;
} => {
  const [favorites, setFavorites] = useState<Array<Collectible>>([]);
  const [data, setData] = useState<Array<Collectible>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const owner = player.ethereumAddress;

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        if (owner) {
          const allData = await fetchAllOpenSeaData(owner);
          setData(allData);
          setFavorites(allData.slice(0, 3));
        }
      } finally {
        setLoading(false);
      }
    }

    if (owner) {
      load();
    }
  }, [owner]);

  return { favorites, data, loading };
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
  try {
    const res = await fetch(
      `/api/opensea?owner=${owner}&offset=${offset}&limit=${limit}`,
    );
    const { response } = await res.json();
    return response;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`Error Retrieving OpenSea Assets: ${(err as Error).message}`);
    return Promise.resolve([]);
  }
};
