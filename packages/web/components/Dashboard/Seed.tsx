/* eslint-disable @typescript-eslint/naming-convention */
import {
  Box,
  Link,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@metafam/ds';
import React, { FC } from 'react';

type SeedProps = {
  token: TokenProps;
  chart: ChartProps;
  children?: React.ReactChildren;
};

export type TokenProps = {
  market_data: MarketDataProps;
  tickers: Array<TickerProps>;
};
export type ChartProps = {
  prices: Array<Array<number>>;
  total_volumes: Array<Array<number>>;
};

type MarketDataProps = {
  price_change_percentage_24h: number;
  total_volume: Record<string, number>;
  current_price: Record<string, number>;
};

type TickerProps = {
  [index: number]: Array<string>;
  market: MarketProps;
  token_info_url: string;
};

type MarketProps = {
  identifier: string;
};

export const Seed: FC<SeedProps> = (props) => {
  const { token, chart } = props;
  const { market_data, tickers } = token;
  const { prices, total_volumes } = chart;
  const {
    price_change_percentage_24h,
    total_volume,
    current_price,
  } = market_data;
  // console.log(tickers);

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const ticker =
    tickers?.filter(
      (tick) => tick.market.identifier === 'balancer_v1' && tick,
    ) || null;

  const priceIncreased = Math.sign(price_change_percentage_24h) === 1;
  // console.table('Prices 7d: ', prices);

  function highLowPrice7d(days: Array<Array<number>>) {
    const plots: Array<number> = [];

    days.map((d) => {
      // console.log(d[1]);
      const day: number = d[1];
      return plots.push(day);
    });
    const high = Number(Math.max(...plots)).toFixed(2);
    const low = Number(Math.min(...plots)).toFixed(2);

    return {
      high,
      low,
    };
  }

  const highLow7d = highLowPrice7d(prices);

  function volumeChange(
    vols: Array<Array<number>>,
    todayVol: Record<string, number>,
  ) {
    const plots = [];
    let element: Array<number> = [];

    for (let i = 0; i < vols.length; i++) {
      element = vols[i];
      plots.push({ date: element[0], volume: element[1] });
    }
    const lastVol = plots[plots.length - 2].volume;
    const diff = +todayVol.usd - +lastVol;
    const volPercent = Number((diff / todayVol.usd) * 100);

    return volPercent;
  }

  const volIncreased = Math.sign(volumeChange(total_volumes, total_volume));

  return (
    <>
      <Box>
        <StatGroup my={5}>
          <Stat mb={3}>
            <StatLabel>Market Price</StatLabel>
            <StatNumber>${current_price.usd}</StatNumber>
            <StatHelpText>
              <StatArrow type={priceIncreased ? 'increase' : 'decrease'} />
              {price_change_percentage_24h}%
            </StatHelpText>
          </Stat>

          <Stat mb={3}>
            <StatLabel>24h Trading Volume</StatLabel>
            <StatNumber>${total_volume.usd}</StatNumber>
            <StatHelpText>
              <StatArrow type={volIncreased ? 'increase' : 'decrease'} />
              {volumeChange(total_volumes, total_volume).toFixed(2)}%
            </StatHelpText>
          </Stat>

          <Stat alignSelf="flex-start" flex="0 0 100%">
            <StatLabel>7d Low / High</StatLabel>
            <StatNumber>
              ${highLow7d.low} / ${highLow7d.high}
            </StatNumber>
          </Stat>
        </StatGroup>
        {ticker && (
          <Link href={ticker[0]?.token_info_url} isExternal>
            Pool Info
          </Link>
        )}
      </Box>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
