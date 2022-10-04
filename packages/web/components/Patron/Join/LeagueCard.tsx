import { Flex, Text } from '@metafam/ds';
import BlueArrow from 'assets/patron/blue-arrow.png';

import { LeagueCardItem } from './LeagueCardItem';

const getLeagueCardStyling = (id: number, isVertical: boolean) => {
  const getTopPos: any = {
    0: '60px',
    1: '300px',
    2: '220px',
    3: '200px',
    4: '180px',
    5: '160px',
    6: '180px',
  };
  let style: any = {
    backdropFilter: 'blur(7px)',
  };

  if (id !== undefined && id !== 7) {
    const getLeftOrRight = () => {
      if (isVertical) {
        return 'left';
      }
      return id % 2 === 1 ? 'left' : 'right';
    };
    const getTransform = () => {
      if (isVertical) {
        return 'rotate(90deg)';
      }
      return id % 2 === 1 ? 'rotate(180deg)' : 'rotate(0)';
    };
    style = {
      ...style,
      _after: {
        content: '""',
        background: `url(${BlueArrow})`,
        height: '28px',
        width: '26px',
        position: 'absolute',
        top: isVertical ? '100%' : getTopPos[id],
        [getLeftOrRight()]: isVertical ? '50%' : '-25px',
        transform: getTransform(),
      },
    };
  }
  return style;
};

// type LeagueProps = {
//   title?: string;
//   count?: number;
//   amount: number;
//   header: boolean;
//   arrow: string;
//   body?: React.ReactElement;
//   list: string[];
//   id: number;
//   style?: any;
//   isVertical: boolean;
// };

export const LeagueCard: React.FC<any> = (props: any) => (
  <Flex
    direction="column"
    mx="4"
    my="5"
    bg="whiteAlpha.200"
    rounded="lg"
    {...getLeagueCardStyling(props.id, props.isVertical)}
    {...props.style}
  >
    {props.header ? (
      <Flex
        direction="row"
        justify="space-between"
        bg="purpleBoxLight"
        p="4"
        roundedTop="lg"
      >
        <Text color="white" fontWeight="bold">
          {props.title}
        </Text>
        <Text color="landing450" fontSize="sm" fontWeight="bold">
          total of {props.count}
        </Text>
        <Text color="white" fontSize="md">
          {props.amount ? `$${Number(props.amount).toLocaleString()}` : '     '}
        </Text>
      </Flex>
    ) : (
      ''
    )}
    <Flex p={8} flexDirection="column">
      {props.body && <Text fontSize="md">{props.body}</Text>}
      {props.list &&
        props.list.map((item: any, i: number) => (
          <LeagueCardItem item={item} key={i} />
        ))}
    </Flex>
  </Flex>
);
