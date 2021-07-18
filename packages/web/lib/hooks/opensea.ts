import { CONFIG } from 'config';
import { utils } from 'ethers';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import { OpenSeaAPI } from 'opensea-js';
import {
  AssetEvent,
  OpenSeaAsset,
  OpenSeaAssetQuery,
} from 'opensea-js/lib/types';
import { useEffect, useMemo, useState } from 'react';

const opensea = new OpenSeaAPI({ apiKey: CONFIG.openseaApiKey });

type OpenSeaCollectiblesOpts = {
  player: PlayerFragmentFragment;
};

export type Collectible = {
  address: string;
  tokenId: string;
  title: string;
  imageUrl: string;
  openseaLink: string;
  priceString: string;
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
  const collectiblesFavorites = useMemo(
    // IDX's basic profile doesn't include a list of favorite NFTs
    () => [], // player?.box_profile?.collectiblesFavorites ?? [],
    [], // [player],
  );

  useEffect(() => {
    async function load() {
      setLoading(true);
      if (collectiblesFavorites.length > 0 && owner) {
        const favoritesQuery = {
          owner,
          token_ids: collectiblesFavorites.map(({ tokenId }) => tokenId || ''),
        };
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
  }, [collectiblesFavorites, owner]);

  return { favorites, data, loading };
};

const fetchAllOpenSeaData = async (
  owner: string,
): Promise<Array<Collectible>> => {
  let offset = 0;
  let data: Array<Collectible> = [];
  let lastData: Array<Collectible> = [];
  do {
    const query = { owner, offset, limit: 50 };
    // eslint-disable-next-line no-await-in-loop
    lastData = await fetchOpenSeaData(query);
    data = data.concat(lastData);
    offset += 50;
  } while (lastData.length > 0);
  return data;
};

const fetchOpenSeaData = async (
  query: OpenSeaAssetQuery,
): Promise<Array<Collectible>> => {
  const response = await opensea.getAssets(query);
  return parseAssets(response.assets);
};

const parseAssets = async (
  assets: Array<OpenSeaAsset>,
): Promise<Array<Collectible>> =>
  assets
    .map(
      (asset) =>
        ({
          address: asset.assetContract.address,
          tokenId: asset.tokenId,
          title: asset.name,
          imageUrl: asset.imageUrl,
          openseaLink: asset.openseaLink,
          priceString: getPriceString(asset.lastSale),
        } as Collectible),
    )
    .filter(
      (collectible: Collectible) =>
        !!collectible.title && !!collectible.imageUrl,
    );

const ETH_ADDRESSES = [
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // wETH
  '0x0000000000000000000000000000000000000000', // ETH
];

const getPriceString = (event: AssetEvent | null): string => {
  if (event && event.paymentToken) {
    const {
      address,
      symbol: tokenSymbol,
      decimals,
      usdPrice,
    } = event.paymentToken;

    const symbol = ETH_ADDRESSES.indexOf(address) === -1 ? tokenSymbol : 'Ξ';
    const price = Number(utils.formatUnits(event.totalPrice, decimals));
    const priceInUSD = usdPrice ? price * Number(usdPrice) : 0;
    return `${price.toFixed(2)}${symbol}${
      priceInUSD ? ` ($${priceInUSD.toFixed(2)})` : ''
    }`;
  }
  return '';
};
