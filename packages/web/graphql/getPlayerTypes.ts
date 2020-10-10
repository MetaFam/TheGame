import { PlayerType } from 'graphql/types';

const playerTypes: Array<PlayerType> = [
  {
    id: '1',
    name: 'Pioneer',
    description:
      'Pioneers are the ones out on the frontier, venturing into the unknown with no fear of failure. Working with incomplete tools & buggy software, they start weird new projects & experiments. They thrive in chaos.',
  },
  {
    id: '2',
    name: 'Settler',
    description:
      'Settlers live between chaos & order. They take the things that the pioneers build, build upon them & find them a market fit. They take care of things and help them grow until they are proven to work & taken over by Town Planners.',
  },
  {
    id: '3',
    name: 'Town Planner',
    description:
      'Polar opposite to the Pioneers, Town Planners are the last to arrive at the party. They are the ones concerned with the structure & making things efficient. They want documentation & they thrive in order.',
  },
];

// TODO: fetch data from backend instead
export const getPlayerTypes = () => playerTypes;
