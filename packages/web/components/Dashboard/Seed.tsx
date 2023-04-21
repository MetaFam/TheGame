import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Image,
  Link,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from '@metafam/ds';
import { animated, useSpring } from '@react-spring/web';
import CoinGeckoLogo from 'assets/attribution/coingecko-logo-text.webp';
import React, { FC, ReactElement, ReactNode, useEffect, useState } from 'react';
import { FaChartBar } from 'react-icons/fa';
import {
  AreaSeries,
  FlexibleXYPlot,
  GradientDefs,
  LineSeries,
} from 'react-vis';
import {
  findHighLowPrice,
  HighLowType,
  priceIncreased,
  ticker,
  volIncreased,
  volumeChange,
} from 'utils/dashboardHelpers';
import { errorHandler } from 'utils/errorHandler';

const SEED_TOKEN_ID = 'metagame';
export const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/coins/';
export const TOKEN_QUERY = '?localization=false&tickers=true&market_data=true';
const CHART_QUERY = '/market_chart?vs_currency=usd&days=30&interval=daily';

/**
 * Temporary link to the Seed Pool on Balancer
 * Ref: #1407 https://github.com/MetaFam/TheGame/issues/1407
 * On the Dashboard we provide a link to Seed Pool Info so Players/Patrons can check their investments in the Seed Pool
 * The link is supposed to be provided by the CoinGecko API (`ticker.token_info_url`)
 * As at 2022/11/26 the link provided by the API is to the (outdated) Mainnet Seed Pool instead of the (new, awesome) Polygon Seed Pool
 * (UPDATE: As at 2022/11/26 17:47 the API isn't providing any of the ticker info)
 * Until the CoinGecko API is updated, we're doing to hard-code the link to the Polygon Seed Pool.
 * - TEMP_SEED_POOL_LINK_FIX_LATER, see below
 * After the CoinGecko API is updated, we are going to remember to revert this change. (Previous code has been kept but commented out)
 */

const TEMP_SEED_POOL_LINK_FIX_LATER =
  'https://app.balancer.fi/#/polygon/pool/0x8a8fcd351ed553fc75aecbc566a32f94471f302e000100000000000000000081';

type TokenDataProps = {
  market: MarketDataProps;
  poolTicker: TickerProps;
  priceUp: boolean;
  volumeUp: boolean;
  volumePercent: string;
  highLow7d: HighLowType;
  prices: Array<Array<number>>;
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

export const Seed = (): ReactElement => {
  const [token, setToken] = useState<TokenDataProps | null>(null);

  useEffect(() => {
    if (token !== null) return;
    (async () => {
      try {
        const tokenResponse = await fetch(
          `${COINGECKO_API_URL}${SEED_TOKEN_ID}${TOKEN_QUERY}`,
        );
        const tokenJson = await tokenResponse.json();
        const chartResponse = await fetch(
          `${COINGECKO_API_URL}${SEED_TOKEN_ID}${CHART_QUERY}`,
        );
        const chartJson = await chartResponse.json();
        const { market_data: marketData, tickers } = tokenJson;
        const { prices, total_volumes: totalVolumes } = chartJson;
        const market = marketData;
        const poolTicker = ticker(tickers, 'balancer_v1');
        const priceUp =
          priceIncreased(marketData.price_change_percentage_24h) > 0;
        const volumeUp =
          volIncreased(totalVolumes, marketData.total_volume) > 0;
        const volumePercent = volumeChange(
          totalVolumes,
          marketData.total_volume,
        ).toFixed(2);
        const highLow7d = findHighLowPrice(prices, 7);
        const tokenData: TokenDataProps = {
          market,
          poolTicker,
          priceUp,
          volumeUp,
          volumePercent,
          highLow7d,
          prices,
        };

        return setToken(tokenData);
      } catch (error) {
        console.error('error fetching tokenData', error);
        errorHandler(error as Error);
        return null;
      }
    })();
  });

  return (
    <Flex direction="column" p={6} w="100%">
      <Text fontSize="lg" fontWeight="bold" textTransform="uppercase">
        Seed
      </Text>
      <VStack spacing={2} align="stretch">
        <Box position="relative" zIndex="20" h="15rem">
          <StatGroup position="relative" my={5} zIndex={10}>
            <Stat mb={3}>
              <StatLabel>Market Price</StatLabel>
              <StatNumber>${token?.market.current_price.usd}</StatNumber>
              <StatHelpText>
                <StatArrow type={token?.priceUp ? 'increase' : 'decrease'} />
                {token?.market.price_change_percentage_24h
                  ? `${token?.market.price_change_percentage_24h?.toFixed(2)}%`
                  : `No data 😞`}
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
          position="absolute"
          width="100%"
          height="100%"
          bottom={0}
          left={0}
          zIndex={0}
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
        {/**
         * Delete this component after the CoinGecko API is updated with the Polygon Seed Pool info
         * (and uncomment the following bit to start using the API again for the link)
         */}
        <Link
          position="absolute"
          bottom={6}
          left={6}
          href={TEMP_SEED_POOL_LINK_FIX_LATER}
          isExternal
          zIndex={20}
        >
          Pool Info
        </Link>

        {/**
         * Uncomment this after the CoinGecko API is updated with the Polygon Seed Pool info
        
      {token?.poolTicker && (
        <Link
          position="absolute"
          bottom={6}
          left={6}
          href={token?.poolTicker.token_info_url}
          isExternal
          zIndex={20}
        >
          Pool Info
        </Link>
      )}

        */}
      </VStack>
    </Flex>
  );
};

type ChartType = {
  children?: ReactNode;
  data: Array<Array<number>>;
};

const ChartRange = ({ value = {} }): React.ReactElement => (
  <Box
    opacity={1}
    color={'white'}
    fontSize="md"
    fontWeight={700}
    transition="all 0.1s ease-in-out"
  >{`${value}d`}</Box>
);
const AnimatedChartRange = animated(ChartRange);

export const Chart: FC<ChartType> = ({ data }) => {
  const [scale, setScale] = useState<number>(30);
  const props = useSpring({
    config: {
      mass: 10,
      tension: 280,
      friction: 100,
    },
    range: scale,
  });

  const makePlots = (days: Array<Array<number>>) =>
    days.slice(scale === 30 ? 0 : -7).map((d, i) => ({
      x: i + 1,
      y: d[1],
      y0: 0,
    }));

  const plots = makePlots(data);

  return (
    <Box>
      <ButtonGroup
        isAttached
        position="absolute"
        top={6}
        right={6}
        zIndex={250}
      >
        {[7, 30].map((s) => (
          <Button
            key={s}
            aria-label="Toggle chart scale"
            leftIcon={<FaChartBar />}
            borderColor="pinkShadeOne"
            background="rgba(17, 17, 17, 0.9)"
            color="pinkShadeOne"
            _hover={{ color: 'white', borderColor: 'white' }}
            variant="outline"
            onClick={() => setScale(s)}
            size="xs"
            sx={{
              '&:focus, &:hover': {
                background: 'transparent',
              },
            }}
          >
            {s}d
          </Button>
        ))}
      </ButtonGroup>
      <FlexibleXYPlot
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          maxW: '100%',
        }}
        height={175}
        margin={{
          right: -2,
          left: -2,
          bottom: -2,
        }}
      >
        <LineSeries
          curve="linear"
          strokeStyle="solid"
          animation={{ damping: 80, stiffness: 800 }}
          stroke="#A426A4"
          opacity={0.5}
          data={plots}
          style={{
            bottom: 0,
            strokeWidth: 2,
            fillOpacity: 0,
          }}
        />
        <GradientDefs>
          <linearGradient id="MetaGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity={0.9} />
            <stop offset="100%" stopColor="black" stopOpacity={1} />
          </linearGradient>
        </GradientDefs>
        <AreaSeries
          curve="linear"
          color="url(#MetaGradient)"
          animation={{ damping: 80, stiffness: 800 }}
          opacity={0.2}
          data={plots}
          style={{
            bottom: 0,
            fillOpacity: 0.5,
            strokeWidth: 0,
          }}
        />
      </FlexibleXYPlot>
      <Box
        aria-label="Seed Graph scale"
        position="absolute"
        bottom={6}
        right={6}
      >
        <AnimatedChartRange value={props.range.to((x) => x.toFixed(0))} />
      </Box>
      <Box
        aria-label="Seed Data powered by CoinGecko"
        position="absolute"
        bottom={6}
        right="auto"
        fontSize="sm"
        width="100%"
        textAlign="center"
      >
        <Link
          display="inline-flex"
          href={`https://www.coingecko.com/en/coins/${SEED_TOKEN_ID}`}
          isExternal
          width="25%"
          // title="CoinGecko"
          sx={{
            opacity: 0.08,
            transition: 'all 1s ease-in-out',
            _hover: {
              opacity: 0.3,
              // transform: 'scale(1.1)'
            },
          }}
        >
          <Image src={CoinGeckoLogo.src} height="auto" width="100%" mx="auto" />
        </Link>
      </Box>
    </Box>
  );
};
