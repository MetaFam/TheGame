import {
  ArrowUpIcon,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  MetaButton,
  Text,
  VStack,
} from '@metafam/ds';
import BlueArrow from 'assets/patron/blue-arrow.png';

import { LeagueCardItem } from './LeagueCardItem';

const getLeagueCardStyling = (id: number) => {
  console.log('card id: ', id);
  const getTopPos: any = {
    0: '60px',
    1: '280px',
    2: '160px',
    3: '180px',
    4: '80px',
    5: '160px',
    6: '130px',
  };
  let style: any = {
    backdropFilter: 'blur(7px)',
  };
  if (id && id !== 7) {
    style = {
      ...style,
      _after: {
        content: '""',
        background: `url(${BlueArrow})`,
        height: '28px',
        width: '26px',
        position: 'absolute',
        top: getTopPos[id],
        [id % 2 === 1 ? 'left' : 'right']: '-25px',
        transform: id % 2 === 1 ? 'rotate(180deg)' : 'rotate(0)',
      },
    };
  }
  return style;
};

type LeagueProps = {
  title: string;
  count: number;
  amount: number;
  header: boolean;
  arrow: string;
  body?: React.ReactElement;
  list: string[];
  id: number;
  style?: any;
};

export const LeagueCard: React.FC<LeagueProps> = (props: LeagueProps) => (
  <Flex
    direction="column"
    mx="4"
    my="5"
    bg="whiteAlpha.200"
    rounded="lg"
    {...getLeagueCardStyling(props.id)}
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
        props.list.map((item, i) => <LeagueCardItem item={item} key={i} />)}
    </Flex>
  </Flex>
);
