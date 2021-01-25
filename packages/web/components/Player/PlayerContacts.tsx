import { Button, Wrap, WrapItem } from '@metafam/ds';
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
            <WrapItem key={link}>
              <Button
                as="a"
                href={link}
                target="_blank"
                rel="noreferrer noopener"
                size="xs"
                colorScheme="twitter"
                leftIcon={<FaTwitter />}
              >
                {acc.identifier}
              </Button>
            </WrapItem>
          );
        }
        if (acc.type === 'GITHUB') {
          const link = `https://github.com/${acc.identifier}`;
          return (
            <WrapItem key={link}>
              <Button
                as="a"
                href={link}
                target="_blank"
                rel="noreferrer noopener"
                size="xs"
                colorScheme="blackAlpha"
                backgroundColor="black"
                leftIcon={<FaGithub />}
              >
                {acc.identifier}
              </Button>
            </WrapItem>
          );
        }
        return null;
      })}
      {player.ethereum_address ? (
        <WrapItem>
          <Button
            as="a"
            href={`https://etherscan.com/address/${player.ethereum_address}`}
            target="_blank"
            rel="noreferrer noopener"
            size="xs"
            colorScheme="blackAlpha"
            leftIcon={<FaEthereum />}
          >
            {formatAddress(player.ethereum_address)}
          </Button>
        </WrapItem>
      ) : null}
    </Wrap>
  );
};
