import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Link,
  MetaTag,
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

export const XP = (): React.ReactElement => {
  const { user } = useUser();

  const xpStats = useUserXP(user?.ethereumAddress || '');

  if (xpStats == null) {
    return (
      <VStack spacing={0}>
        <Flex align="center" justify="center" h="17rem">
          <Text fontStyle="italic" textAlign="center" px={4} w="100%" pb="5rem">
            If you want your XP stats to appear, you gotta earn some XP first!
            Go{' '}
            <Link
              href="https://meta-game.notion.site/Welcome-to-MetaGame-349d9b6434d543b48539bccabf10b60a"
              target="_tab"
            >
              here
            </Link>{' '}
            & join the onboarding call
          </Text>
        </Flex>
      </VStack>
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
    <VStack spacing={2} align="stretch">
      <Box position="relative" zIndex="20" h="17rem">
        <StatGroup mt={5} flex="0 0 50%">
          <Stat mb={3}>
            <StatLabel>This Week</StatLabel>
            <StatNumber>{thisWeekXP}</StatNumber>
            <StatHelpText>
              <StatArrow
                type={variationThisWeek < 0 ? 'decrease' : 'increase'}
              />
              {variationThisWeek}%
            </StatHelpText>
          </Stat>

          <Stat mb={3} flex="0 0 50%">
            <StatLabel>Last Week</StatLabel>
            <StatNumber>{lastWeekXP}</StatNumber>
            <StatHelpText>
              <StatArrow
                type={variationLastWeek < 0 ? 'decrease' : 'increase'}
              />
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
      </Box>
      <Box
        position="absolute"
        width="100%"
        height="100%"
        bottom={0}
        left={0}
        zIndex={0}
      >
        {userWeeklyCred && <Chart data={userWeeklyCred} />}
      </Box>
    </VStack>
  );
};

type ChartType = {
  children?: ReactNode;
  data: Array<number>;
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
        height={200}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          maxW: '100%',
        }}
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
      <Box aria-label="XP Graph scale" position="absolute" bottom={6} right={6}>
        <AnimatedChartRange value={props.range.to((x) => x.toFixed(0))} />
      </Box>
    </Box>
  );
};
