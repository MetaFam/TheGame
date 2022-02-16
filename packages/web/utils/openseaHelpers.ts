import { utils } from 'ethers';
import { AssetEvent, OpenSeaAsset } from 'opensea-js/lib/types';

export type Collectible = {
  address: string;
  tokenId: string;
  title: string;
  imageUrl: string;
  openseaLink: string;
  priceString: string;
};

export const parseOpenSeaAssets = async (
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
  if (event?.paymentToken) {
    const {
      address,
      symbol: tokenSymbol,
      decimals,
      usdPrice,
    } = event.paymentToken;

    const symbol = ETH_ADDRESSES.includes(address) ? 'Ξ' : tokenSymbol;
    const price = Number(utils.formatUnits(event.totalPrice, decimals));
    const priceInUSD = usdPrice ? price * Number(usdPrice) : 0;
    return `${price.toFixed(2)}${symbol}${
      priceInUSD ? ` ($${priceInUSD.toFixed(2)})` : ''
    }`;
  }
  return '';
};
