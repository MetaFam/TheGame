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
          return (
            <Button
              as="a"
              href={`https://twitter.com/${acc.identifier}`}
              target="_blank"
              key={acc.identifier}
              size="xs"
              colorScheme="twitter"
              leftIcon={<FaTwitter />}
            >
              {acc.identifier}
            </Button>
          );
        }
        if (acc.type === 'GITHUB') {
          return (
            <Button
              as="a"
              href={`https://github.com/${acc.identifier}`}
              target="_blank"
              key={acc.identifier}
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
