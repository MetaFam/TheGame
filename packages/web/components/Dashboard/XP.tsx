import {
  Box,
  Button,
  ButtonGroup,
  MetaTag,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@metafam/ds';
import { animated, useSpring } from '@react-spring/web';
import { useUser } from 'lib/hooks';
import { useUserXP } from 'lib/hooks/useUserXP';
import React, { FC, ReactNode, useState } from 'react';
import { FaChartBar } from 'react-icons/fa';
import {
  AreaSeries,
  AreaSeriesPoint,
  FlexibleXYPlot,
  GradientDefs,
  LineSeries,
} from 'react-vis';

// TODO: after dashboard-seed is merged copy this in config.ts
export const chartWrapperStyles = {
  '.xp-chart': {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxW: '100%',
    '.xp-chart-path': {
      bottom: 0,
      strokeWidth: 2,
      fillOpacity: 0,
      '&--fill': {
        fillOpacity: 0.5,
        strokeWidth: 0,
      },
    },
  },
};

export const XP = (): React.ReactElement => {
  const { user } = useUser();

  const {
    userTotalXP,
    variationThisWeek,
    variationLastWeek,
    thisWeekXP,
    lastWeekXP,
    userWeeklyCred,
  } = useUserXP(user?.ethereum_address || '');

  return (
    <>
      <StatGroup mt={5} flex="0 0 50%">
        <Stat mb={3}>
          <StatLabel>This Week</StatLabel>
          <StatNumber>{thisWeekXP}</StatNumber>
          <StatHelpText>
            <StatArrow type={variationThisWeek < 0 ? 'decrease' : 'increase'} />
            {variationThisWeek}%
          </StatHelpText>
        </Stat>

        <Stat mb={3} flex="0 0 50%">
          <StatLabel>Last Week</StatLabel>
          <StatNumber>{lastWeekXP}</StatNumber>
          <StatHelpText>
            <StatArrow type={variationLastWeek < 0 ? 'decrease' : 'increase'} />
            {lastWeekXP}%
          </StatHelpText>
        </Stat>

        <Stat alignSelf="flex-start" justifySelf="flex-end" flex="0 0 100%">
          <StatLabel>All Time</StatLabel>
          <StatNumber>{userTotalXP}</StatNumber>
          {user?.player?.rank && (
            <MetaTag
              backgroundColor={user.player.rank.toLowerCase()}
              size="md"
              color="blackAlpha.600"
            >
              {user.player.rank}
            </MetaTag>
          )}
        </Stat>
        {/* Currently we are not building this stat  */}
        {/* <Stat alignSelf="flex-start" justifySelf="flex-end" flex="0 0 50%">
        <StatLabel>XP/SEED Ratio</StatLabel>
        <StatNumber>3.4</StatNumber>
        <StatHelpText>
          <StatArrow type="decrease" />
          0.3
        </StatHelpText>
      </Stat> */}
      </StatGroup>
      <Box
        className="chartWrapper"
        position="absolute"
        width="100%"
        height="100%"
        bottom={0}
        left={0}
        zIndex={0}
        sx={chartWrapperStyles}
      >
        {userWeeklyCred.length > 0 && <Chart data={userWeeklyCred} />}
      </Box>
    </>
  );
};

type ChartType = {
  children?: ReactNode;
  data: Array<number>;
};

const ChartRange = ({ value = {} }): React.ReactElement => (
  <Box>{`${value}d`}</Box>
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

  const switchScale = (range: number) => {
    setScale(range);
  };

  function makePlots(weeks: Array<number>) {
    const plots: Array<AreaSeriesPoint> = weeks
      .slice(-Math.floor(scale / 7))
      .map((d, i) => ({
        x: i + 1,
        y: d,
        y0: 0,
      }));
    return plots;
  }

  const plots = makePlots(data);

  return (
    <Box>
      <Box position="absolute" top={6} right={6} zIndex={250}>
        <ButtonGroup isAttached>
          {[30, 90].map((s) => (
            <Button
              key={s}
              aria-label="Toggle chart scale"
              icon={<FaChartBar />}
              borderColor="pinkShadeOne"
              background="rgba(17, 17, 17, 0.9)"
              color="pinkShadeOne"
              _hover={{ color: 'white', borderColor: 'white' }}
              variant="outline"
              isRound
              onClick={() => switchScale(s)}
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
      </Box>
      <FlexibleXYPlot
        className="xp-chart"
        height={200}
        margin={{
          right: -2,
          left: -2,
          bottom: -2,
        }}
      >
        <LineSeries
          className="xp-chart-path"
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
          className="xp-chart-path--fill"
          curve="linear"
          color="url(#MetaGradient)"
          animation={{ damping: 80, stiffness: 800 }}
          // stroke="#A426A4"
          opacity={0.2}
          data={plots}
        />
      </FlexibleXYPlot>
      <Box
        aria-label="XP Graph scale"
        position="absolute"
        bottom={5}
        right={5}
        opacity={0.25}
        fontSize="xl"
        fontWeight={700}
      >
        <AnimatedChartRange value={props.range.to((x) => x.toFixed(0))} />
      </Box>
    </Box>
  );
};
