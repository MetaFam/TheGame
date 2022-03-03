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
  Text,
} from '@metafam/ds';
import { animated, useSpring } from '@react-spring/web';
import { useUser } from 'lib/hooks';
import { useUserXP } from 'lib/hooks/useUserXP';
import React, { FC, ReactNode, useState } from 'react';
import { FaChartBar } from 'react-icons/fa';
import {
  AreaSeries,
  FlexibleXYPlot,
  GradientDefs,
  LineSeries,
} from 'react-vis';

import { XPChartWrapperStyles } from './config';

export const XP = (): React.ReactElement => {
  const { user } = useUser();

  const xpStats = useUserXP(user?.ethereumAddress || '');

  if (xpStats == null) {
    return (
      <Text fontStyle="italic" textAlign="center">
        Unknown
      </Text>
    );
  }
  const {
    userTotalXP,
    variationThisWeek,
    variationLastWeek,
    thisWeekXP,
    lastWeekXP,
    userWeeklyCred,
  } = xpStats;
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
          <StatNumber>{userTotalXP.toLocaleString()}</StatNumber>
          {user?.rank && (
            <MetaTag
              backgroundColor={user.rank.toLowerCase()}
              size="md"
              color="blackAlpha.600"
            >
              {user.rank}
            </MetaTag>
          )}
        </Stat>
      </StatGroup>
      <Box
        className="chartWrapper"
        position="absolute"
        width="100%"
        height="100%"
        bottom={0}
        left={0}
        zIndex={0}
        sx={XPChartWrapperStyles}
      >
        {userWeeklyCred && <Chart data={userWeeklyCred} />}
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

  const makePlots = (weeks: Array<number>) =>
    weeks.slice(-Math.floor(scale / 7)).map((d, i) => ({
      x: i + 1,
      y: d,
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
