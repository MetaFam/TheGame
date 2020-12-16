import { CONFIG } from 'config';
import {
  CollectiblesFavorites,
  PlayerFragmentFragment,
} from 'graphql/autogen/types';
import { useEffect, useState } from 'react';

type OpenSeaCollectiblesOpts = {
  player: PlayerFragmentFragment;
};

export type Collectible = {
  address: string;
  tokenId: string;
  title: string;
  imageUrl: string;
  permaLink: string;
  priceInEth: number | undefined;
  priceInUsd: number | undefined;
};

export const useOpenSeaCollectibles = ({
  player,
}: OpenSeaCollectiblesOpts): {
  favorites: Array<Collectible>;
  data: Array<Collectible>;
  loading: boolean;
} => {
  const [favorites, setFavorites] = useState<Array<Collectible>>([]);
  const [data, setData] = useState<Array<Collectible>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const owner = player.ethereum_address;
  const favoritesQuery = player.box_profile?.collectiblesFavorites
    ? `${
        CONFIG.openseaURL
      }/assets/?order_direction=desc&owner=${owner}${getFavoriteQueryParams(
        player.box_profile.collectiblesFavorites,
      )}`
    : '';

  useEffect(() => {
    async function load() {
      setLoading(true);
      if (favoritesQuery && owner) {
        const [favoritesData, allData] = await Promise.all([
          fetchOpenSeaData(favoritesQuery),
          fetchAllOpenSeaData(owner),
        ]);
        setFavorites(favoritesData);
        setData(allData);
      } else if (owner) {
        const allData = await fetchAllOpenSeaData(owner);
        setData(allData);
        setFavorites(allData.slice(0, 3));
      }
      setLoading(false);
    }
    load();
  }, [favoritesQuery, owner]);

  return { favorites, data, loading };
};

const getFavoriteQueryParams = (
  favorites: Array<Pick<CollectiblesFavorites, 'tokenId' | 'address'>>,
): string =>
  favorites.reduce((query, { tokenId }) => `${query}&token_ids=${tokenId}`, '');

const fetchAllOpenSeaData = async (
  owner: string,
): Promise<Array<Collectible>> => {
  let offset = 0;
  let data: Array<Collectible> = [];
  let lastData: Array<Collectible> = [];
  do {
    const query = `${CONFIG.openseaURL}/assets/?order_direction=desc&owner=${owner}&limit=50&offset=${offset}`; // opensea utmost returns 50 per api call
    // eslint-disable-next-line no-await-in-loop
    lastData = await fetchOpenSeaData(query);
    data = data.concat(lastData);
    offset += 50;
  } while (lastData.length > 0);
  return data;
};

const fetchOpenSeaData = async (query: string): Promise<Array<Collectible>> => {
  const response = await fetch(query);
  return parseResponse(response);
};

const parseResponse = async (
  response: Response,
): Promise<Array<Collectible>> => {
  if (!response.ok) return [];
  const data = await response.json();
  if (!data.assets) return [];
  return (
    data.assets
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((asset: any) => ({
        address: asset.asset_contract.address,
        tokenId: asset.token_id,
        title: asset.name,
        imageUrl: asset.image_url,
        permaLink: asset.permalink,
        priceInEth: asset.last_sale
          ? Number(asset.last_sale.payment_token.eth_price)
          : undefined,
        priceInUsd: asset.last_sale
          ? Number(asset.last_sale.payment_token.usd_price)
          : undefined,
      }))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((collectible: any) => collectible.title && collectible.imageUrl)
  );
};
