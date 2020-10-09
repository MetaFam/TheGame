import AchieverImage from 'assets/achiever.png';
import ChallengerImage from 'assets/challenger.png';
import EnthusiastImage from 'assets/enthusiast.png';
import HelperImage from 'assets/helper.png';
import IndividualistImage from 'assets/individualist.png';
import InvestigatorImage from 'assets/investigator.png';
import LoyalistImage from 'assets/loyalist.png';
import PeacemakerImage from 'assets/peacemaker.png';
import ReformerImage from 'assets/reformer.png';
import { SetupAvailability } from 'components/Setup/SetupAvailability';
import { SetupDone } from 'components/Setup/SetupDone';
import { SetupMemberships } from 'components/Setup/SetupMemberships';
import { SetupPersonalityType } from 'components/Setup/SetupPersonalityType';
import { SetupPlayerType } from 'components/Setup/SetupPlayerType';
import { SetupSkills } from 'components/Setup/SetupSkills';
import React from 'react';

export const options = [
  {
    label: 'About You',
    title: { base: 'About You', sm: '1. About You' },
    screens: [
      {
        label: 'Personality Type',
        component: <SetupPersonalityType />,
      },
      {
        label: 'Player Type',
        component: <SetupPlayerType />,
      },
    ],
  },
  {
    label: 'Portfolio',
    title: {
      base: 'Portfolio',
      sm: '2. Portfolio',
      lg: '2. Professional Profile',
    },
    screens: [
      {
        label: 'Skills',
        component: <SetupSkills />,
      },
      {
        label: 'Availability',
        component: <SetupAvailability />,
      },
      {
        label: 'Memberships',
        component: <SetupMemberships />,
      },
    ],
  },
  {
    label: 'Start Playing',
    title: {
      base: 'Play',
      sm: '3. Play',
      md: '3. Start Playing',
    },
    screens: [
      {
        label: 'Done',
        component: <SetupDone />,
      },
    ],
  },
];

export type PersonalityType = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export const personalityTypes: Array<PersonalityType> = [
  {
    id: '1',
    name: 'The Reformer',
    description: 'Principled, Purposeful, Self-Controlled, and Perfectionistic',
    image: ReformerImage,
  },
  {
    id: '2',
    name: 'The Helper',
    description: 'Demonstrative, Generous, People-Pleasing, and Possessive',
    image: HelperImage,
  },
  {
    id: '3',
    name: 'The Achiever',
    description: 'Adaptive, Excelling, Driven, and Image-Conscious',
    image: AchieverImage,
  },
  {
    id: '4',
    name: 'The Individualist',
    description: 'Expressive, Dramatic, Self-Absorbed, and Temperamental',
    image: IndividualistImage,
  },
  {
    id: '5',
    name: 'The Investigator',
    description: 'Perceptive, Innovative, Secretive, and Isolated',
    image: InvestigatorImage,
  },
  {
    id: '6',
    name: 'The Loyalist',
    description: 'Engaging, Responsible, Anxious, and Suspicious',
    image: LoyalistImage,
  },
  {
    id: '7',
    name: 'The Enthusiast',
    description: 'Spontaneous, Versatile, Distractible, and Scattered',
    image: EnthusiastImage,
  },
  {
    id: '8',
    name: 'The Challenger',
    description: 'Self-Confident, Decisive, Willful, and Confrontational',
    image: ChallengerImage,
  },
  {
    id: '9',
    name: 'The Peacemaker',
    description: 'Receptive, Reassuring, Agreeable, and Complacent',
    image: PeacemakerImage,
  },
];

export type PlayerType = {
  id: string;
  name: string;
  description: string;
};

export const playerTypes = [
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
