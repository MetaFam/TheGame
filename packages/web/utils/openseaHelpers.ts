import { Maybe } from '@metafam/utils';
import { utils } from 'ethers';
import { AssetEvent, OpenSeaAsset } from 'opensea-js/lib/types';

const { formatUnits: formatTokenAmount } = utils;

export type Collectible = {
  address: string;
  tokenId: string;
  title: string;
  imageURL: string;
  openseaLink: string;
  priceString: string;
};

export const parseOpenSeaAssets = async (
  assets: Array<OpenSeaAsset>,
): Promise<Array<Collectible>> =>
  assets
    .map(
      ({
        assetContract: { address },
        tokenId,
        name,
        imageUrl,
        openseaLink,
        lastSale,
      }) =>
        ({
          address,
          tokenId,
          title: name,
          imageURL: imageUrl,
          openseaLink,
          priceString: getPriceString(lastSale),
        } as Collectible),
    )
    .filter(
      (collectible: Collectible) =>
        !!collectible.title && !!collectible.imageURL,
    );

const ETH_ADDRESSES = [
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // wETH
  '0x0000000000000000000000000000000000000000', // ETH
];

const getPriceString = (event: Maybe<AssetEvent>): string => {
  if (event?.paymentToken) {
    const {
      paymentToken: { address, symbol: tokenSymbol, decimals, usdPrice },
      totalPrice,
    } = event;

    const symbol = ETH_ADDRESSES.includes(address) ? 'Ξ' : tokenSymbol;
    const price = Number(formatTokenAmount(totalPrice, decimals));
    const priceInUSD = usdPrice ? price * Number(usdPrice) : false;
    return `${price.toFixed(2)}${symbol}${
      priceInUSD ? ` ($${priceInUSD.toFixed(2)})` : ''
    }`;
  }
  return '';
};
