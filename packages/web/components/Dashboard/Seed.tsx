/* eslint-disable @typescript-eslint/naming-convention */
import {
  Box,
  IconButton,
  Link,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@metafam/ds';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { FaChartBar } from 'react-icons/fa';
import {
  AreaSeries,
  AreaSeriesPoint,
  FlexibleXYPlot,
  GradientDefs,
  LineSeries,
} from 'react-vis';

import {
  findHighLowPrice,
  HighLow7dType,
  priceIncreased,
  ticker,
  volIncreased,
  volumeChange,
} from '../../utils/dashboardHelpers';
import { apiUrl, chartQuery, tokenId, tokenQuery } from './config';

export type TokenProps = {
  market_data: MarketDataProps;
  tickers: Array<TickerProps>;
};
export type TokenDataProps = {
  market: MarketDataProps;
  ticker: TickerProps;
  priceUp: boolean;
  volumeUp: boolean;
  volumePercent: string;
  highLow7d: HighLow7dType;
  prices: Array<Array<number>>;
};

export type ChartProps = {
  prices: Array<Array<number>>;
  total_volumes: Array<Array<number>>;
};

type MarketDataProps = {
  price_change_percentage_24h: number | null;
  total_volume: Record<string, number>;
  current_price: Record<string, number>;
};

type TickerProps = {
  market: MarketProps;
  token_info_url: string;
};

type MarketProps = {
  identifier: string;
};

export const Seed: FC = () => {
  const [token, setToken] = useState<TokenDataProps | null>();

  useEffect(() => {
    if (typeof token !== 'undefined') return;
    (async () => {
      try {
        const tokenResponse = await fetch(
          `${apiUrl}coins/${tokenId + tokenQuery}`,
        );
        const tokenJson = await tokenResponse.json();
        const chartResponse = await fetch(
          `${apiUrl}coins/${tokenId + chartQuery}`,
        );
        const chartJson = await chartResponse.json();

        const { market_data, tickers } = tokenJson;
        const { prices, total_volumes } = chartJson;

        const buildTokenData = () => {
          const tokenData: TokenDataProps = {
            market: market_data,
            ticker: ticker(tickers, 'balancer_v1'),
            priceUp:
              priceIncreased(market_data.price_change_percentage_24h) > 0,
            volumeUp: volIncreased(total_volumes, market_data.total_volume) > 0,
            volumePercent: volumeChange(
              total_volumes,
              market_data.total_volume,
            ).toFixed(2),
            highLow7d: findHighLowPrice(prices, 7),
            prices,
          };

          if (!token) {
            return tokenData;
          }
          return null;
        };
        setToken(() => buildTokenData());
        return () => {};
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('getTokenData: ', error);
        return null;
      }
    })();
  });

  return (
    <>
      <Box position="relative" zIndex="20">
        <StatGroup position="relative" my={5} zIndex={10}>
          <Stat mb={3}>
            <StatLabel>Market Price</StatLabel>
            <StatNumber>${token?.market.current_price.usd}</StatNumber>
            <StatHelpText>
              <StatArrow type={token?.priceUp ? 'increase' : 'decrease'} />
              {`${token?.market.price_change_percentage_24h?.toFixed(2)}%` ||
                'not enough data'}
            </StatHelpText>
          </Stat>

          <Stat mb={3}>
            <StatLabel>24h Trading Volume</StatLabel>
            <StatNumber>${token?.market.total_volume.usd}</StatNumber>
            <StatHelpText>
              <StatArrow type={token?.volumeUp ? 'increase' : 'decrease'} />
              {token?.volumePercent}%
            </StatHelpText>
          </Stat>

          <Stat alignSelf="flex-start" flex="0 0 100%">
            <StatLabel>7d Low / High</StatLabel>
            <StatNumber>
              ${token?.highLow7d.low} / ${token?.highLow7d.high}
            </StatNumber>
          </Stat>
        </StatGroup>
      </Box>
      <Box
        className="chartWrapper"
        position="absolute"
        width="100%"
        height="100%"
        bottom={0}
        left={0}
        zIndex={0}
        sx={{
          '.seed-chart': {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            maxW: '100%',
            '.seed-chart-path': {
              bottom: 0,
              strokeWidth: 2,
              fillOpacity: 0,
              '&--fill': {
                fillOpacity: 0.5,
                strokeWidth: 0,
              },
            },
          },
        }}
      >
        {token?.prices ? (
          <Chart data={token.prices} />
        ) : (
          <Box
            position="absolute"
            bottom={5}
            right={5}
            opacity={0.5}
            fontSize="lg"
          >
            Loading chart...
          </Box>
        )}
      </Box>
      {token?.ticker && (
        <Link
          position="absolute"
          bottom={5}
          left={5}
          className="infoLink"
          href={token?.ticker.token_info_url}
          isExternal
          zIndex={20}
        >
          Pool Info
        </Link>
      )}
    </>
  );
};

type ChartType = {
  children?: ReactNode;
  data: Array<Array<number>>;
};

export const Chart: FC<ChartType> = ({ data }) => {
  const [scale, setScale] = useState<boolean>(true);

  const toggleScale = () => {
    setScale(!scale);
  };

  function makePlots(days: Array<Array<number>>) {
    // adding this as i couldn't work out how to fix the type error. Could do with a pair session for this stuff.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const plots: Array<string | any | AreaSeriesPoint> = [];

    days.slice(scale ? 0 : -7).map((d, i) => {
      const day = {
        x: i + 1,
        y: d[1],
        y0: 0,
      };
      return plots.push(day);
    });

    return plots;
  }

  const plots = makePlots(data);

  return (
    <Box>
      <Box position="absolute" top={3} right={3} zIndex={250}>
        <IconButton
          aria-label="Toggle chart scale"
          icon={<FaChartBar />}
          borderColor="pinkShadeOne"
          background="rgba(17, 17, 17, 0.9)"
          color="pinkShadeOne"
          _hover={{ color: 'white', borderColor: 'white' }}
          variant="outline"
          isRound
          onClick={() => toggleScale()}
          sx={{
            '&:focus, &:hover': {
              background: 'transparent',
            },
          }}
        />
      </Box>
      <FlexibleXYPlot
        className="seed-chart"
        height={175}
        margin={{
          right: -2,
          left: -2,
          bottom: -2,
        }}
      >
        <LineSeries
          className="seed-chart-path"
          curve="linear"
          strokeStyle="solid"
          animation={{ damping: 80, stiffness: 800 }}
          stroke="#A426A4"
          opacity={0.5}
          data={plots}
        />
        <GradientDefs>
          <linearGradient id="MetaGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity={0.9} />
            <stop offset="100%" stopColor="black" stopOpacity={1} />
          </linearGradient>
        </GradientDefs>
        <AreaSeries
          className="seed-chart-path--fill"
          curve="linear"
          color="url(#MetaGradient)"
          animation={{ damping: 80, stiffness: 800 }}
          // stroke="#A426A4"
          opacity={0.2}
          data={plots}
        />
      </FlexibleXYPlot>
      <Box
        aria-label="Seed Graph scale"
        position="absolute"
        bottom={5}
        right={5}
        opacity={0.25}
        fontSize="xl"
        fontWeight={700}
      >
        {!scale ? 7 : 30}d
      </Box>
    </Box>
  );
};
