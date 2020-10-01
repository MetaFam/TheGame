import { SetupAvailability } from 'components/Setup/SetupAvailability';
import { SetupDone } from 'components/Setup/SetupDone';
import { SetupMemberships } from 'components/Setup/SetupMemberships';
import { SetupPersonalityType } from 'components/Setup/SetupPersonalityType';
import { SetupPlayerType } from 'components/Setup/SetupPlayerType';
import { SetupSkills } from 'components/Setup/SetupSkills';
import React from 'react';

export const options = [
  {
    id: 'personality',
    title: { base: 'About You', sm: '1. About You' },
    screens: [
      {
        id: 'personalityType',
        component: <SetupPersonalityType />,
      },
      {
        id: 'playerType',
        component: <SetupPlayerType />,
      },
    ],
  },
  {
    id: 'profession',
    title: {
      base: 'Portfolio',
      sm: '2. Portfolio',
      lg: '2. Professional Portfolio',
    },
    screens: [
      {
        id: 'skills',
        component: <SetupSkills />,
      },
      {
        id: 'availability',
        component: <SetupAvailability />,
      },
      {
        id: 'memberships',
        component: <SetupMemberships />,
      },
    ],
  },
  {
    id: 'done',
    title: {
      base: 'Play',
      sm: '3. Play',
      md: '3. Start Playing',
    },
    screens: [
      {
        id: 'done',
        component: <SetupDone />,
      },
    ],
  },
];
