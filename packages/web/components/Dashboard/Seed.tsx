/* eslint-disable @typescript-eslint/naming-convention */
import {
  Box,
  Button,
  ButtonGroup,
  Link,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@metafam/ds';
import React, { FC, ReactNode, useState } from 'react';
import {
  AreaSeries,
  AreaSeriesPoint,
  FlexibleXYPlot,
  LineSeries,
} from 'react-vis';

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
  price_change_percentage_24h: number | null;
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
  // console.log(props);

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const ticker =
    tickers?.filter(
      (tick) => tick.market.identifier === 'balancer_v1' && tick,
    ) || null;

  const priceIncreased =
    price_change_percentage_24h && Math.sign(price_change_percentage_24h) === 1;

  function highLowPrice7d(days: Array<Array<number>>) {
    const plots: Array<number> = [];

    // we only want to get the last 7 of 30 days
    const lastWeek = days.slice(-7);
    lastWeek.map((d) => {
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
      <Box position="relative" zIndex="20">
        <StatGroup position="relative" my={5} zIndex={10}>
          <Stat mb={3}>
            <StatLabel>Market Price</StatLabel>
            <StatNumber>${current_price.usd}</StatNumber>
            <StatHelpText>
              <StatArrow type={priceIncreased ? 'increase' : 'decrease'} />
              {`${price_change_percentage_24h}%` || 'not enough data'}
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
          <Link
            className="infoLink"
            href={ticker[0]?.token_info_url}
            isExternal
            zIndex={20}
          >
            Pool Info
          </Link>
        )}
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
              // transform: 'translate3d(-20px, 50px, 0)',
              bottom: 0,
              strokeWidth: 2,
              fillOpacity: 0,
              '&--fill': {
                fillOpacity: 0.1,
                strokeWidth: 0,
              },
            },
          },
          '.rv-xy-plot__axis__ticks': {},
        }}
      >
        <Chart data={prices} />
      </Box>
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
    // TODO: adding this as i couldn't work out how to fix the type error. Could do with a pair session for this stuff.
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
    // console.log('Plots: ', plots);

    return plots;
  }
  const plots = makePlots(data);

  return (
    <Box>
      <Box position="absolute" top={5} right={5} zIndex={250}>
        <ButtonGroup variant="ghost" colorScheme="cyan">
          <Button
            onClick={() => toggleScale()}
            sx={{
              '&:focus, &:hover': {
                background: 'transparent',
              },
            }}
          >
            {scale ? '30d' : '7d'}{' '}
          </Button>
        </ButtonGroup>
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
          animation={{ damping: 20, stiffness: 300 }}
          stroke="#A426A4"
          opacity={0.5}
          data={plots}
        />
        <AreaSeries
          className="seed-chart-path--fill"
          curve="linear"
          color="white"
          animation={{ damping: 20, stiffness: 300 }}
          // stroke="#A426A4"
          opacity={0.4}
          data={plots}
        />
      </FlexibleXYPlot>
    </Box>
  );
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
