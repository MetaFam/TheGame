import { CONFIG } from 'config';
import {
  CollectiblesFavorites,
  PlayerFragmentFragment,
} from 'graphql/autogen/types';
import { useEffect, useState } from 'react';

type OpenSeaCollectiblesOpts = {
  player: PlayerFragmentFragment;
};

type Collectible = {
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
  favorites: Array<Collectible> | null;
  data: Array<Collectible> | null;
  loading: boolean;
} => {
  const [favorites, setFavorites] = useState<Array<Collectible>>([]);
  const [data, setData] = useState<Array<Collectible>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const allDataQuery = `${CONFIG.openseaURL}/assets/?order_direction=desc&offset=0&owner=${player.ethereum_address}`;
  const favoriteDataQueryParams = player.box_profile?.collectiblesFavorites
    ? getFavoriteQueryParams(player.box_profile.collectiblesFavorites)
    : '';

  useEffect(() => {
    async function load() {
      setLoading(true);
      if (favoriteDataQueryParams) {
        const [favoriteResponse, allResponse] = await Promise.all([
          fetch(allDataQuery + favoriteDataQueryParams),
          fetch(allDataQuery),
        ]);
        if (favoriteResponse.ok && allResponse.ok) {
          const [favoritesData, allData] = await Promise.all([
            parseResponse(favoriteResponse),
            parseResponse(allResponse),
          ]);
          setFavorites(favoritesData);
          setData(allData);
        }
      } else {
        const allResponse = await fetch(allDataQuery);
        if (allResponse.ok) {
          const allData = await parseResponse(allResponse);
          setData(allData);
          setFavorites(allData.slice(0, 3));
        }
      }
      setLoading(false);
    }
    load();
  }, [allDataQuery, favoriteDataQueryParams]);

  return { favorites, data, loading };
};

const getFavoriteQueryParams = (
  favorites: Array<Pick<CollectiblesFavorites, 'tokenId' | 'address'>>,
): string =>
  favorites.reduce((query, { tokenId }) => `${query}&token_ids=${tokenId}`, '');

const parseResponse = async (
  response: Response,
): Promise<Array<Collectible>> => {
  const data = await response.json();
  if (!data.assets) return [];
  return (
    data.assets
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((asset: any) => {
        if (!asset.name || !asset.image_url) return undefined;
        return {
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
        };
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((asset: any) => !!asset)
  );
};
