import { Button, Wrap } from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import React from 'react';
import { FaEthereum, FaGithub, FaTwitter } from 'react-icons/fa';

import { formatAddress } from '../../utils/playerHelpers';

type Props = {
  player: PlayerFragmentFragment;
};

export const PlayerContacts: React.FC<Props> = ({ player }) => {
  return (
    <Wrap>
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
      {player.ethereum_address ? (
        <Button
          as="a"
          href={`https://etherscan.com/address/${player.ethereum_address}`}
          target="_blank"
          size="xs"
          colorScheme="blackAlpha"
          leftIcon={<FaEthereum />}
        >
          {formatAddress(player.ethereum_address)}
        </Button>
      ) : null}
    </Wrap>
  );
};
