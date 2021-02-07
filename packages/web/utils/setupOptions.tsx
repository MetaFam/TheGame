import { SetupDone } from 'components/Setup/SetupDone';
import React from 'react';

export const options = [
  {
    label: 'About You',
    title: { base: 'About You', sm: '1. About You' },
    screens: [
      {
        label: 'Username',
        slug: 'username'
      },
      {
        label: 'Personality Type',
        slug: 'personalityType'
      },
      {
        label: 'Player Type',
        slug: 'playerType',
      },
    ],
  },
  {
    label: 'Profile',
    title: {
      base: 'Profile',
      sm: '2. Profile',
      lg: '2. Professional Profile',
    },
    screens: [
      {
        label: 'Skills',
        slug: 'skills'
      },
      {
        label: 'Availability',
        slug: 'availability',
      },
      {
        label: 'Time Zone',
        slug: 'timeZone'
      },
      {
        label: 'Memberships',
        slug: 'memberships',
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
