import { Button } from '@metafam/ds';
import React from 'react';
import { FaGithub, FaTwitter } from 'react-icons/fa';

import { PlayerFragmentFragment } from '../../graphql/autogen/types';

type Props = {
  player: PlayerFragmentFragment;
};

export const PlayerContacts: React.FC<Props> = ({ player }) => {
  return (
    <>
      {player.Accounts.map((acc) => {
        if (acc.type === 'TWITTER') {
          const link = `https://twitter.com/${acc.identifier}`;
          return (
            <Button
              as="a"
              href={link}
              target="_blank"
              key={link}
              size="xs"
              colorScheme="twitter"
              leftIcon={<FaTwitter />}
            >
              {acc.identifier}
            </Button>
          );
        }
        if (acc.type === 'GITHUB') {
          const link = `https://github.com/${acc.identifier}`;
          return (
            <Button
              as="a"
              href={link}
              target="_blank"
              key={link}
              size="xs"
              colorScheme="blackAlpha"
              backgroundColor="black"
              leftIcon={<FaGithub />}
            >
              {acc.identifier}
            </Button>
          );
        }
        return null;
      })}
    </>
  );
};
