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
      {
        label: '3Box Profile',
        component: <div>3Box Profile</div>,
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
